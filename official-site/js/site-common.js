(function (window) {
    "use strict";

    /* 主导航：首页内为锚点滚动，其余页面按 href 跳转 */
    var NAV = [
        { name: "首页", href: "./index.html", hash: "top" },
        { name: "学术研究中心", href: "./index.html", hash: "courses" },
        { name: "六大艺术科系", href: "./index.html", hash: "system" },
        { name: "部分录取成果展示", href: "./index.html", hash: "results" },
        { name: "课程活动", href: "./index.html", hash: "events" },
        { name: "最新资讯", href: "./news.html" },
        { name: "关于所样", href: "./index.html", hash: "about" }
    ];

    /* 校区联系方式：弹窗与页脚均从此处取值 */
    var CONTACT = {
        cities: [
            { key: "beijing", en: "BEIJING", cn: "北京", tel: "400-879-0619", telHref: "tel:4008790619", qr: "./image/beijing-wechat.png" },
            { key: "shanghai", en: "SHANGHAI", cn: "上海", tel: "021-60190648", telHref: "tel:02160190648", qr: "./image/shanghai-wechat.png" }
        ]
    };

    function data() {
        return {
            dialogVisible: false,
            consultTopic: "课程咨询",
            qrPreview: "",
            qrLabel: "",
            consultMenuVisible: false,
            consultOptions: ["在线客服", "电话咨询", "预约1V1规划", "领取备考资料"]
        };
    }

    var methods = {
        openConsult: function (topic) {
            this.consultTopic = topic;
            this.dialogVisible = true;
        },
        closeConsult: function () {
            this.dialogVisible = false;
        },
        openQr: function (src, label) {
            this.qrPreview = src;
            this.qrLabel = label;
        },
        closeQr: function () {
            this.qrPreview = "";
            this.qrLabel = "";
        },
        toggleConsultMenu: function () {
            this.consultMenuVisible = !this.consultMenuVisible;
        },
        closeConsultMenu: function () {
            this.consultMenuVisible = false;
        },
        selectConsultOption: function (topic) {
            this.closeConsultMenu();
            this.openConsult(topic);
        },
        handleDocumentClick: function (event) {
            var dropdown = this.appEl.querySelector(".cta-dropdown");
            if (!dropdown || !dropdown.contains(event.target)) {
                this.closeConsultMenu();
            }
        },
        /* 通用 Lightbox：任何带 data-lightbox 的元素都可点击查看大图 */
        openLightbox: function (src, caption) {
            this.lightboxSrc = src;
            this.lightboxCaption = caption || "";
        },
        closeLightbox: function () {
            this.lightboxSrc = "";
            this.lightboxCaption = "";
        }
    };

    window.SiteCommon = {
        navList: NAV,
        contact: CONTACT,
        data: data,
        methods: methods
    };
})(window);
