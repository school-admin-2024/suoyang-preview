Vue.createApp({
    components: {CaseImage: StudentUI.CaseImage},
    data() {
        const params = new URLSearchParams(window.location.search);
        const student = StudentCases.getStudent(params.get("id"));
        const source = params.get("from");
        const system = params.get("system");
        const systems = ["fashion", "industrial", "visual", "architecture", "fineart", "film"];
        const requestedCategory = params.get("category");
        const category = StudentCases.categories.find(item => item.id === requestedCategory) || StudentCases.categories[0];
        let returnLabel = category.name;
        let returnHref = "./student-list.html?category=" + category.id + (student ? "#" + student.id : "");
        if (source === "featured") {
            returnLabel = "我们的学生";
            returnHref = "./index.html?elite=" + encodeURIComponent(student ? student.id : "") + "#elite-students";
        } else if (source === "system" && systems.includes(system)) {
            returnLabel = "科系学员案例";
            const query = new URLSearchParams({system});
            if (params.get("major")) query.set("workMajor", params.get("major"));
            if (params.get("work")) query.set("work", params.get("work"));
            returnHref = "./systems-detail.html?" + query.toString() + "#works";
        }
        return {...SiteCommon.data(), student, returnHref, returnLabel, lightboxSrc: "", lightboxCaption: "", lightboxError: false};
    },
    computed: {works() { return StudentCases.worksFor(this.student); }},
    methods: {
        ...SiteCommon.methods,
        formatOfferSeason(value) {
            return window.OfferFields.formatTermEnglish(value).replace(/[A-Z]+$/, season => season[0] + season.slice(1).toLowerCase());
        },
        openMedia(src, caption) {
            if (!src) return;
            this.mediaPreviousFocus = document.activeElement;
            this.previousOverflow = document.body.style.overflow;
            this.lightboxError = false;
            this.lightboxSrc = src;
            this.lightboxCaption = caption;
            document.body.style.overflow = "hidden";
            this.$nextTick(() => this.$refs.mediaClose.focus());
        },
        closeMedia() {
            this.lightboxSrc = "";
            document.body.style.overflow = this.previousOverflow || "";
            if (this.mediaPreviousFocus && this.mediaPreviousFocus.isConnected) this.mediaPreviousFocus.focus({preventScroll: true});
        },
        handleCaseKey(event) {
            if (!this.lightboxSrc) return;
            if (event.key === "Escape") this.closeMedia();
            if (event.key === "Tab") { event.preventDefault(); this.$refs.mediaClose.focus(); }
        }
    },
    mounted() {
        this.appEl = document.getElementById("app");
        this.onDocClick = this.handleDocumentClick.bind(this);
        this.onCaseKey = this.handleCaseKey.bind(this);
        document.addEventListener("click", this.onDocClick);
        document.addEventListener("keydown", this.onCaseKey);
        document.title = (this.student ? this.student.name + "录取成果与作品" : "未找到学员案例") + "｜所样国际艺术中心";
        this.$nextTick(() => {
            const id = window.location.hash.slice(1);
            const target = this.works.find(work => work.id === id);
            if (target) document.getElementById(target.id).scrollIntoView({block: "start"});
        });
    },
    beforeUnmount() {
        document.removeEventListener("click", this.onDocClick);
        document.removeEventListener("keydown", this.onCaseKey);
        document.body.style.overflow = this.previousOverflow || "";
    }
}).mount("#app");
