function teacherImage(folder, file) {
    return "./image/systems/" + folder + "/" + encodeURIComponent(file);
}

function caseList(folder, files) {
    return files.map(function (file) {
        return "./image/systems/" + folder + "/" + encodeURIComponent(file);
    });
}

const DEMO_WORK_ADMISSIONS = {
    fashion: {name: "L 同学", offers: [
        {school: "伦敦艺术大学 切尔西学院", program: "面料设计", degree: "MA"},
        {school: "皇家艺术学院", program: "纺织品设计", degree: "MA"},
        {school: "金斯顿大学", program: "时装设计", degree: "MA"},
        {school: "帕森斯设计学院", program: "时装设计与社会", degree: "MFA"},
        {school: "米兰理工大学", program: "时尚设计", degree: "MSc"},
        {school: "罗德岛设计学院", program: "纺织品设计", degree: "MFA"},
        {school: "纽约时装技术学院", program: "时装设计", degree: "MFA"},
        {school: "格拉斯哥艺术学院", program: "时尚与纺织品设计", degree: "MDes"}
    ]},
    industrial: {name: "Z 同学", offers: [
        {school: "皇家艺术学院", program: "设计交互", degree: "MA"},
        {school: "伦敦艺术大学", program: "交互设计", degree: "MA"},
        {school: "爱丁堡大学", program: "设计信息学", degree: "MSc"},
        {school: "拉夫堡大学", program: "工业设计", degree: "MA"}
    ]},
    visual: {name: "A 同学", offers: [
        {school: "伦敦艺术大学", program: "视觉传达", degree: "MA"},
        {school: "皇家艺术学院", program: "视觉传达", degree: "MA"},
        {school: "纽约视觉艺术学院", program: "设计", degree: "MFA"},
        {school: "罗德岛设计学院", program: "平面设计", degree: "MFA"}
    ]},
    architecture: {name: "B 同学", offers: [
        {school: "伦敦大学学院", program: "建筑设计", degree: "MArch"},
        {school: "皇家艺术学院", program: "建筑设计", degree: "MA"},
        {school: "爱丁堡大学", program: "景观建筑", degree: "MLA"},
        {school: "米兰理工大学", program: "建筑设计", degree: "MSc"}
    ]},
    fineart: {name: "C 同学", offers: [
        {school: "皇家艺术学院", program: "纯艺术", degree: "MA"},
        {school: "伦敦艺术大学", program: "纯艺术", degree: "MA"},
        {school: "伦敦大学金史密斯学院", program: "纯艺术", degree: "MFA"},
        {school: "芝加哥艺术学院", program: "绘画", degree: "MFA"}
    ]},
    film: {name: "G 同学", offers: [
        {school: "威斯敏斯特大学", program: "纪录片", degree: "MA"},
        {school: "伦敦电影学院", program: "纪录片", degree: "MA"},
        {school: "伯恩茅斯大学", program: "影视制作", degree: "MFA"},
        {school: "纽约大学", program: "电影制作", degree: "MFA"}
    ]}
};

const SYSTEMS = {
    fashion: {
        name: "时尚设计科系",
        en: "Fashion Design",
        eyebrow: "Fashion Design",
        intro: "时尚科系覆盖服装、配饰、时尚商业、时尚媒体四大核心方向，对标国际顶尖艺术院校官方课程框架，全链路匹配全球申请要求",
        note: "时尚科系基础涵盖设计、营销、管理等方向，时尚科系相关产业蓬勃发展，时尚管理立足于商业与创意的融合，全方位对接行业资源与就业需求。",
        majors: [
            {
                en: "Fashion Design",
                cn: "服装设计",
                image: "./image/systems/fashion-design.jpg",
                desc: "服装设计是一门涉及服装设计与时尚产业的创意领域。它涵盖了从设计和概念开发、面料选择、色彩搭配、版型制作、服装制作和展示等多个环节。服装设计旨在创造出独特、时尚、符合人体工程学和美学要求的服装作品。"
            },
            {
                en: "Textile Design",
                cn: "纺织品设计",
                image: "./image/systems/textile-design.jpg",
                desc: "纺织品设计是一门专注于纺织品创意与技术的学科。它涉及织物的图案设计、织造、染色、印花和装饰等方面。纺织品设计旨在创造出兼具美感、实用性与创新性的纺织品，以满足人们对服装和家居用品的需求。"
            },
            {
                en: "Costume Design",
                cn: "戏服设计",
                image: "./image/systems/costume-design.jpg",
                desc: "戏服设计是一门为戏剧、电影、电视等表演艺术领域服务的专业。它涉及服装、配饰、化妆等方面的整体造型设计，旨在为角色塑造独特的形象与氛围。戏服设计师需要具备深厚的历史文化知识，以创造符合剧情与角色的服装。"
            },
            {
                en: "Jewelry Design",
                cn: "珠宝设计",
                image: "./image/systems/jewelry-design.jpg",
                desc: "珠宝设计是一门专注于珠宝首饰创意与制作的艺术学科。它涉及珠宝的选材、造型、镶嵌、抛光等方面。珠宝设计师需要具备独特的美学眼光和精湛的工艺技巧，以创造出兼具艺术价值与佩戴性的珠宝作品。"
            },
            {
                en: "Accessory Design",
                cn: "配饰设计",
                image: "./image/systems/accessory-design.jpg",
                desc: "配饰设计是一门涵盖鞋子、包袋、帽子、眼镜等多种品类的创意领域。配饰设计旨在通过细节的搭配与设计，为整体造型增添个性和风格。配饰设计师需要具备时尚敏感度与创意思维，以创造出符合潮流趋势的配饰产品。"
            },
            {
                en: "Fashion Management",
                cn: "时尚管理",
                image: "./image/systems/fashion-management.jpg",
                desc: "时尚管理是一门专注于时尚产业运营与营销的学科。它涉及品牌策划、市场推广、零售管理、供应链管理等方面。时尚管理专业培养具备商业头脑和时尚敏感度的复合型人才，以适应时尚产业的快速发展。"
            },
            {
                en: "Fashion Communication",
                cn: "时尚传媒",
                image: "./image/systems/fashion-communication.jpg",
                desc: "时尚传媒是一门涵盖时尚领域传播与推广的学科。它涉及时尚摄影、时尚写作、时尚公关、时尚活动策划等方面。时尚传媒专业培养具备传播能力与时尚素养的人才，以推动时尚文化的传播与发展。"
            }
        ],
        mentors: [
            {name: "Sheya", school: "London College of Fashion", image: teacherImage("fashion-system", "fashion-system-Sheya.png")},
            {name: "Adrian", school: "London College of Fashion", image: teacherImage("fashion-system", "fashion-system-Adrian.png")},
            {name: "Wenjing", school: "London College of Fashion", image: teacherImage("fashion-system", "fashion-system-Wenjing.png")},
            {name: "Tang", school: "London College of Fashion", image: teacherImage("fashion-system", "fashion-system-Tang.png")},
            {name: "Hui", school: "London College of Fashion", image: teacherImage("fashion-system", "fashion-system-Hui.png")},
            {name: "Roro", school: "Royal College of Art", image: teacherImage("fashion-system", "fashion-system-Roro.png")},
            {name: "Ria Dong", school: "Birmingham City University", image: teacherImage("fashion-system", "fashion-system-Ria Dong.png")},
            {name: "Cui", school: "London College of Fashion", image: teacherImage("fashion-system", "Cui｜London College of Art.png")},
            {name: "Manyao", school: "Royal College of Art", image: teacherImage("fashion-system", "Manyao｜Royal College of Art.png")},
            {name: "Xu", school: "RMIT University", image: teacherImage("fashion-system", "Xu｜RMIT University.png")}
        ],
        cases: caseList("fashion-system-case", [
            "Group 3.png",
            "Group 4.png",
            "Group 5.png",
            "Group 6.png",
            "Group 7.png",
            "Group 8.png",
            "Group 9.png"
        ])
    },
    industrial: {
        name: "工业交互科系",
        en: "Industrial | Interaction Design",
        eyebrow: "Industrial | Interaction Design",
        intro: "工业交互科系覆盖工业、产品、交互、服务设计方向，对标国际名校课程体系，全链路匹配全球申请要求",
        note: "工业交互科系涵盖工业、产品、交互、服务、游戏、家居与交通工具设计等方向，强调用户体验与工程实现的平衡，全方位对接智能制造与互联网产业需求。",
        majors: [
            {
                en: "Industrial Design",
                cn: "工业设计",
                image: "./image/systems/industrial-design.jpg",
                desc: "工业设计是一门将美学、人机工程学与商业需求相结合的学科。它涉及产品的外观、结构、功能等方面的设计。工业设计旨在创造既美观又实用的产品，以提升人们的生活品质。"
            },
            {
                en: "Product Design",
                cn: "产品设计",
                image: "./image/systems/product-design.jpg",
                desc: "产品设计是一门专注于产品创新与开发的学科。它涉及产品的概念设计、原型制作、测试与改进等环节。产品设计以用户需求为导向，旨在创造出兼具功能性与市场竞争力的产品。"
            },
            {
                en: "Interaction Design",
                cn: "交互设计",
                image: "./image/systems/interaction-design.jpg",
                desc: "交互设计是一门专注于人与产品、服务或系统之间互动关系的学科。它涉及用户研究、界面设计、可用性测试等方面。交互设计旨在创造直观、高效、愉悦的用户体验。"
            },
            {
                en: "Service Design",
                cn: "服务设计",
                image: "./image/systems/service-design.jpg",
                desc: "服务设计是一门以用户为中心的服务体验设计学科。它涉及服务流程、服务触点、服务环境等要素的系统设计。服务设计旨在全面提升服务质量与用户满意度。"
            },
            {
                en: "Game Design",
                cn: "游戏设计",
                image: "./image/systems/game-design.jpg",
                desc: "游戏设计是一门专注于游戏创作与开发的学科。它涉及游戏策划、关卡设计、美术设计、程序开发等方面。游戏设计旨在创造有趣且引人入胜的游戏体验。"
            },
            {
                en: "Home Design",
                cn: "家居设计",
                image: "./image/systems/home-design.jpg",
                desc: "家居设计是一门专注于家居环境与生活方式的学科。它涉及家具、灯具、家纺等方面的设计。家居设计旨在创造舒适、美观、实用的居住空间。"
            },
            {
                en: "Transportation Design",
                cn: "交通工具设计",
                image: "./image/systems/transportation-design.jpg",
                desc: "交通工具设计是一门专注于各类交通工具设计的学科。它涉及汽车、船舶、飞行器等交通工具的外观、内饰与用户体验设计。交通工具设计旨在创造安全、高效、富有美感的出行方式。"
            }
        ],
        mentors: [
            {name: "Loki", school: "Royal College of Art", image: teacherImage("industrial-interaction", "Loki｜Royal College of Art.png")},
            {name: "Nico", school: "Parsons School of Design", image: teacherImage("industrial-interaction", "Nico｜Parsons School of Design.png")},
            {name: "Chi", school: "Savannah College of Art & Design", image: teacherImage("industrial-interaction", "industrial-interaction-Chi.png")},
            {name: "Fisherman", school: "Savannah College of Art & Design", image: teacherImage("industrial-interaction", "industrial-interaction-Fisherman.png")},
            {name: "Falin", school: "Brunel University London", image: teacherImage("industrial-interaction", "industrial-interaction-Falin.png")},
            {name: "Ming", school: "Goldsmiths, University of London", image: teacherImage("industrial-interaction", "industrial-interaction-Ming.png")},
            {name: "Nora", school: "Loughborough University", image: teacherImage("industrial-interaction", "Nora｜Loughborough University.png")},
            {name: "Viv", school: "The Glasgow School of Art", image: teacherImage("industrial-interaction", "Viv｜The Glasgow School of Art.png")}
        ],
        cases: caseList("industrial-interaction-case", [
            "Group 19.png",
            "Group 20.png",
            "Group 21.png",
            "Group 22.png",
            "Group 24.png",
            "Group 25.png",
            "Group 26.png",
            "Group 27.png",
            "Group 28.png"
        ])
    },
    visual: {
        name: "视觉媒体科系",
        en: "Visual&Media Arts",
        eyebrow: "Visual&Media Arts",
        intro: "视觉媒体科系覆盖视传、平面、数字媒体、插画动画方向，对标国际名校课程体系，全链路匹配全球申请要求",
        note: "视觉媒体科系涵盖视觉传达、平面设计、数字媒体、插画等方向，强调视觉叙事与跨媒介表达，全面对接数字内容与品牌传播产业需求。",
        majors: [
            {
                en: "Visual Communication",
                cn: "视觉传达设计",
                image: "./image/systems/visual-communication.jpg",
                desc: "视觉传达设计是通过视觉媒介表现并传达信息的设计学科。它涵盖海报设计、标志设计、包装设计等多个领域。视觉传达设计旨在通过视觉元素的整合传递信息与情感。"
            },
            {
                en: "Graphic Design",
                cn: "平面设计",
                image: "./image/systems/graphic-design.jpg",
                desc: "平面设计是以视觉作为沟通和表达方式的学科。它涉及排版、色彩、图形等元素的运用与组合。平面设计旨在创造出兼具美感与说服力的视觉作品。"
            },
            {
                en: "Digital Media",
                cn: "数字媒体",
                image: "./image/systems/digital-media.jpg",
                desc: "数字媒体艺术是一门艺术与科技深度结合的学科。它涉及数字图像、互动媒体、声音艺术等方面。数字媒体艺术旨在探索艺术与科技融合的全新艺术形式。"
            },
            {
                en: "Illustration",
                cn: "插画设计",
                image: "./image/systems/illustration.jpg",
                desc: "插画设计是一门以图像叙事为特色的学科。它涉及书籍插画、商业插画、概念艺术等领域。插画设计旨在通过图像语言传达故事与情感。"
            },
            {
                en: "Animation Design",
                cn: "动画设计",
                image: "./image/systems/animation.jpg",
                desc: "动画设计是一门以动态叙事为核心的学科。它涉及角色设计、场景设计、分镜与动作设计等方面。动画设计旨在创造富有生命力的动画作品。"
            },
            {
                en: "Information Experience Design",
                cn: "信息体验设计",
                image: "./image/systems/information-experience.jpg",
                desc: "信息体验设计是一门关注信息传达与体验设计的学科。它涉及数据可视化、交互装置等领域。信息体验设计旨在通过设计提升信息的可理解性与体验感。"
            },
            {
                en: "Branding Design",
                cn: "品牌设计",
                image: "./image/systems/branding-design.jpg",
                desc: "品牌设计是一门以品牌塑造为核心的学科。它涉及品牌策略、视觉识别系统、品牌传播等方面。品牌设计旨在塑造独特的品牌形象与价值观。"
            }
        ],
        mentors: [
            {name: "Su", school: "Royal College of Art", image: teacherImage("visual-media-arts", "visual-media-Su.png")},
            {name: "Wei", school: "Royal College of Art", image: teacherImage("visual-media-arts", "Wei｜Royal College of Art.png")},
            {name: "Charlie Du", school: "Kingston University London", image: teacherImage("visual-media-arts", "visual-media-Charlie Du.png")},
            {name: "Barry", school: "Savannah College of Art & Design", image: teacherImage("visual-media-arts", "visual-media-Barry.png")},
            {name: "Wanron", school: "清华大学美术学院 | Brunel University London", image: teacherImage("visual-media-arts", "visual-media-Wanron.png")},
            {name: "Cong", school: "Full Sail University", image: teacherImage("visual-media-arts", "visual-media-Cong.png")},
            {name: "Tina", school: "ArtCenter College of Design", image: teacherImage("visual-media-arts", "visual-media-Tina.png")},
            {name: "J", school: "Full Sail University", image: teacherImage("visual-media-arts", "J｜Full Sail University.png")},
            {name: "Tian", school: "Goldsmiths University of London", image: teacherImage("visual-media-arts", "Tian｜Goldsmiths University of London.png")},

        ],
        cases: caseList("visual-media-case", [
            "Group 10.png",
            "Group 11.png",
            "Group 12.png",
            "Group 13.png",
            "Group 14.png",
            "Group 15.png",
            "Group 16.png",
            "Group 17.png",
            "Group 18.png"
        ])
    },
    architecture: {
        name: "建筑空间科系",
        en: "Architecture Arts",
        eyebrow: "Architecture Arts",
        intro: "建筑空间科系涵盖建筑设计、室内设计、景观设计、舞美设计、环境艺术设计与交互空间等方向，关注空间、人、环境与技术的融合创新。",
        note: "空间、建筑、设计、可持续发展、交互设计、艺术与技术融合，建筑空间科系以人为本探索空间与环境的多种可能。",
        majors: [
            {
                en: "Architectural Design",
                cn: "建筑设计",
                image: "./image/systems/architectural-design.jpg",
                desc: "建筑设计是一门综合性学科，涵盖艺术、设计、结构、工程、材料等多个领域。它涉及建筑外观、内部空间与环境等方面的设计。建筑设计旨在创造美观、实用、可持续的建筑空间。"
            },
            {
                en: "Interior Design",
                cn: "室内设计",
                image: "./image/systems/interior-design.jpg",
                desc: "室内设计是一门专注于室内空间营造的学科。它涉及空间规划、材料选择、照明设计等方面。室内设计旨在创造舒适、美观、实用的室内环境。"
            },
            {
                en: "Landscape Design",
                cn: "景观设计",
                image: "./image/systems/landscape-design.jpg",
                desc: "景观设计是一门专注于户外空间规划的学科。它涉及公园、广场、居住区等景观的规划与设计。景观设计旨在创造和谐、生态、宜人的户外环境。"
            },
            {
                en: "Stage Design",
                cn: "舞美设计",
                image: "./image/systems/stage-design.jpg",
                desc: "舞美设计是为舞台演出、影视等艺术形式进行视觉呈现的学科。它涉及舞台布景、灯光、道具与服装造型等方面的设计。舞美设计旨在为演出营造恰到好处的视觉效果。"
            },
            {
                en: "Environmental Art Design",
                cn: "环境艺术设计",
                image: "./image/systems/environmental-art-design.jpg",
                desc: "环境艺术设计是一门以环境为核心的设计学科。它涉及城市空间、公共艺术、展览展示等方面的设计。环境艺术设计旨在通过设计改善和提升人们的生活环境品质。"
            },
            {
                en: "Interactive Space",
                cn: "交互空间",
                image: "./image/systems/insteractive-space.jpg",
                desc: "交互空间是一门以人与空间互动为核心的设计学科。它涉及空间体验、互动装置、数字媒体等领域。交互空间旨在创造有趣且有意义的空间体验。"
            }
        ],
        mentors: [
            {name: "Peng", school: "Royal College of Art", image: teacherImage("architecture-system", "architecture- system-Peng.png")},
            {name: "Ma", school: "Royal College of Art", image: teacherImage("architecture-system", "architecture- system-Ma.png")},
            {name: "Mia", school: "Bartlett UCL", image: teacherImage("architecture-system", "Mia-Bartlett UCL.png")}
        ],
        cases: caseList("architecture-system-case", [
            "Group 29.png",
            "Group 30.png",
            "Group 31.png",
            "Group 32.png",
            "Group 33.png",
            "Group 34.png",
            "Group 35.png",
            "Group 36.png"
        ])
    },
    fineart: {
        name: "艺术人文科系",
        en: "Fine Arts | Humanities",
        eyebrow: "Fine Arts | Humanities",
        intro: "艺术人文科系涵盖纯艺术、艺术管理、摄影、策展、绘画与艺术史等方向，在人文与思辨中探索艺术的无限可能。",
        note: "纯艺科系涵盖绘画、雕塑、摄影、策展等多个领域，旨在艺术与人文的交融中探索艺术的无限可能，全面对接当代艺术生态与文化资源。",
        majors: [
            {
                en: "Fine Art",
                cn: "纯艺术",
                image: "./image/systems/fine-art.jpg",
                desc: "纯艺术是艺术家表达个人内心感受与对世界理解的创作形式。它涵盖绘画、雕塑、摄影、装置艺术等多种媒介。纯艺术旨在不断探索艺术的本质与边界。"
            },
            {
                en: "Arts Management",
                cn: "艺术管理",
                image: "./image/systems/art-management.jpg",
                desc: "艺术管理是一门跨学科领域，融合艺术、管理与市场营销等知识。它涉及艺术机构运营、艺术项目策划、艺术市场营销等方面。艺术管理旨在培养艺术领域的经营管理人才。"
            },
            {
                en: "Photography",
                cn: "摄影",
                image: "./image/systems/photography.jpg",
                desc: "摄影是一门运用光影记录世界、表达情感的艺术与技术。它涵盖人像、风光、纪实、观念摄影等多个领域。摄影旨在通过镜头捕捉并创造视觉之美。"
            },
            {
                en: "Curatorial Studies",
                cn: "策展",
                image: "./image/systems/curatorial-studies.jpg",
                desc: "策展是一门融合艺术、文化与管理的学科。它涉及展览策划、艺术品管理、艺术活动组织等方面。策展旨在通过展览传递艺术理念，连接艺术家与公众。"
            },
            {
                en: "Drawing",
                cn: "绘画",
                image: "./image/systems/drawing.jpg",
                desc: "绘画是以线条、色彩、构图等元素表达思想与情感的艺术形式。它涵盖素描、油画、水彩等多种技法。绘画是艺术创作的重要基础。"
            },
            {
                en: "Design/Art History",
                cn: "艺术史",
                image: "./image/systems/art-history.jpg",
                desc: "艺术史是一门研究艺术发展历程的学科。它涉及不同时期、不同地区的艺术风格、艺术家与作品研究。艺术史旨在理解艺术的发展脉络与文化内涵。"
            }
        ],
        mentors: [
            {name: "Ras", school: "London College of Fashion", image: teacherImage("fine-art-humanities", "fine-art-humanities-Ras.png")},
            {name: "Ivy", school: "Royal College of Art", image: teacherImage("fine-art-humanities", "Ivy｜Royal College of Art.png")}
        ],
        cases: caseList("fine-art-case", [
            "Group 38.png",
            "Group 39.png",
            "Group 40.png",
            "Group 41.png",
            "Group 42.png",
            "Group 44.png",
            "Group 45.png",
            "Group 46 .png",
            "group47.png"
        ])
    },
    film: {
        name: "电影影视科系",
        en: "Film/Television",
        eyebrow: "Film/Television",
        intro: "电影影视科系涵盖电影艺术、影像特效与媒体制作等方向，以影像叙事为核心，培养创作与技术兼备的影视人才。",
        note: "电影艺术是当代艺术表现中重要的媒介与表达手段，电影影视科系以视听语言为核心，全面对接影视工业与数字内容创作需求。",
        majors: [
            {
                en: "Film Art",
                cn: "电影艺术",
                image: "./image/systems/film-art.jpg",
                desc: "电影艺术是当代艺术重要的媒介与表达手段。它以视听语言为核心，融合编剧、导演、摄影、剪辑等多个专业环节。电影艺术旨在通过影像叙事传达思想与情感。"
            },
            {
                en: "Film and Visual Effects",
                cn: "影像特效",
                image: "./image/systems/visual-effect.jpg",
                desc: "影像特效是一门专注于影视后期制作的学科。它涉及特效合成、数字绘景、三维动画、调色等技术环节。影像特效旨在为影视作品创造震撼的视觉效果。"
            },
            {
                en: "Media Production",
                cn: "媒体制作",
                image: "./image/systems/media-production.jpg",
                desc: "媒体制作是一门涵盖影视内容策划、拍摄与制作全流程的学科。它涉及前期策划、现场摄制、后期剪辑与发行传播等环节。媒体制作旨在培养具备综合能力的影像创作人才。"
            }
        ],
        cases: caseList("film-case", [
            "Group 47.png",
            "Group 48.png",
            "Group 49.png",
            "Group 50.png",
            "Group 51.png",
            "Group 52.png",
            "Group 53.png",
            "Group 54.png"
        ])
    }
};

Vue.createApp({
    components: {CaseImage: StudentUI.CaseImage},
    data() {
        const params = new URLSearchParams(window.location.search);
        const key = params.get("system");
        const system = SYSTEMS[key] || SYSTEMS.fashion;
        const requestedMajor = params.get("workMajor");

        return {
            system,
            systemKey: SYSTEMS[key] ? key : "fashion",
            dialogVisible: false,
            consultTopic: "课程咨询",
            qrPreview: "",
            qrLabel: "",
            consultMenuVisible: false,
            consultOptions: ["在线客服", "电话咨询", "预约1V1规划", "领取备考资料"],
            activeMajor: 0,
            activeWorkTab: requestedMajor ? StudentCases.departmentMajors(SYSTEMS[key] ? key : "fashion").indexOf(requestedMajor) : -1
        };
    },
    computed: {
        currentMajor() {
            return this.system.majors[this.activeMajor];
        },
        mentors() {
            return this.system.mentors || [];
        },
        workMajors() {
            return StudentCases.departmentMajors(this.systemKey);
        },
        cases() {
            const major = this.activeWorkTab >= 0 ? this.workMajors[this.activeWorkTab] : "";
            const linked = StudentCases.departmentWorks(this.systemKey, major);
            const demo = DEMO_WORK_ADMISSIONS[this.systemKey];
            const legacy = this.activeWorkTab === -1 ? (this.system.cases || []).map((image, index) => ({
                id: this.systemKey + "-legacy-" + index, image,
                studentName: demo.name,
                admissions: StudentCases.admissionOffers(demo.offers.slice(0, this.systemKey === "fashion" && index === 1 ? demo.offers.length : [1, 2, 4][index % 3])),
                isDemo: true
            })) : [];
            if (this.systemKey === "fashion" && this.activeWorkTab === -1) {
                return legacy.slice(0, 3).concat(linked, legacy.slice(3));
            }
            return linked.concat(legacy);
        }
    },
    methods: {
        selectMajor(index) {
            this.activeMajor = index;
        },
        selectWorkTab(index) {
            if (index < -1 || index >= this.workMajors.length) return;
            if (this.workSwiper) { this.workSwiper.destroy(true, true); this.workSwiper = null; }
            this.activeWorkTab = index;
            const url = new URL(window.location.href);
            if (index >= 0) url.searchParams.set("workMajor", this.workMajors[index]);
            else url.searchParams.delete("workMajor");
            url.searchParams.delete("work");
            window.history.replaceState(null, "", url);
            this.$nextTick(() => { if (this.cases.length) this.initWorkSwiper(); });
        },
        workSchools(item) {
            return [...new Set(this.workAdmissions(item).map(offer => offer.school))];
        },
        workAdmissions(item) {
            return StudentCases.admissionOffers(item.admissions || (item.offer ? [item.offer] : (item.schools || []).map(school => ({school}))));
        },
        workClick(event, item) {
            if (!item.studentId) {
                event.preventDefault();
                this.openConsult(this.system.name + "作品集辅导");
            }
        },
        workHref(item) {
            return StudentCases.href(item.studentId, "system", {system: this.systemKey, major: this.activeWorkTab >= 0 ? this.workMajors[this.activeWorkTab] : "", work: item.id}) + "#" + item.id;
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
        initMentorSwiper() {
            new Swiper(".mentor-swiper", {
                slidesPerView: 4,
                slidesPerGroup: 4,
                spaceBetween: 14,
                speed: 600,
                watchOverflow: true,
                navigation: {
                    prevEl: ".mentor-button-prev",
                    nextEl: ".mentor-button-next"
                },
                pagination: {
                    el: ".mentor-pagination",
                    clickable: true
                },
                breakpoints: {
                    0: { slidesPerView: 1, slidesPerGroup: 1 },
                    640: { slidesPerView: 2, slidesPerGroup: 2 },
                    900: { slidesPerView: 3, slidesPerGroup: 3 },
                    1200: { slidesPerView: 4, slidesPerGroup: 4 }
                }
            });
        },
        initWorkSwiper() {
            const workId = new URLSearchParams(window.location.search).get("work");
            const initialSlide = Math.max(0, this.cases.findIndex(item => item.id === workId));
            this.workSwiper = new Swiper(".work-swiper", {
                initialSlide,
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 0,
                speed: 600,
                loop: this.cases.length > 1,
                autoHeight: true,
                navigation: {
                    prevEl: ".work-arrow.prev",
                    nextEl: ".work-arrow.next"
                },
                pagination: {
                    el: ".work-pagination",
                    clickable: true
                }
            });
        }
    },
    mounted() {
        this.appEl = document.getElementById("app");
        this.onDocClick = this.handleDocumentClick.bind(this);
        if (this.mentors.length > 4) {
            this.initMentorSwiper();
        }
        if (this.cases.length) {
            this.initWorkSwiper();
        }
        document.addEventListener("click", this.onDocClick);
    },
    beforeUnmount() {
        if (this.workSwiper) this.workSwiper.destroy(true, true);
        document.removeEventListener("click", this.onDocClick);
    },
    created() {
        document.title = this.system.name + "｜所样艺术教育";
    }
}).mount("#app");
