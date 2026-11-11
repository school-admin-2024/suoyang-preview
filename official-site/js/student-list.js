Vue.createApp({
    components: {StudentCard: StudentUI.StudentCard},
    data() {
        const requested = new URLSearchParams(window.location.search).get("category") || "offer";
        const category = StudentCases.categories.find(item => item.id === requested) || null;
        return {...SiteCommon.data(), category, page: 1, pageSize: 9};
    },
    computed: {
        students() { return this.category ? StudentCases.forCategory(this.category.id) : []; },
        totalPages() { return Math.max(1, Math.ceil(this.students.length / this.pageSize)); },
        visibleStudents() { return this.students.slice((this.page - 1) * this.pageSize, this.page * this.pageSize); },
        pageItems() {
            if (this.totalPages <= 5) return Array.from({length: this.totalPages}, (_, i) => i + 1);
            const start = Math.max(2, Math.min(this.page - 1, this.totalPages - 3));
            const end = Math.min(this.totalPages - 1, Math.max(this.page + 1, 4));
            const items = [1];
            if (start > 2) items.push("…");
            for (let number = start; number <= end; number++) items.push(number);
            if (end < this.totalPages - 1) items.push("…");
            items.push(this.totalPages);
            return items;
        },
        categoryTitle() {
            const titles = {
                offer: "留学 Offer 学员案例",
                recommendation: "研究生推免学员案例",
                alevel: "A-Level 升学学员案例",
                btech: "BTEC国际课程案例"
            };
            return this.category ? titles[this.category.id] : "未找到录取分类";
        }
    },
    methods: {
        ...SiteCommon.methods,
        studentHref(id) { return StudentCases.href(id, "results", {category: this.category.id}); },
        validPage(value) {
            const number = Number(value);
            return Number.isSafeInteger(number) && number > 0 ? Math.min(number, this.totalPages) : 1;
        },
        scrollToList() {
            this.$refs.studentList?.focus({preventScroll: true});
            this.$refs.studentList?.scrollIntoView({block: "start", behavior: "instant"});
        },
        goToPage(value) {
            const next = this.validPage(value);
            if (next === this.page) return;
            this.page = next;
            const url = new URL(window.location.href);
            if (next === 1) url.searchParams.delete("page");
            else url.searchParams.set("page", String(next));
            url.hash = "";
            window.history.pushState(null, "", url);
            this.$nextTick(this.scrollToList);
        },
        restoreListPosition(scroll = false) {
            const targetIndex = this.students.findIndex(student => "#" + student.id === window.location.hash);
            const requested = new URLSearchParams(window.location.search).get("page");
            this.page = targetIndex >= 0 ? Math.floor(targetIndex / this.pageSize) + 1 : this.validPage(requested);
            this.$nextTick(() => {
                if (targetIndex >= 0) document.getElementById(this.students[targetIndex].id)?.scrollIntoView({block: "start", behavior: "instant"});
                else if (scroll) this.scrollToList();
            });
        }
    },
    mounted() {
        this.appEl = document.getElementById("app");
        this.onDocClick = this.handleDocumentClick.bind(this);
        document.addEventListener("click", this.onDocClick);
        document.title = this.categoryTitle + "｜所样国际艺术中心";
        const update = () => {
            const header = document.querySelector(".home-header");
            this.appEl.style.setProperty("--case-anchor-offset", ((header ? header.offsetHeight : 72) + 18) + "px");
        };
        update();
        this.headerObserver = new ResizeObserver(update);
        this.headerObserver.observe(document.querySelector(".home-header"));
        this.onListHistory = () => this.restoreListPosition(true);
        window.addEventListener("popstate", this.onListHistory);
        window.addEventListener("hashchange", this.onListHistory);
        this.restoreListPosition();
    },
    beforeUnmount() {
        document.removeEventListener("click", this.onDocClick);
        window.removeEventListener("popstate", this.onListHistory);
        window.removeEventListener("hashchange", this.onListHistory);
        this.headerObserver.disconnect();
    }
}).mount("#app");
