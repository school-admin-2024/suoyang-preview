(function (window) {
    "use strict";

    // 真实图片与空图片共用一个组件，加载失败也回到占位，避免破图。
    const CaseImage = {
        props: {src: {default: ""}, alt: {default: ""}, kind: {default: "work"}, label: {default: "图片待补充"}},
        data() { return {failed: false}; },
        watch: {src() { this.failed = false; }},
        computed: {available() { return !!this.src && !this.failed; }},
        template: `<span class="case-image" :class="['case-image--' + kind, {'is-empty': !available}]">
            <img v-if="available" :src="src" :alt="alt" loading="lazy" @error="failed = true">
            <span v-else class="case-placeholder" role="img" :aria-label="alt + '，' + label">
                <svg v-if="kind === 'portrait'" viewBox="0 0 48 48" fill="none" aria-hidden="true"><circle cx="24" cy="17" r="7"/><path d="M11 39v-4a13 13 0 0 1 26 0v4"/></svg>
                <svg v-else viewBox="0 0 48 48" fill="none" aria-hidden="true"><rect x="8" y="9" width="32" height="30" rx="4"/><circle cx="19" cy="19" r="3"/><path d="m10 34 10-9 7 6 5-5 7 8"/></svg>
                <span>{{ label }}</span>
            </span>
        </span>`
    };
    const StudentCard = {
        components: {CaseImage},
        props: {student: {required: true}, href: {required: true}, showWorks: Boolean},
        computed: {works() { return window.StudentCases.worksFor(this.student); }},
        template: `<article class="student-card" :class="{'is-placeholder': student.isPlaceholder}" :data-student-id="student.id">
            <a :href="href" class="student-card-main" :aria-label="student.name + '，查看录取详情与作品'">
                <case-image :src="student.photo" :alt="student.name + '学员照片'" kind="portrait" label="学员照片待补充"></case-image>
                <div class="student-card-copy">
                    <h3>{{ student.name }}</h3>
                    <ul class="student-offer-lines"><li v-for="offer in student.offers" :key="offer.id"><strong>{{ offer.school || '录取院校待补充' }}</strong><span> · {{ offer.program || '录取专业待补充' }}</span></li></ul>
                    <span class="student-detail-link">查看详情 <span aria-hidden="true">→</span></span>
                </div>
            </a>
            <div v-if="showWorks" class="student-work-thumbs" aria-label="学员项目作品">
                <a v-for="work in works" :key="work.id" :href="href + '#' + work.id" :aria-label="student.name + '，' + work.caption">
                    <case-image :src="work.image" :alt="work.caption" label="作品待补充"></case-image>
                </a>
                <span v-if="!works.length" class="student-no-works">作品图片待补充</span>
            </div>
        </article>`
    };
    window.StudentUI = {CaseImage, StudentCard};
})(window);
