Vue.createApp({
    components: {StudentCard: StudentUI.StudentCard},
    data() {
        return {
            dialogVisible: false,
            consultTopic: "课程咨询",
            activeNav: "top",
            eliteIndex: 0,
            failedSchoolLogos: [],
            qrPreview: "",
            qrLabel: "",
            consultMenuVisible: false,
            consultOptions: ["在线客服", "电话咨询", "预约1V1规划", "领取备考资料"],
            courses: [
                {
                    title: "艺术作品集课程",
                    description: "打磨专业艺术能力，定制院校专属作品集，冲刺海外艺术名校offer",
                    tag: "本科 / 研究生",
                    image: "./image/course-setting1.jpg"
                },
                {
                    title: "名校爬藤计划",
                    description: "对标英美顶尖艺术院校录取标准，全周期定制冲刺升学方案",
                    tag: "全球名校申请",
                    image: "./image/course-setting2.jpg"
                },

                {
                    title: "BTEC艺术课程",
                    description: "英国官方认证艺术预科，零基础适配，免试衔接英本艺术院校",
                    tag: "国际课程",
                    image: "./image/course-setting4.jpg"
                },
                {
                    title: "A-Level艺术课程",
                    description: "艺术全科授课，考取高分GPA，衔接英国本科艺术专业申请",
                    tag: "国际高中",
                    image: "./image/course-setting5.jpg"
                },
                {
                    title: "AP艺术课程",
                    description: "美国大学先修艺术课程，兑换本科院校学分，提升申请竞争力",
                    tag: "国际高中",
                    image: "./image/course-setting6.png"
                },
                {
                    title: "国际奖项冲刺",
                    description: "精准备战各类国际艺术赛事，全程辅导创作与申报，斩获权威奖项加持艺术升学申请竞争力",
                    tag: "背景提升",
                    image: "./image/course-setting7.jpg"
                },
                {
                    title: "研究生推免计划",
                    description: "夏令营/预推免｜文书打磨｜面试模拟｜院校定位规划",
                    tag: "硕士 / 博士",
                    image: "./image/course-setting3.jpeg"
                },
                {
                    title: "设计师养成计划",
                    description: "全链路设计能力训练，打造可留学、可职场就业双向完整作品集",
                    tag: "职业发展",
                    image: "./image/course-setting8.jpeg"
                },
                {
                    title: "低龄艺术课程",
                    description: "艺术基础功底｜创意思维拓展｜审美素养培养｜艺术启蒙",
                    tag: "6-15岁",
                    image: "./image/course-setting9.jpg"
                }
            ],
            systems: [
                {
                    name: "时尚科系",
                    slug: "fashion",
                    subtitle: "服装设计、配饰设计、面料设计、时尚管理",
                    icon: "F",
                    image: "./image/art-system1.jpg"
                },
                {
                    name: "工业交互科系",
                    slug: "industrial",
                    subtitle: "产品设计、工业设计、交互设计、人机工程",
                    icon: "I",
                    image: "./image/art-system2.jpg"
                },
                {
                    name: "视觉媒体科系",
                    slug: "visual",
                    subtitle: "平面设计、插画、数字媒体、品牌视觉",
                    icon: "V",
                    image: "./image/art-system3.jpg"
                },
                {
                    name: "建筑科系",
                    slug: "architecture",
                    subtitle: "建筑设计、景观设计、室内设计、城市规划",
                    icon: "A",
                    image: "./image/art-system4.png"
                },
                {
                    name: "纯艺科系",
                    slug: "fineart",
                    subtitle: "油画、雕塑、当代艺术、版画、艺术理论",
                    icon: "P",
                    image: "./image/art-system5.png"
                },
                {
                    name: "电影科系",
                    slug: "film",
                    subtitle: "影视编导、动画、摄影、编剧、新媒体影像",
                    icon: "M",
                    image: "./image/art-system6.png"
                }
            ],
            destinations: ["英国", "美国", "欧洲小众国家", "中国香港/澳门", "新加坡", "加拿大", "澳洲", "日韩"],
            results: [
                {id: "offer", label: "留学Offer案例", title: "留学Offer案例", desc: "", image: "./image/student-outcomes1.jpg"},
                {id: "recommendation", label: "研究生推免案例", title: "研究生推免案例", desc: "", image: "./image/student-outcomes2.jpg"},
                {id: "alevel", label: "A-Level升学案例", title: "A-Level升学案例", desc: "", image: "./image/student-outcomes3.png"},
                {id: "btech", label: "BTEC国际课程案例", title: "BTEC国际课程案例", desc: "", image: "./image/student-outcomes4.png"}
            ],
            features: [
                {
                    en: "PERSONAL PLAN",
                    title: "名校全职导师",
                    desc: "海外艺术院校背景导师全覆盖",
                    image: "./image/why-suoyoung1.jpg"
                },
                {
                    en: "ACADEMIC SYSTEM",
                    title: "海量真实案例",
                    desc: "累计万+海内外院校录取通知书",
                    image: "./image/why-suoyoung2.jpg"
                },
                {
                    en: "GLOBAL MENTORS",
                    title: "官方课程授权",
                    desc: "A-Level/BTEC Pearson官方认证教学中心",
                    image: "./image/why-suoyoung3.jpg"
                },
                {
                    en: "SERVICE SUPPORT",
                    title: "全流程服务保障",
                    desc: "规划-授课-文书-申请-签证一站式跟进",
                    image: "./image/why-suoyoung4.jpeg"
                }
            ],
            process: ["免费咨询", "能力评估", "方案规划", "课程学习", "申请递交", "收获录取"],
            newsList: [
                {
                    tag: "升学干货",
                    date: "",
                    title: "留学/保研/A-Level干货资讯列表",
                    image: "./image/latest-events1.JPG",
                    link: "./news.html"
                },
                {tag: "线下讲座", date: "", title: "近期公开课、各类讲座预约", image: "./image/latest%20events2.jpg"}
            ]
        };
    },
    computed: {
        featuredStudents() { return StudentCases.homePicks.map(StudentCases.getStudent).filter(Boolean); },
        admissionSchools() { return StudentCases.admissionBoard; }
    },
    methods: {
        studentHref(id, from) { return StudentCases.href(id, from); },
        markSchoolLogoFailed(school) {
            if (!this.failedSchoolLogos.includes(school)) this.failedSchoolLogos.push(school);
        },
        initEliteSwiper() {
            const self = this;
            if (!this.featuredStudents.length) return;
            const requested = new URLSearchParams(window.location.search).get("elite");
            const initial = Math.max(0, this.featuredStudents.findIndex(student => student.id === requested));
            this.eliteSwiper = new Swiper(".elite-swiper", {
                initialSlide: initial, slidesPerView: 1, centeredSlides: true, spaceBetween: 18,
                speed: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 450,
                loop: this.featuredStudents.length > 1, watchOverflow: true,
                breakpoints: {0: {slidesPerView: 1}, 700: {slidesPerView: 3, spaceBetween: 22}, 1000: {slidesPerView: 3, spaceBetween: 28}},
                on: {init() { self.eliteIndex = this.realIndex; }, slideChange() { self.eliteIndex = this.realIndex; }}
            });
        },
        moveElite(direction) {
            if (!this.eliteSwiper) return;
            direction < 0 ? this.eliteSwiper.slidePrev() : this.eliteSwiper.slideNext();
        },
        selectElite(index) { if (this.eliteSwiper) this.eliteSwiper.slideToLoop(index); },
        onLatestCard(item, event) {
            if (item.link) {
                if (event && event.type === "keydown") window.location.href = item.link;
                return;
            }
            if (event) event.preventDefault();
            this.openConsult(item.consultTopic || "近期公开课、各类讲座预约");
        },
        openConsult(topic) {
            this.consultTopic = topic;
            this.dialogVisible = true;
        },
        openQr(src, label) {
            this.qrPreview = src;
            this.qrLabel = label;
        },
        closeQr() {
            this.qrPreview = "";
            this.qrLabel = "";
        },
        toggleConsultMenu() {
            this.consultMenuVisible = !this.consultMenuVisible;
        },
        closeConsultMenu() {
            this.consultMenuVisible = false;
        },
        selectConsultOption(topic) {
            this.closeConsultMenu();
            this.openConsult(topic);
        },
        handleDocumentClick(event) {
            const dropdown = this.appEl.querySelector(".cta-dropdown");
            if (!dropdown || !dropdown.contains(event.target)) {
                this.closeConsultMenu();
            }
        },
        selectNav(id) {
            this.activeNav = id;
        },
        setupEventAnchor() {
            const sections = this.appEl.querySelectorAll("#events, #results, #elite-students");
            const header = this.appEl.querySelector(".home-header");
            if (!sections.length || !header) return;
            const update = () => { sections.forEach(section => { section.style.scrollMarginTop = header.offsetHeight + "px"; }); };
            update();
            this.eventHeaderObserver = new ResizeObserver(update);
            this.eventHeaderObserver.observe(header);
        },
        scrollToSection(id) {
            this.activeNav = id;
            if (id === "top") {
                window.scrollTo({ top: 0, behavior: "smooth" });
                return;
            }
            const header = this.appEl.querySelector(".home-header");
            const offset = header ? header.offsetHeight : 0;
            const el = document.getElementById(id);
            let top = 0;
            if (el) {
                top = window.pageYOffset + el.getBoundingClientRect().top - offset;
            }
            window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
        },
        setupNavSpy() {
            const ids = ["top", "courses", "system", "results", "events", "about"];
            const hash = window.location.hash.replace("#", "");
            if (ids.indexOf(hash) !== -1) {
                this.activeNav = hash;
            }
            const self = this;
            const tracked = ["courses", "system", "results", "events", "about"]
                .map(function (id) { return document.getElementById(id); })
                .filter(Boolean);
            if (!tracked.length) {
                return;
            }
            const onScroll = function () {
                const header = self.appEl.querySelector(".home-header");
                const offset = header ? header.offsetHeight + 10 : 80;
                let current = "top";
                tracked.forEach(function (section) {
                    if (section.getBoundingClientRect().top <= offset) {
                        current = section.id;
                    }
                });
                self.activeNav = current;
            };
            this.onNavScroll = onScroll;
            window.addEventListener("scroll", onScroll, { passive: true });
            onScroll();
        },
        activeHeroVideo() {
            const swiper = this.heroSwiper;
            if (swiper) {
                const slide = swiper.slides[swiper.activeIndex];
                return slide ? slide.querySelector("video") : null;
            }
            return this.appEl.querySelector(".hero-slide video");
        },
        tryPlay(video) {
            if (!video) {
                return;
            }
            video.muted = true;
            const playing = video.play();
            if (playing && playing.catch) {
                playing.catch(function () {});
            }
        },
        playActiveSlideVideo(swiper) {
            const self = this;
            swiper.slides.forEach(function (slide) {
                const video = slide.querySelector("video");
                if (!video) {
                    return;
                }
                video.muted = true;
                if (slide === swiper.slides[swiper.activeIndex]) {
                    self.tryPlay(video);
                } else {
                    video.pause();
                }
            });
        },
        playHeroVideos() {
            const self = this;
            if (this.heroSwiper) {
                this.playActiveSlideVideo(this.heroSwiper);
                return;
            }
            this.appEl.querySelectorAll(".hero-slide video").forEach(function (video) {
                self.tryPlay(video);
            });
        },
        playAllHeroVideos() {
            const self = this;
            this.appEl.querySelectorAll(".hero-slide video").forEach(function (video) {
                self.tryPlay(video);
            });
        },
        bindVideoEvents() {
            const self = this;
            this.appEl.querySelectorAll(".hero-slide video").forEach(function (video) {
                video.muted = true;
                const tryStart = function () {
                    if (video.paused) {
                        self.tryPlay(video);
                    }
                };
                video.addEventListener("canplay", tryStart);
                video.addEventListener("loadeddata", tryStart);
            });
        },
        initWeChatAutoplay() {
            const self = this;
            const start = function () {
                self.playAllHeroVideos();
            };

            if (window.WeixinJSBridge) {
                window.WeixinJSBridge.invoke("getNetworkType", {}, start);
            } else {
                document.addEventListener("WeixinJSBridgeReady", function () {
                    window.WeixinJSBridge.invoke("getNetworkType", {}, start);
                });
            }

            ["touchstart", "pointerdown", "click"].forEach(function (evt) {
                document.addEventListener(evt, start, {once: true, passive: true});
            });
            document.addEventListener("visibilitychange", function () {
                if (!document.hidden) {
                    start();
                }
            });
        },
        initHeroSwiper() {
            const self = this;
            this.heroSwiper = new Swiper(".hero-swiper", {
                loop: true,
                speed: 800,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false
                },
                pagination: {
                    el: ".hero-pagination",
                    clickable: true
                },
                navigation: {
                    prevEl: ".hero-button-prev",
                    nextEl: ".hero-button-next"
                },
                on: {
                    init: function () {
                        self.playActiveSlideVideo(this);
                    },
                    slideChangeTransitionStart: function () {
                        self.playActiveSlideVideo(this);
                    }
                }
            });
        }
    },
    mounted() {
        this.appEl = document.getElementById("app");
        this.onDocClick = this.handleDocumentClick.bind(this);
        this.initHeroSwiper();
        this.$nextTick(() => this.initEliteSwiper());
        document.addEventListener("click", this.onDocClick);
        this.bindVideoEvents();
        this.playHeroVideos();
        this.initWeChatAutoplay();
        this.setupNavSpy();
        this.setupEventAnchor();
        this.$nextTick(() => {
            if (["#elite-students", "#results"].includes(window.location.hash)) {
                document.querySelector(window.location.hash).scrollIntoView({block: "start", behavior: "instant"});
            }
        });
        const self = this;
        window.setTimeout(function () {
            self.playHeroVideos();
        }, 1200);
    },
    beforeUnmount() {
        if (this.eliteSwiper) this.eliteSwiper.destroy(true, true);
        if (this.eventHeaderObserver) this.eventHeaderObserver.disconnect();
        document.removeEventListener("click", this.onDocClick);
        if (this.onNavScroll) {
            window.removeEventListener("scroll", this.onNavScroll);
        }
    }
}).mount("#app");
