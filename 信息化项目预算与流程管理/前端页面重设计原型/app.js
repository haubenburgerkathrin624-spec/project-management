const screens = {
  portal: {
    mode: "applicant",
    title: "办事大厅",
    heading: "您好，张老师！",
    subtitle: ""
  },
  todoCenter: {
    mode: "applicant",
    title: "待办中心",
    heading: "待办中心",
    subtitle: ""
  },
  progressCenter: {
    mode: "applicant",
    title: "项目进度",
    heading: "项目进度",
    subtitle: ""
  },
  applyWizard: {
    mode: "applicant",
    title: "项目申报",
    heading: "项目申报",
    subtitle: ""
  },
  myProjects: {
    mode: "applicant",
    title: "我的项目",
    heading: "我的项目",
    subtitle: ""
  },
  templates: {
    mode: "applicant",
    title: "模板中心",
    heading: "模板中心",
    subtitle: ""
  },
  noticeCenter: {
    mode: "applicant",
    title: "通知公告",
    heading: "通知公告",
    subtitle: ""
  },
  manage: {
    mode: "admin",
    title: "项目管理",
    heading: "项目管理",
    subtitle: ""
  },
  library: {
    mode: "admin",
    title: "项目库",
    heading: "项目库",
    subtitle: ""
  },
  budget: {
    mode: "admin",
    title: "预算立项",
    heading: "预算立项",
    subtitle: ""
  },
  reminders: {
    mode: "admin",
    title: "事务提醒",
    heading: "事务提醒",
    subtitle: ""
  },
  archive: {
    mode: "admin",
    title: "归档结项",
    heading: "归档结项",
    subtitle: ""
  },
  leader: {
    mode: "admin",
    title: "首页",
    heading: "首页",
    subtitle: ""
  },
  systemRoles: {
    mode: "admin",
    title: "角色管理",
    heading: "角色管理",
    subtitle: ""
  },
  systemFlow: {
    mode: "admin",
    title: "流程配置管理",
    heading: "流程配置管理",
    subtitle: ""
  },
  systemFields: {
    mode: "admin",
    title: "字段表管理",
    heading: "字段表管理",
    subtitle: ""
  }
};

const state = {
  mode: "applicant",
  screen: "portal",
  selectedProjectId: 1,
  selectedArchiveId: 1,
  selectedStatus: "all",
  selectedTemplate: "all",
  selectedPrepStage: "apply",
  selectedBudgetId: 1,
  selectedCandidateIds: new Set([1, 3]),
  myPendingOnly: false,
  myProjectBucket: "all",
  myProjectPage: 1,
  myProjectPageSize: 5,
  portalTodoPage: 1,
  portalTodoPageSize: 3,
  wizardStep: 0,
  manageTab: "business",
  selectedProgressNode: "create",
  selectedFullProcessNode: "create",
  selectedCalendarEvent: "review",
  sortState: {}
};

const applicantTodos = [
  { title: "网络安全态势感知平台", desc: "补交预算测算表", due: "2024-05-24", type: "缺材料", icon: "icon-shield.png" },
  { title: "数据中心存储扩容", desc: "预算测算表被退回", due: "2024-05-25", type: "退回修改", icon: "icon-database.png" },
  { title: "统一身份认证平台升级", desc: "试运行报告可提交", due: "2024-05-26", type: "可提交", icon: "icon-user.png" },
  { title: "日志审计平台建设", desc: "上传阶段报告", due: "2024-05-27", type: "缺材料", icon: "icon-apply.png" },
  { title: "校园网出口链路优化", desc: "归档移交清单确认", due: "2024-05-28", type: "待确认", icon: "icon-progress.png" },
  { title: "一站式网上办事大厅扩展", desc: "验收申请待提交", due: "2024-05-29", type: "可提交", icon: "icon-material.png" }
];

const projects = [
  { id: 1, name: "网络安全态势感知平台", owner: "张工", status: "待立项", year: "2026", priority: "P0", amount: 86, archive: 62, note: "已进入项目库，需补充预算测算表后与年度安全治理预算匹配。" },
  { id: 2, name: "统一身份认证平台升级", owner: "李工", status: "已入库", year: "2026", priority: "P1", amount: 42, archive: 78, note: "涉及统一身份认证、账号生命周期和单点登录，建议纳入信息化建设专项。" },
  { id: 3, name: "数据备份与容灾扩容", owner: "王工", status: "需完善", year: "2026", priority: "P0", amount: 58, archive: 49, note: "缺预算测算、采购过程文件和验收意见，系统已生成补正清单。" },
  { id: 4, name: "校园网出口链路优化", owner: "陈工", status: "待立项", year: "2027", priority: "P2", amount: 120, archive: 35, note: "预算金额较大，可先放入项目库等待下一年度专项预算。" },
  { id: 5, name: "日志审计平台建设", owner: "赵工", status: "已入库", year: "2026", priority: "P1", amount: 36, archive: 68, note: "可直接调用采购论证、试运行报告和验收申请模板。" }
];

const budgets = [
  { id: 1, name: "2026 年信息化建设专项", code: "XXH-2026-01", total: 260, used: 104, nature: "专项经费", owner: "信息办", scope: "应用系统、基础平台和专项建设" },
  { id: 2, name: "校园基础设施更新预算", code: "JCSS-2026-04", total: 180, used: 92, nature: "基础设施", owner: "网络中心", scope: "网络、机房、链路和硬件更新" },
  { id: 3, name: "网络安全与数据治理", code: "AQZL-2026-02", total: 140, used: 52, nature: "安全治理", owner: "信息办", scope: "网络安全、数据备份和合规整改" }
];

const materials = [
  { id: 1, stage: "申报", name: "项目申报书", status: "已确认" },
  { id: 2, stage: "预算", name: "预算测算表", status: "已确认" },
  { id: 3, stage: "采购", name: "采购论证材料", status: "缺失" },
  { id: 4, stage: "采购", name: "合同与成交通知", status: "已确认" },
  { id: 5, stage: "实施", name: "实施计划和会议纪要", status: "已确认" },
  { id: 6, stage: "试运行", name: "试运行报告", status: "已确认" },
  { id: 7, stage: "验收", name: "验收意见签字页", status: "缺失" },
  { id: 8, stage: "归档", name: "归档移交清单", status: "待生成" },
  { id: 9, stage: "退金", name: "退金确认记录", status: "待生成" },
  { id: 10, stage: "结项", name: "项目结项单", status: "待生成" }
];

const progressStages = [
  {
    key: "create",
    title: "新建立项",
    state: "done",
    status: "申报材料提交",
    date: "06-20",
    data: [["申报编号", "SB2026001"], ["项目类型", "网络安全"], ["申报部门", "信息办"], ["申报人", "张工"], ["建设年度", "2026"], ["预算估算", "86 万"]],
    files: [["信息化项目申报书.docx", "已提交", "06-20"], ["建设必要性说明.pdf", "已提交", "06-20"], ["团队角色表.xlsx", "已提交", "06-20"]]
  },
  {
    key: "review",
    title: "立项审核",
    state: "active",
    status: "补预算测算表",
    date: "06-28",
    data: [["审核部门", "信息办"], ["归口部门", "信息办"], ["预算来源", "信息化建设专项"], ["审核状态", "待补齐"], ["退回原因", "预算测算口径不完整"], ["当前责任人", "张工"]],
    files: [["预算测算明细表.xlsx", "待补齐", "06-28"], ["归口部门确认意见.pdf", "已提交", "06-24"], ["立项审核意见.pdf", "已生成", "06-28"]]
  },
  {
    key: "purchase",
    title: "新建采购",
    state: "",
    status: "待生成采购信息",
    date: "-",
    data: [["采购方式", "立项后确认"], ["采购预算", "82 万"], ["采购内容", "软件平台、日志接入服务"], ["供应商", "待填写"], ["合同编号", "待生成"], ["合同金额", "待合同确认"]],
    files: [["采购论证模板.docx", "待提交", "-"], ["供应商资料清单.xlsx", "待提交", "-"], ["合同草稿.pdf", "未生成", "-"]]
  },
  {
    key: "implement",
    title: "实施",
    state: "",
    status: "待采购完成",
    date: "-",
    data: [["实施单位", "待合同确认"], ["项目经理", "待填写"], ["计划开始", "2026-09"], ["计划结束", "2026-10"], ["联调范围", "校园网、日志审计"], ["风险等级", "常规"]],
    files: [["实施计划.docx", "待提交", "-"], ["会议纪要.pdf", "待提交", "-"], ["阶段报告.docx", "待提交", "-"]]
  },
  {
    key: "trial",
    title: "试运行",
    state: "",
    status: "待提交报告",
    date: "-",
    data: [["试运行周期", "30 天"], ["试运行范围", "信息办、网络中心"], ["问题记录", "待填写"], ["整改负责人", "待填写"], ["运行结论", "待确认"], ["下一步", "提交验收申请"]],
    files: [["试运行报告.docx", "待提交", "-"], ["问题整改记录.xlsx", "待提交", "-"], ["用户确认单.pdf", "待提交", "-"]]
  },
  {
    key: "acceptance",
    title: "验收",
    state: "",
    status: "未开始",
    date: "-",
    data: [["验收方式", "专家评审验收"], ["验收单位", "信息办"], ["验收时间", "待安排"], ["验收结论", "未形成"], ["整改项", "待填写"], ["归档状态", "未归档"]],
    files: [["验收申请报告.docx", "待提交", "-"], ["验收意见签字页.pdf", "待提交", "-"], ["系统测试记录.xlsx", "待提交", "-"]]
  },
  {
    key: "acceptanceReview",
    title: "验收审核",
    state: "",
    status: "未开始",
    date: "-",
    data: [["审核部门", "信息办"], ["审核人", "待分配"], ["审核状态", "未开始"], ["整改要求", "无"], ["通过时间", "待确认"], ["下一步", "归档"]],
    files: [["验收审核意见.pdf", "未生成", "-"], ["整改复核记录.xlsx", "待提交", "-"]]
  },
  {
    key: "archive",
    title: "归档",
    state: "",
    status: "未开始",
    date: "-",
    data: [["归档编号", "待生成"], ["归档版本", "V1"], ["移交部门", "信息办"], ["材料完整度", "预检中"], ["归档人", "待填写"], ["归档时间", "待确认"]],
    files: [["归档移交清单.xlsx", "待生成", "-"], ["项目全过程材料包.zip", "未生成", "-"], ["归档确认单.pdf", "待提交", "-"]]
  },
  {
    key: "refund",
    title: "退金",
    state: "",
    status: "待合同确认",
    date: "-",
    data: [["合同金额", "待确认"], ["预算金额", "86 万"], ["需退金额", "待计算"], ["经费编号", "XXH-2026-01"], ["财务状态", "未开始"], ["责任人", "待填写"]],
    files: [["退金确认记录.pdf", "待提交", "-"], ["财务处理截图.png", "待提交", "-"]]
  },
  {
    key: "close",
    title: "结项",
    state: "",
    status: "未开始",
    date: "-",
    data: [["结项方式", "验收后归档结项"], ["结项状态", "未开始"], ["结项人", "待填写"], ["完成时间", "待确认"], ["资料封存", "未完成"], ["项目状态", "进行中"]],
    files: [["项目结项单.docx", "待提交", "-"], ["结项确认意见.pdf", "未生成", "-"]]
  }
];

const completedProcessStages = [
  {
    key: "create",
    title: "新建立项",
    status: "已提交",
    date: "2024-02-18",
    data: [["申报编号", "SB2024018"], ["项目名称", "校园出口链路优化一期"], ["申报部门", "网络中心"], ["申报人", "陈工"], ["建设年度", "2024"], ["预算估算", "118 万"]],
    files: [["项目申报书.docx", "已归档", "2024-02-18"], ["建设必要性说明.pdf", "已归档", "2024-02-18"], ["团队角色表.xlsx", "已归档", "2024-02-18"]],
    result: "申报材料完整，进入立项审核。"
  },
  {
    key: "review",
    title: "立项审核",
    status: "审核通过",
    date: "2024-03-05",
    data: [["审核部门", "信息办"], ["归口部门", "网络中心"], ["预算来源", "校园基础设施更新预算"], ["资金编号", "JCSS-2024-03"], ["评审结论", "同意立项"], ["项目编号", "XXH2024018"]],
    files: [["预算测算明细表.xlsx", "已归档", "2024-03-01"], ["归口确认意见.pdf", "已归档", "2024-03-03"], ["立项审核意见.pdf", "已归档", "2024-03-05"]],
    result: "立项通过，生成项目编号并进入采购登记。"
  },
  {
    key: "purchase",
    title: "新建采购",
    status: "采购完成",
    date: "2024-04-02",
    data: [["采购方式", "校内论证后采购"], ["采购预算", "112 万"], ["采购内容", "出口链路设备与实施服务"], ["供应商", "上海电院信息服务有限公司"], ["合同编号", "HT202404018"], ["合同金额", "116 万"]],
    files: [["采购论证表.docx", "已归档", "2024-03-18"], ["供应商资料.pdf", "已归档", "2024-03-25"], ["合同扫描件.pdf", "已归档", "2024-04-02"]],
    result: "采购信息登记完成，合同材料齐全。"
  },
  {
    key: "implement",
    title: "实施",
    status: "实施完成",
    date: "2024-08-20",
    data: [["实施单位", "上海电院信息服务有限公司"], ["项目经理", "陈工"], ["开始时间", "2024-04-15"], ["完成时间", "2024-08-20"], ["联调范围", "校园出口、核心交换、日志平台"], ["风险等级", "常规"]],
    files: [["实施计划.docx", "已归档", "2024-04-12"], ["实施会议纪要.pdf", "已归档", "2024-06-10"], ["阶段报告.docx", "已归档", "2024-08-20"]],
    result: "链路割接、配置联调和阶段验收均已完成。"
  },
  {
    key: "trial",
    title: "试运行",
    status: "试运行通过",
    date: "2024-09-22",
    data: [["试运行周期", "30 天"], ["试运行范围", "网络中心、信息办"], ["问题记录", "2 项，均已关闭"], ["整改负责人", "供应商项目组"], ["运行结论", "稳定"], ["下一步", "提交验收申请"]],
    files: [["试运行报告.docx", "已归档", "2024-09-22"], ["问题整改记录.xlsx", "已归档", "2024-09-18"], ["用户确认单.pdf", "已归档", "2024-09-22"]],
    result: "试运行指标达成，具备验收条件。"
  },
  {
    key: "acceptance",
    title: "验收",
    status: "验收通过",
    date: "2024-10-18",
    data: [["验收方式", "专家评审验收"], ["验收单位", "信息办"], ["验收时间", "2024-10-18"], ["验收结论", "通过"], ["整改项", "无"], ["归档状态", "待审核"]],
    files: [["验收申请报告.docx", "已归档", "2024-10-12"], ["验收意见签字页.pdf", "已归档", "2024-10-18"], ["系统测试记录.xlsx", "已归档", "2024-10-15"]],
    result: "专家验收通过，材料进入验收审核。"
  },
  {
    key: "acceptanceReview",
    title: "验收审核",
    status: "审核通过",
    date: "2024-10-25",
    data: [["审核部门", "信息办"], ["审核人", "张老师"], ["审核状态", "通过"], ["整改要求", "无"], ["通过时间", "2024-10-25"], ["下一步", "归档"]],
    files: [["验收审核意见.pdf", "已归档", "2024-10-25"], ["整改复核记录.xlsx", "无需整改", "2024-10-25"]],
    result: "验收审核通过，可进入归档移交。"
  },
  {
    key: "archive",
    title: "归档",
    status: "已归档",
    date: "2024-11-08",
    data: [["归档编号", "GD2024018"], ["归档版本", "V1.0"], ["移交部门", "网络中心"], ["材料完整度", "100%"], ["归档人", "陈工"], ["归档时间", "2024-11-08"]],
    files: [["归档移交清单.xlsx", "已归档", "2024-11-08"], ["项目全过程材料包.zip", "已生成", "2024-11-08"], ["归档确认单.pdf", "已归档", "2024-11-08"]],
    result: "项目全过程材料齐全，完成电子归档。"
  },
  {
    key: "refund",
    title: "退金",
    status: "已退金",
    date: "2024-11-20",
    data: [["合同金额", "116 万"], ["预算金额", "118 万"], ["退金额", "2 万"], ["经费编号", "JCSS-2024-03"], ["财务状态", "已确认"], ["责任人", "陈工"]],
    files: [["退金确认记录.pdf", "已归档", "2024-11-20"], ["财务回执.pdf", "已归档", "2024-11-20"]],
    result: "合同结余已完成退金确认。"
  },
  {
    key: "close",
    title: "结项",
    status: "已结项",
    date: "2024-12-05",
    data: [["结项方式", "退金后结项"], ["结项状态", "已结项"], ["结项人", "信息办"], ["完成时间", "2024-12-05"], ["资料封存", "已完成"], ["项目状态", "完结"]],
    files: [["项目结项单.docx", "已归档", "2024-12-05"], ["结项确认意见.pdf", "已归档", "2024-12-05"], ["成效复盘说明.pdf", "已归档", "2024-12-05"]],
    result: "项目完成结项，纳入年度完结项目统计。"
  }
];

const archiveProjects = [
  { id: 1, code: "XXH2026001", name: "网络安全态势感知平台", year: "2026", department: "信息办", owner: "张工", stage: "归档预检", status: "待补齐", progress: 75, missing: 2, updated: "06-28" },
  { id: 2, code: "XXH2026002", name: "统一身份认证平台升级", year: "2026", department: "信息办", owner: "李工", stage: "归档确认", status: "待归档", progress: 88, missing: 1, updated: "06-24" },
  { id: 3, code: "XXH2025008", name: "数据备份与容灾扩容", year: "2025", department: "信息办", owner: "王工", stage: "退金确认", status: "待退金", progress: 92, missing: 0, updated: "06-18" },
  { id: 4, code: "XXH2024016", name: "日志审计平台建设", year: "2024", department: "信息办", owner: "赵工", stage: "结项确认", status: "已结项", progress: 100, missing: 0, updated: "05-30" }
];

const templates = [
  { name: "信息化项目申报书", type: "申报", stage: "apply", version: "V3.2", desc: "基础信息、必要性、预算估算一次填完。" },
  { name: "项目建设必要性说明", type: "申报", stage: "apply", version: "V1.6", desc: "按建设背景、现状问题、预期成效组织内容。" },
  { name: "团队角色表", type: "申报", stage: "apply", version: "V1.3", desc: "项目负责人、归口负责人、实施联系人一次列清。" },
  { name: "预算测算明细表", type: "申报", stage: "budget", version: "V2.1", desc: "可直接关联年度预算池字段。" },
  { name: "预算来源说明", type: "申报", stage: "budget", version: "V1.4", desc: "说明资金编号、预算性质和采购预算拆分。" },
  { name: "采购论证模板", type: "采购", stage: "purchase", version: "V1.8", desc: "按采购方式提示必要材料，不增加复杂审批。" },
  { name: "采购过程文件清单", type: "采购", stage: "purchase", version: "V1.2", desc: "过程文件、结果文件、合同材料按阶段归集。" },
  { name: "试运行报告", type: "验收", stage: "archive", version: "V2.4", desc: "自动带出项目名称、实施周期和问题整改项。" },
  { name: "验收申请报告", type: "验收", stage: "archive", version: "V2.0", desc: "和验收意见、签字材料一起进入归档池。" },
  { name: "归档移交清单", type: "归档", stage: "archive", version: "V1.5", desc: "按阶段汇总附件，缺项自动标红。" }
];

const materialStageData = {
  apply: {
    note: "申请前先看申报规则、样例和必填字段，减少退回。",
    myNote: "当前申报项目的基础材料状态。",
    templateNote: "申报前模板：申报书、必要性说明、团队角色表。",
    references: [
      ["icon-template.png", "信息化项目申报指南", "申报条件、流程节点、材料口径", "下载"],
      ["icon-apply.png", "建设必要性填写样例", "背景、痛点、建设目标和预期成效", "下载"],
      ["icon-user.png", "团队角色填写说明", "负责人、归口负责人、实施联系人", "下载"]
    ],
    mine: [
      ["icon-shield.png", "网络安全态势感知平台", "申报书已上传，预算测算待补", "补齐"],
      ["icon-user.png", "统一身份认证平台升级", "团队角色已确认", "查看"],
      ["icon-database.png", "数据中心存储扩容", "申报说明被退回", "修改"]
    ]
  },
  budget: {
    note: "预算口径先统一，金额来源、采购判断、附件缺一项都会退回。",
    myNote: "当前项目预算材料和缺项。",
    templateNote: "预算模板：预算测算明细、预算来源说明。",
    references: [
      ["icon-database.png", "预算测算口径", "预算来源、年度预算、金额填写说明", "下载"],
      ["icon-material.png", "采购判断规则", "何时需要采购、采购预算如何拆分", "下载"],
      ["icon-apply.png", "预算附件清单", "测算依据、报价、历史采购参考", "下载"]
    ],
    mine: [
      ["icon-shield.png", "网络安全态势感知平台", "缺预算测算明细表", "补齐"],
      ["icon-database.png", "数据中心存储扩容", "预算测算表被退回", "修改"],
      ["icon-apply.png", "统一身份认证平台升级", "预算材料已齐", "查看"]
    ]
  },
  purchase: {
    note: "立项后按采购方式准备论证、合同和过程文件。",
    myNote: "采购阶段材料归集情况。",
    templateNote: "采购模板：论证模板、过程文件清单。",
    references: [
      ["icon-material.png", "采购论证资料清单", "采购过程文件、合同、结果文件", "下载"],
      ["icon-template.png", "采购论证模板", "采购方式、必要性、供应商说明", "下载"],
      ["icon-database.png", "合同归集说明", "合同编号、金额、签订时间和附件", "下载"]
    ],
    mine: [
      ["icon-material.png", "日志审计平台建设", "采购论证材料待确认", "查看"],
      ["icon-database.png", "统一身份认证平台升级", "合同材料已上传", "查看"],
      ["icon-shield.png", "数据备份与容灾扩容", "采购文件缺 2 项", "补齐"]
    ]
  },
  archive: {
    note: "验收归档前先预检，试运行、验收意见、签字页和移交清单一起看。",
    myNote: "验收归档阶段材料状态。",
    templateNote: "验收归档模板：试运行报告、验收申请、归档移交清单。",
    references: [
      ["icon-shield.png", "验收归档清单", "试运行、验收意见、签字页、移交清单", "下载"],
      ["icon-apply.png", "试运行报告模板", "试运行范围、周期、问题整改", "下载"],
      ["icon-database.png", "归档移交要求", "归档版本、缺项处理、移交规则", "下载"]
    ],
    mine: [
      ["icon-user.png", "统一身份认证平台升级", "试运行报告可提交", "提交"],
      ["icon-shield.png", "日志审计平台建设", "验收意见待签字", "补齐"],
      ["icon-database.png", "校园出口链路优化", "已归档", "查看"]
    ]
  }
};

const processNodeTabs = new Set([
  "processCreate",
  "processReview",
  "processPurchase",
  "processImplement",
  "processTrial",
  "processAcceptance",
  "processAcceptanceReview",
  "processArchive",
  "processRefund",
  "processClose"
]);

const processNodeData = {
  processCreate: {
    title: "新建立项列表",
    hero: ["新建立项", "流程节点：新建立项", "关注申请批次、项目类型、申报材料和提交状态"],
    summary: ["全部 36", "草稿 6", "已提交 12", "退回修改 4", "已入库 14"],
    rows: [
      ["SB2026001", "网络安全态势感知平台", "信息办", "张工", "2026", "新建立项", "补齐预算测算表后提交", "86 万", "缺 1"],
      ["SB2026002", "统一身份认证平台升级", "信息办", "李工", "2026", "新建立项", "申报材料已提交", "42 万", "齐全"],
      ["SB2026003", "数据备份与容灾扩容", "信息办", "王工", "2026", "退回修改", "按退回意见重填预算口径", "58 万", "缺 2"],
      ["SB2026004", "一站式网上办事大厅扩展", "图文信息中心", "周老师", "2026", "新建立项", "等待归口部门确认", "65 万", "待确认"]
    ]
  },
  processReview: {
    title: "立项审核列表",
    hero: ["立项审核", "流程节点：立项审核", "确认预算来源、资金编号、评审意见和立项结果"],
    summary: ["全部 12", "待预算匹配 5", "评审中 4", "已立项 3", "退回 2"],
    rows: [
      ["LX2026001", "网络安全态势感知平台", "信息办", "张工", "2026", "立项审核", "预算来源待确认", "86 万", "缺 1"],
      ["LX2026002", "统一身份认证平台升级", "信息办", "李工", "2026", "已立项", "已生成项目编号", "42 万", "齐全"],
      ["LX2026003", "校园网出口链路优化", "网络中心", "陈工", "2026", "评审中", "等待专家评审意见", "120 万", "齐全"],
      ["LX2026004", "数据备份与容灾扩容", "信息办", "王工", "2026", "退回", "预算测算依据不足", "58 万", "缺 2"]
    ]
  },
  processPurchase: {
    title: "新建采购列表",
    hero: ["新建采购", "流程节点：新建采购", "登记采购方式、合同入口、采购预算和过程文件"],
    summary: ["全部 18", "待登记 6", "采购论证 5", "合同待补 4", "已完成 3"],
    rows: [
      ["CG2026001", "日志审计平台建设", "网络中心", "赵工", "2026", "新建采购", "登记采购方式和供应商资料", "36 万", "齐全"],
      ["CG2026002", "统一身份认证平台升级", "信息办", "李工", "2026", "采购论证", "补充采购论证附件", "42 万", "待确认"],
      ["CG2025008", "数据中心存储扩容", "信息办", "王工", "2025", "合同待补", "补充合同和成交通知", "58 万", "缺 2"],
      ["CG2026005", "虚拟化平台扩容", "数据中心", "刘工", "2026", "新建采购", "采购预算待确认", "75 万", "缺 1"]
    ]
  },
  processImplement: {
    title: "实施列表",
    hero: ["实施", "流程节点：实施", "跟进实施计划、会议纪要、阶段报告和交付物"],
    summary: ["全部 16", "实施中 10", "延期风险 2", "待上传 3", "已完成 1"],
    rows: [
      ["SS2026002", "统一身份认证平台升级", "信息办", "李工", "2026", "实施", "上传阶段报告和联调记录", "42 万", "齐全"],
      ["SS2026006", "校园数据治理共享平台", "数据办", "钱老师", "2026", "实施", "等待接口联调记录", "88 万", "缺 1"],
      ["SS2025012", "视频会议系统扩容", "信息办", "孙工", "2025", "实施", "补充实施会议纪要", "26 万", "待确认"],
      ["SS2026007", "服务器资源池建设", "数据中心", "刘工", "2026", "延期风险", "供应商交付延期", "96 万", "齐全"]
    ]
  },
  processTrial: {
    title: "试运行列表",
    hero: ["试运行", "流程节点：试运行", "关注试运行报告、问题整改记录和上线准备"],
    summary: ["全部 10", "试运行中 5", "待报告 3", "待整改 1", "可验收 1"],
    rows: [
      ["SY2026002", "统一身份认证平台升级", "信息办", "李工", "2026", "试运行", "提交试运行报告", "42 万", "齐全"],
      ["SY2025018", "校园出口链路优化", "网络中心", "陈工", "2025", "待整改", "补充问题整改记录", "120 万", "缺 1"],
      ["SY2026008", "数据中台接口治理", "数据办", "钱老师", "2026", "试运行中", "记录试运行问题", "54 万", "待确认"],
      ["SY2026009", "统一消息平台", "信息办", "赵工", "2026", "可验收", "已满足验收申请条件", "38 万", "齐全"]
    ]
  },
  processAcceptance: {
    title: "验收列表",
    hero: ["验收", "流程节点：验收", "提交验收申请、组织专家意见、补齐签字页"],
    summary: ["全部 9", "验收中 2", "待申请 3", "整改中 2", "通过 2"],
    rows: [
      ["YS2026002", "统一身份认证平台升级", "信息办", "李工", "2026", "验收", "验收申请已提交", "42 万", "齐全"],
      ["YS2024016", "日志审计平台建设", "网络中心", "赵工", "2024", "验收通过", "等待归档移交", "36 万", "齐全"],
      ["YS2025014", "校园卡通行数据看板", "信息办", "周老师", "2025", "整改中", "补充专家整改说明", "28 万", "缺 1"],
      ["YS2025008", "数据备份与容灾扩容", "信息办", "王工", "2025", "待申请", "补齐试运行报告", "58 万", "缺 1"]
    ]
  },
  processAcceptanceReview: {
    title: "验收审核列表",
    hero: ["验收审核", "流程节点：验收审核", "审核验收结论、整改闭环和归档前置条件"],
    summary: ["全部 8", "待审核 3", "审核中 2", "退回 1", "通过 2"],
    rows: [
      ["YSSH2025008", "数据备份与容灾扩容", "信息办", "王工", "2025", "验收审核", "等待审核意见", "58 万", "待确认"],
      ["YSSH2024016", "日志审计平台建设", "网络中心", "赵工", "2024", "审核通过", "可进入归档", "36 万", "齐全"],
      ["YSSH2025014", "校园卡通行数据看板", "信息办", "周老师", "2025", "退回", "签字页缺失", "28 万", "缺 1"],
      ["YSSH2026009", "统一消息平台", "信息办", "赵工", "2026", "审核中", "专家意见复核", "38 万", "齐全"]
    ]
  },
  processArchive: {
    title: "归档列表",
    hero: ["归档", "流程节点：归档", "按阶段归集申报、采购、实施、验收与归档移交材料"],
    summary: ["全部 28", "待补齐 7", "待归档 8", "预检通过 9", "已归档 4"],
    rows: [
      ["GD2026001", "网络安全态势感知平台", "信息办", "张工", "2026", "归档预检", "验收意见签字页待补", "86 万", "缺 2"],
      ["GD2026002", "统一身份认证平台升级", "信息办", "李工", "2026", "待归档", "生成归档移交清单", "42 万", "缺 1"],
      ["GD2025008", "数据备份与容灾扩容", "信息办", "王工", "2025", "预检通过", "等待退金确认", "58 万", "齐全"],
      ["GD2024016", "日志审计平台建设", "网络中心", "赵工", "2024", "已归档", "归档包已生成", "36 万", "齐全"]
    ]
  },
  processRefund: {
    title: "退金列表",
    hero: ["退金", "流程节点：退金", "确认合同结余、退金记录和预算释放"],
    summary: ["全部 7", "待确认 3", "待退金 2", "已退金 2", "无需退金 0"],
    rows: [
      ["TJ2025008", "数据备份与容灾扩容", "信息办", "王工", "2025", "待退金", "确认合同结余并上传记录", "58 万", "齐全"],
      ["TJ2024016", "日志审计平台建设", "网络中心", "赵工", "2024", "已退金", "退金记录已归集", "36 万", "齐全"],
      ["TJ2026002", "统一身份认证平台升级", "信息办", "李工", "2026", "待确认", "合同金额待复核", "42 万", "待确认"],
      ["TJ2025014", "校园卡通行数据看板", "信息办", "周老师", "2025", "待确认", "等待财务确认", "28 万", "缺 1"]
    ]
  },
  processClose: {
    title: "结项列表",
    hero: ["结项", "流程节点：结项", "确认归档包、退金记录、结项单和最终项目状态"],
    summary: ["全部 11", "待结项 4", "待确认 3", "已结项 4", "退回 0"],
    rows: [
      ["JX2024016", "日志审计平台建设", "网络中心", "赵工", "2024", "已结项", "结项单已确认", "36 万", "齐全"],
      ["JX2025008", "数据备份与容灾扩容", "信息办", "王工", "2025", "待结项", "等待退金完成", "58 万", "齐全"],
      ["JX2025014", "校园卡通行数据看板", "信息办", "周老师", "2025", "待确认", "归档移交清单待确认", "28 万", "缺 1"],
      ["JX2026002", "统一身份认证平台升级", "信息办", "李工", "2026", "待结项", "验收审核通过后推进", "42 万", "待确认"]
    ]
  }
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("is-visible"), 2200);
}

function progressNodeDetailMarkup(key = state.selectedProgressNode) {
  const node = progressStages.find((item) => item.key === key) || progressStages[0];
  return `
    <section class="progress-node-detail-card">
      <div class="progress-node-detail-head">
        <h3>${node.title}环节数据</h3>
        <span>${node.status} · ${node.date}</span>
      </div>
      <div class="progress-data-grid">
        ${node.data.map((item) => `<article><span>${item[0]}</span><strong>${item[1]}</strong></article>`).join("")}
      </div>
      <div class="progress-node-detail-head compact">
        <h3>用户提交附件</h3>
        <span>按当前环节归集</span>
      </div>
      <div class="progress-file-list">
        ${node.files.map((item) => `<div><strong>${item[0]}</strong><span>${item[1]}</span><em>${item[2]}</em></div>`).join("")}
      </div>
    </section>
  `;
}

function progressRailMarkup() {
  return progressStages
    .map((node) => `
      <button class="${node.state} ${node.key === state.selectedProgressNode ? "is-selected" : ""}" type="button" data-progress-node="${node.key}">
        <b>${node.title}</b>
        <span>${node.status}</span>
        <em>${node.date}</em>
      </button>
    `)
    .join("");
}

function updateProgressNodeDetail() {
  $$("#detailBody [data-progress-node]").forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.progressNode === state.selectedProgressNode);
  });
  const target = $("#progressNodeDetail");
  if (target) target.innerHTML = progressNodeDetailMarkup();
}

function bindProgressNodeButtons() {
  $$("#detailBody [data-progress-node]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      state.selectedProgressNode = button.dataset.progressNode;
      updateProgressNodeDetail();
      const node = progressStages.find((item) => item.key === state.selectedProgressNode);
      showToast(`已切换到${node?.title || "当前"}环节。`);
    });
  });
}

function completedProcessNodeDetailMarkup(key = state.selectedFullProcessNode) {
  const node = completedProcessStages.find((item) => item.key === key) || completedProcessStages[0];
  return `
    <section class="completed-node-detail">
      <div class="progress-node-detail-head">
        <h3>${node.title}环节详情</h3>
        <span>${node.status} · ${node.date}</span>
      </div>
      <div class="progress-data-grid">
        ${node.data.map((item) => `<article><span>${item[0]}</span><strong>${item[1]}</strong></article>`).join("")}
      </div>
      <div class="progress-node-detail-head compact">
        <h3>用户提交附件</h3>
        <span>完结项目归档数据</span>
      </div>
      <div class="progress-file-list">
        ${node.files.map((item) => `<div><strong>${item[0]}</strong><span>${item[1]}</span><em>${item[2]}</em></div>`).join("")}
      </div>
      <div class="completed-result"><span>办理结果</span><strong>${node.result}</strong></div>
    </section>
  `;
}

function completedProcessRailMarkup() {
  return completedProcessStages
    .map((node, index) => `
      <button class="done ${node.key === state.selectedFullProcessNode ? "is-selected" : ""}" type="button" data-completed-process-node="${node.key}">
        <b>${index + 1}</b>
        <strong>${node.title}</strong>
        <span>${node.status}</span>
      </button>
    `)
    .join("");
}

function updateCompletedProcessNodeDetail() {
  $$("#detailBody [data-completed-process-node]").forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.completedProcessNode === state.selectedFullProcessNode);
  });
  const target = $("#completedProcessNodeDetail");
  if (target) target.innerHTML = completedProcessNodeDetailMarkup();
}

function bindCompletedProcessNodeButtons() {
  $$("#detailBody [data-completed-process-node]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      state.selectedFullProcessNode = button.dataset.completedProcessNode;
      updateCompletedProcessNodeDetail();
      const node = completedProcessStages.find((item) => item.key === state.selectedFullProcessNode);
      showToast(`已打开${node?.title || "当前"}环节详情。`);
    });
  });
}

function detailContent(type) {
  const archiveProject = archiveProjects.find((item) => item.id === state.selectedArchiveId) || archiveProjects[0];
  const archiveItems = archiveMaterialList(archiveProject);
  const archiveMissing = archiveItems.filter((item) => item.status === "缺失").length;
  const calendarDetails = {
    material: {
      tag: "材料截止",
      title: "预算测算表补交截止",
      date: "2024-05-03",
      project: "网络安全态势感知平台",
      desc: "预算测算表需补齐金额来源、采购内容和测算依据，补齐后进入立项评审。"
    },
    review: {
      tag: "立项评审",
      title: "网络安全态势感知平台立项评审会",
      date: "2024-05-09",
      project: "网络安全态势感知平台",
      desc: "评审重点为建设必要性、预算测算、团队角色和采购判断。"
    },
    midterm: {
      tag: "中期检查",
      title: "统一身份认证平台升级中期检查",
      date: "2024-05-16",
      project: "统一身份认证平台升级",
      desc: "检查实施计划、会议纪要、阶段报告和试运行准备情况。"
    },
    purchase: {
      tag: "采购材料",
      title: "采购论证材料提交截止",
      date: "2024-05-17",
      project: "统一身份认证平台升级",
      desc: "需提交采购论证表、供应商资料、合同草稿和采购方式说明。"
    },
    acceptance: {
      tag: "验收截止",
      title: "数据中心存储扩容验收材料截止",
      date: "2024-05-24",
      project: "数据中心存储扩容",
      desc: "需提交试运行报告、验收申请、验收意见和签字材料。"
    }
  };
  const calendarDetail = calendarDetails[state.selectedCalendarEvent] || calendarDetails.review;
  const common = {
    eyebrow: "项目详情",
    title: "网络安全态势感知平台",
    meta: "XXH2026001 · 信息办 · 2026",
    body: `
      <div class="detail-alert">
        <strong>当前待办：补交预算测算表</strong>
        <span>补齐后可进入年度预算匹配和立项确认。</span>
      </div>
      <div class="full-detail-grid">
        <article><span>项目编号</span><strong>XXH2026001</strong></article>
        <article><span>项目名称</span><strong>网络安全态势感知平台</strong></article>
        <article><span>项目类型</span><strong>信息化建设 / 应用系统</strong></article>
        <article><span>项目属性</span><strong>新建</strong></article>
        <article><span>申报部门</span><strong>信息化办公室</strong></article>
        <article><span>归口部门</span><strong>信息化办公室</strong></article>
        <article><span>负责人</span><strong>张工 138****5678</strong></article>
        <article><span>建设年度</span><strong>2026</strong></article>
        <article><span>建设周期</span><strong>2026-07 至 2026-12</strong></article>
        <article><span>项目状态</span><strong>待立项</strong></article>
        <article><span>是否跨部门</span><strong>是</strong></article>
        <article><span>密级</span><strong>非涉密</strong></article>
      </div>
      <section class="detail-section">
        <h3>建设内容</h3>
        <p>建设统一的网络安全态势感知、告警处置和风险闭环能力，支撑网络安全治理、等保测评整改与日常运维巡检。</p>
      </section>
      <section class="detail-section">
        <h3>预算与采购</h3>
        <div class="detail-table four-col">
          <div><span>项目预算</span><span>预算来源</span><span>预算编号</span><span>采购方式</span></div>
          <div><strong>860,000 元</strong><span>信息化建设专项</span><span>XXH-2026-01</span><span>校内论证后采购</span></div>
        </div>
      </section>
      <section class="detail-section">
        <h3>团队角色</h3>
        <div class="detail-table team-col">
          <div><span>角色</span><span>姓名</span><span>部门</span><span>联系方式</span></div>
          <div><strong>项目负责人</strong><span>张工</span><span>信息办</span><span>138****5678</span></div>
          <div><strong>归口部门负责人</strong><span>李老师</span><span>信息办</span><span>136****2330</span></div>
        </div>
      </section>
      <section class="detail-section">
        <h3>材料清单</h3>
        <div class="detail-table material-col">
          <div><span>阶段</span><span>材料名称</span><span>状态</span><span>下一步</span></div>
          <div><span>申报</span><strong>项目申报书</strong><span>已上传</span><span>已确认</span></div>
          <div><span>预算</span><strong>预算测算表</strong><span>缺失</span><span>补交</span></div>
          <div><span>采购</span><strong>采购论证材料</strong><span>未开始</span><span>立项后补充</span></div>
          <div><span>验收</span><strong>验收意见书</strong><span>未开始</span><span>验收阶段生成</span></div>
        </div>
      </section>
      <section class="detail-section">
        <h3>流程记录</h3>
        <div class="detail-list">
          <div><span>06-28</span><strong>预算测算表待补齐</strong><em>信息办</em></div>
          <div><span>06-24</span><strong>归口负责人已确认</strong><em>李老师</em></div>
          <div><span>06-20</span><strong>项目基础信息已保存</strong><em>张工</em></div>
        </div>
      </section>
      <section class="detail-section">
        <h3>审批进度与意见</h3>
        <div class="approval-flow">
          <article class="done"><b>1</b><strong>申报提交</strong><span>张工提交，材料进入初审。</span></article>
          <article class="done"><b>2</b><strong>归口确认</strong><span>李老师确认建设必要性，建议补充预算测算口径。</span></article>
          <article class="active"><b>3</b><strong>信息办初审</strong><span>待补预算测算表，补齐后进入项目库。</span></article>
          <article><b>4</b><strong>立项确认</strong><span>待预算匹配。</span></article>
        </div>
      </section>
    `
  };

  const map = {
    todoDetail: {
      ...common,
      eyebrow: "待办详情",
      title: "网络安全态势感知平台",
      meta: "待办：补交预算测算表 · 截止 2024-05-24"
    },
    applicationDetail: {
      ...common,
      eyebrow: "申报详情",
      title: "网络安全态势感知平台",
      meta: "SB2026001 · 已提交 · 当前节点：待立项",
      body: `
        <div class="lifecycle-steps">
          <article class="done"><b>1</b><strong>新建立项</strong><span>申请已提交</span></article>
          <article class="active"><b>2</b><strong>立项审核</strong><span>待补预算测算表</span></article>
          <article><b>3</b><strong>新建采购</strong><span>待立项通过</span></article>
          <article><b>4</b><strong>实施</strong><span>未开始</span></article>
          <article><b>5</b><strong>试运行</strong><span>未开始</span></article>
          <article><b>6</b><strong>验收</strong><span>未开始</span></article>
          <article><b>7</b><strong>验收审核</strong><span>未开始</span></article>
          <article><b>8</b><strong>归档</strong><span>未开始</span></article>
          <article><b>9</b><strong>退金</strong><span>未开始</span></article>
          <article><b>10</b><strong>结项</strong><span>未开始</span></article>
        </div>
        ${common.body}
      `
    },
    fullProcessDetail: {
      eyebrow: "全流程详情",
      title: "校园出口链路优化一期",
      meta: "XXH2024018 · 已结项 · 新建立项至结项完整记录",
      body: `
        <div class="full-process-summary">
          <article><span>项目编号</span><strong>XXH2024018</strong></article>
          <article><span>申报部门</span><strong>网络中心</strong></article>
          <article><span>项目预算</span><strong>118 万</strong></article>
          <article><span>归档状态</span><strong>材料齐全，已结项</strong></article>
        </div>
        <div class="completed-process-flow" aria-label="完结项目全流程">
          ${completedProcessRailMarkup()}
        </div>
        <div id="completedProcessNodeDetail">${completedProcessNodeDetailMarkup()}</div>
      `
    },
    projectProgress: {
      eyebrow: "项目进度",
      title: "网络安全态势感知平台",
      meta: "仅展示里程碑和事件办理记录",
      body: `
        <section class="detail-section progress-brief-section">
          <h3>项目里程碑</h3>
          <div class="progress-milestone-list">
            <article class="done"><b>2026-06</b><strong>申报提交</strong><span>项目申报书、建设必要性和团队角色表已提交</span></article>
            <article class="active"><b>2026-07</b><strong>立项评审</strong><span>预算测算表待补齐，补齐后进入立项审核</span></article>
            <article><b>2026-08</b><strong>采购论证</strong><span>立项通过后准备采购论证、供应商资料和合同草稿</span></article>
            <article><b>2026-10</b><strong>试运行</strong><span>完成实施联调后提交试运行报告和问题整改记录</span></article>
            <article><b>2026-12</b><strong>验收归档</strong><span>提交验收申请、签字页和归档移交清单</span></article>
          </div>
        </section>
        <section class="detail-section progress-brief-section">
          <h3>事件办理记录</h3>
          <div class="progress-event-list">
            <div><time>06-28</time><strong>信息办退回补正</strong><span>请补充预算测算表，明确采购内容和估算依据。</span><em>待办理</em></div>
            <div><time>06-24</time><strong>归口部门确认</strong><span>同意纳入网络安全治理项目库，建议按安全整改项目推进。</span><em>已完成</em></div>
            <div><time>06-20</time><strong>申请人提交</strong><span>提交项目申报书、建设必要性说明和团队角色表。</span><em>已完成</em></div>
          </div>
        </section>
      `
    },
    progressSummary: {
      eyebrow: "项目进度汇总",
      title: "我的进行中项目",
      meta: "按节点查看，快速定位卡点",
      body: `
        <div class="progress-summary-list">
          <article><strong>网络安全态势感知平台</strong><span>待立项 · 缺预算测算表</span><i style="--w: 32%"></i><button type="button" data-action="projectProgress">查看进度</button></article>
          <article><strong>统一身份认证平台升级</strong><span>实施中 · 试运行报告可提交</span><i style="--w: 68%"></i><button type="button" data-action="projectProgress">查看进度</button></article>
          <article><strong>数据中心存储扩容</strong><span>退回修改 · 预算表需重填</span><i style="--w: 24%"></i><button type="button" data-action="projectProgress">查看进度</button></article>
        </div>
      `
    },
    quickProcess: {
      eyebrow: "待办办理",
      title: "网络安全态势感知平台",
      meta: "当前待办：补交预算测算表 · 截止 2024-05-24",
      body: `
        <div class="detail-alert">
          <strong>本次只处理当前这一条待办</strong>
          <span>请补齐预算测算表，确认采购内容和估算依据后提交，后续进度可在“我的项目”查看。</span>
        </div>
        <div class="detail-list">
          <div><span>项目名称</span><strong>网络安全态势感知平台</strong><em>待立项</em></div>
          <div><span>待办事项</span><strong>补交预算测算表</strong><em>缺材料</em></div>
          <div><span>处理要求</span><strong>填写年度预算、预算来源、采购内容和估算依据</strong><em>需确认</em></div>
          <div><span>当前材料</span><strong>项目申报书已上传，预算测算表待补齐</strong><em>可上传</em></div>
        </div>
        <div class="inline-action-row">
          <button class="primary-btn" type="button" data-action="saveDraft">上传预算测算表</button>
          <button class="ghost-btn" type="button" data-action="submitProject">提交补正材料</button>
        </div>
      `
    },
    calendarDetail: {
      eyebrow: "日历项目详情",
      title: calendarDetail.title,
      meta: `${calendarDetail.tag} · ${calendarDetail.date}`,
      body: `
        <div class="detail-alert">
          <strong>${calendarDetail.project}</strong>
          <span>${calendarDetail.desc}</span>
        </div>
        <div class="full-detail-grid">
          <article><span>项目名称</span><strong>${calendarDetail.project}</strong></article>
          <article><span>节点类型</span><strong>${calendarDetail.tag}</strong></article>
          <article><span>节点日期</span><strong>${calendarDetail.date}</strong></article>
          <article><span>当前阶段</span><strong>${calendarDetail.tag === "立项评审" ? "待立项" : calendarDetail.tag}</strong></article>
          <article><span>责任人</span><strong>张工</strong></article>
          <article><span>材料状态</span><strong>${calendarDetail.tag === "材料截止" ? "缺 1 项" : "待确认"}</strong></article>
        </div>
        <section class="detail-section">
          <h3>相关事项</h3>
          <div class="detail-list">
            <div><span>下一步</span><strong>${calendarDetail.tag === "验收截止" ? "上传验收材料并提交归档预检" : "确认材料并跟进项目节点"}</strong><em>系统提醒</em></div>
            <div><span>关联材料</span><strong>项目申报书、预算测算表、节点说明</strong><em>可在资料准备查看</em></div>
            <div><span>处理入口</span><strong>项目详情与进度均可继续查看</strong><em>闭环追踪</em></div>
          </div>
        </section>
        <div class="inline-action-row">
          <button class="primary-btn" type="button" data-action="projectProgress">查看进度</button>
          <button class="ghost-btn" type="button" data-action="viewDetail" data-detail="applicationDetail">查看详情</button>
        </div>
      `
    },
    prepApply: {
      eyebrow: "申报资料准备",
      title: "立项材料包",
      meta: "联动模板：申报",
      body: `
        <div class="detail-list">
          <div><span>必填</span><strong>信息化项目申报书</strong><em>可带入申报单</em></div>
          <div><span>必填</span><strong>建设背景、必要性、建设内容</strong><em>填写在建设说明</em></div>
          <div><span>必填</span><strong>团队角色</strong><em>项目负责人、归口负责人</em></div>
          <div><span>建议</span><strong>预算测算明细表</strong><em>提前准备</em></div>
        </div>
      `
    },
    prepBudget: {
      eyebrow: "预算资料准备",
      title: "预算测算要求",
      meta: "联动模板：申报",
      body: `
        <div class="detail-list">
          <div><span>金额</span><strong>项目预算、采购预算、合同金额</strong><em>分阶段维护</em></div>
          <div><span>来源</span><strong>年度预算、预算编号、预算性质</strong><em>立项联动</em></div>
          <div><span>附件</span><strong>预算测算明细表</strong><em>缺失会生成待办</em></div>
        </div>
      `
    },
    prepPurchase: {
      eyebrow: "采购资料准备",
      title: "采购论证资料清单",
      meta: "联动模板：采购",
      body: `
        <div class="detail-list">
          <div><span>采购</span><strong>采购方式、采购内容、供应商</strong><em>立项后补充</em></div>
          <div><span>合同</span><strong>合同编号、合同金额、合同文件</strong><em>纳入归档池</em></div>
          <div><span>结果</span><strong>采购过程文件和结果文件</strong><em>可批量上传</em></div>
        </div>
      `
    },
    prepArchive: {
      eyebrow: "验收归档准备",
      title: "验收归档预检清单",
      meta: "联动模板：验收、归档",
      body: `
        <div class="detail-list">
          <div><span>试运行</span><strong>试运行报告、问题整改记录</strong><em>验收前检查</em></div>
          <div><span>验收</span><strong>验收申请、验收意见、签字材料</strong><em>通过后归档</em></div>
          <div><span>归档</span><strong>归档移交清单、退金/结项记录</strong><em>系统生成缺项提醒</em></div>
        </div>
      `
    },
    previewMaterial: {
      eyebrow: "材料详情",
      title: "项目全过程归档材料",
      meta: "申报、预算、采购、实施、试运行、验收、归档、退金、结项材料已归集",
      body: `
        <div class="archive-material-summary">
          <article><span>材料总数</span><strong>28</strong></article>
          <article><span>已归档</span><strong>28</strong></article>
          <article><span>缺失项</span><strong>0</strong></article>
        </div>
        <div class="detail-table archive-material-table">
          <div><span>阶段</span><span>过程附件</span><span>状态</span><span>归档时间</span></div>
          <div><strong>新建立项</strong><span>项目申报书、建设必要性、团队角色表</span><em>已归档</em><span>2024-03-12</span></div>
          <div><strong>立项审核</strong><span>预算测算明细表、归口确认意见、立项审核意见</span><em>已归档</em><span>2024-03-28</span></div>
          <div><strong>新建采购</strong><span>采购论证材料、供应商资料、合同草稿、采购结果文件</span><em>已归档</em><span>2024-05-10</span></div>
          <div><strong>实施</strong><span>实施计划、会议纪要、阶段报告、测试记录</span><em>已归档</em><span>2024-07-18</span></div>
          <div><strong>试运行</strong><span>试运行报告、问题整改记录、用户确认单</span><em>已归档</em><span>2024-08-26</span></div>
          <div><strong>验收</strong><span>验收申请、验收意见、签字页、整改复核记录</span><em>已归档</em><span>2024-10-18</span></div>
          <div><strong>归档</strong><span>归档移交清单、材料包目录、移交确认单</span><em>已归档</em><span>2024-11-05</span></div>
          <div><strong>退金/结项</strong><span>退金确认记录、项目结项单、最终归档包</span><em>已归档</em><span>2024-11-20</span></div>
        </div>
      `
    },
    contentDetail: {
      eyebrow: "建设内容详情",
      title: "态势感知平台建设",
      meta: "建设范围 · 接入内容 · 交付物",
      body: `
        <div class="full-detail-grid">
          <article><span>建设范围</span><strong>校园网、数据中心、核心业务系统</strong></article>
          <article><span>交付物</span><strong>平台部署、日志接入、报表模板</strong></article>
          <article><span>接口数据</span><strong>资产台账、网络日志、告警事件</strong></article>
          <article><span>安全要求</span><strong>权限控制、日志留存、审计追踪</strong></article>
        </div>
        <section class="detail-section">
          <h3>建设拆解</h3>
          <div class="detail-list">
            <div><span>1</span><strong>资产探测与分组</strong><em>形成统一资产底账</em></div>
            <div><span>2</span><strong>日志接入与告警关联</strong><em>打通多系统安全事件</em></div>
            <div><span>3</span><strong>整改闭环与报表导出</strong><em>支撑验收和审计材料</em></div>
          </div>
        </section>
      `
    },
    teamDetail: {
      eyebrow: "团队角色详情",
      title: "项目团队",
      meta: "负责人、归口负责人、实施联系人",
      body: `
        <div class="detail-table team-col">
          <div><span>角色</span><span>姓名</span><span>部门</span><span>职责</span></div>
          <div><strong>项目负责人</strong><span>张工</span><span>信息办</span><span>申报填报、材料补齐、节点跟进</span></div>
          <div><strong>归口负责人</strong><span>李老师</span><span>信息办</span><span>建设必要性确认、预算口径审核</span></div>
          <div><strong>实施联系人</strong><span>王工</span><span>网络中心</span><span>系统接入、联调测试、试运行报告</span></div>
        </div>
      `
    },
    budgetDetail: {
      eyebrow: "经费详情",
      title: "信息化建设专项",
      meta: "XXH-2026-01 · 已占用 30 万",
      body: `
        <div class="detail-stat-grid">
          <article><span>项目预算</span><strong>86 万</strong></article>
          <article><span>已占用</span><strong>30 万</strong></article>
          <article><span>可用余额</span><strong>156 万</strong></article>
          <article><span>执行率</span><strong>34.9%</strong></article>
        </div>
        <section class="detail-section">
          <h3>预算记录</h3>
          <div class="detail-list">
            <div><span>06-28</span><strong>预算测算表待补正</strong><em>缺采购内容明细</em></div>
            <div><span>06-24</span><strong>已匹配信息化建设专项</strong><em>可进入立项确认</em></div>
          </div>
        </section>
      `
    },
    expertOpinion: {
      eyebrow: "验收专家意见",
      title: "专家评审意见",
      meta: "2026-04-18 · 验收评审",
      body: `
        <div class="detail-list">
          <div><span>王五</span><strong>平台功能达到合同要求，建议补充运维交接说明。</strong><em>通过</em></div>
          <div><span>赵六</span><strong>日志接入范围清晰，需完善风险分级说明。</strong><em>通过</em></div>
          <div><span>钱七</span><strong>验收材料基本完整，签字页归档前需补齐。</strong><em>通过</em></div>
        </div>
      `
    },
    acceptanceFix: {
      eyebrow: "整改情况",
      title: "验收整改记录",
      meta: "整改完善 · 2026-04-25",
      body: `
        <div class="detail-list">
          <div><span>问题 1</span><strong>补充运维交接说明</strong><em>已完成</em></div>
          <div><span>问题 2</span><strong>完善风险分级说明</strong><em>已完成</em></div>
          <div><span>问题 3</span><strong>补齐验收签字页</strong><em>待归档确认</em></div>
        </div>
      `
    },
    changeDetail: {
      eyebrow: "变更记录详情",
      title: "补充预算测算说明",
      meta: "2026-06-28 · 张工提交",
      body: `
        <div class="detail-section">
          <h3>变更原因</h3>
          <p>信息办初审要求补充采购内容、金额测算依据和年度预算来源，避免后续立项匹配时反复退回。</p>
        </div>
        <div class="detail-table four-col">
          <div><span>变更前</span><span>变更后</span><span>处理人</span><span>状态</span></div>
          <div><strong>仅填写总金额</strong><span>拆分软件、服务、实施费用</span><span>张工</span><span>已提交</span></div>
        </div>
      `
    },
    archiveProjectDetail: {
      eyebrow: "归档项目详情",
      title: archiveProject.name,
      meta: `${archiveProject.code} · ${archiveProject.stage} · ${archiveMissing ? `缺 ${archiveMissing} 项` : "材料齐全"}`,
      body: `
        <div class="lifecycle-steps">
          <article class="done"><b>1</b><strong>新建立项</strong><span>已归集</span></article>
          <article class="done"><b>2</b><strong>立项审核</strong><span>已通过</span></article>
          <article class="done"><b>3</b><strong>新建采购</strong><span>已归集</span></article>
          <article class="done"><b>4</b><strong>实施</strong><span>已完成</span></article>
          <article class="done"><b>5</b><strong>试运行</strong><span>已完成</span></article>
          <article class="${archiveMissing ? "active" : "done"}"><b>6</b><strong>验收</strong><span>${archiveMissing ? "待补齐" : "已通过"}</span></article>
          <article class="${archiveMissing ? "" : "done"}"><b>7</b><strong>验收审核</strong><span>${archiveMissing ? "待确认" : "已通过"}</span></article>
          <article class="${archiveProject.status === "待补齐" ? "" : "done"}"><b>8</b><strong>归档</strong><span>${archiveProject.status === "待补齐" ? "待预检" : "已预检"}</span></article>
          <article class="${archiveProject.status === "待退金" ? "active" : archiveProject.status === "已结项" ? "done" : ""}"><b>9</b><strong>退金</strong><span>${archiveProject.status === "待退金" ? "待确认" : archiveProject.status === "已结项" ? "已确认" : "待处理"}</span></article>
          <article class="${archiveProject.status === "已结项" ? "done" : ""}"><b>10</b><strong>结项</strong><span>${archiveProject.status === "已结项" ? "已完成" : "未完成"}</span></article>
        </div>
        <div class="detail-list">
          ${archiveItems.map((item) => `<div><span>${item.status}</span><strong>${item.name}</strong><em>${item.stage}阶段</em></div>`).join("")}
        </div>
      `
    },
    versionRecord: {
      eyebrow: "版本记录",
      title: "归档版本记录",
      meta: "V1.0 · V1.1",
      body: `
        <div class="detail-list">
          <div><span>V1.1</span><strong>补充验收签字页</strong><em>2026-06-28</em></div>
          <div><span>V1.0</span><strong>首次归档预检</strong><em>2026-06-24</em></div>
        </div>
      `
    },
    downloadTemplate: {
      eyebrow: "模板下载",
      title: "资料模板包",
      meta: "申报 · 预算 · 采购 · 验收 · 归档",
      body: `
        <div class="detail-list">
          <div><span>申报</span><strong>信息化项目申报书 V3.2</strong><em>可带入申报单</em></div>
          <div><span>预算</span><strong>预算测算明细表 V2.1</strong><em>统一年度预算口径</em></div>
          <div><span>归档</span><strong>归档移交清单 V1.5</strong><em>缺项自动标记</em></div>
        </div>
      `
    },
    useTemplate: {
      eyebrow: "资料准备",
      title: "立项材料包",
      meta: "申请前一次性准备",
      body: `
        <div class="detail-stat-grid">
          <article><span>必填表单</span><strong>4 项</strong></article>
          <article><span>附件材料</span><strong>6 项</strong></article>
          <article><span>预计耗时</span><strong>20 分钟</strong></article>
          <article><span>可复用</span><strong>是</strong></article>
        </div>
        <section class="detail-section">
          <h3>准备清单</h3>
          <p>项目背景、建设必要性、预算测算、团队角色、采购判断和附件说明统一放在这里，新人先看清要求再申报。</p>
        </section>
      `
    },
    fieldConfig: {
      eyebrow: "字段设置",
      title: "列表字段显示",
      meta: "配置显示、隐藏、冻结、顺序和排序",
      body: `
        <div class="field-config-toolbar">
          <button class="ghost-btn" type="button" data-action="resetFilter">恢复默认</button>
          <button class="primary-btn" type="button" data-close-detail>保存设置</button>
        </div>
        <div class="field-config-table">
          <div><span>顺序</span><span>字段</span><span>显示</span><span>冻结/排序</span></div>
          <div><b>☰ 01</b><strong>项目编号</strong><label><input type="checkbox" checked /> 显示</label><em>固定左侧</em></div>
          <div><b>☰ 02</b><strong>项目名称</strong><label><input type="checkbox" checked /> 显示</label><em>固定左侧</em></div>
          <div><b>☰ 03</b><strong>预算来源</strong><label><input type="checkbox" checked /> 显示</label><em>可筛选</em></div>
          <div><b>☰ 04</b><strong>申报部门</strong><label><input type="checkbox" checked /> 显示</label><em>可筛选</em></div>
          <div><b>☰ 05</b><strong>申报人</strong><label><input type="checkbox" checked /> 显示</label><em>-</em></div>
          <div><b>☰ 06</b><strong>申报时间</strong><label><input type="checkbox" checked /> 显示</label><em>可排序</em></div>
          <div><b>☰ 07</b><strong>当前节点</strong><label><input type="checkbox" checked /> 显示</label><em>可筛选</em></div>
          <div><b>☰ 08</b><strong>预算金额</strong><label><input type="checkbox" checked /> 显示</label><em>可排序</em></div>
          <div><b>☰ 09</b><strong>材料缺项数</strong><label><input type="checkbox" checked /> 显示</label><em>可排序</em></div>
          <div><b>☰ 10</b><strong>操作</strong><label><input type="checkbox" checked disabled /> 必显</label><em>固定右侧</em></div>
        </div>
      `
    },
    readNotice: {
      eyebrow: "通知公告",
      title: "近期通知",
      meta: "项目申报 · 模板更新 · 材料截止",
      body: `
        <div class="detail-list">
          <div><span>07-01</span><strong>2026 年信息化项目申报已开放</strong><em>全年可申报</em></div>
          <div><span>06-28</span><strong>申报材料模板与预算口径已更新</strong><em>请使用新版模板</em></div>
          <div><span>06-24</span><strong>采购论证与验收归档材料清单发布</strong><em>资料准备池可下载</em></div>
        </div>
      `
    },
    reminderDetail: {
      eyebrow: "事务提醒",
      title: "网络安全态势感知平台",
      meta: "立项审核 · 预算测算表待补齐 · 张工",
      body: `
        <div class="detail-alert">
          <strong>当前事项：预算测算表逾期未补齐</strong>
          <span>该项目已停留在立项审核节点，补齐预算测算表后才能进入预算匹配。</span>
        </div>
        <div class="detail-list">
          <div><span>提醒类型</span><strong>材料补正 / 逾期</strong><em>高优先级</em></div>
          <div><span>责任人</span><strong>张工 138****5678</strong><em>信息化办公室</em></div>
          <div><span>截止时间</span><strong>2026-07-06</strong><em>已逾期 2 天</em></div>
          <div><span>待补材料</span><strong>预算测算表、资金来源说明、采购内容估算依据</strong><em>提交后复核</em></div>
        </div>
        <section class="detail-section">
          <h3>处理建议</h3>
          <p>联系项目负责人补齐预算测算表，并在材料上传后重新触发立项审核。若预算口径不明确，可先下载最新预算测算模板。</p>
        </section>
        <div class="inline-action-row">
          <button class="primary-btn" type="button" data-action="quickProcess">去处理</button>
          <button class="ghost-btn" type="button" data-screen-link="budget">查看预算匹配</button>
        </div>
      `
    },
    noticeDetail: {
      eyebrow: "通知详情",
      title: "2026 年信息化项目申报已开放",
      meta: "申报通知 · 2026-07-01 · 未读",
      body: `
        <section class="detail-section">
          <h3>通知内容</h3>
          <p>2026 年信息化项目申报已开放，全年可申报。提交前请先在资料准备池查看申报指南、预算测算口径、采购论证清单和验收归档要求。</p>
        </section>
        <div class="detail-list">
          <div><span>适用对象</span><strong>各部门信息化项目申请人、归口负责人</strong><em>全校</em></div>
          <div><span>材料要求</span><strong>项目申报书、建设必要性、预算测算、团队角色</strong><em>提交前检查</em></div>
          <div><span>下一步</span><strong>进入资料准备池，按阶段下载模板或带入申报单</strong><em>减少退回</em></div>
        </div>
        <div class="inline-action-row">
          <button class="primary-btn" type="button" data-screen-link="templates">去资料准备</button>
          <button class="ghost-btn" type="button" data-screen-link="applyWizard">新建申报</button>
        </div>
      `
    },
    archivePack: {
      eyebrow: "归档预检",
      title: "归档材料清单",
      meta: "缺项 2 项 · 完整度 75%",
      body: `
        <div class="detail-list">
          <div><span>已确认</span><strong>项目申报书</strong><em>申报阶段</em></div>
          <div><span>缺失</span><strong>采购论证材料</strong><em>采购阶段</em></div>
          <div><span>缺失</span><strong>验收意见签字页</strong><em>验收阶段</em></div>
          <div><span>待生成</span><strong>归档移交清单</strong><em>归档阶段</em></div>
        </div>
      `
    },
    budgetRecord: {
      eyebrow: "预算记录",
      title: "网络安全态势感知平台经费流转",
      meta: "预算匹配 · 采购占用 · 合同执行",
      body: `
        <div class="detail-stat-grid">
          <article><span>项目预算</span><strong>86 万</strong></article>
          <article><span>预算来源</span><strong>信息化建设专项</strong></article>
          <article><span>已占用</span><strong>30 万</strong></article>
          <article><span>剩余可用</span><strong>56 万</strong></article>
        </div>
        <div class="detail-table four-col">
          <div><span>时间</span><span>事项</span><span>金额</span><span>状态</span></div>
          <div><strong>2026-06-24</strong><span>年度预算匹配</span><span>86 万</span><span>待确认</span></div>
          <div><strong>2026-06-28</strong><span>预算测算表补正</span><span>-</span><span>待补齐</span></div>
          <div><strong>立项后</strong><span>采购预算占用</span><span>82 万</span><span>待生成</span></div>
        </div>
      `
    },
    allChanges: {
      eyebrow: "变更记录",
      title: "项目变更汇总",
      meta: "预算、周期、材料、责任人调整",
      body: `
        <div class="detail-list">
          <div><span>06-28</span><strong>补充预算测算说明</strong><em>张工 · 已提交</em></div>
          <div><span>06-20</span><strong>调整建设周期为 2026-07 至 2026-12</strong><em>李老师 · 已确认</em></div>
          <div><span>06-18</span><strong>新增网络中心为实施配合部门</strong><em>信息办 · 已确认</em></div>
          <div><span>06-12</span><strong>采购内容拆分为软件平台、实施服务、日志接入</strong><em>王工 · 待复核</em></div>
        </div>
      `
    },
    logDetail: {
      eyebrow: "操作日志",
      title: "日志审计平台建设操作记录",
      meta: "按时间倒序 · 可导出",
      body: `
        <div class="detail-list">
          <div><span>10:30</span><strong>赵工更新采购论证材料</strong><em>材料状态：齐全</em></div>
          <div><span>09:42</span><strong>系统自动同步预算编号</strong><em>XXH-2026-05</em></div>
          <div><span>昨天</span><strong>信息办确认项目进入采购论证</strong><em>当前阶段更新</em></div>
        </div>
      `
    },
    unitStatsDetail: {
      eyebrow: "统计详情",
      title: "项目按单位分布",
      meta: "按申报单位统计项目数量",
      body: `
        <div class="detail-table four-col">
          <div><span>单位</span><span>项目数</span><span>建设中</span><span>待处理</span></div>
          <div><strong>信息化办公室</strong><span>18</span><span>7</span><span>3</span></div>
          <div><strong>教务处</strong><span>12</span><span>4</span><span>2</span></div>
          <div><strong>学生处</strong><span>8</span><span>3</span><span>1</span></div>
          <div><strong>图文信息中心</strong><span>7</span><span>2</span><span>1</span></div>
        </div>
      `
    },
    completionStatsDetail: {
      eyebrow: "统计详情",
      title: "项目完成情况",
      meta: "按单位查看完成率与同比变化",
      body: `
        <div class="detail-table four-col">
          <div><span>单位</span><span>项目总数</span><span>已完成</span><span>完成率</span></div>
          <div><strong>信息化办公室</strong><span>18</span><span>3</span><span>16.7%</span></div>
          <div><strong>教务处</strong><span>12</span><span>2</span><span>16.7%</span></div>
          <div><strong>学生处</strong><span>8</span><span>1</span><span>12.5%</span></div>
          <div><strong>图文信息中心</strong><span>7</span><span>2</span><span>28.6%</span></div>
        </div>
      `
    },
    statTotal: {
      eyebrow: "统计下钻",
      title: "项目总数明细",
      meta: "78 个项目 · 按阶段与单位展开",
      body: `
        <div class="detail-stat-grid">
          <article><span>申报中</span><strong>18</strong></article>
          <article><span>已立项</span><strong>45</strong></article>
          <article><span>建设中</span><strong>24</strong></article>
          <article><span>已完成</span><strong>9</strong></article>
        </div>
        <div class="detail-table four-col">
          <div><span>项目名称</span><span>单位</span><span>阶段</span><span>金额</span></div>
          <div><strong>网络安全态势感知平台</strong><span>信息办</span><span>待立项</span><span>86 万</span></div>
          <div><strong>统一身份认证平台升级</strong><span>信息办</span><span>建设中</span><span>42 万</span></div>
          <div><strong>日志审计平台建设</strong><span>网络中心</span><span>验收中</span><span>36 万</span></div>
        </div>
      `
    },
    statApproved: {
      eyebrow: "统计下钻",
      title: "已立项项目",
      meta: "45 个 · 可继续查看项目明细",
      body: `
        <div class="detail-list">
          <div><span>信息办</span><strong>统一身份认证平台升级</strong><em>2026 · 42 万</em></div>
          <div><span>网络中心</span><strong>日志审计平台建设</strong><em>2026 · 36 万</em></div>
          <div><span>图文信息中心</span><strong>一站式网上办事大厅扩展</strong><em>2026 · 65 万</em></div>
          <div><span>教务处</span><strong>教学管理系统功能优化</strong><em>2025 · 28 万</em></div>
        </div>
      `
    },
    statBuilding: {
      eyebrow: "统计下钻",
      title: "建设中项目",
      meta: "24 个 · 按建设环节汇总",
      body: `
        <div class="detail-table four-col">
          <div><span>环节</span><span>项目数</span><span>缺材料</span><span>本周更新</span></div>
          <div><strong>采购论证</strong><span>6</span><span>2</span><span>3</span></div>
          <div><strong>系统开发</strong><span>10</span><span>1</span><span>5</span></div>
          <div><strong>试运行</strong><span>5</span><span>1</span><span>2</span></div>
          <div><strong>整改中</strong><span>3</span><span>1</span><span>1</span></div>
        </div>
      `
    },
    statCompleted: {
      eyebrow: "统计下钻",
      title: "已完成项目",
      meta: "9 个 · 验收与归档情况",
      body: `
        <div class="detail-list">
          <div><span>已归档</span><strong>校园出口链路优化</strong><em>2024-05-30</em></div>
          <div><span>已归档</span><strong>校园数据治理共享平台</strong><em>2024-04-18</em></div>
          <div><span>验收通过</span><strong>日志审计平台建设</strong><em>待归档移交</em></div>
        </div>
      `
    },
    statInvestment: {
      eyebrow: "统计下钻",
      title: "项目投资明细",
      meta: "3,245.80 万 · 按金额区间展开",
      body: `
        <div class="detail-table four-col">
          <div><span>金额区间</span><span>项目数</span><span>金额合计</span><span>代表项目</span></div>
          <div><strong>0-50 万</strong><span>39</span><span>2,120.50 万</span><span>身份认证、日志审计</span></div>
          <div><strong>50-100 万</strong><span>18</span><span>687.30 万</span><span>态势感知、存储扩容</span></div>
          <div><strong>100-200 万</strong><span>9</span><span>258.40 万</span><span>出口链路优化</span></div>
          <div><strong>200 万以上</strong><span>4</span><span>179.60 万</span><span>数据中心升级</span></div>
        </div>
      `
    },
    editProject: {
      eyebrow: "编辑项目",
      title: "建设内容维护",
      meta: "仅展示关键字段，减少误填",
      body: `
        <div class="detail-form">
          <label><span>建设目标</span><input value="提升网络安全态势感知能力" /></label>
          <label><span>建设周期</span><input value="2026-07 至 2026-12" /></label>
          <label><span>责任部门</span><input value="信息办" /></label>
        </div>
      `
    },
    uploadMaterial: {
      eyebrow: "资料维护",
      title: "上传资料",
      meta: "发布到用户端模板中心或管理端资料清单",
      body: `
        <div class="detail-form upload-material-form">
          <label><span>所属阶段</span><select><option>申报前</option><option>预算口径</option><option>采购阶段</option><option>实施</option><option>试运行</option><option>验收</option><option>归档</option><option>退金</option><option>结项</option></select></label>
          <label><span>附件名称</span><input value="预算测算明细表" /></label>
          <label><span>是否必填</span><select><option>必填</option><option>选填</option><option>管理员可见</option></select></label>
          <label><span>资料类型</span><select><option>下载模板</option><option>参考资料</option><option>填报样例</option><option>附件清单</option></select></label>
          <label><span>适用对象</span><select><option>申请人</option><option>管理员</option><option>评审专家</option><option>全部对象</option></select></label>
          <label><span>版本号</span><input value="V2.2" /></label>
          <label class="full-row"><span>资料说明</span><textarea>用于填写预算来源、采购内容、测算依据和附件清单，用户端可下载并带入项目申报。</textarea></label>
          <div class="full-row upload-attachment-control">
            <span>上传附件</span>
            <label class="upload-button">
              <input type="file" multiple />
              <b>选择多个附件</b>
              <em>支持 PDF、Word、Excel、图片、压缩包</em>
            </label>
            <div class="upload-file-list">
              <div><strong>预算测算明细表-V2.2.xlsx</strong><span>已选择</span></div>
              <div><strong>预算来源说明.pdf</strong><span>已选择</span></div>
            </div>
          </div>
        </div>
        <div class="inline-action-row">
          <button class="primary-btn" type="button" data-action="saveDraft">保存并发布</button>
          <button class="ghost-btn" type="button" data-close-detail>取消</button>
        </div>
      `
    },
    systemManage: {
      eyebrow: "系统管理",
      title: "权限与基础配置",
      meta: "角色权限 · 字典配置 · 流程规则",
      body: `
        <div class="detail-list">
          <div><span>权限</span><strong>申报人、管理员、归档员角色</strong><em>已启用</em></div>
          <div><span>字段</span><strong>项目类别、建设年度、归口部门</strong><em>可维护</em></div>
          <div><span>流程</span><strong>新建立项、立项审核、采购管理、验收管理、归档结项</strong><em>按校内制度配置</em></div>
        </div>
      `
    }
  };

  return map[type] || common;
}

function openDetail(type = "viewDetail") {
  if (type === "projectProgress") state.selectedProgressNode = "create";
  if (type === "fullProcessDetail") state.selectedFullProcessNode = "create";
  const content = detailContent(type);
  $("#detailEyebrow").textContent = content.eyebrow;
  $("#detailTitle").textContent = content.title;
  $("#detailMeta").textContent = content.meta;
  $("#detailBody").innerHTML = content.body;
  $("#detailDrawer").classList.add("is-open");
  $("#detailDrawer").setAttribute("aria-hidden", "false");
  bindProgressNodeButtons();
  bindCompletedProcessNodeButtons();
}

function closeDetail() {
  $("#detailDrawer").classList.remove("is-open");
  $("#detailDrawer").setAttribute("aria-hidden", "true");
}

function setMode(mode, preferredScreen) {
  state.mode = mode;
  document.body.dataset.mode = mode;

  $("#navEyebrow").textContent = mode === "applicant" ? "申请端" : "管理端";
  $("#navTitle").textContent = mode === "applicant" ? "办事大厅" : "管理后台";

  const defaultScreen = mode === "applicant" ? "portal" : "leader";
  switchScreen(preferredScreen || defaultScreen, false);
}

function switchScreen(screen, syncMode = true) {
  if (!screens[screen]) return;
  if (syncMode && screens[screen].mode !== state.mode) {
    state.mode = screens[screen].mode;
    document.body.dataset.mode = state.mode;
    $("#navEyebrow").textContent = state.mode === "applicant" ? "申请端" : "管理端";
    $("#navTitle").textContent = state.mode === "applicant" ? "办事大厅" : "管理后台";
  }

  state.screen = screen;
  document.body.dataset.screen = screen;
  $$(".screen").forEach((item) => item.classList.toggle("is-active", item.id === screen));
  $$("[data-screen]").forEach((item) => {
    const hasManageTarget = Boolean(item.dataset.manageOpen);
    const systemScreens = ["systemRoles", "systemFlow", "systemFields"];
    const active = (item.dataset.systemRoot === "system" && systemScreens.includes(screen)) ||
      (item.dataset.screen === screen && (!hasManageTarget || item.dataset.manageOpen === state.manageTab));
    item.classList.toggle("is-active", active);
  });
  $("#pageTitle").textContent = screens[screen].title;
  $("#pageHeading").textContent = screens[screen].heading;
  const adminBreadcrumbCurrent = $("#adminBreadcrumbCurrent");
  if (adminBreadcrumbCurrent) adminBreadcrumbCurrent.textContent = screens[screen].title;
  if (screen === "applyWizard") setWizardStep(state.wizardStep);
  if (screen === "manage") setManageTab(state.manageTab || "business");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleNavGroup(button) {
  const group = button.closest(".nav-group");
  if (!group) return;
  const isCollapsed = !group.classList.contains("is-collapsed");
  group.classList.toggle("is-collapsed", isCollapsed);
  group.classList.toggle("is-open", !isCollapsed);
  button.setAttribute("aria-expanded", String(!isCollapsed));
  const arrow = button.querySelector("b");
  if (arrow) arrow.textContent = isCollapsed ? "⌄" : "⌃";
}

function setWizardStep(step) {
  const maxStep = 4;
  const wizardMeta = [
    ["第 1 / 5 步", "先把项目身份说清楚", "下一步：建设说明"],
    ["第 2 / 5 步", "说明为什么要建、建什么", "下一步：团队计划"],
    ["第 3 / 5 步", "确认团队角色和项目节点", "下一步：预算材料"],
    ["第 4 / 5 步", "补齐预算、采购和材料口径", "下一步：确认提交"],
    ["第 5 / 5 步", "提交前检查关键信息", "已到最后一步"]
  ];
  state.wizardStep = Math.max(0, Math.min(maxStep, Number(step) || 0));
  $$("[data-wizard-step]").forEach((item) => {
    const itemStep = Number(item.dataset.wizardStep);
    item.classList.toggle("is-active", itemStep === state.wizardStep);
    item.classList.toggle("is-done", itemStep < state.wizardStep);
  });
  $$("[data-wizard-panel]").forEach((item) => {
    item.classList.toggle("is-active", Number(item.dataset.wizardPanel) === state.wizardStep);
  });
  $("#wizardPrev")?.classList.toggle("is-hidden", state.wizardStep === 0);
  $("#wizardNext")?.classList.toggle("is-hidden", state.wizardStep === maxStep);
  $("#wizardSubmit")?.classList.toggle("is-hidden", state.wizardStep !== maxStep);
  const context = $("#wizardContext");
  const [stepText, title, next] = wizardMeta[state.wizardStep];
  if (context) {
    context.querySelector("span").textContent = stepText;
    context.querySelector("strong").textContent = title;
    context.querySelector("em").textContent = next;
  }
  const nextButton = $("#wizardNext");
  if (nextButton && state.wizardStep < maxStep) nextButton.textContent = next;
}

function closeAvatarMenu() {
  $("#avatarPopover").classList.remove("is-open");
  $("#avatarButton").setAttribute("aria-expanded", "false");
}

function renderApplicantTodos() {
  const list = $("#applicantTodoList");
  if (!list) return;
  const total = applicantTodos.length;
  const totalPages = Math.max(1, Math.ceil(total / state.portalTodoPageSize));
  state.portalTodoPage = Math.min(Math.max(1, state.portalTodoPage), totalPages);
  const start = (state.portalTodoPage - 1) * state.portalTodoPageSize;
  const todos = applicantTodos.slice(start, start + state.portalTodoPageSize);
  list.innerHTML = todos.map((todo, index) => `
    <article class="todo-item" data-todo-index="${start + index}">
      <label class="todo-check" aria-label="选择${todo.title}">
        <input type="checkbox" />
      </label>
      <img src="./assets/${todo.icon}" alt="" />
      <div>
        <strong>${todo.title}</strong>
        <span>${todo.desc}</span>
        <em>截止时间：${todo.due} · ${todo.type}</em>
      </div>
      <span class="todo-actions">
        <button class="plain-btn" type="button" data-todo-action="handle" data-action="handleTodo">办理</button>
        <button class="ghost-btn" type="button" data-todo-action="progress" data-action="projectProgress">进度</button>
      </span>
    </article>
  `).join("");
  const pageInfo = $("#portalTodoPageInfo");
  if (pageInfo) pageInfo.textContent = `共 ${total} 条，当前第 ${state.portalTodoPage} / ${totalPages} 页`;
  const pageSize = $("#portalTodoPageSize");
  if (pageSize) pageSize.value = String(state.portalTodoPageSize);
  const pager = $("#portalTodoPageButtons");
  if (pager) {
    pager.innerHTML = `
      <button type="button" data-portal-page="prev" ${state.portalTodoPage === 1 ? "disabled" : ""}>‹</button>
      ${Array.from({ length: totalPages }, (_, index) => `<button class="${state.portalTodoPage === index + 1 ? "is-active" : ""}" type="button" data-portal-page="${index + 1}">${index + 1}</button>`).join("")}
      <button type="button" data-portal-page="next" ${state.portalTodoPage === totalPages ? "disabled" : ""}>›</button>
    `;
  }
}

function projectStatusClass(status) {
  if (status === "待立项") return "blue";
  if (status === "已入库") return "green";
  if (status === "需完善") return "amber";
  return "red";
}

function filteredProjects() {
  const keyword = $("#projectSearch")?.value.trim() || "";
  const year = $("#yearFilter")?.value || "all";
  return projects.filter((project) => {
    const statusMatch = state.selectedStatus === "all" || project.status === state.selectedStatus;
    const yearMatch = year === "all" || project.year === year;
    const keywordMatch = !keyword || `${project.name}${project.owner}`.includes(keyword);
    return statusMatch && yearMatch && keywordMatch;
  });
}

function renderProjectRows() {
  const rows = filteredProjects();
  $("#projectRows").innerHTML = `
    <div class="table-row table-head">
      <span>项目名称</span><span>负责人</span><span>状态</span><span>预算估算</span><span>优先级</span>
    </div>
    ${rows.map((project) => `
      <button class="table-row ${project.id === state.selectedProjectId ? "is-selected" : ""}" type="button" data-project-id="${project.id}">
        <span>${project.name}</span>
        <span>${project.owner}</span>
        <span><b class="status ${projectStatusClass(project.status)}">${project.status}</b></span>
        <span>${project.amount} 万</span>
        <span>${project.priority}</span>
      </button>
    `).join("")}
  `;

  if (!rows.some((project) => project.id === state.selectedProjectId) && rows[0]) {
    state.selectedProjectId = rows[0].id;
  }
  renderProjectDetail();
}

function sortAdminTable(button) {
  const table = button.closest(".admin-table");
  if (!table) return;
  const key = button.dataset.sortKey || "year";
  const indexMap = { year: 4, budget: 7, material: 8 };
  const index = indexMap[key];
  const nextDirection = state.sortState[key] === "asc" ? "desc" : "asc";
  state.sortState[key] = nextDirection;
  const valueOf = (row) => {
    const text = row.children[index]?.textContent.trim() || "";
    if (key === "material") {
      const missing = text.match(/\d+/);
      return text.includes("齐") ? 0 : Number(missing?.[0] || 99);
    }
    return Number(text.replace(/[^\d.]/g, "")) || 0;
  };
  const rows = [...table.querySelectorAll(".admin-table-row")].filter((row) => !row.classList.contains("admin-table-head"));
  rows
    .sort((a, b) => {
      const diff = valueOf(a) - valueOf(b);
      return nextDirection === "asc" ? diff : -diff;
    })
    .forEach((row) => table.appendChild(row));
  button.textContent = button.textContent.replace(/[↑↓↕]/g, "") + (nextDirection === "asc" ? " ↑" : " ↓");
}

function renderProjectDetail() {
  const project = projects.find((item) => item.id === state.selectedProjectId) || projects[0];
  $("#projectDetail").innerHTML = `
    <div class="detail-title">
      <h3>${project.name}</h3>
      <span>${project.note}</span>
    </div>
    <div class="detail-grid">
      <div><span>负责人</span><strong>${project.owner}</strong></div>
      <div><span>建设年度</span><strong>${project.year}</strong></div>
      <div><span>预算估算</span><strong>${project.amount} 万</strong></div>
      <div><span>项目优先级</span><strong>${project.priority}</strong></div>
      <div><span>归档完整度</span><strong>${project.archive}%</strong></div>
    </div>
    <div class="progress" aria-hidden="true"><i style="width: ${project.archive}%"></i></div>
    <button class="primary-btn" type="button" data-add-candidate="${project.id}">加入本年立项</button>
    <button class="ghost-btn" type="button" data-screen-link="archive">查看归档材料</button>
  `;
}

function processStatusClass(status) {
  if (status.includes("通过") || status.includes("完成") || status.includes("已")) return "green";
  if (status.includes("退回") || status.includes("缺") || status.includes("延期")) return "amber";
  return "blue";
}

function processSummaryLabel(text) {
  return text.replace(/\s*\d+\s*$/, "").trim();
}

function processSummaryMatches(row, label) {
  if (label === "全部") return true;
  const search = row.dataset.processSearch || "";
  if (search.includes(label)) return true;
  const aliases = {
    草稿: ["新建立项", "后提交"],
    已提交: ["已提交", "申报材料已提交"],
    已入库: ["已入库", "齐全"],
    待预算匹配: ["预算来源待确认", "预算匹配"],
    评审中: ["评审中", "专家评审"],
    已立项: ["已立项", "已生成项目编号"],
    待登记: ["新建采购", "登记"],
    采购论证: ["采购论证"],
    合同待补: ["合同待补", "合同"],
    实施中: ["实施", "上传阶段报告"],
    延期风险: ["延期风险", "延期"],
    待上传: ["上传", "待确认"],
    试运行中: ["试运行中", "试运行"],
    待报告: ["报告"],
    待整改: ["待整改", "整改"],
    可验收: ["可验收"],
    验收中: ["验收"],
    待申请: ["待申请"],
    整改中: ["整改中"],
    通过: ["通过"],
    待审核: ["待审核"],
    审核中: ["审核中"],
    待补齐: ["待补", "缺"],
    待归档: ["待归档"],
    预检通过: ["预检通过"],
    已归档: ["已归档"],
    待确认: ["待确认"],
    待退金: ["待退金"],
    已退金: ["已退金"],
    无需退金: ["无需退金"],
    待结项: ["待结项"],
    已结项: ["已结项"],
    已完成: ["已完成", "完成"]
  };
  return (aliases[label] || [label]).some((item) => search.includes(item));
}

function filterProcessSummary(button) {
  const label = button.dataset.processSummary || processSummaryLabel(button.textContent);
  const card = button.closest(".admin-main-card");
  const rows = card?.querySelectorAll("[data-process-row]") || [];
  let visibleCount = 0;
  card?.querySelectorAll("[data-process-summary]").forEach((item) => item.classList.toggle("is-active", item === button));
  rows.forEach((row) => {
    const matched = processSummaryMatches(row, label);
    row.classList.toggle("is-filtered-out", !matched);
    if (matched) visibleCount += 1;
  });
  const empty = $("#processNodeEmpty");
  if (empty) {
    empty.classList.toggle("is-hidden", visibleCount > 0);
    const emptyLabel = empty.querySelector("strong");
    if (emptyLabel) emptyLabel.textContent = label;
  }
  showToast(`已切换到${label}。`);
}

function renderProcessNode(tab = state.manageTab) {
  const data = processNodeData[tab] || processNodeData.processCreate;
  const title = $("#processNodeTitle");
  const summary = $("#processNodeSummary");
  const rows = $("#processNodeRows");
  if (!title || !summary || !rows) return;

  title.textContent = data.title;
  summary.innerHTML = data.summary.map((item, index) => {
    const label = processSummaryLabel(item);
    return `<button class="${index === 0 ? "is-active" : ""}" type="button" data-process-summary="${label}">${item}</button>`;
  }).join("");
  rows.innerHTML = `
    <div class="admin-table-row admin-table-head">
      <span>编号</span><span>项目名称</span><span>申报部门</span><span>责任人</span><button class="sort-head" type="button" data-action="sortColumn" data-sort-key="year">年度 ↕</button><span>当前节点</span><span>当前任务</span><button class="sort-head" type="button" data-action="sortColumn" data-sort-key="budget">预算/合同 ↕</button><span>材料</span><span>操作</span>
    </div>
    ${data.rows.map((row) => `
      <div class="admin-table-row" data-process-row data-process-search="${row.join(" ")}">
        <span>${row[0]}</span>
        <strong>${row[1]}</strong>
        <span>${row[2]}</span>
        <span>${row[3]}</span>
        <span>${row[4]}</span>
        <span><b class="admin-badge ${processStatusClass(row[5])}">${row[5]}</b></span>
        <span>${row[6]}</span>
        <span>${row[7]}</span>
        <span>${row[8]}</span>
        <span class="row-actions"><button type="button" data-action="applicationDetail">详情</button><button type="button" data-action="projectProgress">进度</button><button type="button" data-action="previewMaterial">材料</button></span>
      </div>
    `).join("")}
    <div class="admin-table-row process-empty-row is-hidden" id="processNodeEmpty"><span>暂无<strong>全部</strong>分类数据</span></div>
  `;
  summary.querySelectorAll("[data-process-summary]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      filterProcessSummary(button);
    });
  });
  rows.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const actionType = button.dataset.detail || button.dataset.action;
      if (actionType === "sortColumn") {
        sortAdminTable(button);
        showToast("已按该字段排序。");
        return;
      }
      openDetail(actionType);
      const copy = {
        applicationDetail: "申报详情已打开。",
        projectProgress: "项目进度已打开。",
        previewMaterial: "材料预览已打开。"
      };
      showToast(copy[actionType] || "详情已打开。");
    });
  });
}

function filterMyProjects() {
  const keyword = $("#myProjectSearch")?.value.trim() || "";
  const year = $("#myProjectYear")?.value || "all";
  const status = $("#myProjectStatus")?.value || "all";
  const material = $("#myMaterialState")?.value || "all";
  const matchedRows = $$("[data-my-project-row]").filter((row) => {
    const nameMatch = !keyword || row.textContent.includes(keyword);
    const yearMatch = year === "all" || row.dataset.year === year;
    const statusMatch = status === "all" || row.dataset.status === status;
    const materialMatch = material === "all" || row.dataset.material === material;
    const bucketMatch = state.myProjectBucket === "all" || row.dataset.bucket === state.myProjectBucket;
    const pendingMatch = !state.myPendingOnly || row.dataset.pending === "true";
    return nameMatch && yearMatch && statusMatch && materialMatch && bucketMatch && pendingMatch;
  });
  const total = matchedRows.length;
  const totalPages = Math.max(1, Math.ceil(total / state.myProjectPageSize));
  state.myProjectPage = Math.min(state.myProjectPage, totalPages);
  const start = (state.myProjectPage - 1) * state.myProjectPageSize;
  const end = start + state.myProjectPageSize;
  $$("[data-my-project-row]").forEach((row) => {
    const index = matchedRows.indexOf(row);
    row.hidden = index === -1 || index < start || index >= end;
  });
  $$("#myProjectStats [data-my-bucket]").forEach((item) => item.classList.toggle("is-active", item.dataset.myBucket === state.myProjectBucket));
  const pageInfo = $("#myProjectPageInfo");
  if (pageInfo) pageInfo.textContent = total ? `共 ${total} 条，当前第 ${state.myProjectPage} / ${totalPages} 页` : "共 0 条";
  const pager = $("#myProjectPager");
  if (pager) {
    pager.innerHTML = `
      <button class="ghost-btn" type="button" data-page-dir="-1" ${state.myProjectPage === 1 ? "disabled" : ""}>上一页</button>
      ${Array.from({ length: totalPages }, (_, index) => `<button class="${state.myProjectPage === index + 1 ? "is-active" : ""}" type="button" data-page-number="${index + 1}">${index + 1}</button>`).join("")}
      <button class="ghost-btn" type="button" data-page-dir="1" ${state.myProjectPage === totalPages ? "disabled" : ""}>下一页</button>
    `;
  }
}

function resetMyProjectFilters() {
  $("#myProjectSearch").value = "";
  $("#myProjectYear").value = "all";
  $("#myProjectStatus").value = "all";
  $("#myMaterialState").value = "all";
}

function openMyProjects(pendingOnly = false) {
  switchScreen("myProjects");
  resetMyProjectFilters();
  state.myProjectBucket = "all";
  state.myProjectPage = 1;
  state.myPendingOnly = pendingOnly;
  filterMyProjects();
}

function openApplyWizardScreen() {
  state.wizardStep = 0;
  switchScreen("applyWizard");
  showToast("已进入新建申报。");
}

function openTodoCenterScreen() {
  switchScreen("todoCenter");
  showToast("已打开全部待办。");
}

function openTodoHandlePage(todo) {
  const step = todo?.type === "可提交" ? 4 : todo?.type === "退回修改" ? 1 : 3;
  state.wizardStep = step;
  switchScreen("applyWizard");
  setWizardStep(step);
  requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  showToast(todo ? `${todo.title}已进入办理页面。` : "已进入申请与审批办理页面。");
}

function openTodoProgress(todo) {
  openDetail("projectProgress");
  showToast(todo ? `${todo.title}整体进度已打开。` : "项目整体进度已打开。");
}

function handleApplicantTodoAction(button) {
  const row = button.closest("[data-todo-index]");
  const todo = applicantTodos[Number(row?.dataset.todoIndex)] || applicantTodos[0];
  if (button.dataset.todoAction === "progress") {
    openTodoProgress(todo);
    return;
  }
  openTodoHandlePage(todo);
}

function openScreenLink(target, pendingOnly = false) {
  if ($("#detailDrawer")?.classList.contains("is-open")) closeDetail();
  if (target === "myProjects") {
    openMyProjects(pendingOnly);
    return;
  }
  if (target === "applyWizard") state.wizardStep = 0;
  switchScreen(target);
}

function addTeamRoleCard(button) {
  const list = button.closest(".team-section")?.querySelector(".team-role-cards");
  if (!list) return false;
  const nextIndex = list.querySelectorAll(".repeat-table-row:not(.repeat-table-head)").length + 1;
  const examples = [
    ["业务联系人", "周老师", "教务处", "zhouls@sdju.edu.cn", "137****8899"],
    ["财务联系人", "陈老师", "财务处", "chen@sdju.edu.cn", "135****7788"],
    ["技术联系人", "赵工", "信息化办公室", "zhaog@sdju.edu.cn", "138****9001"]
  ];
  const item = examples[(nextIndex - 4) % examples.length];
  const row = document.createElement("div");
  row.className = "repeat-table-row is-added";
  row.innerHTML = `
    <strong>角色 ${nextIndex}</strong><span>${item[0]}</span><span>${item[1]}</span><span>${item[2]}</span><span>${item[3]}</span><span>${item[4]}</span><span class="repeat-actions"><button type="button" data-action="teamDetail">详情</button><button type="button" data-action="editProject">编辑</button><button type="button" data-action="removeRepeatRow">删除</button></span>
  `;
  list.appendChild(row);
  row.scrollIntoView({ block: "nearest", behavior: "smooth" });
  return true;
}

function addMilestoneRow(button) {
  const table = button.closest(".repeat-section")?.querySelector(".milestone-table") || button.closest(".team-subpanel")?.querySelector(".milestone-table");
  if (!table) return false;
  const nextIndex = table.querySelectorAll(".repeat-table-row:not(.repeat-table-head)").length + 1;
  const examples = [
    ["2027-01", "上线移交", "赵工", "完成系统上线和运维移交"],
    ["2027-02", "成效复盘", "张工", "整理运行数据和问题清单"],
    ["2027-03", "材料补正", "李老师", "补齐归档与结项材料"]
  ];
  const item = examples[(nextIndex - 5) % examples.length];
  const row = document.createElement("div");
  row.className = "repeat-table-row is-added";
  row.innerHTML = `<strong>计划 ${nextIndex}</strong><span>${item[0]}</span><span>${item[1]}</span><span>${item[2]}</span><span>${item[3]}</span><span class="repeat-actions"><button type="button" data-action="viewDetail" data-detail="contentDetail">详情</button><button type="button" data-action="editProject">编辑</button><button type="button" data-action="removeRepeatRow">删除</button></span>`;
  table.appendChild(row);
  row.scrollIntoView({ block: "nearest", behavior: "smooth" });
  return true;
}

function removeRepeatRow(button) {
  const row = button.closest(".repeat-table-row, .admin-table-row");
  if (!row || row.classList.contains("repeat-table-head") || row.classList.contains("admin-table-head")) return false;
  row.remove();
  return true;
}

function toggleRepeatSection(button) {
  const section = button.closest(".repeat-section");
  if (!section) return false;
  const collapsed = section.classList.toggle("is-collapsed");
  button.textContent = collapsed ? "⌄" : "⌃";
  button.setAttribute("aria-label", collapsed ? "展开" : "收起");
  return true;
}

function repeatRowData(row) {
  const cells = [...row.children].filter((cell) => !cell.classList.contains("repeat-actions"));
  return cells.map((cell) => cell.textContent.trim());
}

function openCustomDetail({ eyebrow, title, meta, body }) {
  $("#detailEyebrow").textContent = eyebrow;
  $("#detailTitle").textContent = title;
  $("#detailMeta").textContent = meta;
  $("#detailBody").innerHTML = body;
  $("#detailDrawer").classList.add("is-open");
  $("#detailDrawer").setAttribute("aria-hidden", "false");
}

function openRepeatRowDetail(button, mode = "detail") {
  const row = button.closest(".repeat-table-row");
  if (!row || row.classList.contains("repeat-table-head")) return false;
  const section = button.closest(".repeat-section");
  const values = repeatRowData(row);
  const isEdit = mode === "edit";

  if (section?.classList.contains("team-section")) {
    const [label, role, name, dept, email, phone] = values;
    openCustomDetail({
      eyebrow: isEdit ? "团队角色维护" : "团队角色详情",
      title: `${role}：${name}`,
      meta: `${label} · ${dept}`,
      body: isEdit ? `
        <div class="detail-form">
          <label><span>团队角色</span><input value="${role}" /></label>
          <label><span>姓名</span><input value="${name}" /></label>
          <label><span>部门</span><input value="${dept}" /></label>
          <label><span>邮箱</span><input value="${email}" /></label>
          <label><span>手机号</span><input value="${phone}" /></label>
          <label><span>职责说明</span><input value="负责${role}相关材料确认和流程跟进" /></label>
        </div>
        <div class="inline-action-row">
          <button class="primary-btn" type="button" data-close-detail>保存</button>
          <button class="ghost-btn" type="button" data-close-detail>取消</button>
        </div>
      ` : `
        <div class="detail-table team-col">
          <div><span>字段</span><span>内容</span></div>
          <div><strong>团队角色</strong><span>${role}</span></div>
          <div><strong>姓名</strong><span>${name}</span></div>
          <div><strong>部门</strong><span>${dept}</span></div>
          <div><strong>邮箱</strong><span>${email}</span></div>
          <div><strong>手机号</strong><span>${phone}</span></div>
          <div><strong>职责</strong><span>负责${role}相关材料确认、节点提醒和后续补正。</span></div>
        </div>
      `
    });
    return true;
  }

  if (section?.classList.contains("milestone-repeat-section")) {
    const [label, date, eventName, owner, note] = values;
    openCustomDetail({
      eyebrow: isEdit ? "里程碑维护" : "里程碑详情",
      title: eventName,
      meta: `${label} · ${date} · ${owner}`,
      body: isEdit ? `
        <div class="detail-form">
          <label><span>日期</span><input value="${date}" /></label>
          <label><span>里程碑事件</span><input value="${eventName}" /></label>
          <label><span>责任人</span><input value="${owner}" /></label>
          <label class="full-row"><span>备注</span><textarea>${note}</textarea></label>
        </div>
        <div class="inline-action-row">
          <button class="primary-btn" type="button" data-close-detail>保存</button>
          <button class="ghost-btn" type="button" data-close-detail>取消</button>
        </div>
      ` : `
        <div class="detail-table">
          <div><span>字段</span><span>内容</span></div>
          <div><strong>日期</strong><span>${date}</span></div>
          <div><strong>里程碑事件</strong><span>${eventName}</span></div>
          <div><strong>责任人</strong><span>${owner}</span></div>
          <div><strong>备注</strong><span>${note}</span></div>
          <div><strong>后续提醒</strong><span>提交后将同步到项目进度和待办提醒。</span></div>
        </div>
      `
    });
    return true;
  }

  return false;
}

function handleRepeatSectionAction(button) {
  const actionType = button.dataset.detail || button.dataset.action;
  if (actionType === "addTeamRole") {
    if (addTeamRoleCard(button)) showToast("已新增一名团队角色。");
    return true;
  }
  if (actionType === "addMilestone") {
    if (addMilestoneRow(button)) showToast("已新增一条项目里程碑。");
    return true;
  }
  if (actionType === "removeRepeatRow") {
    if (removeRepeatRow(button)) showToast("已删除当前行。");
    return true;
  }
  if (actionType === "teamDetail" || actionType === "contentDetail" || actionType === "viewDetail") {
    if (openRepeatRowDetail(button, "detail")) showToast("详情已打开。");
    return true;
  }
  if (actionType === "editProject") {
    if (openRepeatRowDetail(button, "edit")) showToast("编辑页已打开。");
    return true;
  }
  if (actionType === "downloadTemplate") {
    openDetail("downloadTemplate");
    showToast("模板导入说明已打开。");
    return true;
  }
  return false;
}

function openSubmitSuccessDetail() {
  openCustomDetail({
    eyebrow: "提交成功",
    title: "网络安全态势感知平台已提交立项",
    meta: "已进入我的项目 · 当前节点：立项审核",
    body: `
      <div class="detail-stat-grid">
        <article><span>提交结果</span><strong>已提交成功</strong></article>
        <article><span>当前节点</span><strong>立项审核</strong></article>
        <article><span>下一步</span><strong>预算测算表确认</strong></article>
        <article><span>预计提醒</span><strong>3 个节点</strong></article>
      </div>
      <section class="detail-section">
        <h3>后续项目里程碑</h3>
        <div class="progress-milestone-list">
          <article class="active"><b>1</b><strong>立项审核</strong><span>信息办确认申报材料、归口部门意见和预算口径。</span></article>
          <article><b>2</b><strong>预算匹配</strong><span>补齐预算测算表后，进入年度经费池匹配。</span></article>
          <article><b>3</b><strong>采购论证</strong><span>立项通过后提交采购论证材料、供应商资料和合同信息。</span></article>
          <article><b>4</b><strong>实施试运行</strong><span>完成建设实施、联调测试和试运行报告。</span></article>
          <article><b>5</b><strong>验收归档</strong><span>提交验收申请、验收意见、归档移交和结项材料。</span></article>
        </div>
      </section>
    `
  });
}

function pinAdminRow(button) {
  const row = button.closest(".admin-table-row");
  const table = row?.parentElement;
  const head = table?.querySelector(".admin-table-head");
  if (!row || !table || row.classList.contains("admin-table-head")) return false;
  const pinned = !row.classList.contains("is-pinned");
  row.classList.toggle("is-pinned", pinned);
  button.classList.toggle("is-active", pinned);
  button.textContent = pinned ? "★" : "☆";
  button.setAttribute("aria-pressed", String(pinned));
  button.setAttribute("title", pinned ? "已置顶" : "置顶项目");
  const codeCell = row.firstElementChild;
  if (pinned && codeCell && !codeCell.querySelector(".pin-flag")) {
    codeCell.insertAdjacentHTML("beforeend", `<b class="pin-flag">置顶</b>`);
  }
  if (!pinned) codeCell?.querySelector(".pin-flag")?.remove();
  if (pinned) table.insertBefore(row, head?.nextElementSibling || table.firstElementChild?.nextElementSibling);
  return true;
}

function filterLedgerSummary(button) {
  const filter = button.dataset.ledgerFilter || "all";
  const rowLabels = {
    all: "全部项目",
    pending: "待处理项目",
    approval: "待立项项目",
    missing: "缺材料项目",
    archive: "待归档项目"
  };
  const card = button.closest(".admin-main-card");
  card?.querySelectorAll("[data-ledger-filter]").forEach((item) => item.classList.toggle("is-active", item === button));
  card?.querySelectorAll("[data-ledger-row]").forEach((row) => {
    const buckets = (row.dataset.ledgerBucket || "").split(/\s+/);
    row.classList.toggle("is-filtered-out", filter !== "all" && !buckets.includes(filter));
  });
  showToast(`已切换到${rowLabels[filter] || "当前分类"}。`);
  return true;
}

function handleDirectDetailAction(button) {
  const actionType = button.dataset.detail || button.dataset.action;
  if (actionType === "pinRow") {
    if (pinAdminRow(button)) {
      showToast(button.classList.contains("is-active") ? "项目已置顶。" : "已取消置顶。");
      return true;
    }
  }
  if (actionType === "addTeamRole") {
    if (addTeamRoleCard(button)) {
      showToast("已新增一名团队角色。");
      return true;
    }
  }
  if (actionType === "addMilestone") {
    if (addMilestoneRow(button)) {
      showToast("已新增一条项目里程碑。");
      return true;
    }
  }
  if (actionType === "removeRepeatRow") {
    if (removeRepeatRow(button)) {
      showToast("已删除当前行。");
      return true;
    }
  }
  const detailActions = new Set([
    "viewDetail",
    "previewMaterial",
    "downloadTemplate",
    "useTemplate",
    "fieldConfig",
    "uploadMaterial",
    "todoDetail",
    "reminderDetail",
    "applicationDetail",
    "fullProcessDetail",
    "projectProgress",
    "quickProcess",
    "prepApply",
    "prepBudget",
    "prepPurchase",
    "prepArchive"
  ]);
  if (detailActions.has(actionType)) {
    openDetail(actionType);
    const copy = {
      previewMaterial: "材料预览已打开。",
      downloadTemplate: "模板文件已开始下载。",
      useTemplate: "模板已加入当前填报。",
      fieldConfig: "字段设置已打开。",
      uploadMaterial: "已打开附件上传。",
      todoDetail: "待办详情已打开。",
      reminderDetail: "提醒详情已打开。",
      applicationDetail: "申报详情已打开。",
      fullProcessDetail: "全流程详情已打开。",
      projectProgress: "项目进度已打开。",
      quickProcess: "已打开当前待办办理。",
      prepApply: "已联动申报模板。",
      prepBudget: "已联动预算模板。",
      prepPurchase: "已联动采购模板。",
      prepArchive: "已联动归档模板."
    };
    showToast(copy[actionType] || "详情已打开。");
    return true;
  }
  if (actionType === "searchList" || actionType === "searchMyProjects") {
    if (actionType === "searchMyProjects") {
      state.myPendingOnly = false;
      state.myProjectPage = 1;
      filterMyProjects();
    }
    showToast("已按条件查询。");
    return true;
  }
  return false;
}

function placeAdminListActions() {
  $$("#manage .admin-main-card").forEach((card) => {
    const head = card.querySelector(":scope > .admin-card-head");
    const query = card.querySelector(":scope > .admin-query-panel");
    if (!head || !query) return;
    const actions = head.querySelector(".admin-head-actions") || card.querySelector(":scope > .admin-head-actions");
    if (!actions) return;
    const actionOrder = ["searchList", "fieldConfig", "uploadMaterial", "exportReport"];
    [...actions.children]
      .sort((left, right) => {
        const leftIndex = actionOrder.indexOf(left.dataset.action);
        const rightIndex = actionOrder.indexOf(right.dataset.action);
        return (leftIndex === -1 ? actionOrder.length : leftIndex) - (rightIndex === -1 ? actionOrder.length : rightIndex);
      })
      .forEach((button) => actions.appendChild(button));
    actions.classList.add("query-actions-row");
    query.insertAdjacentElement("afterend", actions);
  });
}

function bindDirectShortcuts() {
  $("#wizardNext")?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    setWizardStep(state.wizardStep + 1);
    showToast("已进入下一步。");
  });
  $("#wizardPrev")?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    setWizardStep(state.wizardStep - 1);
  });
  $$("[data-wizard-step]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      setWizardStep(button.dataset.wizardStep);
    });
  });
  $$('[data-action="openApplyWizard"]').forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      openApplyWizardScreen();
    });
  });
  $$('[data-action="openTodoCenter"]').forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      openTodoCenterScreen();
    });
  });
  $$("[data-screen-link]").forEach((button) => {
    button.addEventListener("click", (event) => {
      const target = button.dataset.screenLink;
      if (!screens[target]) return;
      event.preventDefault();
      event.stopPropagation();
      openScreenLink(target, button.dataset.myPending === "true");
    });
  });
  $("#myProjectStats")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-my-bucket]");
    if (!button) return;
    event.preventDefault();
    event.stopPropagation();
    state.myProjectBucket = button.dataset.myBucket;
    state.myPendingOnly = false;
    state.myProjectPage = 1;
    filterMyProjects();
  });
  $("#materialStageToolbar")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-prep-filter]");
    if (!button) return;
    event.preventDefault();
    event.stopPropagation();
    state.selectedPrepStage = button.dataset.prepFilter;
    state.selectedTemplate = "all";
    $$("#templateFilter .chip").forEach((item) => item.classList.toggle("is-active", item.dataset.template === "all"));
    renderTemplates();
  });
  $("#portalTodoPageSize")?.addEventListener("change", (event) => {
    state.portalTodoPageSize = Number(event.currentTarget.value) || 3;
    state.portalTodoPage = 1;
    renderApplicantTodos();
  });
  $("#portalTodoPageButtons")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-portal-page]");
    if (!button || button.disabled) return;
    event.preventDefault();
    const page = button.dataset.portalPage;
    const totalPages = Math.max(1, Math.ceil(applicantTodos.length / state.portalTodoPageSize));
    if (page === "prev") state.portalTodoPage -= 1;
    else if (page === "next") state.portalTodoPage += 1;
    else state.portalTodoPage = Number(page) || 1;
    state.portalTodoPage = Math.min(Math.max(1, state.portalTodoPage), totalPages);
    renderApplicantTodos();
  });
  $("#applicantTodoList")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-todo-action]");
    if (!button) return;
    event.preventDefault();
    event.stopPropagation();
    handleApplicantTodoAction(button);
  });
  $$(
    '.todo-table [data-action], .my-project-table [data-action], .progress-table [data-action], .attachment-check-table [data-action], #manage [data-action="fieldConfig"], #manage [data-action="uploadMaterial"], #manage [data-action="previewMaterial"], #manage [data-action="applicationDetail"], #manage [data-action="projectProgress"]'
  ).forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      handleDirectDetailAction(button);
    });
  });
  $$(".metric-card[data-action]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      openDetail(button.dataset.action);
      const metricCopy = {
        statTotal: "项目总数明细已打开。",
        statApproved: "已立项项目明细已打开。",
        statBuilding: "建设中项目明细已打开。",
        statCompleted: "已完成项目明细已打开。",
        statInvestment: "投资明细已打开。"
      };
      showToast(metricCopy[button.dataset.action] || "统计明细已打开。");
    });
  });
}

function setManageTab(tab) {
  state.manageTab = tab;
  const manageLabels = {
    business: "项目台账",
    applications: "立项申报",
    processCreate: "新建立项",
    processReview: "立项审核",
    processPurchase: "新建采购",
    processImplement: "实施",
    processTrial: "试运行",
    processAcceptance: "验收",
    processAcceptanceReview: "验收审核",
    processArchive: "归档",
    processRefund: "退金",
    processClose: "结项",
    overview: "项目详情",
    content: "采购管理",
    team: "项目团队维护",
    plan: "项目计划管理",
    acceptance: "验收管理",
    fund: "立项审核",
    docs: "资料维护",
    changes: "项目变更记录",
    logs: "操作日志"
  };
  const manageHero = {
    business: ["项目台账", "统一查询项目、经费、材料和归档状态", "支持查询、字段配置和导出"],
    applications: ["立项申报", "流程节点：新建立项", "查看申请批次、项目类型、提交状态和关联项目"],
    processCreate: processNodeData.processCreate.hero,
    processReview: processNodeData.processReview.hero,
    processPurchase: processNodeData.processPurchase.hero,
    processImplement: processNodeData.processImplement.hero,
    processTrial: processNodeData.processTrial.hero,
    processAcceptance: processNodeData.processAcceptance.hero,
    processAcceptanceReview: processNodeData.processAcceptanceReview.hero,
    processArchive: processNodeData.processArchive.hero,
    processRefund: processNodeData.processRefund.hero,
    processClose: processNodeData.processClose.hero,
    overview: ["项目详情", "查看单个项目从新建立项到结项的完整档案", "当前阶段：立项审核", "材料：缺 1 项"],
    content: ["采购管理", "流程节点：新建采购、实施、试运行", "只做过程文件、结果文件、合同和报告归集"],
    team: ["项目团队维护", "维护负责人、归口负责人、实施联系人和职责", "团队角色：3", "联系方式齐全"],
    plan: ["项目计划管理", "跟进里程碑、阶段计划和延期风险", "当前节点：立项", "计划完成：2026-12"],
    acceptance: ["验收管理", "流程节点：验收、验收审核、整改完善和通过记录", "通过后进入归档结项"],
    fund: ["立项审核", "流程节点：立项审核、预算匹配、资金编号和预算来源确认", "审核通过后进入采购管理"],
    docs: ["资料维护", "维护用户端模板中心可见的制度、清单、模板和填报样例", "发布后用户可下载或带入申报"],
    changes: ["项目变更记录", "追踪预算、周期、材料和责任人调整", "本月变更：12", "待确认：3"],
    logs: ["操作日志", "查看业务操作、审批流转和材料变更记录", "今日记录：18", "支持导出"]
  };
  const activePanel = processNodeTabs.has(tab) ? "processNode" : tab;
  $$("[data-manage-tab]").forEach((item) => item.classList.toggle("is-active", item.dataset.manageTab === tab));
  $$("[data-manage-panel]").forEach((item) => item.classList.toggle("is-active", item.dataset.managePanel === activePanel));
  $$("[data-screen]").forEach((item) => {
    const active = item.dataset.screen === "manage" && (!item.dataset.manageOpen || item.dataset.manageOpen === tab);
    if (item.dataset.screen === "manage") item.classList.toggle("is-active", active);
  });
  const label = manageLabels[tab] || screens.manage.title;
  const adminBreadcrumbCurrent = $("#adminBreadcrumbCurrent");
  if (adminBreadcrumbCurrent && state.screen === "manage") adminBreadcrumbCurrent.textContent = label;
  $("#manage")?.classList.toggle("is-process-node", processNodeTabs.has(tab));
  const hero = manageHero[tab];
  const heroTitle = $("#adminHeroTitle");
  const heroMeta = $("#adminHeroMeta");
  if (hero && heroTitle && heroMeta) {
    heroTitle.textContent = hero[0];
    heroMeta.innerHTML = hero.slice(1).map((item) => `<span>${item}</span>`).join("<i></i>");
  }
  if (processNodeTabs.has(tab)) renderProcessNode(tab);
}

function renderCandidates() {
  $("#candidateList").innerHTML = projects
    .filter((project) => project.year === "2026")
    .map((project) => `
      <label class="candidate ${state.selectedCandidateIds.has(project.id) ? "is-selected" : ""}">
        <input type="checkbox" value="${project.id}" ${state.selectedCandidateIds.has(project.id) ? "checked" : ""} />
        <div>
          <strong>${project.name}</strong>
          <span>${project.owner} · ${project.amount} 万 · ${project.status}</span>
          <div class="candidate-tags">
            <b>${project.priority}</b>
            <em>${project.status === "需完善" ? "需补材料" : "可匹配"}</em>
            <em>完整度 ${project.archive}%</em>
          </div>
        </div>
      </label>
    `)
    .join("");
}

function renderBudgetPool() {
  $("#budgetPool").innerHTML = budgets
    .map((budget) => {
      const percent = Math.round((budget.used / budget.total) * 100);
      return `
        <button class="budget-card ${budget.id === state.selectedBudgetId ? "is-selected" : ""}" type="button" data-budget-id="${budget.id}">
          <strong>${budget.name}</strong>
          <span>${budget.code} · ${budget.nature} · ${budget.owner}</span>
          <span>${budget.scope}</span>
          <div class="budget-line"><span>已占用 ${budget.used} 万</span><strong>余额 ${budget.total - budget.used} 万</strong></div>
          <div class="progress" aria-hidden="true"><i style="width: ${percent}%"></i></div>
        </button>
      `;
    })
    .join("");
}

function updateBudgetSummary() {
  const selectedProjects = projects.filter((project) => state.selectedCandidateIds.has(project.id));
  const selectedBudget = budgets.find((budget) => budget.id === state.selectedBudgetId);
  const total = selectedProjects.reduce((sum, item) => sum + item.amount, 0);
  const balance = selectedBudget ? selectedBudget.total - selectedBudget.used - total : 0;
  const balanceBefore = selectedBudget ? selectedBudget.total - selectedBudget.used : 0;
  const percent = balanceBefore ? Math.min(100, Math.round((total / balanceBefore) * 100)) : 0;
  const riskText = total === 0 ? "待确认" : balance < 0 ? "余额不足" : "可生成";

  $("#matchTotal").textContent = `${total} 万`;
  $("#balanceLeft").textContent = `${balance} 万`;
  $("#balanceLeft").style.color = balance < 0 ? "var(--red)" : "var(--green)";
  $("#matchBar").style.width = `${percent}%`;
  $("#budgetMetricSelected").textContent = `${total} 万`;
  $("#budgetMetricCount").textContent = selectedProjects.length ? `已选 ${selectedProjects.length} 个项目` : "未选择项目";
  $("#budgetRiskText").textContent = riskText;
  $("#budgetRiskText").style.color = balance < 0 ? "var(--red)" : "var(--blue)";
  $("#matchStatus").textContent = balance < 0 ? "余额不足" : total ? "可生成" : "可测算";
  $("#matchStatus").classList.toggle("is-risk", balance < 0);
  $("#matchText").textContent = selectedBudget
    ? `${selectedBudget.name}，${balance < 0 ? "余额不足，请调整项目或预算。" : "匹配可用，可生成立项单。"}`
    : "请选择预算。";
  $("#selectedProjects").innerHTML = selectedProjects.length
    ? selectedProjects.map((project) => `<div><span>${project.name}</span><strong>${project.amount} 万</strong></div>`).join("")
    : `<div><span>未选择项目</span><strong>0 万</strong></div>`;
  $("#createInitiation").disabled = total === 0 || balance < 0;
}

function renderBudget() {
  renderCandidates();
  renderBudgetPool();
  updateBudgetSummary();
}

function materialClass(status) {
  if (status === "缺失") return "is-missing";
  if (status === "已确认") return "is-fixed";
  return "";
}

function materialStatus(status) {
  if (status === "缺失") return `<b class="status amber">缺失</b>`;
  if (status === "待生成") return `<b class="status blue">待生成</b>`;
  return `<b class="status green">已确认</b>`;
}

function archiveStatusClass(status) {
  if (status === "已归档" || status === "已结项") return "green";
  if (status === "待归档") return "blue";
  return "amber";
}

function filteredArchiveProjects() {
  const keyword = $("#archiveSearch")?.value.trim() || "";
  const code = $("#archiveCodeSearch")?.value.trim() || "";
  const year = $("#archiveYear")?.value || "all";
  const status = $("#archiveStatus")?.value || "all";
  const department = $("#archiveDepartment")?.value || "all";
  return archiveProjects.filter((project) => {
    const keywordMatch = !keyword || `${project.name}${project.owner}`.includes(keyword);
    const codeMatch = !code || project.code.includes(code);
    const yearMatch = year === "all" || project.year === year;
    const statusMatch = status === "all" || project.status === status;
    const departmentMatch = department === "all" || project.department === department;
    return keywordMatch && codeMatch && yearMatch && statusMatch && departmentMatch;
  });
}

function archiveMaterialList(project) {
  if (project.id === 1) return materials;
  if (project.missing === 0) {
    return [
      { id: 21, stage: "申报", name: "项目申报书", status: "已确认" },
      { id: 22, stage: "采购", name: "合同与成交通知", status: "已确认" },
      { id: 23, stage: "验收", name: "验收报告", status: "已确认" },
      { id: 24, stage: "归档", name: "归档移交清单", status: "已确认" },
      { id: 25, stage: "退金", name: "退金确认记录", status: "已确认" },
      { id: 26, stage: "结项", name: "项目结项单", status: "已确认" }
    ];
  }
  return [
    { id: 31, stage: "申报", name: "项目申报书", status: "已确认" },
    { id: 32, stage: "预算", name: "预算测算表", status: "已确认" },
    { id: 33, stage: "验收", name: "验收意见签字页", status: "缺失" },
    { id: 34, stage: "归档", name: "归档移交清单", status: "待生成" },
    { id: 35, stage: "退金", name: "退金确认记录", status: project.status === "待退金" ? "待生成" : "已确认" },
    { id: 36, stage: "结项", name: "项目结项单", status: project.status === "已结项" ? "已确认" : "待生成" }
  ];
}

function renderArchiveRows() {
  const rows = filteredArchiveProjects();
  if (!rows.some((project) => project.id === state.selectedArchiveId) && rows[0]) {
    state.selectedArchiveId = rows[0].id;
  }
  const archiveDate = (project) => {
    const dates = {
      1: "2026-06-28",
      2: "2026-06-24",
      3: "2025-06-18",
      4: "2024-05-30"
    };
    return dates[project.id] || `20${project.updated}`;
  };
  $("#archiveRows").innerHTML = `
    <div class="archive-table-row archive-table-head"><span>项目编号</span><span>项目名称</span><span>所属单位</span><span>建设年度</span><span>收尾状态</span><span>更新时间</span><span>归档版本</span><span>操作</span></div>
    ${rows.map((project) => `
      <div class="archive-table-row ${project.id === state.selectedArchiveId ? "is-selected" : ""}">
        <span>${project.code}</span>
        <strong>${project.name}</strong>
        <span>${project.department}</span>
        <span>${project.year}</span>
        <span><b class="status ${archiveStatusClass(project.status)}">${project.status}</b></span>
        <span>${archiveDate(project)}</span>
        <span>V1.${project.id === 4 ? "1" : "0"}</span>
        <span class="row-actions archive-actions"><button type="button" data-archive-id="${project.id}" data-action="archiveProjectDetail">查看</button><button type="button" data-action="downloadTemplate">下载</button><button type="button" data-action="viewDetail" data-detail="versionRecord">版本记录</button></span>
      </div>
    `).join("")}
  `;
}

function renderMaterials() {
  const project = archiveProjects.find((item) => item.id === state.selectedArchiveId) || archiveProjects[0];
  const list = archiveMaterialList(project);
  const fixed = list.filter((item) => item.status === "已确认").length;
  const percent = Math.round((fixed / list.length) * 100);
  const missing = list.filter((item) => item.status === "缺失").length;
  renderArchiveRows();
  $("#archiveProjectTitle").textContent = project.name;
  $("#archiveProjectMeta").textContent = `${project.code} · ${project.department} · ${project.owner}`;
  $("#archiveScore").textContent = `${percent}%`;
  $("#archiveCopy").textContent = missing ? `还差 ${missing} 项必填材料，补齐后才能进入退金/结项。` : "必填材料已齐，可生成归档包并推进退金或结项。";
  $("#archivePack").textContent = missing ? "生成预检清单" : "生成归档包";
  $("#materialsList").innerHTML = list.map((item) => `
    <article class="material-item ${materialClass(item.status)}">
      <div>
        <strong>${item.name}</strong>
        <span>${item.stage}阶段</span>
      </div>
      ${materialStatus(item.status)}
      ${item.status === "缺失" && project.id === 1
        ? `<button class="plain-btn" type="button" data-fix-material="${item.id}">补齐</button>`
        : `<button class="plain-btn" type="button" data-action="previewMaterial">查看</button>`}
    </article>
  `).join("");
}

function renderTemplates() {
  const keyword = $("#templateSearch")?.value.trim() || "";
  const stageData = materialStageData[state.selectedPrepStage] || materialStageData.apply;
  const list = templates.filter((item) => {
    const stageMatch = item.stage === state.selectedPrepStage;
    const typeMatch = state.selectedTemplate === "all" || item.type === state.selectedTemplate;
    const keywordMatch = !keyword || `${item.name}${item.type}${item.desc}`.includes(keyword);
    return stageMatch && typeMatch && keywordMatch;
  });

  const templateIcon = (type) => {
    if (type === "采购") return "icon-material.png";
    if (type === "验收") return "icon-shield.png";
    if (type === "归档") return "icon-database.png";
    return "icon-template.png";
  };

  $$("#materialStageToolbar [data-prep-filter]").forEach((item) => item.classList.toggle("is-active", item.dataset.prepFilter === state.selectedPrepStage));
  const stageNote = $("#templateStageNote");
  if (stageNote) stageNote.textContent = stageData.templateNote;
  const referenceNote = $("#materialReferenceNote");
  if (referenceNote) referenceNote.textContent = stageData.note;
  const checklist = $("#stageChecklistList");
  if (checklist) {
    checklist.innerHTML = stageData.references.map(([icon, title, desc, action]) => `
      <button type="button" data-action="downloadTemplate">
        <img src="./assets/${icon}" alt="" />
        <span><strong>${title}</strong><em>${desc}</em></span>
        <b>${action}</b>
      </button>
    `).join("");
  }

  $("#templateGrid").innerHTML = list.map((item) => `
    <article class="template-card">
      <img src="./assets/${templateIcon(item.type)}" alt="" />
      <div class="template-copy">
        <span>${item.type} · ${item.version}</span>
        <strong>${item.name}</strong>
        <span>${item.desc}</span>
      </div>
      <div class="template-actions">
        <button class="plain-btn" type="button" data-action="useTemplate">使用模板</button>
        <button class="ghost-btn" type="button" data-action="downloadTemplate">下载模板</button>
      </div>
    </article>
  `).join("") || `<article class="template-empty">当前条件下暂无模板，请切换阶段或类型。</article>`;
  $$("#stageChecklistList [data-action], #templateGrid [data-action]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      handleDirectDetailAction(button);
    });
  });
}

function selectTemplateType(type) {
  state.selectedTemplate = type;
  $$("#templateFilter .chip").forEach((item) => item.classList.toggle("is-active", item.dataset.template === type));
  renderTemplates();
}

function openCalendarEvent(type) {
  state.selectedCalendarEvent = type;
  const data = {
    material: ["材料截止", "预算测算表补交截止", "网络安全态势感知平台需在 5 月 3 日前补齐预算测算表，补齐后进入立项评审。"],
    review: ["立项评审", "网络安全态势感知平台立项评审会", "评审重点为建设必要性、预算测算、团队角色和采购判断。"],
    midterm: ["中期检查", "统一身份认证平台升级中期检查", "检查实施计划、会议纪要、阶段报告和试运行准备情况。"],
    purchase: ["采购材料", "采购论证材料提交截止", "需提交采购论证表、供应商资料、合同草稿和采购方式说明。"],
    acceptance: ["验收截止", "数据中心存储扩容验收材料截止", "需提交试运行报告、验收申请、验收意见和签字材料。"]
  }[type] || ["项目节点", "项目节点", "查看项目概况和下一步要求。"];
  $("#calendarEventTag").textContent = data[0];
  $("#calendarEventTitle").textContent = data[1];
  $("#calendarEventDesc").textContent = data[2];
  $("#calendarEventPopover").classList.add("is-open");
}

function bindEvents() {
  bindDirectShortcuts();

  $("#avatarButton").addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = $("#avatarPopover").classList.toggle("is-open");
    $("#avatarButton").setAttribute("aria-expanded", String(isOpen));
  });

  $("#enterAdmin").addEventListener("click", (event) => {
    event.stopPropagation();
    setMode("admin", "leader");
    closeAvatarMenu();
  });

  $("#backPortal").addEventListener("click", (event) => {
    event.stopPropagation();
    setMode("applicant", "portal");
    closeAvatarMenu();
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".user-menu")) closeAvatarMenu();
  });

  document.body.addEventListener("click", (event) => {
    if (event.target.closest("[data-close-detail]")) {
      closeDetail();
      return;
    }

    const pinButton = event.target.closest('.star-btn[data-action="pinRow"]');
    if (pinButton) {
      event.preventDefault();
      event.stopPropagation();
      if (pinAdminRow(pinButton)) showToast(pinButton.classList.contains("is-active") ? "项目已置顶。" : "已取消置顶。");
      return;
    }

    const navToggle = event.target.closest("[data-nav-toggle]");
    if (navToggle) {
      event.preventDefault();
      event.stopPropagation();
      toggleNavGroup(navToggle);
      return;
    }

    const nav = event.target.closest("[data-screen]");
    if (nav) {
      if (nav.dataset.screen === "myProjects") {
        openMyProjects(false);
      } else {
        switchScreen(nav.dataset.screen);
      }
      if (nav.dataset.manageOpen) setManageTab(nav.dataset.manageOpen);
      return;
    }

    const ledgerFilter = event.target.closest("[data-ledger-filter]");
    if (ledgerFilter) {
      event.preventDefault();
      event.stopPropagation();
      filterLedgerSummary(ledgerFilter);
      return;
    }

    const screenLink = event.target.closest("[data-screen-link]");
    if (screenLink) {
      openScreenLink(screenLink.dataset.screenLink, screenLink.dataset.myPending === "true");
      return;
    }

    const wizardStep = event.target.closest("[data-wizard-step]");
    if (wizardStep) {
      setWizardStep(wizardStep.dataset.wizardStep);
      return;
    }

    if (event.target.closest("#wizardNext")) {
      setWizardStep(state.wizardStep + 1);
      showToast("已进入下一步。");
      return;
    }

    if (event.target.closest("#wizardPrev")) {
      setWizardStep(state.wizardStep - 1);
      return;
    }

    const repeatCollapse = event.target.closest(".repeat-collapse");
    if (repeatCollapse) {
      event.preventDefault();
      event.stopPropagation();
      if (toggleRepeatSection(repeatCollapse)) showToast(repeatCollapse.closest(".repeat-section")?.classList.contains("is-collapsed") ? "已收起该模块。" : "已展开该模块。");
      return;
    }

    const repeatTitle = event.target.closest(".repeat-section-title");
    if (repeatTitle) {
      const button = repeatTitle.querySelector(".repeat-collapse");
      if (button) {
        event.preventDefault();
        event.stopPropagation();
        if (toggleRepeatSection(button)) showToast(button.closest(".repeat-section")?.classList.contains("is-collapsed") ? "已收起该模块。" : "已展开该模块。");
        return;
      }
    }

    const repeatAction = event.target.closest(".repeat-section [data-action]");
    if (repeatAction) {
      event.preventDefault();
      event.stopPropagation();
      if (handleRepeatSectionAction(repeatAction)) return;
    }

    const myBucket = event.target.closest("[data-my-bucket]");
    if (myBucket) {
      state.myProjectBucket = myBucket.dataset.myBucket;
      state.myPendingOnly = false;
      state.myProjectPage = 1;
      filterMyProjects();
      return;
    }

    const myPageNumber = event.target.closest("#myProjectPager [data-page-number]");
    if (myPageNumber) {
      state.myProjectPage = Number(myPageNumber.dataset.pageNumber) || 1;
      filterMyProjects();
      return;
    }

    const myPageDir = event.target.closest("#myProjectPager [data-page-dir]");
    if (myPageDir) {
      state.myProjectPage += Number(myPageDir.dataset.pageDir) || 0;
      filterMyProjects();
      return;
    }

    const prepFilter = event.target.closest("[data-prep-filter]");
    if (prepFilter) {
      state.selectedPrepStage = prepFilter.dataset.prepFilter;
      state.selectedTemplate = "all";
      $$("#templateFilter .chip").forEach((item) => item.classList.toggle("is-active", item.dataset.template === "all"));
      renderTemplates();
      return;
    }

    const manageTab = event.target.closest("[data-manage-tab]");
    if (manageTab) {
      setManageTab(manageTab.dataset.manageTab);
      return;
    }

    const manageOpen = event.target.closest("[data-manage-open]");
    if (manageOpen) {
      setManageTab(manageOpen.dataset.manageOpen);
      showToast("已打开项目详情。");
      return;
    }

    const progressNode = event.target.closest("[data-progress-node]");
    if (progressNode) {
      state.selectedProgressNode = progressNode.dataset.progressNode;
      updateProgressNodeDetail();
      const node = progressStages.find((item) => item.key === state.selectedProgressNode);
      showToast(`已切换到${node?.title || "当前"}环节。`);
      return;
    }

    const projectRow = event.target.closest("[data-project-id]");
    if (projectRow) {
      state.selectedProjectId = Number(projectRow.dataset.projectId);
      renderProjectRows();
    }

    const archiveRow = event.target.closest("[data-archive-id]");
    if (archiveRow) {
      state.selectedArchiveId = Number(archiveRow.dataset.archiveId);
      renderMaterials();
    }

    const addCandidate = event.target.closest("[data-add-candidate]");
    if (addCandidate) {
      state.selectedCandidateIds.add(Number(addCandidate.dataset.addCandidate));
      renderBudget();
      switchScreen("budget");
      showToast("已加入本年立项候选。");
    }

    const budgetCard = event.target.closest("[data-budget-id]");
    if (budgetCard) {
      state.selectedBudgetId = Number(budgetCard.dataset.budgetId);
      renderBudget();
    }

    const fixMaterial = event.target.closest("[data-fix-material]");
    if (fixMaterial) {
      const material = materials.find((item) => item.id === Number(fixMaterial.dataset.fixMaterial));
      material.status = "已确认";
      renderMaterials();
      showToast("材料已补齐，归档完整度已更新。");
    }

    const action = event.target.closest("[data-action]");
    if (action) {
      const actionType = action.dataset.detail || action.dataset.action;
      if (action.dataset.action === "openApplyWizard") {
        openApplyWizardScreen();
        return;
      }
      if (action.dataset.action === "openTodoCenter") {
        openTodoCenterScreen();
        return;
      }
      if (action.dataset.action === "handleTodo") {
        openTodoHandlePage();
        return;
      }
      const prepTemplateMap = {
        prepApply: "申报",
        prepBudget: "申报",
        prepPurchase: "采购",
        prepArchive: "归档"
      };
      if (prepTemplateMap[action.dataset.action]) {
        selectTemplateType(prepTemplateMap[action.dataset.action]);
      }
      if (action.dataset.action === "resetFilter") {
        if (state.screen === "budget") {
          state.selectedCandidateIds.clear();
          state.selectedBudgetId = 1;
          renderBudget();
          showToast("预算匹配条件已重置。");
          return;
        }
        if ($("#archiveSearch")) $("#archiveSearch").value = "";
        if ($("#archiveCodeSearch")) $("#archiveCodeSearch").value = "";
        if ($("#archiveDepartment")) $("#archiveDepartment").value = "all";
        if ($("#archiveYear")) $("#archiveYear").value = "all";
        if ($("#archiveStatus")) $("#archiveStatus").value = "all";
        renderMaterials();
      }
      if (action.dataset.action === "searchMyProjects") {
        state.myPendingOnly = false;
        state.myProjectPage = 1;
        filterMyProjects();
      }
      if (action.dataset.action === "addTeamRole") {
        if (addTeamRoleCard(action)) showToast("已新增一名团队角色。");
        else showToast("已打开团队角色维护。");
        return;
      }
      if (action.dataset.action === "addMilestone") {
        if (addMilestoneRow(action)) showToast("已新增一条项目里程碑。");
        else showToast("已打开里程碑维护。");
        return;
      }
      if (action.dataset.action === "removeRepeatRow") {
        if (removeRepeatRow(action)) showToast("已删除当前行。");
        return;
      }
      if (action.dataset.action === "submitProject") {
        openMyProjects(false);
        openSubmitSuccessDetail();
        showToast("已提交成功，可在我的项目查看后续进度。");
        return;
      }
      if (action.dataset.action === "sortColumn") {
        sortAdminTable(action);
      }
      if (action.dataset.action === "pinRow") {
        if (pinAdminRow(action)) showToast(action.classList.contains("is-active") ? "项目已置顶。" : "已取消置顶。");
        return;
      }
      if (action.dataset.action === "markReminderRead") {
        const row = action.closest(".reminder-table > div, .reminder-card");
        row?.classList.add("is-read");
        action.textContent = "已标记";
        showToast("已标记该提醒。");
        return;
      }
      const detailActions = new Set([
        "viewDetail",
        "previewMaterial",
        "downloadTemplate",
        "useTemplate",
        "fieldConfig",
        "readNotice",
        "archivePack",
        "editProject",
        "uploadMaterial",
        "systemManage",
        "todoDetail",
        "reminderDetail",
        "applicationDetail",
        "fullProcessDetail",
        "projectProgress",
        "progressSummary",
        "quickProcess",
        "calendarDetail",
        "prepApply",
        "prepBudget",
        "prepPurchase",
        "prepArchive",
        "contentDetail",
        "teamDetail",
        "budgetDetail",
        "expertOpinion",
        "acceptanceFix",
        "changeDetail",
        "archiveProjectDetail",
        "versionRecord",
        "noticeDetail",
        "budgetRecord",
        "allChanges",
        "logDetail",
        "unitStatsDetail",
        "completionStatsDetail",
        "statTotal",
        "statApproved",
        "statBuilding",
        "statCompleted",
        "statInvestment"
      ]);
      const copy = {
        newProject: "已打开新增申报入口。",
        uploadTemplate: "已进入模板上传流程。",
        exportReport: "年度汇总已准备导出。",
        resetFilter: "筛选条件已重置。",
        previewMaterial: "材料预览已打开。",
        useTemplate: "模板已加入当前填报。",
        downloadTemplate: "模板文件已开始下载。",
        saveDraft: "草稿已保存。",
        submitProject: "立项已提交，等待审核。",
        nextStep: "已进入下一步。",
        addTeamRole: "已添加团队角色行。",
        addMilestone: "已添加里程碑行。",
        uploadMaterial: "已打开附件上传。",
        searchMyProjects: "已按条件查询。",
        searchList: "已按条件查询。",
        fieldConfig: "字段设置已打开。",
        viewDetail: "项目详情已打开。",
        editProject: "已进入编辑。",
        readNotice: "通知列表已打开。",
        archivePack: "归档清单已生成。",
        systemManage: "系统配置已打开。",
        todoDetail: "待办详情已打开。",
        reminderDetail: "提醒详情已打开。",
        applicationDetail: "申报详情已打开。",
        fullProcessDetail: "全流程详情已打开。",
        projectProgress: "项目进度已打开。",
        progressSummary: "项目进度汇总已打开。",
        quickProcess: "已打开当前待办办理。",
        calendarDetail: "日历项目详情已打开。",
        prepApply: "已联动申报模板。",
        prepBudget: "已联动预算模板。",
        prepPurchase: "已联动采购模板。",
        prepArchive: "已联动归档模板。",
        contentDetail: "建设内容详情已打开。",
        teamDetail: "团队角色详情已打开。",
        budgetDetail: "经费详情已打开。",
        expertOpinion: "专家意见已打开。",
        acceptanceFix: "整改情况已打开。",
        changeDetail: "变更记录已打开。",
        archiveProjectDetail: "归档项目详情已打开。",
        versionRecord: "版本记录已打开。",
        noticeDetail: "通知详情已打开。",
        budgetRecord: "预算记录已打开。",
        allChanges: "变更汇总已打开。",
        logDetail: "操作日志已打开。",
        unitStatsDetail: "单位分布详情已打开。",
        completionStatsDetail: "完成情况详情已打开。",
        statTotal: "项目总数明细已打开。",
        statApproved: "已立项项目明细已打开。",
        statBuilding: "建设中项目明细已打开。",
        statCompleted: "已完成项目明细已打开。",
        statInvestment: "投资明细已打开。",
        markReminderRead: "已标记该提醒。",
        sortColumn: "已按该字段排序。"
      };
      if (detailActions.has(actionType)) {
        openDetail(actionType);
        showToast(copy[actionType] || copy[action.dataset.action] || "详情已打开。");
        return;
      }
      showToast(copy[actionType] || copy[action.dataset.action] || "操作已完成。");
    }

    const calendarEvent = event.target.closest("[data-calendar-event]");
    if (calendarEvent) {
      openCalendarEvent(calendarEvent.dataset.calendarEvent);
      openDetail("calendarDetail");
      return;
    }

    const calendarView = event.target.closest("[data-calendar-view]");
    if (calendarView) {
      const view = calendarView.dataset.calendarView;
      $$("[data-calendar-view]").forEach((item) => item.classList.toggle("is-active", item === calendarView));
      $$("[data-calendar-panel]").forEach((item) => item.classList.toggle("is-active", item.dataset.calendarPanel === view));
    }
  });

  document.body.addEventListener("keydown", (event) => {
    if (!["Enter", " "].includes(event.key)) return;
    const target = event.target.closest('[role="button"][data-action]');
    if (!target || target !== event.target) return;
    event.preventDefault();
    target.click();
  });

  $("#projectSearch").addEventListener("input", renderProjectRows);
  $("#yearFilter").addEventListener("change", renderProjectRows);
  $("#projectStatusFilter").addEventListener("click", (event) => {
    const chip = event.target.closest("[data-status]");
    if (!chip) return;
    state.selectedStatus = chip.dataset.status;
    $$("#projectStatusFilter .chip").forEach((item) => item.classList.toggle("is-active", item === chip));
    renderProjectRows();
  });

  $("#myProjectSearch").addEventListener("input", () => {
    state.myPendingOnly = false;
    state.myProjectPage = 1;
    filterMyProjects();
  });
  $("#myProjectYear").addEventListener("change", () => {
    state.myPendingOnly = false;
    state.myProjectPage = 1;
    filterMyProjects();
  });
  $("#myProjectStatus").addEventListener("change", () => {
    state.myPendingOnly = false;
    state.myProjectPage = 1;
    filterMyProjects();
  });
  $("#myMaterialState").addEventListener("change", () => {
    state.myPendingOnly = false;
    state.myProjectPage = 1;
    filterMyProjects();
  });
  $("#myProjectPageSize").addEventListener("change", (event) => {
    state.myProjectPageSize = Number(event.currentTarget.value) || 5;
    state.myProjectPage = 1;
    filterMyProjects();
  });

  $("#candidateList").addEventListener("change", (event) => {
    const input = event.target.closest("input[type='checkbox']");
    if (!input) return;
    const id = Number(input.value);
    if (input.checked) state.selectedCandidateIds.add(id);
    else state.selectedCandidateIds.delete(id);
    renderBudget();
  });

  $("#createInitiation").addEventListener("click", () => {
    showToast("立项单已生成，预算占用记录同步完成。");
  });

  $("#archiveSearch").addEventListener("input", renderMaterials);
  $("#archiveCodeSearch").addEventListener("input", renderMaterials);
  $("#archiveDepartment").addEventListener("change", renderMaterials);
  $("#archiveYear").addEventListener("change", renderMaterials);
  $("#archiveStatus").addEventListener("change", renderMaterials);

  $("#templateSearch").addEventListener("input", renderTemplates);
  $("#templateFilter").addEventListener("click", (event) => {
    const chip = event.target.closest("[data-template]");
    if (!chip) return;
    state.selectedTemplate = chip.dataset.template;
    $$("#templateFilter .chip").forEach((item) => item.classList.toggle("is-active", item === chip));
    renderTemplates();
  });

  $("#globalSearch").addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    if (state.mode === "admin") {
      $("#projectSearch").value = event.currentTarget.value;
      switchScreen("library");
      renderProjectRows();
    } else {
      $("#templateSearch").value = event.currentTarget.value;
      switchScreen("templates");
      renderTemplates();
    }
  });
}

function init() {
  renderApplicantTodos();
  renderProjectRows();
  renderBudget();
  renderMaterials();
  renderTemplates();
  placeAdminListActions();
  bindEvents();
  setMode("applicant", "portal");
}

init();
