const PAGE_SIZE = 6;
/* FAQ 交互：每页展示条数（搜索时不分页，展示全部命中） */
const FAQ_PAGE_SIZE = 6;
const CONTENT = {
    categories: [
        { id: "portfolio", name: "艺术留学作品集" },
        { id: "alevel", name: "国际课程 A-Level / BTEC / AP" },
        { id: "abroad", name: "留学申请" },
        { id: "sodo", name: "SO DO 低龄艺术课程" },
        { id: "recommend", name: "研究生推免计划" },
        { id: "soalive", name: "所样 so alive" }
    ],
    articles: [
        { id: 1, category: "portfolio", title: "一份能申到名校的作品集长什么样？从选题到成册的完整拆解", summary: "以成功录取案例为样本，讲解作品集如何体现个人视角、调研深度与项目完成度，以及招生官在评审时真正关注什么。", date: "2026-10-18", author: "作品集教研组", read: 4680, status: "published", cover: "portfolio" },
        { id: 2, category: "portfolio", title: "视觉传达作品集怎么排？从项目逻辑到版面呈现的 6 个常见失分点", summary: "以视觉传达申请案例为样本，拆解项目动机、调研过程、成果呈现的常见问题与修改方向。", date: "2026-10-06", author: "作品集教研组", read: 4120, status: "published", cover: "portfolio" },
        { id: 3, category: "portfolio", title: "艺术留学就业形势观察：设计类专业毕业生的真实去向", summary: "结合近三年毕业生去向数据，梳理各设计方向的就业市场变化、岗位需求与作品集准备中的应对策略。", date: "2026-09-15", author: "作品集教研组", read: 2860, status: "published", cover: "portfolio" },
        { id: 4, category: "portfolio", title: "学员与家长访谈：从零基础到拿到 RISD 录取的十四个月", summary: "记录一位零基础学员从评估定位、项目产出到面试全过程的真实经历，以及家长在陪伴中的观察与心态变化。", date: "2026-08-22", author: "品牌内容组", read: 3240, status: "published", cover: "portfolio" },
        { id: 5, category: "portfolio", title: "电影与动画方向作品集准备：影像叙事与个人风格如何平衡", summary: "围绕短片与动画两类申请材料，讲解选题、脚本、风格统一与成片呈现的关键环节。", date: "2026-08-19", author: "作品集教研组", read: 2874, status: "published", cover: "portfolio" },
        { id: 6, category: "portfolio", title: "作品集面试怎么准备：外审老师高频提问与应答思路", summary: "整理线上面试中关于项目分工、灵感来源与个人风格的常见提问及应答结构。", date: "2026-07-30", author: "作品集教研组", read: 2015, status: "published", cover: "portfolio" },
        { id: 7, category: "alevel", title: "A-Level 艺术选课指南：科目组合与作品集如何配合", summary: "对比常见选课组合与院校录取偏好，说明课程作业、个人创作与申请作品集之间的衔接方式。", date: "2026-10-08", author: "国际课程组", read: 3120, status: "published", cover: "alevel" },
        { id: 8, category: "alevel", title: "BTEC、A-Level、AP 三类艺术课程对比：考核形式与升学路径", summary: "从考核形式、学分认定与学习节奏三个维度对比三类国际课程，并给出不同基础学生的选择建议。", date: "2026-09-05", author: "国际课程组", read: 2280, status: "published", cover: "alevel" },
        { id: 9, category: "alevel", title: "国际课程大考趋势解读：艺术科目的评分变化与备考重点", summary: "梳理近两年艺术科目大考的评分标准变化，说明考纲侧重与平时作业积累的关系。", date: "2026-08-12", author: "国际课程组", read: 1735, status: "published", cover: "alevel" },
        { id: 10, category: "abroad", title: "2027 英国申请季时间轴：UCAS 节点、语言要求与文书变化", summary: "英国院校陆续开放 2027 申请通道，本文梳理 UCAS 关键节点、个人陈述调整方向与语言成绩有效期要求，附可执行的时间表。", date: "2026-10-18", author: "留学规划部", read: 3286, status: "published", cover: "abroad" },
        { id: 11, category: "abroad", title: "美国艺术院校 2027 秋季申请开放：新增专业与作品集要求变化", summary: "多所美国艺术院校更新申请通道，涵盖新增数字媒体方向、作品集页数上限与推荐信要求调整，供提前规划参考。", date: "2026-10-12", author: "院校研究组", read: 2140, status: "published", cover: "abroad" },
        { id: 12, category: "abroad", title: "建筑 / 空间 / 景观三大方向怎么选？课程与职业路径对照", summary: "从课程设置、申请要求、作品集侧重与毕业去向四个维度，对比三个相关但差异明显的专业方向。", date: "2026-09-28", author: "留学规划部", read: 3015, status: "published", cover: "abroad" },
        { id: 13, category: "abroad", title: "雅思 6.5 与托福 90 怎么选？两套成绩在英美申请中的适用差异", summary: "结合院校成绩要求，梳理两类语言成绩对应的申请范围、备考周期与送分时间安排建议。", date: "2026-09-20", author: "语言教研组", read: 1762, status: "published", cover: "abroad" },
        { id: 14, category: "abroad", title: "纯艺与商业插画：就业视角下的两条路径与能力差异", summary: "从画廊、独立接单与品牌岗位两类出口切入，分析两条路径所需的能力组合与作品集取向。", date: "2026-08-08", author: "留学规划部", read: 1240, status: "offline", cover: "abroad" },
        { id: 15, category: "sodo", title: "孩子为什么要从小接触艺术？低龄艺术启蒙的三个关键期", summary: "结合儿童创造力发展阶段，说明不同年龄段艺术学习的目标差异，以及家长常见的认知误区。", date: "2026-10-15", author: "SO DO 教研组", read: 1980, status: "published", cover: "sodo" },
        { id: 16, category: "sodo", title: "低龄艺术课程怎么规划？写给家长的一份长期路线图", summary: "从兴趣启蒙、基础训练到作品意识培养，拆解 6–14 岁孩子艺术学习的阶段目标与课程搭配建议。", date: "2026-09-22", author: "SO DO 教研组", read: 1540, status: "published", cover: "sodo" },
        { id: 17, category: "sodo", title: "家长访谈：孩子学了一年艺术课，变化最大的不是画画本身", summary: "一位妈妈的观察记录：课程带给孩子的表达自信、观察习惯与专注力变化，以及选课过程中的考量。", date: "2026-08-30", author: "品牌内容组", read: 1320, status: "published", cover: "sodo" },
        { id: 18, category: "recommend", title: "保研夏令营怎么投？时间线、材料清单与导师联系要点", summary: "梳理夏令营报名窗口、成绩单与作品材料准备、导师邮件沟通的常见方式，并给出投递优先级建议。", date: "2026-10-08", author: "研究生推免组", read: 2560, status: "published", cover: "recommend" },
        { id: 19, category: "recommend", title: "预推免面试复盘：高频提问与应答结构", summary: "结合线上面试实录，整理科研经历、专业认知与读研规划三类问题的常见提问方式与应答思路。", date: "2026-09-26", author: "研究生推免组", read: 1742, status: "published", cover: "recommend" },
        { id: 20, category: "soalive", title: "所样 so alive｜十月校区开放日回顾：工作室、评图现场与学员月展", summary: "真实记录开放日当天的评图讨论、学员作品展与导师分享环节，带你提前感受校区的日常氛围。", date: "2026-10-20", author: "品牌内容组", read: 980, status: "published", cover: "soalive", video: true },
        { id: 21, category: "soalive", title: "所样 so alive｜校内日常图鉴：导师手记、下午茶与角落里的灵感墙", summary: "捕捉校区里鲜活的一周：导师们的创作手记、学员间的互评日常，以及员工活动里的轻松时刻。", date: "2026-10-02", author: "品牌内容组", read: 860, status: "published", cover: "soalive" },
        { id: 22, category: "soalive", title: "所样 so alive｜学员活动复盘：跨科系联创工作坊的 48 小时", summary: "时尚、视觉与建筑科系学员混组创作，从概念碰撞到联合产出，记录这场跨科系协作的全过程。", date: "2026-09-10", author: "品牌内容组", read: 1120, status: "published", cover: "soalive" }
    ],
    faqs: [
        { q: "零基础 / 跨专业申请艺术留学，需要做哪些准备？", a: "跨专业申请需要重点补齐三部分：一是与目标专业相关的基础能力与作品认知，建议系统学习 1–2 门专业基础课程；二是可展示的创作过程材料，作品集更看重过程与思考，而不仅是成品；三是语言与标化成绩，可安排在与作品集准备并行的阶段。首次咨询时会结合具体背景做一次定位评估，再给出阶段性的准备节奏。" },
        { q: "作品集应该什么时候开始准备？需要多少个项目？", a: "通常建议在申请季前 9–12 个月启动，用前 3–4 个月完成方向调研与选题，中期集中产出 2–3 个完整项目并反复修改，末期整理版面与面试材料。项目数量没有统一标准，招生官更关注深度与连贯性，通常 2–4 个有完整过程与成果的项目优于数量多但单薄的项目。" },
        { q: "留学申请和国内保研可以同时准备吗？", a: "可以，两条路径的材料有较大重叠：作品集、成绩单与获奖经历都能复用，差异主要在文书侧重点与时间窗口。建议先明确主次路径，把精力集中在作品集这一共同项上，再按各自节点分别准备申请材料。具体节奏可在定位评估后结合个人情况排定。" },
        { q: "A-Level / BTEC 艺术课程适合什么阶段的学生？和作品集课程怎么配合？", a: "两类课程主要面向准备申请英国本科及国际课程体系内的学生，可作为申请前的学术与创作基础。课程侧重考纲要求、作业与评分标准，作品集课程侧重申请方向的选题与呈现，两者并行时可统一在同一个规划方案内，按周安排学习与创作任务。" },
        { q: "可以同时申请多所院校吗？会不会影响录取取舍？", a: "可以，也是常规做法。建议在选校时按冲刺、匹配、稳妥三档配置，并保持作品集主线一致，仅在部分项目上做针对性调整。录取后通常会有较短的确认期限，届时综合比较院校、专业方向、课程设置与费用即可，多申请不会影响最终选择。" },
        { q: "所样的服务流程包含哪些环节？", a: "整体流程为：免费咨询 → 背景测评与定位 → 定制专属方案 → 课程授课与文书打磨 → 院校申请递交 → 面试辅导 → 签证与入学衔接。保研与国际课程路径会在方案阶段单独设置材料准备与投递节点，每个环节由对应团队负责，方案中会明确阶段目标、时间节点与交付物。" },
        { q: "作品集一般要做多少页？对版式有什么要求？", a: "页数没有统一标准，本科作品集通常 15–25 页、研究生 20–35 页，重点是与申请院校的规格逐一对齐：多数院校对页数、单页尺寸与文件大小有明确上限，排版前先核对官网要求。版式上更看重信息层级与阅读节奏，过程草稿、调研笔记与最终成品按项目逻辑编排即可。" },
        { q: "语言成绩最晚什么时候提交？没达标还能申请吗？", a: "英国大部分院校可在递交后补交语言成绩，美国部分院校要求申请时同步提交，具体以各校官网当年要求为准。语言暂未达标的同学可关注院校的语言班或双录取政策，作品集准备与语言备考并行推进，是最稳妥的时间安排。" },
        { q: "英国和美国院校的申请，作品集侧重点有什么不同？", a: "英国院校整体更看重调研深度、实验过程与概念推演，过程稿与材料实验建议完整保留；美国院校在概念之外同样关注成品完成度、技法表现与对社会议题的回应。同一套作品集投递两个国家时，建议在项目顺序与陈述重点上做针对性调整，而不是简单共用一版。" },
        { q: "平时成绩一般，会影响艺术留学的录取吗？", a: "影响有限。艺术类录取中作品集权重最高，成绩单主要用于满足基本的入学门槛。均分偏低的背景，可通过专业课成绩、获奖经历与作品集质量对冲，选校时按冲刺、匹配、稳妥分档，避免全部押在高门槛院校。" },
        { q: "课程是线上还是线下？可以自己选老师吗？", a: "线下课程以校区面授为主，线上课程覆盖全部科系，授课流程与线下一致。正式开课前会有导师试讲与匹配环节，结合专业方向、风格偏好与时间安排确定带课导师，开课后如需调整也可以和教务沟通。" },
        { q: "从签约到递交申请，整个周期大概多久？", a: "常规规划为 9–12 个月：前 3–4 个月完成方向调研与项目启动，中期集中产出与打磨作品集，末期同步推进文书、网申与材料递交。临近申请季才启动的同学，方案会按可用时间压缩节奏，优先保证核心项目的完成度。" },
        { q: "费用怎么计算？可以分期支付吗？", a: "费用按所报方案的服务内容核定，不同科系与目标院校的组合价格不同，签约前会给出完整的费用明细。支持分期支付，具体节奏在签约时与服务条款一并确认，无额外隐藏收费。" },
        { q: "如果首轮申请结果不理想，有补救方案吗？", a: "有。方案内通常包含多轮院校投递，首轮结果不理想时，导师会重新评估作品集与选校梯度，调整后进行补申；部分同学也会选择延迟一年、以更完整的作品集冲击更高目标，具体路径在方案阶段即可预留。" },
        { q: "面试辅导包含哪些内容？", a: "面试辅导覆盖常见问题梳理、作品集陈述逻辑、模拟面试与临场表达训练。导师会结合目标院校的面试形式（一对一、小组或作品陈述）做针对性演练，并整理历届真题与回答框架，英文面试可同步强化专业术语表达。" },
        { q: "文书由谁来写？学生可以参与吗？", a: "文书由申请导师与学生共同完成：导师负责结构、逻辑与院校匹配度，学生的真实经历和思考是素材主体。全部文书定稿前会与学生逐稿确认，不使用模板化表达，确保内容真实且经得起面试追问。" },
        { q: "导师都来自哪些院校？怎么保证教学质量？", a: "导师主要来自英美主流艺术院校（如 RCA、UAL、Parsons、SVA 等）及国内顶尖院校的对应专业，均经过教学考核与试讲评估后上岗。每个项目配备主带导师与申请督导，关键节点还有教研组评图，教学质量由多重环节把关。" },
        { q: "可以查看往届的录取案例吗？", a: "可以。咨询时可按目标国家、专业方向查看对应的录取案例，包含录取院校、作品集方向与准备周期等关键信息。部分学员案例已整理成公众号推文，也可以在「部分录取成果展示」页面直接浏览。" },
        { q: "研究生和本科申请，流程上有什么区别？", a: "本科申请更看重基础能力与发展潜力，通常需要同时准备标化成绩与作品集，部分院校要求提交 sketchbook；研究生申请则聚焦研究方向的深度与专业积累，文书里的研究陈述（Study Proposal）权重更高。两类申请的时间节点与材料清单不同，方案会按申请阶段单独拆解。" },
        { q: "零基础学生的 sketchbook 应该怎么起步？", a: "sketchbook 的核心是记录「看到 — 思考 — 尝试」的过程：可以从每日速写、材料拼贴、看展笔记等轻量练习开始，不必追求单页精致。坚持记录 2–3 个月后，自然能形成个人的观察线索，这也是后续作品集选题的重要来源。" },
        { q: "什么时间开始咨询和测评比较合适？", a: "建议比目标申请季提前 12 个月以上。越早测评，越有时间按定位结果补齐能力短板、预留语言与标化空间；即使暂时不确定申请国家与专业，也可以先做一次背景评估，明确大致方向后再细化计划。测评与首次咨询均免费。" }
    ]
};

/* 关键词：按分类维护，接入 CMS 后可由文章的关键词字段替换 */
const KEYWORDS = {
    portfolio: ["作品集", "艺术留学", "名校申请"],
    alevel: ["A-Level", "BTEC", "AP", "国际课程"],
    abroad: ["留学申请", "选校定位", "申请时间轴"],
    sodo: ["低龄艺术", "艺术启蒙", "少儿美育"],
    recommend: ["保研", "推免", "研究生"],
    soalive: ["校区日常", "学员活动", "所样生活"]
};

/* 封面占位主题：正式素材到位后，把 cover 字段换成真实图片地址即可 */
const COVER_THEME = {
    portfolio: ["#3f3a8f", "#7667f8", "PORTFOLIO"],
    alevel: ["#0f5268", "#3f8fa8", "A-LEVEL"],
    abroad: ["#7667f8", "#9488ff", "APPLICATION"],
    sodo: ["#b45c07", "#d97706", "SO DO"],
    recommend: ["#5949df", "#7667f8", "RECOMMEND"],
    soalive: ["#18785d", "#3fa37e", "SO ALIVE"]
};

/* 正文小节池：按分类提供通用段落。接入 CMS 后由接口返回的正文富文本替换 */
const BODY_SECTIONS = {
    portfolio: [
        ["为什么作品集是艺术留学的核心材料？", "海外艺术院校的评审逻辑里，作品集承载的不只是技法，更是选题视角、调研过程与项目完成度的综合呈现。成绩与语言达标只是入场券，作品集才是决定录取层级的关键变量。"],
        ["名校导师如何看待一本作品集？", "评审老师通常先看整体叙事是否连贯，再逐个项目判断思考深度：为什么选这个题、调研是否落在作品里、成品有没有推进到完整表达。过程中的草稿与迭代，比单张精致的效果图更有说服力。"],
        ["从选题到成册，节奏怎么安排？", "建议按「方向调研 — 项目产出 — 版面整理 — 面试材料」四个阶段推进，前段允许试错，中期集中打磨 2–3 个完整项目，末期严格控制排版与呈现一致性，避免临近截止才返工。"]
    ],
    alevel: [
        ["国际课程与申请是什么关系？", "A-Level / BTEC / AP 既是学术成绩的组成部分，也是作品集素材的重要来源。课程作业与个人创作并行推进，能让申请材料形成完整闭环，减少重复劳动。"],
        ["选课组合怎么定？", "结合目标院校的录取偏好与自身基础选择科目组合，比单纯追热门组合更重要。选课前建议先做一次升学定位评估，明确专业方向后再反推课程安排。"],
        ["大考与平时作业如何平衡？", "艺术科目的考核与平时积累高度相关，把每次作业当作申请素材来经营，考试季的负担会明显减轻，作品集的厚度也会同步增长。"]
    ],
    abroad: [
        ["申请季的时间轴怎么排？", "以入学年份倒推：语言首考安排在申请季前 6–9 个月，作品集定稿留出至少一个完整修订周期，文书与网申材料在开放通道后第一时间递交，避免卡在截止日前集中出错。"],
        ["选校清单如何配置？", "按冲刺、匹配、稳妥三档搭建选校结构，各档之间保持专业主线一致。参考排名之外，更要核对课程设置、师资方向与费用，确认与自身规划匹配。"],
        ["政策变化需要关注什么？", "签证政策、语言成绩有效期、作品集提交形式都可能随申请季调整。递交前逐一核对院校最新要求，以院校官网信息为准，避免沿用往届经验。"]
    ],
    sodo: [
        ["孩子为什么要从小接触艺术？", "低龄阶段的美术学习重点不在技法，而在观察习惯、表达自信与创造力的培养。不同年龄段的目标差异很大，选课首先要看课程目标与孩子的发展阶段是否匹配。"],
        ["课程规划的长线思路是什么？", "从兴趣启蒙到基础训练再到作品意识，是一条循序渐进的路线。家长在选课时关注课程的阶段目标与输出物，比关注单节课内容更有参考价值。"],
        ["家长最容易踩的认知误区？", "以「画得像」衡量学习效果、频繁更换课程方向、把兴趣班当成短期任务，都是常见误区。艺术学习需要稳定的节奏与正向反馈，长期主义才有可见的成果。"]
    ],
    recommend: [
        ["推免资格与时间线怎么把握？", "夏令营、预推免与正式推免三个批次各有窗口，成绩排名与外语成绩决定入场资格。建议大三上学期即开始整理成绩单与作品材料，预留充足的投递与沟通周期。"],
        ["作品材料在推免中起什么作用？", "设计与艺术方向的推免考核普遍要求提交作品集或创作材料，评审关注的是专业能力与研究方向匹配度，结构和过程呈现比数量更重要。"],
        ["导师沟通有哪些注意事项？", "联系导师的邮件应包含明确的学业背景、研究兴趣与附件材料说明，沟通节奏保持礼貌而克制。多导师并行沟通需谨慎处理，避免诚信层面的风险。"]
    ],
    soalive: [
        ["校区里的日常是什么样的？", "评图讨论、学员月展、导师手记与下午茶，构成了所样校区的日常。我们相信真实的学习氛围比宣传册更有说服力，所以定期把这些瞬间记录下来。"],
        ["学员活动如何反哺创作？", "跨科系联创工作坊、公开评图与院校分享会，让不同方向的学员互相看见彼此的思考方式。很多项目的选题灵感，就来自这些课堂之外的碰撞。"]
    ]
};

const DISCLAIMER = "本网站部分内容来源于互联网，如涉及版权问题，请权利人提供有效证明材料通知本网站，本网站将在核实后及时删除相关内容。";

/* 各分类文章详情页展示的关联 FAQ（按分类取对应问题） */
const RELATED_FAQS = {
    portfolio: [
        { q: "申请本科作品集一般需要准备几个项目？", a: "英美本科申请通常准备 3–5 个项目即可覆盖院校要求：2–3 个深度项目展示调研与推进能力，1–2 个快速项目体现表达广度。具体页数与项目构成建议结合目标院校清单逐校核对。" },
        { q: "零基础准备作品集大概需要多久？", a: "零基础学生通常需要 12–18 个月：先完成基础技能与审美训练，再进入项目创作与排版成册。时间会因每周可投入的课时长短与目标院校层次有所浮动。" },
        { q: "学校课程作业可以直接放进作品集吗？", a: "部分高质量作业经重新梳理后可以用作素材，但直接照搬通常缺乏个人视角与完整叙事。建议由导师评估后决定保留、改造还是重做，避免作品集与课程作业高度雷同影响评审。" }
    ],
    alevel: [
        { q: "A-Level 艺术方向一般选几门课？", a: "多数学生选择 3 门：艺术与设计为主科，搭配一门文科与一门理科或商科形成组合。目标纯艺、设计、建筑等不同方向的搭配差异较大，建议先确认专业方向再定选课。" },
        { q: "BTEC 和 A-Level 应该怎么选？", a: "BTEC 以连续评估、全课程作业为主，适合擅长过程性产出、不擅长大考的学生；A-Level 保留考试与作业结合，适配面更广。偏设计实践的学生选 BTEC 更顺，想保留更多院校选择可优先 A-Level。" },
        { q: "国际课程的作业能直接用进申请作品集吗？", a: "课程作业与作品集的评价标准不同：前者看课程达成度，后者看个人视角与完整叙事。建议把作业中的核心项目拿出来重构选题与呈现，与导师一起评估哪些可以升级、哪些需要重新立项。" }
    ],
    abroad: [
        { q: "英国和美国可以用同一套作品集申请吗？", a: "基础项目可以共用，但两边侧重不同：英国看重调研过程与实验性，美国更看重成果完成度与个人表达。建议在共用项目基础上，按目标院校要求调整版面、页数与陈述重点。" },
        { q: "语言成绩最晚什么时候提交？", a: "英国多数院校可在拿到条件 offer 后补交语言；美国多数院校要求申请时随材料一并提交。建议在申请季开始前 3–6 个月完成首考，为刷分留出空间。" },
        { q: "什么时候开始做留学规划比较合适？", a: "申请前 1.5–2 年启动最稳妥：预留作品集创作、语言备考与背景提升的完整周期。临申请季才启动的学生，通常需要在项目数量与院校范围上做取舍。" }
    ],
    sodo: [
        { q: "孩子几岁开始系统学艺术比较合适？", a: "4–6 岁以兴趣启蒙和感官表达为主，7–9 岁进入基础造型与色彩训练，10 岁以上可逐步建立作品意识。比年龄更重要的是阶段匹配，不建议过早进入技法化训练。" },
        { q: "低龄阶段要不要参加美术考级？", a: "考级可以作为阶段性目标的参考，但不应成为主要方向。低龄艺术学习更看重观察习惯、表达自信与创造力积累，考级训练占比过高容易压缩自由表达的空间。" },
        { q: "家长不懂艺术，怎么配合孩子的学习？", a: "家长的重点不在指导技法，而在陪伴与反馈：定期听孩子讲作品、保留作品记录、和老师保持沟通即可。课堂上的专业判断交给教研老师，家长负责观察变化与情绪支持。" }
    ],
    recommend: [
        { q: "保研作品集和留学作品集有什么区别？", a: "保研作品集更看重专业基础、科研关联与导师方向匹配，篇幅与形式相对收敛；留学作品集强调个人视角与完整叙事。两者可共用素材库，但排版与陈述逻辑需要分开准备。" },
        { q: "夏令营和预推免可以同时投吗？", a: "可以，且建议同时准备。夏令营在 6–7 月集中报名，预推免在 9 月前后，两者材料高度重合。夏令营拿到优秀营员后预推免压力会小很多，投递时按优先级排好院校梯度。" },
        { q: "联系导师的邮件应该怎么写？", a: "一封有效的关系邮件包含三部分：简要自我介绍与排名、与导师研究方向的结合点、附件作品集或成果清单。控制在 300 字内，标题注明「学校-姓名-申请方向」，避免群发模板痕迹。" }
    ],
    soalive: [
        { q: "校区开放日怎么预约？", a: "关注所样公众号的活动推文即可报名，或通过页面浮标联系顾问登记。开放日包含工作室参观、评图现场与导师分享环节，名额有限建议提前预约。" },
        { q: "跨科系工作坊面向谁开放？", a: "主要面向在读学员，部分主题工作坊开放少量校外名额。工作坊按科系混组进行，具体排期以当月活动预告为准。" },
        { q: "学员月展多久举办一次？", a: "月展每月一次，展示当月各科系学员的项目阶段成果。家长与意向学员可预约到校观展，直观了解课程产出与教学节奏。" }
    ]
};



  Vue.createApp({
    data() {
        const state = SiteCommon.data();
        state.gzhVisible = false;
        state.categories = CONTENT.categories;
        state.articles = CONTENT.articles;
        state.faqs = CONTENT.faqs;
        state.faqQuery = "";
        state.faqKeyword = "";
        state.faqPage = 1;
        state.activeCat = "all";
        state.page = 1;
        state.openId = null;
        return state;
    },
    computed: {
        navList() {
            return SiteCommon.navList;
        },
        published() {
            return this.articles.filter(function (a) { return a.status === "published"; });
        },
        filtered() {
            const self = this;
            return this.published.filter(function (a) {
                return self.activeCat === "all" || a.category === self.activeCat;
            });
        },
        totalPages() {
            return Math.max(1, Math.ceil(this.filtered.length / PAGE_SIZE));
        },
        tabs() {
            const self = this;
            const list = [{ id: "all", name: "全部", count: this.published.length }];
            this.categories.forEach(function (c) {
                list.push({
                    id: c.id,
                    name: c.name,
                    count: self.published.filter(function (a) { return a.category === c.id; }).length
                });
            });
            return list;
        },
        pagedArticles() {
            const size = PAGE_SIZE;
            const start = (Math.min(this.page, this.totalPages) - 1) * size;
            return this.filtered.slice(start, start + size);
        },
        pagerPages() {
            const total = this.totalPages;
            const current = Math.min(this.page, total);
            if (total <= 7) {
                return Array.from({ length: total }, function (_, i) { return i + 1; });
            }
            const pages = [1];
            if (current > 3) pages.push("…");
            for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i);
            if (current < total - 2) pages.push("…");
            pages.push(total);
            return pages;
        },
        hotArticles() {
            return this.published.slice().sort(function (a, b) { return b.read - a.read; }).slice(0, 10);
        },
        /* ---------- 所样 FAQ：模糊搜索（点击搜索/回车生效） + 分页展示 ---------- */
        faqKeywords() {
            return this.faqKeyword.trim().toLowerCase().split(/\s+/).filter(Boolean);
        },
        faqSearching() {
            return this.faqKeywords.length > 0;
        },
        matchedFaqs() {
            const keywords = this.faqKeywords;
            if (!keywords.length) return this.faqs;
            /* 模糊匹配：多个关键词空格分隔时取交集，命中问题或答案即算匹配 */
            return this.faqs.filter(function (f) {
                const text = (f.q + " " + f.a).toLowerCase();
                return keywords.every(function (k) { return text.indexOf(k) !== -1; });
            });
        },
        visibleFaqs() {
            if (this.faqSearching) return this.matchedFaqs;
            const size = FAQ_PAGE_SIZE;
            const page = Math.min(this.faqPage, this.faqTotalPages);
            return this.matchedFaqs.slice((page - 1) * size, page * size);
        },
        faqTotalPages() {
            return Math.max(1, Math.ceil(this.faqs.length / FAQ_PAGE_SIZE));
        },
        faqPagerPages() {
            const total = this.faqTotalPages;
            const current = Math.min(this.faqPage, total);
            if (total <= 7) {
                return Array.from({ length: total }, function (_, i) { return i + 1; });
            }
            const pages = [1];
            if (current > 3) pages.push("…");
            for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i);
            if (current < total - 2) pages.push("…");
            pages.push(total);
            return pages;
        },
        activeArticle() {
            if (!this.openId) return null;
            const id = Number(this.openId);
            return this.articles.filter(function (a) { return a.id === id; })[0] || null;
        },
        detailHtml() {
            const a = this.activeArticle;
            if (!a) return "";
            const tags = KEYWORDS[a.category] || [];
            const sections = BODY_SECTIONS[a.category] || BODY_SECTIONS.abroad;
            const body = [
                "<p>" + a.summary + "</p>",
                "<p>以下内容结合所样导师团队的实际教学与申请经验整理，供准备相关方向的学生与家长参考。每个学生的背景与目标不同，具体规划节奏建议在定位评估后确认。</p>"
            ].concat(sections.map(function (s) { return "<h3>" + s[0] + "</h3><p>" + s[1] + "</p>"; }))
              .concat(["<p>如果对文中的内容有进一步的疑问，或想结合自身情况做一次定位评估，欢迎预约 1 对 1 免费咨询，所样的规划顾问会结合你的背景给出针对性建议。</p>"]).join("");

            const video = a.video
                ? '<div class="detail-video"><span class="play"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span><p>资讯视频（占位，接入后台后展示正式视频）</p></div>'
                : "";

            const faqItems = RELATED_FAQS[a.category] || RELATED_FAQS.abroad;
            const faqHtml = '<div class="detail-faq">'
                + '<div class="block-head detail-faq-head"><h3><span>RELATED FAQ</span>常见问题</h3>'
                + '<a class="more" href="#consult" data-faq-consult="1">没找到答案？在线咨询</a></div>'
                + '<div class="faq-list">'
                + faqItems.map(function (f, i) {
                    return '<div class="faq-item' + (i === 0 ? ' is-open' : '') + '">'
                        + '<button class="faq-q" type="button"><strong>' + f.q + '</strong><span class="faq-toggle" aria-hidden="true"></span></button>'
                        + '<div class="faq-a"><p>' + f.a + '</p></div>'
                        + '</div>';
                }).join("")
                + '</div></div>';

            return '<div class="detail-crumbs">当前位置：'
                + '<a href="javascript:void(0)" id="crumb-back" title="返回资讯列表">最新资讯</a>'
                + ' / <span class="crumb-current">' + this.catName(a.category) + '</span></div>'
                + '<h1 class="detail-title">' + a.title + '</h1>'
                + '<div class="detail-meta"><span>发布日期：' + a.date + '</span><span>来源：' + a.author + '</span><span>' + a.read + ' 阅读</span></div>'
                + '<div class="detail-tags"><span class="tag-label">标签分类：</span><span class="chip cat">' + this.catName(a.category) + '</span>'
                + '<span class="tag-label">关键词：</span>'
                + tags.map(function (k) { return '<span class="chip kw">' + k + '</span>'; }).join("")
                + '</div>'
                + '<div class="detail-cover"><img src="' + this.coverDataUri(a.cover) + '" alt="' + a.title + '"></div>'
                + '<p class="detail-lead">摘要：' + a.summary + '</p>'
                + '<div class="detail-body">' + body + '</div>'
                + video
                + '<div class="disclaimer"><strong>免责声明：</strong>' + DISCLAIMER + '</div>'
                + faqHtml;
        }
    },
    methods: Object.assign({}, SiteCommon.methods, {
        openGzh() {
            this.gzhVisible = true;
        },
        catName(id) {
            const found = this.categories.filter(function (c) { return c.id === id; })[0];
            return found ? found.name : "";
        },
        coverDataUri(key) {
            const t = COVER_THEME[key] || COVER_THEME.portfolio;
            const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">'
                + '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">'
                + '<stop offset="0" stop-color="' + t[0] + '"/><stop offset="1" stop-color="' + t[1] + '"/></linearGradient></defs>'
                + '<rect width="800" height="500" fill="url(#g)"/>'
                + '<circle cx="640" cy="120" r="150" fill="#ffffff" opacity="0.08"/>'
                + '<circle cx="140" cy="420" r="110" fill="#ffffff" opacity="0.07"/>'
                + '<rect x="60" y="210" width="230" height="10" rx="5" fill="#ffffff" opacity="0.35"/>'
                + '<rect x="60" y="245" width="150" height="8" rx="4" fill="#ffffff" opacity="0.2"/>'
                + '<text x="60" y="330" font-family="Arial" font-size="52" font-weight="700" fill="#ffffff" opacity="0.85">' + t[2] + '</text>'
                + '</svg>';
            return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
        },
        selectCat(id) {
            this.activeCat = id;
            this.page = 1;
        },
        goPage(target) {
            const total = this.totalPages;
            if (target === "prev") this.page = Math.max(1, this.page - 1);
            else if (target === "next") this.page = Math.min(total, this.page + 1);
            else this.page = Math.min(total, parseInt(target, 10) || 1);
            const el = document.getElementById("info-articles");
            if (el) el.scrollIntoView({ behavior: "smooth" });
        },
        /* v-html 生成的内容不经过模板编译，面包屑返回与详情 FAQ 手风琴用事件委托处理 */
        handleDetailClick(event) {
            const faqQ = event.target.closest(".detail-faq .faq-q");
            if (faqQ) {
                event.preventDefault();
                const item = faqQ.closest(".faq-item");
                if (item) item.classList.toggle("is-open");
                return;
            }
            if (event.target.closest("[data-faq-consult]")) {
                event.preventDefault();
                this.openConsult("文章 FAQ 咨询");
                return;
            }
            if (event.target.closest("#crumb-back")) {
                event.preventDefault();
                this.closeArticle();
            }
        },
        openArticle(id) {
            this.openId = id;
            window.scrollTo({ top: 0, behavior: "smooth" });
        },
        closeArticle() {
            this.openId = null;
            this.$nextTick(function () {
                const el = document.getElementById("info-articles");
                if (el) el.scrollIntoView({ behavior: "smooth" });
            });
        },
        toggleFaq(item) {
            item.open = !item.open;
        },
        faqGoPage(target) {
            const total = this.faqTotalPages;
            if (target === "prev") this.faqPage = Math.max(1, this.faqPage - 1);
            else if (target === "next") this.faqPage = Math.min(total, this.faqPage + 1);
            else this.faqPage = Math.min(total, parseInt(target, 10) || 1);
            this.$nextTick(function () {
                const el = document.querySelector(".faq-wrap");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            });
        },
        /* 点击搜索按钮或回车后才生效：把输入框关键词提交为生效关键词 */
        doFaqSearch() {
            this.faqKeyword = this.faqQuery;
            this.faqPage = 1;
        },
        clearFaqSearch() {
            this.faqQuery = "";
            this.faqKeyword = "";
            this.faqPage = 1;
        }
    }),
    created() {
        this.faqs = this.faqs.map(function (f, i) {
            return { q: f.q, a: f.a, open: i === 0 };
        });
    },
    mounted() {
        this.appEl = document.getElementById("app");
        this.onDocClick = this.handleDocumentClick.bind(this);
        document.addEventListener("click", this.onDocClick);
        /* 支持从首页「最新资讯」卡片直达文章详情：news.html?id=xx */
        const id = Number(new URLSearchParams(window.location.search).get("id"));
        if (id && this.articles.some(function (a) { return a.id === id && a.status === "published"; })) {
            this.openId = id;
        }
    },
    beforeUnmount() {
        document.removeEventListener("click", this.onDocClick);
    }
}).mount("#app");
