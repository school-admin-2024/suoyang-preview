(function () {
    'use strict';
    const LEGACY_KEY = 'suoyang-case-admin-v1';
    const SIGNAL_KEY = 'suoyang-case-admin-revision';
    let connection;
    function open() {
        if (!connection) connection = new Promise((resolve, reject) => {
            const request = indexedDB.open('suoyang-case-admin', 1);
            request.onupgradeneeded = () => request.result.createObjectStore('state');
            request.onerror = () => reject(request.error);
            request.onblocked = () => reject(new DOMException('请关闭旧版后台窗口后重试', 'InvalidStateError'));
            request.onsuccess = () => {
                const db = request.result;
                db.onversionchange = () => {db.close(); connection = null;};
                resolve(db);
            };
        }).catch(error => {connection = null; throw error;});
        return connection;
    }
    function validate(db) {
        if (!db || !['students','placements','picks','board','categories','systems','legacy'].every(key=>Array.isArray(db[key])) || !Number.isSafeInteger(db.revision)
            || !db.students.every(student=>student&&typeof student.name==='string'&&Array.isArray(student.offers)&&Array.isArray(student.works)))
            throw new DOMException('已保存资料格式不符', 'DataError');
        // Display numbers are independent of the IDs referenced by offers and works.
        let studentNo = Math.max(0, ...db.students.map(row => Number.isSafeInteger(row.studentNo) && row.studentNo > 0 ? row.studentNo : 0));
        const assignedNumbers = new Set();
        db.students.forEach((row, index) => {
            if (!Number.isSafeInteger(row.studentNo) || row.studentNo < 1 || assignedNumbers.has(row.studentNo)) row.studentNo = ++studentNo;
            assignedNumbers.add(row.studentNo);
            const demoTime = row.updatedAt || '2026-10-' + String(20 + index % 9).padStart(2, '0') + ' 10:00:00';
            row.createdAt ||= demoTime.length === 16 ? demoTime + ':00' : demoTime;
            row.offers.forEach(window.OfferPrograms.normalizeOffer);
            row.works.forEach(work => {work.major = typeof work.major === 'string' ? work.major : '';});
        });
        // Legacy prototype records use fixed demo dates; existing operation times are preserved.
        db.categories.forEach(category => {if(category.id === 'btech') category.name = 'BTEC国际课程案例';});
        if (db.degrees === undefined) db.degrees = ['BA','MA','MFA'].map(name => ({id:'degree-'+name.toLowerCase(),name,enabled:true}));
        const degreeIds = new Set(), degreeNames = new Set();
        if (!Array.isArray(db.degrees) || db.degrees.some(row => {
            if (!row || typeof row.id !== 'string' || !row.id || typeof row.name !== 'string' || !row.name.trim() || row.name.length > 30 || typeof row.enabled !== 'boolean') return true;
            const name = row.name.trim().toUpperCase();
            if (degreeIds.has(row.id) || degreeNames.has(name)) return true;
            degreeIds.add(row.id); degreeNames.add(name); return false;
        })) throw new DOMException('学位资料格式不符', 'DataError');
        db.degrees.forEach((row, index) => {
            row.createdAt ||= '2026-11-06 10:' + String(index % 60).padStart(2, '0') + ':00';
            row.updatedAt ||= row.createdAt;
        });
        db.board.forEach((row, index) => {
            row.metricType ||= 'rate';
            // Backfill only missing logo fields for known demo schools. Preserve
            // uploads and explicitly empty values; never reset the stored records.
            if (row.logo === undefined) row.logo = window.ADMIN_CASES_SEED.board.find(item => item.school === row.school)?.logo || '';
            const demoTime = '2026-10-' + String(20 + index % 9).padStart(2, '0') + ' 10:00:00';
            row.createdAt ||= row.updatedAt || demoTime;
            row.updatedAt ||= row.createdAt;
        });
        return db;
    }
    async function read() {
        const db = await open();
        return new Promise((resolve, reject) => {
            const tx = db.transaction('state', 'readonly');
            const request = tx.objectStore('state').get('current');
            tx.oncomplete = () => {try {resolve(request.result ? validate(request.result) : null);} catch (error) {reject(error);}};
            tx.onabort = () => reject(tx.error);
        });
    }
    async function write(next, expectedRevision, authorize = () => true) {
        validate(next);
        const db = await open();
        return new Promise((resolve, reject) => {
            const tx = db.transaction('state', 'readwrite');
            const store = tx.objectStore('state');
            const request = store.get('current');
            let failure;
            request.onsuccess = () => {
                const current = request.result;
                if (!authorize()) failure = new DOMException('权限已变更', 'NotAllowedError');
                else if (current && current.revision !== expectedRevision) {
                    failure = new Error('其他窗口已更新资料'); failure.name = 'RevisionConflict'; failure.latest = validate(current);
                } else if (!current && expectedRevision !== null) {
                    failure = new DOMException('本地资料已被外部清除，请刷新核对', 'DataError');
                }
                if (failure) tx.abort();
                else store.put(next, 'current');
            };
            tx.oncomplete = () => {
                // Notification is optional; persistence has already completed atomically.
                try {localStorage.setItem(SIGNAL_KEY, JSON.stringify({revision: next.revision, nonce: crypto.randomUUID()}));} catch {}
                resolve();
            };
            tx.onabort = () => reject(failure || tx.error || new Error('数据库事务已中止'));
        });
    }
    async function load(seed) {
        const saved = await read();
        if (saved) return saved;
        const legacy = localStorage.getItem(LEGACY_KEY);
        const initial = legacy ? validate(JSON.parse(legacy)) : seed();
        try {await write(initial, null);} catch (error) {
            if (error.name === 'RevisionConflict') return validate(error.latest);
            throw error;
        }
        // Keep the old localStorage snapshot intact as a migration backup.
        return initial;
    }
    function message(error) {
        if (error?.name === 'QuotaExceededError') return '本机浏览器存储空间不足，保存未生效。输入已保留，请释放磁盘空间后重试。';
        if (['SecurityError', 'NotAllowedError'].includes(error?.name)) return '浏览器存储不可用或权限已变更，保存未生效。输入已保留，请检查浏览器存储权限后重试。';
        if (['DataError', 'SyntaxError'].includes(error?.name)) return '已保存资料无法读取，已阻止覆盖。请保留当前窗口与原始资料，联系维护人员处理。';
        if (error?.name === 'InvalidStateError') return '浏览器数据库暂不可用，请关闭旧版后台窗口后重试。输入已保留。';
        return '本地数据库保存失败，变更未生效，输入已保留，请重试。';
    }
    window.AdminStorage = {load, read, write, message, signalKey: SIGNAL_KEY};
})();
