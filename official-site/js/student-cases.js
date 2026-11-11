(function (window) {
    "use strict";

    // 截图中的三位学员仅用于本轮前端样例；照片、offer 原图、作品归属待补充。
    // 全量学员只维护此处；精选引用学员 ID，科系从学员作品按 system/major 派生。
    // 申请季使用确认的前端演示值，正式资料后续替换。
    const demoTerm = "2027-AUTUMN";
    const categories = [
        {id: "offer", name: "留学Offer案例"},
        {id: "recommendation", name: "研究生推免案例"},
        {id: "alevel", name: "A-Level升学案例"},
        {id: "btech", name: "BTEC国际课程案例"}
    ];
    const students = [
        {
            id: "student-l", name: "L 同学", photo: "", categories: ["offer"], status: "published", isDemo: true,
            offers: [
                {id: "l-chelsea", school: "伦敦艺术大学 切尔西学院", program: "面料设计", degree: "MA", image: "", term: demoTerm},
                {id: "l-rca", school: "皇家艺术学院", program: "纺织品设计", degree: "MA", image: "", term: demoTerm},
                {id: "l-kingston", school: "金斯顿大学", program: "时装设计", degree: "MA", image: "", term: demoTerm}
            ],
            // 无真实项目图时保留占位。每位学员全页面最多展示三张作品。
            works: [
                {id: "l-work-1", image: "", caption: "项目作品 01", system: "fashion", major: "纺织品设计", offerId: "l-chelsea"},
                {id: "l-work-2", image: "", caption: "项目作品 02", system: "fashion", major: "纺织品设计", offerId: "l-rca"},
                {id: "l-work-3", image: "", caption: "项目作品 03", system: "fashion", major: "服装设计", offerId: "l-kingston"}
            ]
        },
        {
            id: "student-z", name: "Z 同学", photo: "", categories: ["offer"], status: "published", isDemo: true,
            offers: [
                {id: "z-rca", school: "皇家艺术学院", program: "设计交互", degree: "MA", image: "", term: demoTerm},
                {id: "z-ual", school: "伦敦艺术大学", program: "交互设计", degree: "MA", image: "", term: demoTerm},
                {id: "z-edinburgh", school: "爱丁堡大学", program: "设计信息学", degree: "MSc", image: "", term: demoTerm}
            ],
            works: [
                {id: "z-work-1", image: "", caption: "项目作品 01", system: "industrial", major: "交互设计", offerId: "z-rca"},
                {id: "z-work-2", image: "", caption: "项目作品 02", system: "industrial", major: "交互设计", offerId: "z-ual"}
            ]
        },
        {
            id: "student-g", name: "G 同学", photo: "", categories: ["offer"], status: "published", isDemo: true,
            offers: [
                {id: "g-westminster", school: "威斯敏斯特大学", program: "纪录片", degree: "MA", image: "", term: demoTerm},
                {id: "g-lfs", school: "伦敦电影学院", program: "纪录片", degree: "MA", image: "", term: demoTerm},
                {id: "g-bournemouth", school: "伯恩茅斯大学", program: "影视制作", degree: "MFA", image: "", term: demoTerm}
            ],
            works: [
                {id: "g-work-1", image: "", caption: "项目作品 01", system: "film", major: "媒体制作", offerId: "g-westminster"}
            ]
        }
    ];
    // 比例仅取参考图清晰可辨的内容，不由三位样例学员计算。
    const admissionBoard = [
        {school: "伦敦传媒学院", rate: "94%", logo: "./image/schools/lcc.png"},
        {school: "金斯顿大学", rate: "92%", logo: "./image/schools/kingston.png"},
        {school: "伦敦电影学院", rate: "87%", logo: "./image/schools/lfs.png"},
        {school: "爱丁堡大学", rate: "95%", logo: "./image/schools/edinburgh.png"},
        {school: "格拉斯哥艺术学院", rate: "93%", logo: "./image/schools/gsa.png"}
    ];
    const homePicks = ["student-l", "student-z", "student-g"];

    function published() {
        return students.filter(student => student.status === "published");
    }
    function getStudent(id) {
        const student = published().find(student => student.id === id);
        if (student) return student;
        const category = categories.find(item => String(id || "").startsWith("preview-" + item.id + "-"));
        return category ? forCategory(category.id).find(item => item.id === id) || null : null;
    }
    function forCategory(categoryId) {
        if (!categories.some(category => category.id === categoryId)) return [];
        const cases = published().filter(student => student.categories.includes(categoryId));
        const targetCount = categoryId === "offer" ? 12 : 9;
        // Layout-only placeholders never enter the student archive, home picks or department works.
        const placeholders = Array.from({length: Math.max(0, targetCount - cases.length)}, (_, index) => {
            const id = "preview-" + categoryId + "-" + String(index + 1).padStart(2, "0");
            const offerId = id + "-offer";
            return {id, name: "学员资料待补充", photo: "", categories: [categoryId], status: "placeholder", isDemo: true, isPlaceholder: true,
                offers: [{id: offerId, school: "", program: "", degree: "", term: demoTerm, image: ""}],
                works: Array.from({length: 3}, (_, number) => ({id: id + "-work-" + (number + 1), image: "", caption: "项目作品 " + (number + 1), system: "", major: "", offerId}))};
        });
        return cases.concat(placeholders);
    }
    function worksFor(student) {
        return student ? (student.works || []).slice(0, 3) : [];
    }
    function workOffers(student, work) {
        const ids = Array.isArray(work.offerIds) ? work.offerIds : work.offerId ? [work.offerId] : [];
        return (student.offers || []).filter(offer => ids.includes(offer.id));
    }
    function departmentWorks(system) {
        return published().flatMap(student => worksFor(student)
            .filter(work => work.system === system && work.displayEnabled !== false)
            .flatMap(work => {
                const offers = workOffers(student, work);
                if (!offers.length) return [];
                return [{...work, studentId: student.id, studentName: student.name, isDemo: student.isDemo,
                    admissions: admissionOffers(offers),
                    schools: [...new Set(offers.map(offer => String(offer.school || "").trim()).filter(Boolean))],
                    offer: offers[0] || null}];
            }));
    }
    function admissionOffers(offers) {
        const seen = new Set();
        return (offers || []).flatMap(offer => {
            if (!offer) return [];
            const record = Object.fromEntries(["school", "program", "degree"].map(field => [field, String(offer[field] || "").trim().replace(/\s+/g, " ")]));
            const key = JSON.stringify([record.school, record.program, record.degree]);
            if (!record.school || seen.has(key)) return [];
            seen.add(key);
            return [{...record, key}];
        });
    }
    function href(id, source, options) {
        const query = new URLSearchParams({id, from: source || "results"});
        for (const [key, value] of Object.entries(options || {})) if (value) query.set(key, value);
        return "./student-detail.html?" + query.toString();
    }
    window.StudentCases = {categories, students, admissionBoard, homePicks, published, getStudent, forCategory, worksFor, workOffers, departmentWorks, admissionOffers, href};
})(window);
