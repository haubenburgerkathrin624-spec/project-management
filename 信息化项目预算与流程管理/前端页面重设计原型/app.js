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
  applicationFormPage: {
    mode: "applicant",
    title: "项目申报",
    heading: "项目申报",
    subtitle: ""
  },
  initiationFormPage: {
    mode: "applicant",
    title: "项目立项",
    heading: "项目立项",
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
    title: "资料模板",
    heading: "资料模板",
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
    title: "项目申报库",
    heading: "项目申报库",
    subtitle: ""
  },
  fundPool: {
    mode: "admin",
    title: "年度经费池",
    heading: "年度经费池",
    subtitle: ""
  },
  archive: {
    mode: "admin",
    title: "归档管理",
    heading: "归档管理",
    subtitle: ""
  },
  leader: {
    mode: "admin",
    title: "工作台",
    heading: "工作台",
    subtitle: ""
  },
  analytics: {
    mode: "admin",
    title: "统计分析",
    heading: "统计分析",
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
  selectedPrepStage: "all",
  pendingReminderMarkRow: null,
  selectedBudgetId: 1,
  selectedCandidateIds: new Set([1, 3]),
  myPendingOnly: false,
  myProjectBucket: "all",
  myProjectPage: 1,
  myProjectPageSize: 5,
  portalTodoTab: "pending",
  portalTodoPage: 1,
  portalTodoPageSize: 3,
  wizardStep: 0,
  applicationStage: 0,
  applicationDecision: "agree",
  applicationBudgetAmount: null,
  applicationTerminated: false,
  applicationBranch: {
    standardConclusion: "待确认",
    expertConclusion: "待确认",
    schoolConclusion: "待确认"
  },
  applicationApprovals: [],
  applicationReturnScreen: "applyWizard",
  initiationStage: 0,
  initiationUseLibrary: "yes",
  initiationSelectedLibraryProjectIds: ["RK2026002"],
  initiationLibrarySearch: "",
  initiationHasDeposit: true,
  initiationHasQualityDeposit: true,
  initiationIsCityProject: false,
  initiationNeedsExpertReview: null,
  initiationAcceptanceStep: 0,
  initiationCityAcceptanceSubmitted: false,
  initiationAcceptanceSubmitted: false,
  initiationSkippedCityAcceptance: false,
  initiationSkippedRefund: false,
  manageTab: "business",
  selectedProgressNode: "approval",
  selectedFullProcessNode: "approval",
  selectedCalendarEvent: "review",
  fundPoolMode: "detail",
  fundPoolDraft: null,
  pendingUploadRow: null,
  pendingUploadTitle: "",
  pendingUploadFiles: [],
  pendingArchiveMaterialTable: null,
  sortState: {}
};

const processStageKeys = ["approval", "purchase", "implement", "trial", "acceptance", "refund", "archive"];

const initiationLibraryProjectOptions = [
  {
    id: "RK2026002",
    name: "统一身份认证平台升级",
    department: "信息化办公室",
    owner: "李工",
    type: "软件平台",
    amount: "420000 元",
    status: "已入库，可发起立项"
  },
  {
    id: "RK2026001",
    name: "网络安全态势感知平台",
    department: "信息化办公室",
    owner: "张工",
    type: "网络安全",
    amount: "860000 元",
    status: "已入库，可发起立项"
  },
  {
    id: "RK2026005",
    name: "日志审计平台建设",
    department: "信息化办公室",
    owner: "赵工",
    type: "数据治理",
    amount: "360000 元",
    status: "已入库，可发起立项"
  },
  {
    id: "RK2025008",
    name: "校园网出口链路优化",
    department: "网络中心",
    owner: "陈工",
    type: "基础设施",
    amount: "1180000 元",
    status: "已入库，可发起立项"
  }
];

const applicationStandardStageMeta = [
  { label: "项目申报", actor: "张老师", button: "提交", placeholder: "提交后流转到网信办审核。" },
  { label: "网信办审核", actor: "网信办李老师", button: "确认审核", placeholder: "请上传网信办评审结论和评审材料。" },
  { label: "校级审核", actor: "校级评审组", button: "确认审核", placeholder: "请上传校级评审结论和评审材料。" },
  { label: "进入项目库", actor: "信息办管理员", button: "完成入库", placeholder: "请填写入库确认意见。" }
];

const applicationDecisionText = {
  agree: "同意",
  return: "退回修改",
  reject: "不同意",
  expert: "安排专家论证",
  school: "参加校级评审"
};

function applicationBudgetAmount() {
  const value = $("#applicationBudgetInput")?.value || $("#applicationFormPanel .application-budget-pane input")?.value || "0";
  return Number(value.replace(/[^\d.]/g, "")) || 0;
}

function applicationUsesSchoolReview() {
  return Number(state.applicationBudgetAmount ?? applicationBudgetAmount()) > 100000;
}

function projectBudgetAmount() {
  const initiationValue = $("#initiationBudgetAmount")?.value || "0";
  const initiationAmount = Number(initiationValue.replace(/[^\d.]/g, "")) || 0;
  return initiationAmount || applicationBudgetAmount();
}

function initiationUsesExpertAcceptance() {
  return projectBudgetAmount() >= 100000;
}

function acceptanceNeedsExpertReview() {
  return state.initiationNeedsExpertReview ?? initiationUsesExpertAcceptance();
}

function initiationMaterialFiles(stage) {
  if (stage === 4) {
    const baseFiles = ["验收申请单", "验收材料", "验收材料清单", "验收报告最终稿"];
    const reviewFiles = acceptanceNeedsExpertReview() ? ["专家意见材料"] : [];
    const cityFiles = state.initiationIsCityProject ? ["市级验收清单"] : [];
    return state.initiationIsCityProject
      ? [...baseFiles, ...reviewFiles, ...cityFiles]
      : [...baseFiles, ...reviewFiles];
  }
  if (stage === 5 && !state.initiationHasDeposit) return [];
  return initiationStageMeta[stage]?.material.split("、") || [];
}

function initiationMaterialRequirement(stage, index, file) {
  if (stage === 0 || stage === 2 || stage === 3) return "按需";
  if (stage === 4) {
    if (["验收申请单", "验收材料", "验收报告最终稿", "市级验收清单"].includes(file)) return "必填";
    if (file === "专家意见材料") return "专家必填";
    return "按需";
  }
  if (stage === 5) return index === 0 ? "必填" : "选填";
  return index === 0 ? "必填" : "按需";
}

function initiationMaterialStatus(stage, index, file) {
  if (stage === 0 || stage === 2 || stage === 3) return "待确认，可补充";
  if (stage === 4 && ["验收报告最终稿", "市级验收清单"].includes(file)) return "待上传最终稿";
  if (stage === 4 && file === "专家意见材料") return "待主管确认";
  return index === 0 ? "待上传" : "待确认，可补充";
}

function materialUploadActions(status = "") {
  const uploaded = /已上传|已归集|已确认/.test(status);
  return uploaded
    ? `<button type="button" data-action="uploadProjectAttachment">上传</button><button type="button" data-action="removeAttachment">删除</button>`
    : `<button type="button" data-action="uploadProjectAttachment">上传</button>`;
}

function applicationFlowStages() {
  return applicationStandardStageMeta.filter((stage) => stage.label !== "校级审核" || applicationUsesSchoolReview());
}

function renderApplicationBudgetHint() {
  const hint = $("#applicationBudgetHint");
  if (!hint) return;
  hint.classList.add("is-hidden");
  hint.textContent = "";
}

const initiationStageMeta = [
  { label: "立项", button: "提交立项", material: "项目批复材料" },
  { label: "采购", button: "提交采购材料", material: "采购申请流程文件、采购论证材料、盖章合同" },
  { label: "实施", button: "提交实施材料", material: "附件材料" },
  { label: "试运行", button: "提交试运行材料", material: "培训记录、试运行报告、问题整改记录" },
  { label: "验收", button: "提交验收审批", material: "验收申请、验收审批表、专家意见、整改记录" },
  { label: "退履约保金", button: "提交退保金确认", material: "退保证金凭证" },
  { label: "归档", button: "确认归档", material: "归档移交清单、全流程材料包" }
];

const advancedFilterPresets = {
  ledger: [
    { label: "项目编号", placeholder: "输入项目编号" },
    { label: "项目类型", options: ["全部", "应用系统", "基础设施", "网络安全", "数据治理"] },
    { label: "预算来源", options: ["全部", "信息化建设专项", "基础设施更新预算", "网络安全与数据治理"] },
    { label: "预算金额", options: ["全部", "10 万以下", "10-50 万", "50-100 万", "100 万以上"] },
    { label: "归档状态", options: ["全部", "未归档", "待归档", "已归档"] },
    { label: "材料阶段", options: ["全部", "申报", "立项", "采购", "实施", "试运行", "验收", "市级验收", "退履约保金", "归档"] }
  ],
  processNode: [
    { label: "项目编号", placeholder: "输入项目编号" },
    { label: "项目类型", options: ["全部", "应用系统", "基础设施", "网络安全", "数据治理"] },
    { label: "任务优先级", options: ["全部", "P0", "P1", "普通"] },
    { label: "截止时间", type: "date", value: "2026-07-08" },
    { label: "预算区间", options: ["全部", "10 万以下", "10 万以上", "100 万以上"] },
    { label: "归口部门", placeholder: "输入归口部门" }
  ],
  applications: [
    { label: "申报人", placeholder: "输入申报人" },
    { label: "归口部门", placeholder: "输入归口部门" },
    { label: "预算区间", options: ["全部", "10 万以下", "10 万以上", "100 万以上"] },
    { label: "评审类型", options: ["全部", "内部评审", "专家评审", "校级评审"] },
    { label: "是否涉密", options: ["全部", "是", "否"] },
    { label: "入库状态", options: ["全部", "待评审", "已入库", "未通过"] }
  ],
  content: [
    { label: "合同编号", placeholder: "输入合同编号" },
    { label: "供应商", placeholder: "输入供应商" },
    { label: "合同状态", options: ["全部", "待上传", "已上传", "需补充"] },
    { label: "采购金额", options: ["全部", "10 万以下", "10-50 万", "50 万以上"] },
    { label: "资料类别", options: ["全部", "论证材料", "结果文件", "合同文件", "实施资料"] },
    { label: "更新时间", options: ["全部", "近 7 天", "近 30 天", "本年度"] }
  ],
  acceptance: [
    { label: "验收类型", options: ["全部", "内部验收", "专项评审", "第三方测评"] },
    { label: "金额阈值", options: ["全部", "10 万以下", "10 万以上"] },
    { label: "申请时间", options: ["全部", "近 7 天", "近 30 天", "本年度"] },
    { label: "初审人", placeholder: "输入初审人" },
    { label: "评审结论", options: ["全部", "待出具", "通过", "整改后通过", "不通过"] },
    { label: "报告状态", options: ["全部", "待上传", "已上传", "需补充"] }
  ],
  fund: [
    { label: "项目库状态", options: ["全部", "待匹配", "已匹配", "已入库"] },
    { label: "预算编号", placeholder: "输入预算编号" },
    { label: "预算性质", options: ["全部", "专项经费", "基础设施", "安全治理", "年度统筹"] },
    { label: "匹配优先级", options: ["全部", "P0", "P1", "普通"] },
    { label: "金额区间", options: ["全部", "10 万以下", "10-50 万", "50 万以上"] },
    { label: "编号状态", options: ["全部", "待生成", "已生成", "需人工确认"] }
  ],
  docs: [
    { label: "资料编号", placeholder: "输入资料编号" },
    { label: "所属节点", options: ["全部", "申报", "项目库", "立项", "采购", "实施", "试运行", "验收", "市级验收", "退履约保金", "归档"] },
    { label: "是否必填", options: ["全部", "必填", "后续必填", "选填"] },
    { label: "版本号", placeholder: "输入版本号" },
    { label: "更新日期", options: ["全部", "近 7 天", "近 30 天", "本年度"] },
    { label: "下载次数", options: ["全部", "50 次以上", "100 次以上"] }
  ],
  budget: [
    { label: "预算名称", placeholder: "输入预算名称" },
    { label: "预算编号", placeholder: "输入预算编号" },
    { label: "预算性质", options: ["全部", "专项经费", "基础设施", "安全治理", "年度统筹"] },
    { label: "项目优先级", options: ["全部", "P0", "P1", "普通"] },
    { label: "预算金额", options: ["全部", "50 万以下", "50-100 万", "100 万以上"] },
    { label: "入库状态", options: ["全部", "已入库", "待评审", "需完善"] }
  ],
  fundPool: [
    { label: "预算名称", placeholder: "输入预算名称" },
    { label: "预算编号", placeholder: "输入预算编号" },
    { label: "记录时间", options: ["全部", "本月", "本季度", "本年度", "往年"] },
    { label: "金额区间", options: ["全部", "50 万以下", "50-100 万", "100-200 万", "200 万以上"] },
    { label: "可用余额", options: ["全部", "有余额", "余额不足", "已用完"] },
    { label: "占用项目", placeholder: "输入占用项目" }
  ],
  reminders: [
    { label: "项目名称", placeholder: "输入项目名称" },
    { label: "申报部门", placeholder: "输入申报部门" },
    { label: "提醒来源", options: ["全部", "系统生成", "人工标记", "截止提醒"] },
    { label: "风险级别", options: ["全部", "高", "中", "低"] },
    { label: "截止时间", type: "date", value: "2026-07-08" },
    { label: "跟进方式", options: ["全部", "站内提醒", "电话沟通", "材料补正", "线下确认"] }
  ]
};

const applicantTodos = [
  { title: "网络安全态势感知平台", desc: "补交预算测算表", due: "2024-05-24", type: "缺材料", icon: "icon-shield.png" },
  { title: "数据中心存储扩容", desc: "预算测算表被退回", due: "2024-05-25", type: "退回修改", icon: "icon-database.png" },
  { title: "统一身份认证平台升级", desc: "试运行报告可提交", due: "2024-05-26", type: "可提交", icon: "icon-user.png" },
  { title: "日志审计平台建设", desc: "上传阶段报告", due: "2024-05-27", type: "缺材料", icon: "icon-apply.png" },
  { title: "校园网出口链路优化", desc: "归档移交清单确认", due: "2024-05-28", type: "待确认", icon: "icon-progress.png" },
  { title: "一站式网上办事大厅扩展", desc: "验收申请待提交", due: "2024-05-29", type: "可提交", icon: "icon-material.png" }
];

const applicantTodoBuckets = {
  pending: applicantTodos,
  done: [
    { title: "统一身份认证平台升级", desc: "网信办审核已处理", due: "2024-05-20", type: "已办", icon: "icon-user.png" },
    { title: "日志审计平台建设", desc: "预算测算表已确认", due: "2024-05-21", type: "已办", icon: "icon-apply.png" },
    { title: "校园网出口链路优化", desc: "归档材料已标记", due: "2024-05-22", type: "已办", icon: "icon-progress.png" }
  ],
  running: [
    { title: "数据备份与容灾扩容", desc: "采购材料归集中", due: "2024-06-03", type: "进行中", icon: "icon-database.png" },
    { title: "网络安全态势感知平台", desc: "等待立项经费确认", due: "2024-06-05", type: "进行中", icon: "icon-shield.png" }
  ],
  completed: [
    { title: "校园出口链路优化一期", desc: "全流程已归档", due: "2024-04-18", type: "已完成", icon: "icon-progress.png" },
    { title: "一站式网上办事大厅扩展", desc: "验收通过并归档", due: "2024-04-30", type: "已完成", icon: "icon-material.png" }
  ],
  cc: [
    { title: "数据中心存储扩容", desc: "抄送：验收申请待审阅", due: "2024-06-11", type: "被抄送", icon: "icon-database.png" },
    { title: "日志审计平台建设", desc: "抄送：采购结果已登记", due: "2024-06-12", type: "被抄送", icon: "icon-apply.png" }
  ]
};

const projects = [
  { id: 1, name: "网络安全态势感知平台", owner: "张工", status: "待立项", year: "2026", priority: "P0", amount: 86, archive: 62, note: "已确认入库，需在立项环节补充经费关联和立项确认材料。" },
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
  { id: 9, stage: "退履约保金", name: "退履约保金确认记录", status: "待生成" },
  { id: 10, stage: "归档", name: "全过程材料包", status: "待生成" }
];

const progressStages = [
  {
    key: "approval",
    title: "立项",
    state: "active",
    status: "待经费确认",
    date: "07-02",
    data: [["预算来源", "信息化建设专项"], ["预算编号", "XXH-2026-01"], ["可用余额", "156 万"], ["立项金额", "86 万"], ["项目编号", "待生成"], ["当前责任人", "张工"]],
    files: [["预算测算明细表.xlsx", "待补齐", "07-02"], ["经费匹配记录.pdf", "待生成", "-"], ["立项确认单.pdf", "未生成", "-"]]
  },
  {
    key: "purchase",
    title: "采购",
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
    data: [["试运行周期", "30 天"], ["试运行范围", "信息办、网络中心"], ["问题记录", "待填写"], ["整改负责人", "待填写"], ["运行结论", "待确认"], ["下一步", "提交验收审批"]],
    files: [["试运行报告.docx", "待提交", "-"], ["问题整改记录.xlsx", "待提交", "-"], ["用户确认单.pdf", "待提交", "-"]]
  },
  {
    key: "acceptance",
    title: "验收",
    state: "",
    status: "未开始",
    date: "-",
    data: [["验收流程", "申请-材料-初审-分级评审-结论"], ["验收单位", "网信办"], ["验收时间", "待安排"], ["验收", "未形成"], ["评审规则", "按立项金额判断"], ["下一步", "按市级项目和保证金条件分流"]],
    files: [["验收申请报告.docx", "待提交", "-"], ["验收材料清单.xlsx", "待提交", "-"], ["专家评审意见.pdf", "待提交", "-"], ["正式验收报告.pdf", "待提交", "-"]]
  },
  {
    key: "cityAcceptance",
    title: "市级验收",
    state: "",
    status: "按立项条件触发",
    date: "-",
    data: [["触发规则", "立项确认为市级（上海市）项目"], ["办理部门", "网信办"], ["验收证明", "待上传"], ["材料包", "待归集"], ["跳过规则", "非市级项目自动跳过"], ["下一步", "按保证金条件进入退保或归档"]],
    files: [["市级验收通过证明.pdf", "按需上传", "-"], ["市级验收材料包.zip", "按需上传", "-"], ["市级验收补充说明.docx", "按需上传", "-"]]
  },
  {
    key: "refund",
    title: "退履约保金",
    state: "",
    status: "待验收通过",
    date: "-",
    data: [["触发规则", "有履约保证金时触发"], ["合同金额", "待确认"], ["保证金金额", "待计算"], ["合同编号", "待核对"], ["退还状态", "未开始"], ["下一步", "归档"]],
    files: [["退保证金凭证.pdf", "待提交", "-"], ["合同保证金核对表.xlsx", "待提交", "-"], ["财务处理回执.pdf", "待提交", "-"]]
  },
  {
    key: "archive",
    title: "归档",
    state: "",
    status: "未开始",
    date: "-",
    data: [["归档编号", "待生成"], ["归档版本", "V1"], ["移交部门", "信息办"], ["材料完整度", "预检中"], ["归档清单", "待生成"], ["审计状态", "待移交"]],
    files: [["归档移交清单.xlsx", "待生成", "-"], ["项目全过程材料包.zip", "未生成", "-"], ["审计移交确认单.pdf", "待提交", "-"]]
  }
];

const completedProcessStages = [
  {
    key: "approval",
    title: "立项",
    status: "已立项",
    date: "2024-03-18",
    data: [["预算来源", "校园基础设施更新预算"], ["资金编号", "JCSS-2024-03"], ["立项金额", "118 万"], ["项目编号", "XXH2024018"], ["立项方式", "经费关联后确认"], ["项目状态", "已立项"]],
    files: [["预算测算明细表.xlsx", "已归档", "2024-03-12"], ["经费匹配记录.pdf", "已归档", "2024-03-16"], ["立项确认单.pdf", "已归档", "2024-03-18"]],
    result: "经费匹配完成，系统生成项目编号并进入采购资料归集。"
  },
  {
    key: "purchase",
    title: "采购",
    status: "采购完成",
    date: "2024-04-02",
    data: [["采购管控", "仅归集资料"], ["采购预算", "112 万"], ["采购内容", "出口链路设备与实施服务"], ["供应商", "上海电院信息服务有限公司"], ["合同编号", "HT202404018"], ["合同金额", "116 万"]],
    files: [["采购论证过程文件.docx", "已归档", "2024-03-18"], ["采购结果文件.pdf", "已归档", "2024-03-25"], ["合同扫描件.pdf", "已归档", "2024-04-02"]],
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
    data: [["试运行周期", "30 天"], ["试运行范围", "网络中心、信息办"], ["问题记录", "2 项，均已关闭"], ["整改负责人", "供应商项目组"], ["运行结论", "稳定"], ["下一步", "提交验收审批"]],
    files: [["试运行报告.docx", "已归档", "2024-09-22"], ["问题整改记录.xlsx", "已归档", "2024-09-18"], ["用户确认单.pdf", "已归档", "2024-09-22"]],
    result: "试运行指标达成，具备验收条件。"
  },
  {
    key: "acceptance",
    title: "验收",
    status: "验收通过",
    date: "2024-10-18",
    data: [["验收流程", "申请-材料-初审-分级评审-结论"], ["验收单位", "网信办"], ["验收时间", "2024-10-18"], ["验收", "通过"], ["整改项", "无"], ["下一步", "市级验收"]],
    files: [["验收申请报告.docx", "已归档", "2024-10-12"], ["验收材料清单.xlsx", "已归档", "2024-10-15"], ["专家评审意见.pdf", "已归档", "2024-10-18"], ["正式验收报告.pdf", "已归档", "2024-10-18"]],
    result: "验收通过，系统自动触发退履约保金判断。"
  },
  {
    key: "cityAcceptance",
    title: "市级验收",
    status: "已通过",
    date: "2024-10-22",
    data: [["触发规则", "市级（上海市）项目"], ["办理部门", "网信办"], ["市级验收", "通过"], ["通过日期", "2024-10-22"], ["材料包", "已归集"], ["下一步", "退履约保金"]],
    files: [["市级验收通过证明.pdf", "已归档", "2024-10-22"], ["市级验收材料包.zip", "已生成", "2024-10-22"]],
    result: "市级验收证明和材料包已归集，继续进入履约保证金处理。"
  },
  {
    key: "refund",
    title: "退履约保金",
    status: "已处理",
    date: "2024-10-25",
    data: [["触发规则", "验收通过后自动触发"], ["合同金额", "116 万"], ["需退保金", "2 万"], ["数据局项目", "否"], ["退还状态", "已确认"], ["下一步", "归档"]],
    files: [["退履约保金确认记录.pdf", "已归档", "2024-10-25"], ["财务回执.pdf", "已归档", "2024-10-25"]],
    result: "履约保证金处理完成，可生成归档清单。"
  },
  {
    key: "archive",
    title: "归档",
    status: "已归档",
    date: "2024-11-08",
    data: [["归档编号", "GD2024018"], ["归档版本", "V1.0"], ["移交部门", "网络中心"], ["材料完整度", "100%"], ["归档清单", "已生成"], ["审计状态", "已移交"]],
    files: [["归档移交清单.xlsx", "已归档", "2024-11-08"], ["项目全过程材料包.zip", "已生成", "2024-11-08"], ["审计移交确认单.pdf", "已归档", "2024-11-08"]],
    result: "项目全过程文档已汇总，完成归档移交。"
  }
];

const archiveProjects = [
  { id: 1, code: "XXH2026001", name: "网络安全态势感知平台", year: "2026", department: "信息办", owner: "张工", stage: "归档预检", status: "待补齐", progress: 75, missing: 2, updated: "06-28" },
  { id: 2, code: "XXH2026002", name: "统一身份认证平台升级", year: "2026", department: "信息办", owner: "李工", stage: "归档确认", status: "待归档", progress: 88, missing: 1, updated: "06-24" },
  { id: 3, code: "XXH2025008", name: "数据备份与容灾扩容", year: "2025", department: "信息办", owner: "王工", stage: "退履约保金确认", status: "待退履约保金", progress: 92, missing: 0, updated: "06-18" },
  { id: 4, code: "XXH2024016", name: "日志审计平台建设", year: "2024", department: "信息办", owner: "赵工", stage: "归档完成", status: "已归档", progress: 100, missing: 0, updated: "05-30" }
];

const templates = [
  { name: "信息化项目申报书", type: "申报", stage: "apply", version: "V3.2", desc: "基础信息、建设目标、预算估算和附件入口一次填完。" },
  { name: "项目建设必要性说明", type: "申报", stage: "apply", version: "V1.6", desc: "按背景、痛点、建设内容、预期成效组织内容。" },
  { name: "团队角色表", type: "申报", stage: "apply", version: "V1.3", desc: "项目负责人、归口负责人、实施联系人一次列清。" },
  { name: "项目基础信息表", type: "申报", stage: "apply", version: "V1.1", desc: "用于线下材料补录和历史项目导入。" },
  { name: "项目入库评审结果表", type: "项目库", stage: "review", version: "V1.2", desc: "记录内部评审、专家评审、校级评审结果。" },
  { name: "内部评审意见表", type: "项目库", stage: "review", version: "V1.0", desc: "10 万元以下项目内部评审留痕。" },
  { name: "专家评审意见汇总表", type: "项目库", stage: "review", version: "V1.1", desc: "10 万元以上项目专家意见归集。" },
  { name: "校级评审纪要模板", type: "项目库", stage: "review", version: "V1.0", desc: "校级评审会议纪要和结论附件。" },
  { name: "立项确认单", type: "立项", stage: "approval", version: "V1.4", desc: "经费匹配后确认立项，生成项目编号。" },
  { name: "项目编号生成确认单", type: "立项", stage: "approval", version: "V1.0", desc: "记录项目编号生成规则和确认人。" },
  { name: "立项附件清单", type: "立项", stage: "approval", version: "V1.1", desc: "立项阶段需归集的预算、评审和确认材料。" },
  { name: "预算测算明细表", type: "预算", stage: "budget", version: "V2.1", desc: "可直接关联年度经费池字段。" },
  { name: "预算来源说明", type: "预算", stage: "budget", version: "V1.4", desc: "说明资金编号、预算性质和采购预算拆分。" },
  { name: "年度经费匹配表", type: "预算", stage: "budget", version: "V1.2", desc: "按经费来源、余额和项目优先级匹配。" },
  { name: "报价与测算依据清单", type: "预算", stage: "budget", version: "V1.0", desc: "报价单、历史采购、测算依据统一归集。" },
  { name: "采购论证模板", type: "采购", stage: "purchase", version: "V1.8", desc: "采购必要性、采购内容、供应商说明。" },
  { name: "采购过程文件清单", type: "采购", stage: "purchase", version: "V1.2", desc: "过程文件、结果文件、合同材料按阶段归集。" },
  { name: "采购结果登记表", type: "采购", stage: "purchase", version: "V1.0", desc: "登记采购结果、金额、合同和附件。" },
  { name: "合同文件归集表", type: "采购", stage: "purchase", version: "V1.1", desc: "合同编号、金额、签订时间和扫描件。" },
  { name: "实施计划模板", type: "实施", stage: "implement", version: "V1.4", desc: "实施任务、节点、责任人和交付物安排。" },
  { name: "实施会议纪要", type: "实施", stage: "implement", version: "V1.0", desc: "项目例会、需求确认、问题协调记录。" },
  { name: "阶段报告模板", type: "实施", stage: "implement", version: "V1.3", desc: "大型项目阶段交付和风险记录。" },
  { name: "监理记录表", type: "实施", stage: "implement", version: "V1.0", desc: "大型项目监理过程资产留存。" },
  { name: "软测安测资料清单", type: "实施", stage: "implement", version: "V1.0", desc: "软件测评、安测、整改闭环材料。" },
  { name: "项目启动会记录", type: "试运行", stage: "trial", version: "V1.0", desc: "启动会时间、参会人、上线事项。" },
  { name: "人员培训签到表", type: "试运行", stage: "trial", version: "V1.1", desc: "培训对象、内容、签到和反馈。" },
  { name: "试运行报告", type: "试运行", stage: "trial", version: "V2.4", desc: "记录试运行范围、周期、问题整改和结论。" },
  { name: "问题整改记录", type: "试运行", stage: "trial", version: "V1.2", desc: "试运行问题、责任人、整改结果。" },
  { name: "验收申请报告", type: "验收", stage: "acceptance", version: "V2.0", desc: "项目负责人发起验收申请。" },
  { name: "验收材料清单", type: "验收", stage: "acceptance", version: "V1.8", desc: "验收申请、材料、初审、评审结论。" },
  { name: "初审意见表", type: "验收", stage: "acceptance", version: "V1.0", desc: "项目主管初审材料完整性。" },
  { name: "专家评审意见模板", type: "验收", stage: "acceptance", version: "V1.2", desc: "10 万元以上项目专项评审使用。" },
  { name: "正式验收报告", type: "验收", stage: "acceptance", version: "V2.2", desc: "验收结论、签字页和整改闭环。" },
  { name: "市级验收通过证明", type: "市级验收", stage: "cityAcceptance", version: "V1.0", desc: "上海市项目在校内验收后上传通过证明。" },
  { name: "市级验收材料包目录", type: "市级验收", stage: "cityAcceptance", version: "V1.0", desc: "市级验收提交、反馈和证明材料统一打包。" },
  { name: "市级验收补充说明", type: "市级验收", stage: "cityAcceptance", version: "V1.0", desc: "非标准材料或补充过程说明。" },
  { name: "退履约保金申请表", type: "退履约保金", stage: "refund", version: "V1.0", desc: "验收通过后自动触发，确认退还信息。" },
  { name: "合同保证金核对表", type: "退履约保金", stage: "refund", version: "V1.0", desc: "合同金额、保证金比例、退还金额核对。" },
  { name: "退保证金凭证", type: "退履约保金", stage: "refund", version: "V1.0", desc: "财务退还凭证和银行回单归档。" },
  { name: "归档移交清单", type: "归档", stage: "archive", version: "V1.5", desc: "按阶段汇总附件，缺项自动标红。" },
  { name: "全过程材料包目录", type: "归档", stage: "archive", version: "V1.0", desc: "申报至归档全流程文件目录。" },
  { name: "审计移交确认单", type: "归档", stage: "archive", version: "V1.0", desc: "对接审计和档案移交。" },
  { name: "归档缺项预检表", type: "归档", stage: "archive", version: "V1.1", desc: "归档前检查缺项和待补附件。" }
];

const materialStageData = {
  apply: {
    note: "申报阶段常用材料。",
    myNote: "当前申报项目的基础材料状态。",
    templateNote: "申报：申报书、必要性说明、团队角色、基础信息。",
    references: [
      ["icon-template.png", "信息化项目申报指南", "申报条件、流程节点、材料要求", "下载"],
      ["icon-apply.png", "建设必要性填写样例", "背景、痛点、建设目标和预期成效", "下载"],
      ["icon-user.png", "团队角色填写说明", "负责人、归口负责人、实施联系人", "下载"]
    ],
    mine: [
      ["icon-shield.png", "网络安全态势感知平台", "申报书已上传，预算测算待补", "补齐"],
      ["icon-user.png", "统一身份认证平台升级", "团队角色已确认", "查看"],
      ["icon-database.png", "数据中心存储扩容", "申报说明被退回", "修改"]
    ]
  },
  review: {
    note: "项目库阶段只留评审结果和入库依据。",
    myNote: "当前申报库评审材料状态。",
    templateNote: "项目库：内部评审、专家评审、校级评审、入库结果。",
    references: [
      ["icon-shield.png", "项目入库评审结果表", "评审结论、入库意见、金额分级", "下载"],
      ["icon-user.png", "专家评审意见汇总表", "专家意见、问题清单和建议", "下载"],
      ["icon-calendar.png", "校级评审纪要模板", "会议时间、结论和后续动作", "下载"]
    ],
    mine: [
      ["icon-shield.png", "网络安全态势感知平台", "待补预算测算后进入评审", "补齐"],
      ["icon-database.png", "校园出口链路优化", "评审结果已归档", "查看"],
      ["icon-user.png", "数据备份与容灾扩容", "内部评审意见待上传", "上传"]
    ]
  },
  approval: {
    note: "立项阶段确认经费匹配和项目编号。",
    myNote: "当前立项材料状态。",
    templateNote: "立项：立项确认、编号生成、经费匹配记录。",
    references: [
      ["icon-apply.png", "立项确认单", "经费匹配后确认立项", "下载"],
      ["icon-database.png", "经费关联记录", "经费来源、余额、优先级", "下载"],
      ["icon-template.png", "项目编号生成确认单", "编号规则和确认人", "下载"]
    ],
    mine: [
      ["icon-shield.png", "网络安全态势感知平台", "待年度经费匹配", "匹配"],
      ["icon-user.png", "统一身份认证平台升级", "项目编号已生成", "查看"],
      ["icon-database.png", "校园出口链路优化", "立项材料已归档", "查看"]
    ]
  },
  budget: {
    note: "预算阶段统一金额来源、测算依据和经费池匹配。",
    myNote: "当前项目预算材料和缺项。",
    templateNote: "预算：测算明细、来源说明、经费匹配、报价依据。",
    references: [
      ["icon-database.png", "预算测算明细表", "预算来源、年度预算、金额填写说明", "下载"],
      ["icon-material.png", "年度经费匹配表", "经费池余额、优先级、匹配结果", "下载"],
      ["icon-apply.png", "报价与测算依据清单", "报价、历史采购和测算依据", "下载"]
    ],
    mine: [
      ["icon-shield.png", "网络安全态势感知平台", "缺预算测算明细表", "补齐"],
      ["icon-database.png", "数据中心存储扩容", "预算测算表被退回", "修改"],
      ["icon-apply.png", "统一身份认证平台升级", "预算材料已齐", "查看"]
    ]
  },
  purchase: {
    note: "采购阶段统一归集论证、结果和合同。",
    myNote: "采购阶段材料归集情况。",
    templateNote: "采购：采购论证、过程文件、结果登记、合同归集。",
    references: [
      ["icon-material.png", "采购论证资料清单", "采购过程文件、合同、结果文件", "下载"],
      ["icon-template.png", "采购论证模板", "采购必要性、内容和供应商说明", "下载"],
      ["icon-database.png", "合同文件归集表", "合同编号、金额、签订时间和附件", "下载"]
    ],
    mine: [
      ["icon-material.png", "日志审计平台建设", "采购论证材料待确认", "查看"],
      ["icon-database.png", "统一身份认证平台升级", "合同材料已上传", "查看"],
      ["icon-shield.png", "数据备份与容灾扩容", "采购文件缺 2 项", "补齐"]
    ]
  },
  implement: {
    note: "实施阶段开放上传过程资料。",
    myNote: "实施阶段材料状态。",
    templateNote: "实施：实施计划、会议纪要、阶段报告、监理软测安测。",
    references: [
      ["icon-progress.png", "实施计划模板", "任务、节点、责任人和交付物", "下载"],
      ["icon-calendar.png", "实施会议纪要", "例会、需求确认、问题协调", "下载"],
      ["icon-shield.png", "软测安测资料清单", "测评报告和整改闭环", "下载"]
    ],
    mine: [
      ["icon-progress.png", "统一身份认证平台升级", "阶段报告已上传", "查看"],
      ["icon-shield.png", "日志审计平台建设", "安测资料待补", "补齐"],
      ["icon-calendar.png", "校园出口链路优化", "实施过程已归档", "查看"]
    ]
  },
  trial: {
    note: "试运行阶段关注启动会、培训和报告。",
    myNote: "试运行材料提交情况。",
    templateNote: "试运行：启动会、培训签到、试运行报告、整改记录。",
    references: [
      ["icon-calendar.png", "项目启动会记录", "会议时间、参会人、启动事项", "下载"],
      ["icon-user.png", "人员培训签到表", "培训对象、培训内容、签到记录", "下载"],
      ["icon-apply.png", "试运行报告", "试运行周期、范围、问题整改和结论", "下载"]
    ],
    mine: [
      ["icon-user.png", "统一身份认证平台升级", "试运行报告可提交", "提交"],
      ["icon-shield.png", "日志审计平台建设", "培训签到表待补", "补齐"],
      ["icon-database.png", "数据备份与容灾扩容", "启动会记录已上传", "查看"]
    ]
  },
  acceptance: {
    note: "验收阶段按申请、材料、初审、评审、结论归集。",
    myNote: "验收阶段材料状态。",
    templateNote: "验收：申请报告、初审意见、专家意见、正式报告。",
    references: [
      ["icon-shield.png", "验收申请报告", "提交验收审批、建设总结和验收依据", "下载"],
      ["icon-template.png", "验收材料清单", "初审、分级评审、专家意见、正式报告", "下载"],
      ["icon-material.png", "专家评审意见模板", "10 万元以上项目专项评审使用", "下载"]
    ],
    mine: [
      ["icon-shield.png", "日志审计平台建设", "验收申请待提交", "提交"],
      ["icon-database.png", "校园出口链路优化", "专家意见已归档", "查看"],
      ["icon-user.png", "统一身份认证平台升级", "验收材料待初审", "查看"]
    ]
  },
  cityAcceptance: {
    note: "市级验收仅对立项确认的市级（上海市）项目开放。",
    myNote: "市级验收材料状态。",
    templateNote: "市级验收：通过证明、材料包、补充说明。",
    references: [
      ["icon-shield.png", "市级验收通过证明", "通过证明、意见回执和确认日期", "下载"],
      ["icon-material.png", "市级验收材料包目录", "申报、验收、反馈材料压缩归集", "下载"],
      ["icon-template.png", "市级验收补充说明", "补充过程说明和非标准附件", "下载"]
    ],
    mine: [
      ["icon-shield.png", "网络安全态势感知平台", "按市级项目条件待触发", "查看"],
      ["icon-database.png", "校园出口链路优化", "市级验收证明已归档", "查看"],
      ["icon-user.png", "统一身份认证平台升级", "非市级项目已跳过", "查看"]
    ]
  },
  refund: {
    note: "退履约保金阶段核对合同和退还状态。",
    myNote: "退履约保金材料状态。",
    templateNote: "退履约保金：申请表、合同保证金核对、退保证金凭证。",
    references: [
      ["icon-database.png", "退履约保金申请表", "验收通过后确认退还信息", "下载"],
      ["icon-material.png", "合同保证金核对表", "合同金额、比例、退还金额", "下载"],
      ["icon-template.png", "退保证金凭证", "财务退还凭证和银行回单", "下载"]
    ],
    mine: [
      ["icon-database.png", "校园出口链路优化", "退还记录已归档", "查看"],
      ["icon-shield.png", "数据备份与容灾扩容", "保证金待核对", "处理"],
      ["icon-user.png", "日志审计平台建设", "退保证金凭证已上传", "查看"]
    ]
  },
  archive: {
    note: "归档阶段汇总全流程文档。",
    myNote: "归档材料状态。",
    templateNote: "归档：移交清单、全过程材料包、审计确认、缺项预检。",
    references: [
      ["icon-database.png", "归档移交清单", "按全流程阶段汇总材料", "下载"],
      ["icon-material.png", "全过程材料包目录", "文件命名、版本和缺项规则", "下载"],
      ["icon-template.png", "审计移交确认单", "对接审计和档案移交", "下载"]
    ],
    mine: [
      ["icon-user.png", "统一身份认证平台升级", "归档清单待确认", "确认"],
      ["icon-shield.png", "日志审计平台建设", "全过程材料包已生成", "下载"],
      ["icon-database.png", "校园出口链路优化", "已归档", "查看"]
    ]
  }
};

const processNodeTabs = new Set([
  "processReview",
  "processApproval",
  "processPurchase",
  "processImplement",
  "processTrial",
  "processAcceptance",
  "processRefund",
  "processArchive"
]);

const processNodeData = {
  processCreate: {
    title: "申报列表",
    hero: ["申报", "全年开放申报", "无批次限制，全校相关人员均可提交项目申报"],
    summary: ["全部 36", "草稿 6", "已提交 12", "退回修改 4", "已入库 14"],
    rows: [
      ["SB2026001", "网络安全态势感知平台", "信息办", "张工", "2026", "申报", "补齐预算测算表后提交", "86 万", "缺 1"],
      ["SB2026002", "统一身份认证平台升级", "信息办", "李工", "2026", "申报", "申报材料已提交", "42 万", "齐全"],
      ["SB2026003", "数据备份与容灾扩容", "信息办", "王工", "2026", "退回修改", "按退回意见重填预算说明", "58 万", "缺 2"],
      ["SB2026004", "一站式网上办事大厅扩展", "图文信息中心", "周老师", "2026", "申报", "等待归口部门确认", "65 万", "待确认"]
    ]
  },
  processReview: {
    title: "项目申报库列表",
    hero: ["项目申报库", "申报项目入库管理", "所有申报项目统一确认入库状态，已入库后才能发起立项"],
    summary: ["全部 22", "未入库 13", "已入库 4", "已出库 5"],
    rows: [
      ["RK2026001", "网络安全态势感知平台", "信息办", "张工", "2026", "未入库", "待确认入库", "86 万", "缺 1"],
      ["RK2026002", "统一身份认证平台升级", "信息办", "李工", "2026", "已出库", "已关联立项，进入立项页面", "42 万", "齐全"],
      ["RK2026003", "校园网出口链路优化", "网络中心", "陈工", "2026", "未入库", "待确认入库", "120 万", "齐全"],
      ["RK2026004", "数据备份与容灾扩容", "信息办", "王工", "2026", "已入库", "待发起立项", "58 万", "齐全"]
    ]
  },
  processApproval: {
    title: "立项列表",
    hero: ["立项", "立项时关联年度预算", "自动带入申报和入库信息，确认预算后生成项目编号"],
    summary: ["全部 18", "待关联预算 7", "可立项 5", "已立项 4", "超预算 2"],
    rows: [
      ["LX2026001", "网络安全态势感知平台", "信息办", "张工", "2026", "待关联预算", "选择年度预算后生成编号", "86 万", "缺 1"],
      ["LX2026002", "统一身份认证平台升级", "信息办", "李工", "2026", "已立项", "项目编号 XXH2026002", "42 万", "齐全"],
      ["LX2026003", "校园网出口链路优化", "网络中心", "陈工", "2026", "预算不足", "建议排入 2027 年预算", "120 万", "齐全"],
      ["LX2026004", "数据备份与容灾扩容", "信息办", "王工", "2026", "可立项", "匹配网络安全与数据治理预算", "58 万", "缺 2"]
    ]
  },
  processPurchase: {
    title: "采购列表",
    hero: ["采购", "采购与合同归集", "登记采购方式、采购金额、合同信息和履约保证金，只归集关键过程文件"],
    summary: ["全部 18", "待登记 6", "采购申请 5", "合同待补 4", "已完成 3"],
    rows: [
      ["CG2026001", "日志审计平台建设", "网络中心", "赵工", "2026", "采购登记", "填写采购方式、金额和预算编号", "36 万", "齐全"],
      ["CG2026002", "统一身份认证平台升级", "信息办", "李工", "2026", "采购申请", "上传采购申请流程文件", "42 万", "待确认"],
      ["CG2025008", "数据中心存储扩容", "信息办", "王工", "2025", "合同待补", "补充盖章合同和履约保证金信息", "58 万", "缺 2"],
      ["CG2026005", "虚拟化平台扩容", "数据中心", "刘工", "2026", "采购登记", "确认合同金额和供应商", "75 万", "缺 1"]
    ]
  },
  processImplement: {
    title: "实施列表",
    hero: ["实施", "启动与付款记录", "维护启动日期、启动会材料和多次付款记录，系统自动汇总付款金额"],
    summary: ["全部 16", "实施中 10", "待付款材料 3", "延期风险 2", "已完成 1"],
    rows: [
      ["SS2026002", "统一身份认证平台升级", "信息办", "李工", "2026", "实施", "上传启动会材料和阶段报告", "42 万", "齐全"],
      ["SS2026006", "校园数据治理共享平台", "数据办", "钱老师", "2026", "实施", "补充付款凭证和接口联调记录", "88 万", "缺 1"],
      ["SS2025012", "视频会议系统扩容", "信息办", "孙工", "2025", "实施", "登记第二笔付款信息", "26 万", "待确认"],
      ["SS2026007", "服务器资源池建设", "数据中心", "刘工", "2026", "延期风险", "供应商交付延期并补阶段报告", "96 万", "齐全"]
    ]
  },
  processTrial: {
    title: "试运行列表",
    hero: ["试运行", "固化核心必备动作", "项目启动会、人员培训、试运行报告必填，其余事项可自定义"],
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
    hero: ["验收", "验收申请与审批", "10万以下自验后由网信办确认，10万以上由网信办组织专家验收"],
    summary: ["全部 9", "待申请 3", "待网信办确认 2", "专家验收 2", "通过 2"],
    rows: [
      ["YS2026002", "统一身份认证平台升级", "信息办", "李工", "2026", "待网信办确认", "提交验收审批表", "42 万", "齐全"],
      ["YS2024016", "日志审计平台建设", "网络中心", "赵工", "2024", "验收通过", "等待归档移交", "36 万", "齐全"],
      ["YS2025014", "校园卡通行数据看板", "信息办", "周老师", "2025", "整改中", "补充专家整改说明", "28 万", "缺 1"],
      ["YS2025008", "数据备份与容灾扩容", "信息办", "王工", "2025", "待申请", "补齐试运行报告", "58 万", "缺 1"]
    ]
  },
  processCityAcceptance: {
    title: "市级验收列表",
    hero: ["市级验收", "上海市项目条件触发", "立项确认为市级（上海市）项目时，校内验收通过后进入本环节"],
    summary: ["全部 4", "待提交 1", "待市级确认 1", "已通过 2", "已跳过 6"],
    rows: [
      ["SJ2026001", "网络安全态势感知平台", "信息办", "张工", "2026", "待提交", "上传市级验收证明和材料包", "86 万", "缺 1"],
      ["SJ2024018", "校园出口链路优化一期", "网络中心", "陈工", "2024", "已通过", "市级验收证明已归档", "118 万", "齐全"],
      ["SJ2025008", "数据备份与容灾扩容", "信息办", "王工", "2025", "待市级确认", "等待市级验收反馈", "58 万", "待确认"],
      ["SJ2026002", "统一身份认证平台升级", "信息办", "李工", "2026", "已跳过", "非市级项目，验收后按保证金分流", "42 万", "齐全"]
    ]
  },
  processRefund: {
    title: "退履约保金列表",
    hero: ["退履约保金", "按合同保证金判断", "合同无履约保证金时自动跳过，市级验收材料按条件独立归集"],
    summary: ["全部 7", "待判断 2", "待退履约保金 2", "已退履约保金 2", "无需退还 1"],
    rows: [
      ["TJ2025008", "数据备份与容灾扩容", "信息办", "王工", "2025", "待退履约保金", "确认合同结余并上传记录", "58 万", "齐全"],
      ["TJ2024016", "日志审计平台建设", "网络中心", "赵工", "2024", "已退履约保金", "退履约保金记录已归集", "36 万", "齐全"],
      ["TJ2026002", "统一身份认证平台升级", "信息办", "李工", "2026", "无需退还", "合同无履约保证金，确认后跳过", "42 万", "待确认"],
      ["TJ2025014", "校园卡通行数据看板", "信息办", "周老师", "2025", "待确认", "等待财务确认", "28 万", "缺 1"]
    ]
  },
  processArchive: {
    title: "归档列表",
    hero: ["归档", "一键生成归档清单", "自动汇总全流程文档，便于审计和档案移交"],
    summary: ["全部 28", "待补齐 7", "待归档 8", "预检通过 9", "已归档 4"],
    rows: [
      ["GD2026001", "网络安全态势感知平台", "信息办", "张工", "2026", "归档预检", "验收意见签字页待补", "86 万", "缺 2"],
      ["GD2026002", "统一身份认证平台升级", "信息办", "李工", "2026", "待归档", "生成归档移交清单", "42 万", "缺 1"],
      ["GD2025008", "数据备份与容灾扩容", "信息办", "王工", "2025", "预检通过", "等待退履约保金确认", "58 万", "齐全"],
      ["GD2024016", "日志审计平台建设", "网络中心", "赵工", "2024", "已归档", "归档包已生成", "36 万", "齐全"]
    ]
  }
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function escapeHTML(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("is-visible"), 2200);
}

function progressNodeDetailMarkup(key = state.selectedProgressNode) {
  const stages = progressStages.filter((item) => processStageKeys.includes(item.key));
  const node = stages.find((item) => item.key === key) || stages[0];
  const eventSummary = node.data.map((item) => `${item[0]}：${item[1]}`).join("；");
  const nodeStateText = node.state === "done" ? "已完成" : node.state === "active" ? "进行中" : "待开始";
  return `
    <section class="progress-node-detail-card">
      <div class="progress-node-detail-head">
        <h3>${node.title}里程碑</h3>
        <span>${node.status} · ${node.date}</span>
      </div>
      <div class="progress-event-list progress-event-list-compact progress-event-list-merged">
        <div><time>${node.date === "-" ? "待定" : node.date}</time><strong>${node.title}节点更新</strong><span>${node.status}；${eventSummary}</span><em>${nodeStateText}</em></div>
      </div>
    </section>
  `;
}

function progressRailMarkup() {
  return progressStages
    .filter((node) => processStageKeys.includes(node.key))
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
  const stages = completedProcessStages.filter((item) => processStageKeys.includes(item.key));
  const node = stages.find((item) => item.key === key) || stages[0];
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
        <span>按环节归集归档数据</span>
      </div>
      <div class="progress-file-list">
        ${node.files.map((item) => `<div><strong>${item[0]}</strong><span>${item[1]}</span><em>${item[2]}</em><button class="ghost-btn" type="button" data-action="downloadTemplate">下载</button></div>`).join("")}
      </div>
      <div class="completed-result"><span>办理结果</span><strong>${node.result}</strong></div>
    </section>
  `;
}

function completedProcessRailMarkup() {
  return completedProcessStages
    .filter((node) => processStageKeys.includes(node.key))
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

function prepareFundPoolDetail(button) {
  const mode = button.dataset.fundMode || (button.textContent.includes("编辑") ? "edit" : button.textContent.includes("新增") ? "new" : "detail");
  const row = button.closest(".admin-table-row");
  const cells = row ? rowCellTexts(row) : [];
  state.fundPoolMode = mode;
  if (mode !== "new" && !row && state.fundPoolDraft) return;
  state.fundPoolDraft = mode === "new" ? {
    name: "",
    code: "",
    source: "信息化建设专项",
    amount: "",
    linkedCount: "0",
    linkedAmount: "0 万",
    paid: "0 万",
    balance: "",
    date: "2026-07-10",
    status: "可用"
  } : {
    name: cells[1] || "2026 年信息化建设专项",
    code: cells[2] || "XXH-2026-01",
    source: cells[3] || "信息化建设专项",
    amount: cells[4] || "260 万",
    linkedCount: cells[5] || "3",
    linkedAmount: cells[6] || "126 万",
    paid: cells[7] || "104 万",
    balance: cells[8] || "156 万",
    date: "2026-01-10",
    status: (cells[9] || "可用").replace(/\s+/g, "")
  };
}

function fundLinkedProjects(code = state.fundPoolDraft?.code || "XXH-2026-01") {
  const groups = {
    "XXH-2026-01": [
      ["网络安全态势感知平台", "张工", "信息办", "86 万", "立项", "processApproval"],
      ["统一身份认证平台升级", "李工", "信息办", "42 万", "实施", "processImplement"],
      ["日志审计平台建设", "赵工", "信息办", "36 万", "采购", "processPurchase"]
    ],
    "JCSS-2026-04": [
      ["校园网出口链路优化", "陈工", "网络中心", "120 万", "立项", "processApproval"],
      ["数据中心存储扩容", "王工", "信息办", "58 万", "采购", "processPurchase"]
    ],
    "AQZL-2026-02": [
      ["统一身份认证平台升级", "李工", "信息办", "42 万", "实施", "processImplement"],
      ["数据备份与容灾扩容", "王工", "信息办", "58 万", "材料补正", "processReview"]
    ]
  };
  return groups[code] || [["网络安全态势感知平台", "张工", "信息办", "86 万", "立项", "processApproval"]];
}

function openFundLinkedProjects(button) {
  prepareFundPoolDetail(button);
  const draft = state.fundPoolDraft || {};
  const projects = fundLinkedProjects(draft.code);
  openCustomDetail({
    eyebrow: "关联项目",
    title: `${draft.name || "年度经费"}关联项目`,
    meta: `${draft.code || "待生成编号"} · 共 ${projects.length} 个项目`,
    type: "fundLinkedProjects",
    body: `
      <div class="fund-linked-table fund-linked-project-table">
        <div><span>项目名称</span><span>申报部门</span><span>负责人</span><span>关联金额</span><span>当前菜单</span><span>操作</span></div>
        ${projects.map(([name, owner, dept, amount, stage, target]) => `
          <div><strong>${name}</strong><span>${dept}</span><span>${owner}</span><span>${amount}</span><em>${stage}</em><button type="button" data-action="openLinkedProjectMenu" data-target-tab="${target}">查看</button></div>
        `).join("")}
      </div>
    `
  });
  $("#detailDrawer")?.querySelectorAll("[data-action='openLinkedProjectMenu']").forEach((jumpButton) => {
    jumpButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      closeDetail();
      switchScreen("manage");
      setManageTab(jumpButton.dataset.targetTab || "processApproval");
      showToast("已跳转到项目对应菜单。");
    });
  });
}

function fundPoolDetailText() {
  const mode = state.fundPoolMode || "detail";
  const draft = state.fundPoolDraft || {};
  if (mode === "new") return { title: "新增经费", meta: "录入年度经费池基础信息" };
  if (mode === "edit") return { title: "编辑经费", meta: `${draft.name || "年度经费"} · ${draft.code || "待生成编号"}` };
  return { title: "经费详情", meta: `${draft.name || "2026 年信息化建设专项"} · ${draft.code || "XXH-2026-01"}` };
}

function fundPoolDetailBody() {
  const mode = state.fundPoolMode || "detail";
  const draft = state.fundPoolDraft || {};
  const isReadonly = mode === "detail";
  const disabled = isReadonly ? "disabled" : "";
  const value = (key, fallback) => draft[key] || fallback;
  const formTitle = mode === "new" ? "新增经费信息" : mode === "edit" ? "编辑经费信息" : "经费基础信息";
  const projectName = value("name", mode === "new" ? "" : "2026 年信息化建设专项");
  const amountValue = value("amount", mode === "new" ? "" : "260 万");
  const balanceValue = value("balance", mode === "new" ? "" : "156 万");
  const sourceValue = value("source", "信息化建设专项");
  const statusValue = value("status", "可用");
  return `
    <section class="fund-edit-section">
      <div class="fund-edit-head">
        <h3>${formTitle}</h3>
        <span>${isReadonly ? "只读查看" : "保存后进入年度经费池"}</span>
      </div>
      <div class="detail-form fund-detail-form">
        <label><span>建设年度</span><select ${disabled}><option>2026</option><option>2025</option><option>2024</option></select></label>
        <label><span>经费名称</span><input ${disabled} value="${projectName}" placeholder="如：2026 年信息化建设专项" /></label>
        <label><span>经费编号</span><input ${disabled} value="${value("code", mode === "new" ? "系统保存后生成" : "XXH-2026-01")}" placeholder="可自动生成或手工录入" /></label>
        <label><span>经费来源</span><select ${disabled}><option>${sourceValue}</option><option>校园基础设施更新预算</option><option>网络安全与数据治理</option><option>年度统筹经费</option><option>历史项目结余</option></select></label>
        <label><span>预算性质</span><select ${disabled}><option>专项经费</option><option>基础设施</option><option>安全治理</option><option>年度统筹</option><option>结余经费</option></select></label>
        <label><span>经费状态</span><select ${disabled}><option>${statusValue}</option><option>待启用</option><option>可用</option><option>冻结</option><option>已占用</option><option>已归档</option></select></label>
        <label><span>预算总额</span><input ${disabled} value="${amountValue}" placeholder="请输入金额，如 260 万" /></label>
        <label><span>已关联金额</span><input ${disabled} value="${value("linkedAmount", mode === "new" ? "0 万" : "126 万")}" placeholder="系统可按匹配记录自动汇总" /></label>
        <label><span>已付款金额</span><input ${disabled} value="${value("paid", mode === "new" ? "0 万" : "104 万")}" placeholder="按付款记录自动汇总" /></label>
        <label><span>可用余额</span><input ${disabled} value="${balanceValue}" placeholder="保存时按总额、关联和付款记录计算" /></label>
        <label><span>记录时间</span><input ${disabled} value="${value("date", "2026-07-10")}" /></label>
        <label><span>管理部门</span><input ${disabled} value="信息办" /></label>
        <label><span>优先级</span><select ${disabled}><option>P0 优先保障</option><option>P1 常规推进</option><option>P2 储备观察</option></select></label>
        <label><span>可匹配阶段</span><select ${disabled}><option>项目库通过后可匹配</option><option>申报完成后可预占</option><option>仅立项确认时匹配</option></select></label>
        <label><span>是否允许超额</span><select ${disabled}><option>不允许</option><option>允许预警后提交</option><option>需管理员确认</option></select></label>
        <label><span>启用日期</span><input ${disabled} value="2026-01-01" /></label>
        <label><span>到期日期</span><input ${disabled} value="2026-12-31" /></label>
        <label class="full-row"><span>适用范围</span><textarea ${disabled}>用于信息化建设项目、基础平台升级、网络安全和数据治理类项目的经费关联。</textarea></label>
        <label class="full-row"><span>占用规则</span><textarea ${disabled}>项目进入项目库后可申请匹配经费；匹配成功后在立项时生成预算占用记录，归档后形成最终经费执行记录。</textarea></label>
      </div>
    </section>

    <section class="fund-edit-section">
      <div class="fund-edit-head">
        <h3>关联项目</h3>
        <span>用于判断余额和优先级</span>
      </div>
      <div class="fund-linked-table">
        <div><span>项目名称</span><span>负责人</span><span>申请金额</span><span>当前状态</span><span>匹配结果</span></div>
        <div><strong>网络安全态势感知平台</strong><span>张工</span><span>86 万</span><span>申报库评审</span><em>可关联</em></div>
        <div><strong>数据备份与容灾扩容</strong><span>王工</span><span>58 万</span><span>待补材料</span><em>待确认</em></div>
        <div><strong>日志审计平台建设</strong><span>赵工</span><span>36 万</span><span>采购论证</span><em>已付款</em></div>
      </div>
    </section>

    <section class="fund-edit-section">
      <div class="fund-edit-head">
        <h3>依据附件</h3>
        <span>支持后续审计追溯</span>
      </div>
      <div class="fund-file-list">
        <div><strong>年度预算批复文件.pdf</strong><span>已上传</span><button class="ghost-btn" type="button" data-action="downloadTemplate">下载</button></div>
        <div><strong>经费来源说明.docx</strong><span>${mode === "new" ? "待上传" : "已上传"}</span><button class="ghost-btn" type="button" data-action="downloadTemplate">下载</button></div>
        <div><strong>预算额度拆分表.xlsx</strong><span>${mode === "new" ? "待上传" : "已上传"}</span><button class="ghost-btn" type="button" data-action="downloadTemplate">下载</button></div>
      </div>
    </section>
    <div class="inline-action-row">
      ${isReadonly ? `<button class="primary-btn" type="button" data-action="fundPoolDetail" data-fund-mode="edit">编辑经费</button>` : `<button class="primary-btn" type="button" data-action="saveDraft">保存经费</button>`}
      <button class="ghost-btn" type="button" data-close-detail>取消</button>
    </div>
  `;
}

function projectAttachmentArchiveMarkup() {
  const groups = [
    {
      stage: "立项",
      files: [
        ["立项确认单.pdf", "已上传", "2026-07-02"],
        ["经费关联记录.xlsx", "已上传", "2026-07-02"],
        ["项目编号生成确认单.pdf", "已生成", "2026-07-02"]
      ]
    },
    {
      stage: "采购",
      files: [
        ["采购论证资料清单.xlsx", "未开始", "立项后上传"],
        ["采购结果登记表.pdf", "未开始", "采购后上传"],
        ["合同文件扫描件.pdf", "未开始", "采购后上传"]
      ]
    },
    {
      stage: "实施",
      files: [
        ["实施计划.docx", "未开始", "实施阶段上传"],
        ["实施会议纪要.pdf", "未开始", "过程上传"],
        ["软测安测资料清单.xlsx", "按需上传", "大型项目适用"]
      ]
    },
    {
      stage: "试运行",
      files: [
        ["项目启动会记录.pdf", "未开始", "试运行前上传"],
        ["人员培训签到表.xlsx", "未开始", "培训后上传"],
        ["试运行报告.docx", "未开始", "试运行后上传"]
      ]
    },
    {
      stage: "验收",
      files: [
        ["验收申请报告.docx", "未开始", "验收发起"],
        ["专家评审意见.pdf", "未开始", "10 万以上适用"],
        ["正式验收报告.pdf", "未开始", "验收通过后归档"]
      ]
    },
    {
      stage: "退履约保金",
      files: [
        ["退履约保金申请表.pdf", "未开始", "验收通过后触发"],
        ["合同保证金核对表.xlsx", "未开始", "按合同核对"]
      ]
    },
    {
      stage: "归档",
      files: [
        ["归档移交清单.xlsx", "未生成", "一键汇总"],
        ["全过程材料包.zip", "未生成", "归档时生成"]
      ]
    }
  ];
  const currentStage = "立项";
  const currentIndex = groups.findIndex((group) => group.stage === currentStage);

  return `
    <div class="material-archive-list">
      ${groups.map((group, groupIndex) => {
        const canDownload = groupIndex <= currentIndex;
        return `
        <article class="material-stage-group">
          <header><strong>${group.stage}</strong><span>${group.files.length} 个附件</span></header>
          <div class="material-file-list">
            ${group.files.map((file) => `
              <div>
                <strong>${file[0]}</strong>
                <span>${file[1]}</span>
                <em>${file[2]}</em>
                <button class="ghost-btn" type="button" data-action="downloadTemplate" ${canDownload ? "" : "disabled"}>${canDownload ? "下载" : "待生成"}</button>
              </div>
            `).join("")}
          </div>
        </article>
      `;}).join("")}
    </div>
  `;
}

function normalizeArchiveStage(stageText = "") {
  const stages = ["申报", "项目库", "立项", "采购", "实施", "试运行", "验收", "市级验收", "退履约保金", "归档"];
  return stages.find((stage) => stageText.includes(stage)) || "申报";
}

function adminProjectContextFromRow(button) {
  const row = button?.closest?.(".admin-table-row");
  const cells = row ? rowCellTexts(row) : [];
  if (cells[0]?.startsWith("XXH")) {
    return {
      code: cells[0],
      name: cells[1],
      department: cells[2],
      owner: cells[3],
      year: cells[4],
      stage: normalizeArchiveStage(cells[6] || cells[5]),
      material: cells[8] || "材料归集中"
    };
  }
  return {
    code: cells[5]?.startsWith("XXH") ? cells[5] : "待生成编号",
    name: cells[2] || cells[1] || "网络安全态势感知平台",
    department: cells[1] || "信息办",
    owner: cells[3] || "张工",
    year: (cells[0] || "2026").replace(" 年度", ""),
    stage: normalizeArchiveStage(cells[6] || cells[5] || "申报"),
    material: cells[8] || "申报材料"
  };
}

function adminMaterialStatus(stageIndex, currentIndex, fileIndex, materialState) {
  if (stageIndex < currentIndex) return ["已归档", `2026-0${Math.min(stageIndex + 3, 9)}-${12 + fileIndex}`];
  if (stageIndex > currentIndex) return ["未到达", "后续节点"];
  if (materialState.includes("齐")) return ["已归档", "2026-07-02"];
  if (materialState.includes("缺")) return [fileIndex === 0 ? materialState : "待补齐", "待上传"];
  if (materialState.includes("待") || materialState.includes("未")) return [fileIndex === 0 ? "待归档" : "待确认", "处理中"];
  return [materialState || "待确认", "处理中"];
}

function adminProjectMaterialsMarkup(context) {
  const groups = [
    { stage: "申报", files: ["项目申报书.pdf", "建设说明附件.pdf", "预算测算表.xlsx"] },
    { stage: "立项", files: ["立项确认单.pdf", "经费关联记录.xlsx", "项目编号生成确认单.pdf"] },
    { stage: "采购", files: ["采购论证资料清单.xlsx", "采购结果登记表.pdf", "合同文件扫描件.pdf"] },
    { stage: "实施", files: ["实施计划.docx", "实施会议纪要.pdf", "软测安测材料.zip"] },
    { stage: "试运行", files: ["启动会记录.pdf", "培训签到表.xlsx", "试运行报告.docx"] },
    { stage: "验收", files: ["验收申请报告.docx", "验收审批表.pdf", "专家评审意见.pdf", "正式验收报告.pdf"] },
    { stage: "市级验收", files: ["市级验收通过证明.pdf", "市级验收材料包.zip"] },
    { stage: "退履约保金", files: ["退履约保金申请表.pdf", "合同保证金核对表.xlsx"] },
    { stage: "归档", files: ["归档移交清单.xlsx", "全过程材料包.zip"] }
  ];
  const currentIndex = Math.max(0, groups.findIndex((group) => group.stage === context.stage));
  const visibleGroups = groups.slice(0, currentIndex + 1);
  return `
    <section class="admin-material-archive">
      ${visibleGroups.map((group, groupIndex) => `
        <article class="admin-material-stage ${groupIndex < currentIndex ? "is-done" : "is-current"}">
          <header>
            <strong>${group.stage}</strong>
            <span>${group.files.length} 个附件</span>
          </header>
          <div class="admin-material-file-table">
            ${group.files.map((file, fileIndex) => {
              const [status, time] = adminMaterialStatus(groupIndex, currentIndex, fileIndex, context.material);
              return `
                <div class="admin-archive-file">
                  <strong>${file}</strong>
                  <span>${status}</span>
                  <em>${time}</em>
                  <span class="row-actions"><button type="button" data-action="previewMaterial">预览</button><button type="button" data-action="downloadTemplate">下载</button></span>
                </div>
              `;
            }).join("")}
          </div>
        </article>
      `).join("")}
    </section>
  `;
}

function openAdminProjectMaterials(button) {
  const context = adminProjectContextFromRow(button);
  openCustomDetail({
    type: "adminProjectMaterials",
    eyebrow: "管理端材料归档",
    title: `${context.name}材料归档`,
    meta: `${context.code} · ${context.department} · ${context.year}`,
    body: adminProjectMaterialsMarkup(context)
  });
  $$("#detailDrawer .admin-archive-file button[data-action='previewMaterial']").forEach((previewButton) => {
    previewButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      openDetail("previewMaterial");
      showToast("附件预览已打开。");
    });
  });
  return true;
}

function roleContextFromButton(button) {
  const row = button?.closest?.(".role-table > div");
  const cells = row ? rowCellTexts(row) : [];
  return {
    name: cells[0] || "新建角色",
    scope: cells[1] || "本部门项目",
    duty: cells[2] || "项目查询、材料确认、节点协同",
    status: cells[3] || "启用",
    mode: button?.dataset?.roleMode || "edit"
  };
}

function roleFormMarkup(role) {
  const isNew = role.mode === "new";
  const roleName = isNew ? "" : role.name;
  const roleCode = isNew ? "" : role.name.replace(/[^A-Za-z0-9\u4e00-\u9fa5]/g, "").slice(0, 12);
  return `
    <section class="role-config-section">
      <div class="role-config-head">
        <h3>基本信息</h3>
        <span>用于菜单合并、数据范围和待办派发</span>
      </div>
      <div class="detail-form role-form-grid">
        <label><span>* 角色名称</span><input value="${roleName}" placeholder="如：采购经办人" /></label>
        <label><span>* 角色编码</span><input value="${roleCode}" placeholder="如：purchase_operator" /></label>
        <label><span>角色类型</span><select><option>业务角色</option><option>管理角色</option><option>领导查看</option><option>审计查看</option><option>档案维护</option></select></label>
        <label><span>状态</span><select><option ${role.status === "启用" ? "selected" : ""}>启用</option><option ${role.status === "停用" ? "selected" : ""}>停用</option></select></label>
        <label><span>默认数据范围</span><select><option>${role.scope}</option><option>本人项目</option><option>本部门项目</option><option>归口部门</option><option>授权项目</option><option>全量项目</option></select></label>
        <label><span>可叠加角色</span><select><option>允许叠加</option><option>不可与管理员叠加</option><option>仅查看角色可叠加</option></select></label>
        <label class="full-row"><span>主要职责</span><textarea>${role.duty}</textarea></label>
      </div>
    </section>
    <section class="role-config-section">
      <div class="role-config-head">
        <h3>适用用户</h3>
        <span>同一用户可被赋予多个角色</span>
      </div>
      <div class="role-user-grid">
        <label><input type="checkbox" checked /> 张老师 <span>信息化办公室</span></label>
        <label><input type="checkbox" ${role.name.includes("领导") ? "checked" : ""} /> 李主任 <span>信息中心</span></label>
        <label><input type="checkbox" /> 王工 <span>网络中心</span></label>
        <label><input type="checkbox" ${role.name.includes("档案") ? "checked" : ""} /> 档案室 <span>档案管理</span></label>
      </div>
    </section>
    <section class="role-config-section">
      <div class="role-config-head">
        <h3>数据范围规则</h3>
        <span>与用户部门、归口部门、授权项目共同计算</span>
      </div>
      <div class="role-scope-grid">
        <label><input type="radio" name="roleScope" ${role.scope === "本人项目" ? "checked" : ""} /> 本人项目</label>
        <label><input type="radio" name="roleScope" ${role.scope === "本部门项目" ? "checked" : ""} /> 本部门项目</label>
        <label><input type="radio" name="roleScope" ${role.scope === "归口部门" ? "checked" : ""} /> 归口部门</label>
        <label><input type="radio" name="roleScope" ${role.scope === "授权项目" ? "checked" : ""} /> 授权项目</label>
        <label><input type="radio" name="roleScope" ${role.scope === "全量项目" ? "checked" : ""} /> 全量项目</label>
      </div>
    </section>
    <div class="inline-action-row">
      <button class="primary-btn" type="button" data-action="confirmRoleConfig">保存角色</button>
      <button class="ghost-btn" type="button" data-close-detail>取消</button>
    </div>
  `;
}

function rolePermissionMarkup(role) {
  const fullAccess = role.scope === "全量项目";
  const readOnly = role.name.includes("审计") || role.name.includes("领导");
  const archiveRole = role.name.includes("档案");
  return `
    <section class="role-config-section">
      <div class="role-config-head">
        <h3>权限概览</h3>
        <span>菜单权限、数据范围、操作权限会与用户其他角色合并</span>
      </div>
      <div class="role-permission-summary">
        <article><span>角色</span><strong>${role.name}</strong></article>
        <article><span>数据范围</span><strong>${role.scope}</strong></article>
        <article><span>当前状态</span><strong>${role.status}</strong></article>
        <article><span>权限模式</span><strong>${readOnly ? "只读查看" : "办理维护"}</strong></article>
      </div>
    </section>
    <section class="role-config-section">
      <div class="role-config-head">
        <h3>菜单权限</h3>
        <span>勾选后左侧菜单和二级页可见</span>
      </div>
      <div class="permission-tree">
        <label><input type="checkbox" checked /> 工作台 <span>待办、提醒、快捷处理</span></label>
        <label><input type="checkbox" ${fullAccess || readOnly ? "checked" : ""} /> 统计分析 <span>项目数量、投资和完成情况</span></label>
        <label><input type="checkbox" checked /> 项目台账 <span>项目详情、进度、材料</span></label>
        <label><input type="checkbox" ${fullAccess ? "checked" : ""} /> 项目申报库 <span>申报评审、入库状态</span></label>
        <label><input type="checkbox" ${fullAccess || !readOnly ? "checked" : ""} /> 项目过程管理 <span>立项至归档各阶段列表</span></label>
        <label><input type="checkbox" ${fullAccess ? "checked" : ""} /> 年度经费池 <span>经费维护、预算匹配</span></label>
        <label><input type="checkbox" ${fullAccess || archiveRole ? "checked" : ""} /> 资料模板维护 <span>模板、附件清单、版本</span></label>
        <label><input type="checkbox" ${fullAccess ? "checked" : ""} /> 系统管理 <span>角色、流程、字段</span></label>
      </div>
    </section>
    <section class="role-config-section">
      <div class="role-config-head">
        <h3>操作权限</h3>
        <span>控制按钮级动作</span>
      </div>
      <div class="permission-matrix">
        <div><span>业务模块</span><span>查看</span><span>新增</span><span>编辑</span><span>删除</span><span>导出</span></div>
        ${[
          ["项目申报", true, !readOnly, !readOnly, fullAccess, fullAccess],
          ["项目过程", true, !readOnly, !readOnly, fullAccess, fullAccess],
          ["年度经费", fullAccess, fullAccess, fullAccess, fullAccess, fullAccess],
          ["资料模板", true, fullAccess || archiveRole, fullAccess || archiveRole, fullAccess, true],
          ["系统配置", fullAccess, fullAccess, fullAccess, false, false]
        ].map((row) => `
          <div><strong>${row[0]}</strong>${row.slice(1).map((checked) => `<label><input type="checkbox" ${checked ? "checked" : ""} /></label>`).join("")}</div>
        `).join("")}
      </div>
    </section>
    <section class="role-config-section">
      <div class="role-config-head">
        <h3>字段权限</h3>
        <span>敏感字段可只读或隐藏</span>
      </div>
      <div class="field-permission-grid">
        <label><span>预算金额</span><select><option>${readOnly ? "只读" : "可编辑"}</option><option>只读</option><option>隐藏</option></select></label>
        <label><span>合同金额</span><select><option>${readOnly ? "只读" : "可编辑"}</option><option>只读</option><option>隐藏</option></select></label>
        <label><span>联系人电话</span><select><option>只读</option><option>可编辑</option><option>隐藏</option></select></label>
        <label><span>归档材料</span><select><option>${archiveRole ? "可编辑" : "只读"}</option><option>可编辑</option><option>隐藏</option></select></label>
      </div>
    </section>
    <div class="inline-action-row">
      <button class="primary-btn" type="button" data-action="confirmRoleConfig">保存权限</button>
      <button class="ghost-btn" type="button" data-close-detail>取消</button>
    </div>
  `;
}

function openRoleForm(button) {
  const role = roleContextFromButton(button);
  openCustomDetail({
    type: "roleForm",
    eyebrow: "角色维护",
    title: role.mode === "new" ? "新增角色" : `编辑${role.name}`,
    meta: "基本信息 · 适用用户 · 数据范围",
    body: roleFormMarkup(role)
  });
  return true;
}

function openRolePermission(button) {
  const role = roleContextFromButton(button);
  openCustomDetail({
    type: "rolePermission",
    eyebrow: "权限配置",
    title: `${role.name}权限配置`,
    meta: `${role.scope} · ${role.status}`,
    body: rolePermissionMarkup(role)
  });
  return true;
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
      desc: "预算测算表需补齐金额来源、采购内容和测算依据，补齐后进入申报库评审。"
    },
    review: {
      tag: "申报库评审",
      title: "网络安全态势感知平台申报库评审会",
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
        <span>补齐后可进入经费关联和立项确认。</span>
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
        <article><span>项目状态</span><strong>申报库评审中</strong></article>
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
        <h3>阶段附件</h3>
        ${projectAttachmentArchiveMarkup()}
      </section>
      <section class="detail-section">
        <h3>流程记录与审批意见</h3>
        <div class="approval-flow">
          <article class="done"><b>06-20</b><strong>申报提交</strong><span>张工提交项目基础信息和建设说明。</span></article>
          <article class="done"><b>06-24</b><strong>归口确认</strong><span>李老师确认建设必要性，建议补充预算测算说明。</span></article>
          <article class="active"><b>06-28</b><strong>信息办初审</strong><span>预算测算表待补齐，补齐后进入入库确认。</span></article>
          <article><b>待定</b><strong>立项确认</strong><span>入库后进入立项，经费和项目编号在立项环节确认。</span></article>
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
      meta: "SB2026001 · 已提交 · 当前节点：申报库确认",
      body: `
        <div class="lifecycle-steps">
          <article class="active"><b>1</b><strong>立项</strong><span>待经费确认</span></article>
          <article><b>2</b><strong>采购</strong><span>未开始</span></article>
          <article><b>3</b><strong>实施</strong><span>未开始</span></article>
          <article><b>4</b><strong>试运行</strong><span>未开始</span></article>
          <article><b>5</b><strong>验收</strong><span>未开始</span></article>
          <article><b>6</b><strong>退履约保金</strong><span>未开始</span></article>
          <article><b>7</b><strong>归档</strong><span>未开始</span></article>
        </div>
        ${common.body}
      `
    },
    fullProcessDetail: {
      eyebrow: "全流程详情",
      title: "校园出口链路优化一期",
      meta: "XXH2024018 · 已归档 · 立项至归档过程记录",
      body: `
        <div class="full-process-summary">
          <article><span>项目编号</span><strong>XXH2024018</strong></article>
          <article><span>归口部门</span><strong>网络中心</strong></article>
          <article><span>项目预算</span><strong>118 万</strong></article>
          <article><span>归档状态</span><strong>材料齐全，已归档</strong></article>
        </div>
        <div class="completed-process-flow" aria-label="完整项目全流程">
          ${completedProcessRailMarkup()}
        </div>
        <div id="completedProcessNodeDetail">${completedProcessNodeDetailMarkup()}</div>
      `
    },
    projectProgress: {
      eyebrow: "项目进度",
      title: "网络安全态势感知平台",
      meta: "环节进度与节点事件",
      body: `
        <section class="detail-section progress-brief-section">
          <h3>项目过程环节</h3>
          <div class="progress-rail-detail">
            ${progressRailMarkup()}
          </div>
        </section>
        <div id="progressNodeDetail">${progressNodeDetailMarkup()}</div>
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
      ...common,
      eyebrow: "项目详情",
      title: calendarDetail.project,
      meta: `${calendarDetail.title} · ${calendarDetail.date}`,
      body: `
        <div class="detail-alert">
          <strong>${calendarDetail.tag}</strong>
          <span>${calendarDetail.desc}</span>
        </div>
        ${common.body}
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
      eyebrow: "验收与归档准备",
      title: "验收与归档预检清单",
      meta: "联动模板：验收、归档",
      body: `
        <div class="detail-list">
          <div><span>试运行</span><strong>试运行报告、问题整改记录</strong><em>验收前检查</em></div>
          <div><span>验收</span><strong>验收申请、验收意见、签字材料</strong><em>通过后归档</em></div>
          <div><span>归档</span><strong>归档移交清单、退履约保金记录</strong><em>系统生成缺项提醒</em></div>
        </div>
      `
    },
    previewMaterial: {
      eyebrow: "附件在线预览",
      title: "",
      meta: "",
      body: `
        <div class="attachment-preview-shell">
          <div class="attachment-preview-toolbar">
            <span>建设说明附件.pdf</span>
            <button type="button" data-action="downloadTemplate">下载</button>
          </div>
          <div class="attachment-preview-frame">
            <div>
              <strong>在线附件预览区</strong>
              <span>这里展示 PDF / Word / 表格等附件内容预览。</span>
            </div>
          </div>
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
          <div><strong>归口负责人</strong><span>李老师</span><span>信息办</span><span>建设必要性确认、预算标准审核</span></div>
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
    fundPoolDetail: {
      eyebrow: "年度经费池",
      title: fundPoolDetailText().title,
      meta: fundPoolDetailText().meta,
      body: fundPoolDetailBody()
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
          <article class="done"><b>1</b><strong>立项</strong><span>经费已确认</span></article>
          <article class="done"><b>2</b><strong>采购</strong><span>资料已归集</span></article>
          <article class="done"><b>3</b><strong>实施</strong><span>过程资料齐全</span></article>
          <article class="done"><b>4</b><strong>试运行</strong><span>报告已上传</span></article>
          <article class="${archiveMissing ? "active" : "done"}"><b>5</b><strong>验收</strong><span>${archiveMissing ? "待补齐" : "已通过"}</span></article>
          <article class="${archiveProject.status === "待退履约保金" ? "active" : archiveProject.status === "已归档" ? "done" : ""}"><b>6</b><strong>退履约保金</strong><span>${archiveProject.status === "待退履约保金" ? "待确认" : archiveProject.status === "已归档" ? "已确认" : "待处理"}</span></article>
          <article class="${archiveProject.status === "已归档" ? "done" : archiveProject.status === "待归档" ? "active" : ""}"><b>7</b><strong>归档</strong><span>${archiveProject.status === "已归档" ? "已完成" : archiveProject.status === "待归档" ? "待归档" : "待预检"}</span></article>
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
          <div><span>预算</span><strong>预算测算明细表 V2.1</strong><em>统一年度预算标准</em></div>
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
          <div><span>顺序</span><span>字段名称</span><span>显示</span><span>冻结/排序</span></div>
          <div><b>☰ 01</b><input class="field-name-input" value="项目编号" /><label><input type="checkbox" checked /> 显示</label><em>固定左侧</em></div>
          <div><b>☰ 02</b><input class="field-name-input" value="项目名称" /><label><input type="checkbox" checked /> 显示</label><em>固定左侧</em></div>
          <div><b>☰ 03</b><input class="field-name-input" value="预算来源" /><label><input type="checkbox" checked /> 显示</label><em>可筛选</em></div>
          <div><b>☰ 04</b><input class="field-name-input" value="申报部门" /><label><input type="checkbox" checked /> 显示</label><em>可筛选</em></div>
          <div><b>☰ 05</b><input class="field-name-input" value="申报人" /><label><input type="checkbox" checked /> 显示</label><em>-</em></div>
          <div><b>☰ 06</b><input class="field-name-input" value="申报时间" /><label><input type="checkbox" checked /> 显示</label><em>可排序</em></div>
          <div><b>☰ 07</b><input class="field-name-input" value="当前节点" /><label><input type="checkbox" checked /> 显示</label><em>可筛选</em></div>
          <div><b>☰ 08</b><input class="field-name-input" value="预算金额" /><label><input type="checkbox" checked /> 显示</label><em>可排序</em></div>
          <div><b>☰ 09</b><input class="field-name-input" value="材料缺项数" /><label><input type="checkbox" checked /> 显示</label><em>可排序</em></div>
          <div><b>☰ 10</b><input class="field-name-input" value="操作" /><label><input type="checkbox" checked disabled /> 必显</label><em>固定右侧</em></div>
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
          <div><span>06-28</span><strong>申报材料模板与预算标准已更新</strong><em>请使用新版模板</em></div>
          <div><span>06-24</span><strong>采购论证、验收和归档材料清单发布</strong><em>资料准备池可下载</em></div>
        </div>
      `
    },
    reminderDetail: {
      eyebrow: "事务提醒",
      title: "网络安全态势感知平台",
      meta: "立项 · 预算测算表待补齐 · 张工",
      body: `
        <div class="detail-alert">
          <strong>当前事项：预算测算表逾期未补齐</strong>
          <span>该项目已停留在立项节点，补齐预算测算表后才能完成经费关联确认。</span>
        </div>
        <div class="detail-list">
          <div><span>提醒类型</span><strong>材料补正 / 逾期</strong><em>高优先级</em></div>
          <div><span>责任人</span><strong>张工 138****5678</strong><em>信息化办公室</em></div>
          <div><span>截止时间</span><strong>2026-07-06</strong><em>已逾期 2 天</em></div>
          <div><span>待补材料</span><strong>预算测算表、资金来源说明、采购内容估算依据</strong><em>提交后复核</em></div>
        </div>
        <section class="detail-section">
          <h3>处理建议</h3>
          <p>联系项目负责人补齐预算测算表，并在材料上传后重新触发立项。若预算标准不明确，可先下载最新预算测算模板。</p>
        </section>
        <div class="inline-action-row">
          <button class="primary-btn" type="button" data-action="quickProcess">去处理</button>
          <button class="ghost-btn" type="button" data-screen-link="fundPool">查看经费池</button>
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
          <p>2026 年信息化项目申报已开放，全年可申报。提交前请先在资料准备池查看申报指南、预算测算标准、采购论证清单、验收和归档要求。</p>
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
      meta: "经费关联 · 采购占用 · 合同执行",
      body: `
        <div class="detail-stat-grid">
          <article><span>项目预算</span><strong>86 万</strong></article>
          <article><span>预算来源</span><strong>信息化建设专项</strong></article>
          <article><span>已占用</span><strong>30 万</strong></article>
          <article><span>剩余可用</span><strong>56 万</strong></article>
        </div>
        <div class="detail-table four-col">
          <div><span>时间</span><span>事项</span><span>金额</span><span>状态</span></div>
          <div><strong>2026-06-24</strong><span>经费关联确认</span><span>86 万</span><span>待确认</span></div>
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
      title: "新增资料模板",
      meta: "发布到用户端资料模板或管理端资料清单",
      body: `
        <div class="detail-form upload-material-form">
          <label><span>所属阶段</span><select><option>申报前</option><option>项目库</option><option>立项</option><option>预算标准</option><option>采购阶段</option><option>实施</option><option>试运行</option><option>验收</option><option>市级验收</option><option>退履约保金</option><option>归档</option></select></label>
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
          <div><span>流程</span><strong>申报、立项、采购管理、验收管理、归档管理</strong><em>按校内制度配置</em></div>
        </div>
      `
    }
  };

  return map[type] || common;
}

function openDetail(type = "viewDetail") {
  if (type === "projectProgress") state.selectedProgressNode = "approval";
  if (type === "fullProcessDetail") state.selectedFullProcessNode = "approval";
  const content = detailContent(type);
  $("#detailEyebrow").textContent = content.eyebrow;
  $("#detailTitle").textContent = content.title;
  $("#detailMeta").textContent = content.meta;
  $("#detailBody").innerHTML = content.body;
  $("#detailDrawer").dataset.detailType = type;
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
  const navScreen = screen === "applicationFormPage" ? "applyWizard" : screen === "initiationFormPage" ? "myProjects" : screen;
  $$("[data-screen]").forEach((item) => {
    const hasManageTarget = Boolean(item.dataset.manageOpen);
    const systemScreens = ["systemRoles", "systemFlow", "systemFields"];
    const fundScreens = ["fundPool"];
    const active = (item.dataset.systemRoot === "system" && systemScreens.includes(navScreen)) ||
      (item.dataset.fundRoot === "fund" && fundScreens.includes(navScreen)) ||
      (item.dataset.screen === navScreen && (!hasManageTarget || item.dataset.manageOpen === state.manageTab));
    item.classList.toggle("is-active", active);
  });
  $("#pageTitle").textContent = screens[screen].title;
  const pageHeading = $("#pageHeading");
  if (pageHeading) {
    pageHeading.textContent = screens[screen].heading;
    pageHeading.classList.toggle("is-hidden", screen === "initiationFormPage");
  }
  const adminBreadcrumbCurrent = $("#adminBreadcrumbCurrent");
  if (adminBreadcrumbCurrent) adminBreadcrumbCurrent.textContent = screens[screen].title;
  if (screen === "applyWizard" || screen === "applicationFormPage") setWizardStep(state.wizardStep);
  if (screen === "manage") setManageTab(state.manageTab || "business");
  setupAdvancedFilters();
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
  const activeApplication = document.querySelector(".screen.is-active .single-page-application");
  if (activeApplication) {
    state.wizardStep = 0;
    [...activeApplication.querySelectorAll('[data-wizard-panel]')].forEach((item) => {
      item.classList.toggle("is-active", [0, 1, 2, 3, 4].includes(Number(item.dataset.wizardPanel)));
    });
    activeApplication.querySelector("#wizardPrev")?.classList.add("is-hidden");
    activeApplication.querySelector("#wizardNext")?.classList.add("is-hidden");
    activeApplication.querySelector("#wizardSubmit")?.classList.remove("is-hidden");
    return;
  }
  const maxStep = 4;
  const wizardMeta = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
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

function setApplicationReadOnly(readOnly) {
  const panel = $("#applicationFormPanel");
  if (!panel) return;
  panel.classList.toggle("is-review-mode", readOnly);
  panel.querySelectorAll(".application-form-fields input, .application-form-fields select, .application-form-fields textarea, .application-upload-table button[data-action='uploadProjectAttachment'], .application-upload-table button[data-action='removeAttachment']").forEach((control) => {
    control.disabled = readOnly;
  });
}

function renderApplicationAttachmentTable(readOnly = false) {
  const table = $("#applicationAttachmentTable");
  if (!table) return;
  table.classList.toggle("is-readonly-attachments", readOnly);
  if (readOnly) {
    table.innerHTML = `
      <div><span>附件名称</span><span>已传附件</span><span>当前状态</span><span>操作</span></div>
      <div><strong>项目申报书</strong><span class="uploaded-attachment-list"><a href="javascript:void(0)" data-action="previewMaterial">信息化项目申报书.pdf</a></span><em>已上传 1 个</em><span class="attach-actions"><button type="button" data-action="previewMaterial">查看</button><button type="button" data-action="downloadTemplate">下载</button></span></div>
      <div><strong>预算测算表</strong><span class="uploaded-attachment-list"><a href="javascript:void(0)" data-action="previewMaterial">预算测算明细表.xlsx</a></span><em>已上传 1 个</em><span class="attach-actions"><button type="button" data-action="previewMaterial">查看</button><button type="button" data-action="downloadTemplate">下载</button></span></div>
      <div><strong>现状问题说明</strong><span class="uploaded-attachment-list"><a href="javascript:void(0)" data-action="previewMaterial">现状问题说明.docx</a></span><em>已上传 1 个</em><span class="attach-actions"><button type="button" data-action="previewMaterial">查看</button><button type="button" data-action="downloadTemplate">下载</button></span></div>
    `;
    syncTableSequenceNumbers(table.parentElement || document);
    return;
  }
  table.innerHTML = `
    <div><span>附件名称</span><span>已传附件</span><span>是否必填</span><span>当前状态</span><span>操作</span></div>
    <div><strong>项目申报书</strong><span class="uploaded-attachment-list"><a href="javascript:void(0)" data-action="previewMaterial">信息化项目申报书.pdf</a></span><span>必填</span><em>已上传 1 个</em><span class="attach-actions"><button type="button" data-action="uploadProjectAttachment">重新上传</button><button type="button" data-action="previewMaterial">查看</button><button type="button" data-action="downloadTemplate">下载</button><button type="button" data-action="removeAttachment">删除</button></span></div>
    <div><strong>预算测算表</strong><span class="uploaded-attachment-list"><a href="javascript:void(0)" data-action="previewMaterial">预算测算明细表.xlsx</a></span><span>按需</span><em>已上传 1 个</em><span class="attach-actions"><button type="button" data-action="uploadProjectAttachment">重新上传</button><button type="button" data-action="previewMaterial">查看</button><button type="button" data-action="downloadTemplate">下载</button><button type="button" data-action="removeAttachment">删除</button></span></div>
    <div><strong>现状问题说明</strong><span class="uploaded-attachment-list"><a href="javascript:void(0)" data-action="previewMaterial">现状问题说明.docx</a></span><span>选填</span><em>已上传 1 个</em><span class="attach-actions"><button type="button" data-action="uploadProjectAttachment">重新上传</button><button type="button" data-action="previewMaterial">查看</button><button type="button" data-action="downloadTemplate">下载</button><button type="button" data-action="removeAttachment">删除</button></span></div>
  `;
  syncTableSequenceNumbers(table.parentElement || document);
}

function initiationAcceptanceNextLabel() {
  if (state.initiationIsCityProject) {
    return state.initiationHasDeposit
      ? "提交验收审批后，在本环节继续补齐市级验收材料，再进入退履约保证金。"
      : "提交验收审批后，在本环节继续补齐市级验收材料，再直接进入归档。";
  }
  return state.initiationHasDeposit
    ? "提交后进入退履约保证金。"
    : "提交后跳过退履约保证金，直接进入归档。";
}

function initiationCityAcceptanceNextLabel() {
  return state.initiationHasDeposit
    ? "市级验收材料在验收环节补齐后进入退履约保证金。"
    : "市级验收材料在验收环节补齐后直接进入归档。";
}

function acceptanceStepMax() {
  return state.initiationIsCityProject ? 4 : 3;
}

function advanceAcceptanceStep() {
  state.initiationAcceptanceStep = Math.min(acceptanceStepMax(), (state.initiationAcceptanceStep || 0) + 1);
  renderInitiationFlow();
  showToast(`已进入${["申请", "验收过程", "验收材料", "验收报告", "市级项目验收报告"][state.initiationAcceptanceStep]}。`);
}

function initiationSubmitLabel(stage, meta) {
  if (stage === 4) return "提交";
  return stage === 6 ? "提交" : meta.button.replace(/^提交.+$/, "提交");
}

function openApplicationReadonlyDetail(returnScreen = state.screen || "manage") {
  if (returnScreen === "manage") {
    openApplicationReadonlyDialog();
    showToast("申报只读信息已打开。");
    return;
  }
  openApplicationForm("readonly", { returnScreen });
  showToast("已打开只读详情页。");
}

function openApplicationReadonlyDialog() {
  openCustomDetail({
    eyebrow: "申报详情",
    title: "网络安全态势感知平台",
    meta: "只读表单信息",
    type: "applicationReadonlyDialog",
    body: `
      <section class="detail-section readonly-form-section">
        <h3>基础信息</h3>
        <div class="form-grid form-grid-3 readonly-form-grid">
          <label><span>项目名称</span><input value="网络安全态势感知平台" readonly /></label>
          <label><span>申报部门</span><input value="信息化办公室" readonly /></label>
          <label><span>归口部门</span><input value="信息化办公室" readonly /></label>
          <label><span>建设类型</span><input value="软件平台" readonly /></label>
          <label><span>使用部门</span><input value="全校" readonly /></label>
          <label><span>申报人</span><input value="张老师" readonly /></label>
        </div>
      </section>
      <section class="detail-section readonly-form-section">
        <h3>预算</h3>
        <div class="form-grid form-grid-3 readonly-form-grid">
          <label><span>申报预算</span><input value="860000 元" readonly /></label>
          <label><span>经费来源</span><input value="信息化建设专项" readonly /></label>
          <label><span>费用说明</span><input value="" readonly /></label>
        </div>
      </section>
      <section class="detail-section readonly-form-section">
        <h3>申报材料</h3>
        <div class="attachment-check-table application-upload-table is-readonly-attachments">
          <div><span>附件名称</span><span>已传附件</span><span>当前状态</span><span>操作</span></div>
          <div><strong>项目申报书</strong><span>信息化项目申报书.pdf</span><em>已上传 1 个</em><span class="attach-actions"><button type="button" data-action="previewMaterial">查看</button></span></div>
          <div><strong>预算测算表</strong><span>预算测算明细表.xlsx</span><em>已上传 1 个</em><span class="attach-actions"><button type="button" data-action="previewMaterial">查看</button></span></div>
          <div><strong>现状问题说明</strong><span>现状问题说明.docx</span><em>已上传 1 个</em><span class="attach-actions"><button type="button" data-action="previewMaterial">查看</button></span></div>
        </div>
      </section>
    `
  });
  syncTableSequenceNumbers($("#detailBody") || document);
}

function renderApplicationApprovalTimeline() {
  const target = $("#applicationApprovalTimeline");
  if (!target) return;
  const rows = [];
  if (state.applicationStage > 0 || state.applicationApprovals.length) {
    rows.push({
      node: "项目申报",
      actor: "张老师",
      time: "2026-07-14 09:20",
      result: "已提交",
      opinion: "提交项目基本信息、建设说明、经费关联和申报附件。"
    });
  }
  rows.push(...state.applicationApprovals);
  target.innerHTML = rows.length ? rows.map((item) => `
    <article>
      <span>${item.node}</span>
      <strong>${item.result}</strong>
      <em>${item.actor} · ${item.time}</em>
      <p>${item.opinion || "无补充意见"}</p>
    </article>
  `).join("") : `<article class="empty"><strong>暂无审核记录</strong><p>提交后将自动生成流转记录。</p></article>`;
}

function renderApplicationFlowTrack(stages, stage) {
  const track = $("#applicationFlowTrack");
  if (!track) return;
  track.innerHTML = stages.map((item, index) => `
    <div class="application-flow-step ${index === stage ? "is-current" : ""} ${index < stage ? "is-done" : ""}" data-application-stage="${index}">
      <b>${index + 1}</b><span>${item.label}</span>
    </div>
  `).join("");
}

function renderApplicationFlow() {
  renderApplicationBudgetHint();
  const stages = applicationFlowStages();
  const stage = Math.max(0, Math.min(stages.length - 1, state.applicationStage || 0));
  state.applicationStage = stage;
  const meta = stages[stage];
  const isFinalStorage = stage === stages.length - 1;
  const panel = $("#applicationFormPanel");
  const isReadonlyMode = panel?.dataset.applicationMode === "readonly";
  renderApplicationFlowTrack(stages, stage);
  $("#applicationFlowCurrent") && ($("#applicationFlowCurrent").textContent = meta.label);
  $$("[data-application-stage]").forEach((item) => {
    const itemStage = Number(item.dataset.applicationStage);
    item.classList.toggle("is-current", itemStage === stage);
    item.classList.toggle("is-done", itemStage < stage);
  });
  const isReview = stage > 0;
  panel?.classList.toggle("is-readonly-detail", isReadonlyMode);
  setApplicationReadOnly(isReview || isReadonlyMode);
  renderApplicationAttachmentTable(isReview || isReadonlyMode);
  const historyPane = $("#applicationHistoryPane");
  const approvalPane = $("#applicationApprovalPane");
  historyPane?.classList.toggle("is-hidden", !isReadonlyMode && !isReview && !state.applicationApprovals.length);
  approvalPane?.classList.toggle("is-hidden", isReadonlyMode || !isReview || isFinalStorage);
  const approvalHeadTitle = approvalPane?.querySelector(".panel-head h2");
  const approvalCollapseButton = approvalPane?.querySelector(".application-section-collapse");
  if (approvalHeadTitle) approvalHeadTitle.textContent = meta.label;
  if (approvalCollapseButton) approvalCollapseButton.setAttribute("aria-label", `收起${meta.label}`);
  if (isReview && !isReadonlyMode && historyPane && approvalPane && historyPane.previousElementSibling !== approvalPane) {
    historyPane.parentNode.insertBefore(approvalPane, historyPane);
  }
  const saveButton = $("#applicationSaveDraft");
  if (saveButton) {
    saveButton.classList.toggle("is-hidden", isReadonlyMode);
    saveButton.textContent = "保存";
  }
  const opinion = $("#applicationApprovalOpinion");
  if (opinion && isReview) opinion.placeholder = meta.placeholder;
  const approvalPanel = $("#applicationApprovalPane .approval-panel");
  const existingOpinionLabel = approvalPanel?.querySelector(".application-approval-opinion-label");
  if (approvalPanel && existingOpinionLabel && existingOpinionLabel.closest(".library-branch-review")) {
    approvalPanel.appendChild(existingOpinionLabel);
  }
  approvalPanel?.querySelector(".application-route-note")?.remove();
  approvalPanel?.querySelector(".library-branch-review")?.remove();
  if (approvalPanel && isReview && !isFinalStorage) {
    const isOfficeReview = meta.label === "网信办审核";
    const isSchoolReview = meta.label === "校级审核";
    if (isOfficeReview || isSchoolReview) {
      const branchDecisionOptions = isSchoolReview ? `
                  <label class="approval-option is-positive"><input type="radio" name="${meta.label}结论" value="agree" checked /><span>同意入库</span></label>
                  <label class="approval-option is-warning"><input type="radio" name="${meta.label}结论" value="return" /><span>退回修改</span></label>
                  <label class="approval-option is-danger"><input type="radio" name="${meta.label}结论" value="reject" /><span>不同意入库</span></label>
                ` : `
                  <label class="approval-option is-positive"><input type="radio" name="${meta.label}结论" value="agree" checked /><span>同意入库</span></label>
                  <label class="approval-option is-warning"><input type="radio" name="${meta.label}结论" value="return" /><span>退回修改</span></label>
                  <label class="approval-option is-danger"><input type="radio" name="${meta.label}结论" value="reject" /><span>不同意入库</span></label>
                  <label class="approval-option is-info"><input type="radio" name="${meta.label}结论" value="expert" /><span>安排专家论证</span></label>
                  <label class="approval-option is-purple"><input type="radio" name="${meta.label}结论" value="school" /><span>参加校级评审</span></label>
                `;
      const branchMarkup = `
        <div class="library-branch-review application-branch-review">
          <article>
            <div class="application-review-subsections">
              <div class="application-review-subsection application-branch-attachments">
                <div class="application-branch-attachment-head">
                  <strong>评审材料上传</strong>
	                  <button class="ghost-btn" type="button" data-action="addBranchAttachment">新增附件</button>
                </div>
                <div class="attachment-check-table application-upload-table application-branch-attachment-table">
                  <div><span>附件名称</span><span>要求</span><span>状态</span><span>操作</span></div>
                  <div><strong contenteditable="true" title="可直接修改附件名称">${meta.label}评审材料</strong><span><i class="required-star" aria-hidden="true">*</i>必填</span><em>待上传</em><span class="attach-actions"><button type="button" data-action="uploadProjectAttachment">上传</button></span></div>
                </div>
              </div>
              <div class="application-review-subsection application-review-conclusion">
                <div class="application-branch-conclusion application-branch-radio-group">
                  <span>审核结论</span>
                  ${branchDecisionOptions}
                </div>
                ${isSchoolReview ? `
                  <div class="application-city-decision application-branch-radio-group">
                    <span>市级项目申报</span>
                    <label class="approval-option is-info"><input type="radio" name="${meta.label}市级申报" value="no" checked /><span>不参加市级项目申报</span></label>
                    <label class="approval-option is-purple"><input type="radio" name="${meta.label}市级申报" value="yes" /><span>参加市级项目申报</span></label>
                  </div>
                ` : ""}
                <div class="application-branch-opinion-slot"></div>
              </div>
            </div>
          </article>
        </div>
      `;
      const opinionLabel = approvalPanel.querySelector("label");
      if (opinionLabel) opinionLabel.insertAdjacentHTML("beforebegin", branchMarkup);
      else approvalPanel.insertAdjacentHTML("beforeend", branchMarkup);
      const inserted = approvalPanel.querySelector(".library-branch-review");
      const slot = inserted?.querySelector(".application-branch-opinion-slot");
      if (slot && opinionLabel) slot.appendChild(opinionLabel);
      inserted?.querySelectorAll(".application-branch-conclusion .approval-option input").forEach((input) => {
        input.addEventListener("change", () => {
          if (input.checked) state.applicationDecision = input.value;
        });
      });
    }
  }
  const submit = $("#applicationFlowSubmit");
  const saveDraftButton = $("#applicationSaveDraft");
  const returnButton = $("#applicationReturnBtn");
  const rejectButton = $("#applicationRejectBtn");
  if (saveDraftButton) {
    saveDraftButton.classList.toggle("is-hidden", isReview || isReadonlyMode || isFinalStorage);
  }
  if (submit) {
    submit.classList.toggle("is-hidden", isReadonlyMode || isFinalStorage);
    submit.textContent = "提交";
    submit.dataset.decisionSubmit = isFinalStorage ? "approve" : "agree";
  }
  if (returnButton) {
    returnButton.classList.toggle("is-hidden", !isReview || isReadonlyMode || isFinalStorage);
    returnButton.textContent = "保存";
    returnButton.dataset.decisionSubmit = "save";
  }
  if (rejectButton) {
    rejectButton.classList.toggle("is-hidden", true);
    rejectButton.dataset.decisionSubmit = "reject";
  }
  const applicationSections = $$("#applicationFormPanel > .wizard-pane.is-active");
  applicationSections.forEach((section, index) => {
    const shouldCollapse = isReview && index < 2;
    setApplicationSectionCollapsed(section, shouldCollapse);
  });
  bindProjectAttachmentUploadButtons(panel || document);
  ensureAttachmentHeaderAddButtons(panel || document);
  syncTableSequenceNumbers(panel || document);
  renderApplicationApprovalTimeline();
  styleRequiredAsterisks(panel || document);
}

function selectApplicationDecision(button) {
  state.applicationDecision = button.dataset.approvalResult || "agree";
  $$("#applicationApprovalChoices [data-approval-result]").forEach((item) => {
    item.classList.toggle("is-active", item === button);
  });
}

function appendApplicationApproval(result, fallbackOpinion = "") {
  const stages = applicationFlowStages();
  const stage = Math.max(0, Math.min(stages.length - 1, state.applicationStage || 0));
  const meta = stages[stage];
  const opinion = ($("#applicationApprovalOpinion")?.value || fallbackOpinion || meta.placeholder).trim();
  state.applicationApprovals.push({
    node: meta.label,
    actor: meta.actor,
    time: `2026-07-14 ${stage === 1 ? "10:10" : stage === 2 ? "11:25" : "14:30"}`,
    result,
    opinion
  });
}

function submitApplicationFlow() {
  const stage = state.applicationStage;
  const stages = applicationFlowStages();
  const finalStage = stages.length - 1;
  if (stage >= finalStage) {
    renderApplicationFlow();
    showToast("项目已完成入库，可查看入库结果。");
    return;
  }
  if (stage === 0) {
    state.applicationBudgetAmount = applicationBudgetAmount();
    state.applicationStage = 1;
    state.applicationDecision = "agree";
    state.applicationTerminated = false;
    renderApplicationFlow();
    showToast("申报已提交，进入网信办审核。");
    return;
  }
  const decision = state.applicationDecision || "agree";
  appendApplicationApproval(applicationDecisionText[decision]);
  if (decision === "return") {
    state.applicationStage = 0;
    renderApplicationFlow();
    showToast("已退回修改，申请人可重新编辑后提交。");
    return;
  }
  if (decision === "reject") {
    if (stages[stage]?.label === "校级审核") {
      state.applicationTerminated = true;
      renderApplicationFlow();
      showToast("已记录不同意入库，项目申报流程已终止。");
      return;
    }
    renderApplicationFlow();
    showToast("已记录不同意意见，流程停留在当前审核节点。");
    return;
  }
  if (decision === "expert") {
    renderApplicationFlow();
    showToast("已暂存为安排专家论证，线下论证后可继续上传材料并选择后续操作。");
    return;
  }
  state.applicationStage = stage + 1;
  state.applicationDecision = "agree";
  renderApplicationFlow();
  showToast(state.applicationStage >= finalStage ? "审核已通过，项目完成入库。" : `已进入${stages[state.applicationStage].label}。`);
}

function submitApplicationFlowFromButton(button) {
  if (button?.dataset?.decisionSubmit === "save") {
    showToast("已保存审核草稿。");
    return;
  }
  const checkedDecision = $("#applicationApprovalPane .application-branch-conclusion .approval-option input:checked")?.value
    || $("#applicationApprovalPane .approval-option input:checked")?.value;
  state.applicationDecision = state.applicationStage > 0
    ? (checkedDecision || button?.dataset?.decisionSubmit || "agree")
    : (button?.dataset?.decisionSubmit || "agree");
  submitApplicationFlow();
}

function isInitiationStageSkipped(stageIndex) {
  return stageIndex === 5 && (!state.initiationHasDeposit || state.initiationSkippedRefund);
}

function processSectionMarkup(title, body, className = "", collapsed = true) {
  const hasHeaderAdd = className.includes("implementation-record-section");
  const collapseButton = `<button class="application-section-collapse" type="button" aria-label="${collapsed ? "展开" : "收起"}${title}" aria-expanded="${String(!collapsed)}">${collapsed ? "⌄" : "⌃"}</button>`;
  return `
    <section class="wizard-pane is-active ${collapsed ? "is-collapsed" : ""} inherited-process-section ${className}">
      <div class="panel-head compact-head application-section-head">
        <h2>${title}</h2>
        ${hasHeaderAdd ? `<div class="application-summary-actions"><button class="ghost-btn" type="button" data-action="addSectionAttachment">新增</button>${collapseButton}</div>` : collapseButton}
      </div>
      <div class="application-section-body">
        ${body}
      </div>
    </section>
  `;
}

function stageGroupMarkup(title, body, { collapsed = false, className = "" } = {}) {
  return `
    <section class="initiation-stage-group ${collapsed ? "is-collapsed" : ""} ${className}">
      <header class="initiation-stage-group-head" role="button" tabindex="0" aria-expanded="${String(!collapsed)}">
        <strong>${title}</strong>
        <button class="initiation-stage-group-toggle" type="button" aria-label="${collapsed ? "展开" : "收起"}${title}">${collapsed ? "⌄" : "⌃"}</button>
      </header>
      <div class="initiation-stage-group-body">${body}</div>
    </section>
  `;
}

function inheritedProcessInfo(stageIndex) {
  const expertAcceptance = initiationUsesExpertAcceptance();
  const info = {
    1: {
      title: "采购与合同信息",
      fields: [["采购方式", "校内论证后采购"], ["采购金额", "82 万"], ["合同名称", "网络安全态势感知平台建设合同"], ["合同签订日期", "2026-08-20"], ["供应商", "上海某信息技术有限公司"], ["履约保证金", state.initiationHasDeposit ? "4.1 万" : "无"]]
    },
    2: {
      title: "付款记录",
      fields: [["启动日期", "2026-09-01"], ["启动会材料", "启动会纪要.pdf"], ["付款记录", "1 笔"], ["阶段结论", "系统建设和联调完成"]]
    },
    3: {
      title: "试运行信息",
      fields: [["开始时间", "2026-11-01"], ["结束时间", "2026-11-30"], ["试运行结论", "稳定，可申请验收"], ["问题整改", "已关闭"]]
    },
    4: {
      title: "验收信息",
      fields: [["验收方式", expertAcceptance ? "专家验收" : "自行验收"], ["验收结论", "通过"], ["质保期开始", "2026-12-20"], ["整改记录", "已完成"]]
    },
    5: {
      title: "履约保证金信息",
      fields: [["保证金金额", state.initiationHasDeposit ? "4.1 万" : "无"], ["退还日期", "2027-01-10"], ["退还金额", state.initiationHasDeposit ? "4.1 万" : "无"], ["责任部门", "财务处"]]
    }
  }[stageIndex];
  if (!info) return "";
  return processSectionMarkup(info.title, `
    <div class="process-history-fields">
      ${info.fields.map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("")}
    </div>
  `, "inherited-stage-card");
}

function inheritedMaterialCard(stageIndex) {
  const meta = initiationStageMeta[stageIndex];
  if (!meta) return "";
  if (isInitiationStageSkipped(stageIndex)) return "";
  const files = initiationMaterialFiles(stageIndex);
  if (!files.length) return "";
  return processSectionMarkup(`${meta.label}材料`, `
    <div class="attachment-check-table application-upload-table inherited-material-table">
      <div><span>节点</span><span>材料名称</span><span>要求</span><span>状态</span><span>操作</span></div>
      ${files.map((file, index) => `
        <div><span>${meta.label}</span><strong>${file}</strong><span>${initiationMaterialRequirement(stageIndex, index, file)}</span><em>已归集</em><span class="attach-actions"><button type="button" data-action="previewMaterial">查看</button></span></div>
      `).join("")}
    </div>
  `, "inherited-material-card");
}

function processInheritedCards(stage) {
  return initiationStageMeta
    .map((_, stageIndex) => stageIndex)
    .filter((stageIndex) => stageIndex > 0 && stageIndex < stage && !isInitiationStageSkipped(stageIndex))
    .map((stageIndex) => stageGroupMarkup(initiationStageMeta[stageIndex].label, `${inheritedProcessInfo(stageIndex)}${inheritedMaterialCard(stageIndex)}`, {
      collapsed: true,
      className: "is-prior-stage"
    }))
    .join("");
}

const acceptanceCollectionArchiveFiles = ["用户手册", "测试报告", "培训记录", "整改闭环材料", "其他佐证材料"];

function initiationProcessExtraMarkup(stage) {
  const expertReviewNeeded = acceptanceNeedsExpertReview();
  const acceptanceStep = Math.min(acceptanceStepMax(), state.initiationAcceptanceStep || 0);
  const acceptanceDecisionPanel = "";
  const acceptanceRequestModule = (readonly = false) => readonly ? `
      <section class="acceptance-module is-readonly-step">
        <header><b>1</b><strong>验收申请提交资料</strong></header>
        <div class="attachment-check-table application-upload-table acceptance-review-material-table acceptance-submitted-material-table">
          <div><span>材料名称</span><span>已传附件</span><span>要求</span><span>状态</span><span>操作</span></div>
          <div><strong>验收申请单</strong><span class="uploaded-attachment-list"><a href="javascript:void(0)" data-action="previewMaterial">验收申请单.pdf</a></span><span>必填</span><em>已上传 1 个</em><span class="attach-actions"><button type="button" data-action="previewMaterial">查看</button></span></div>
          <div><strong>验收材料</strong><span class="uploaded-attachment-list"><a href="javascript:void(0)" data-action="previewMaterial">验收材料包.zip</a></span><span>必填</span><em>已上传 2 个</em><span class="attach-actions"><button type="button" data-action="previewMaterial">查看</button></span></div>
        </div>
      </section>
    ` : `
      <section class="acceptance-module">
        <header><b>1</b><strong>验收申请材料</strong></header>
        <div class="process-upload-line">
          <span>验收申请单</span>
          <strong><i class="required-star" aria-hidden="true">*</i>必填，待上传</strong>
          <button type="button" data-action="uploadProjectAttachment">上传附件</button>
        </div>
        <div class="process-upload-line">
          <span>验收材料</span>
          <strong><i class="required-star" aria-hidden="true">*</i>必填，待上传</strong>
          <button type="button" data-action="uploadProjectAttachment">上传附件</button>
        </div>
        <p class="process-extra-note">提交后流转给主管部门审核，本环节只维护申请材料。</p>
      </section>
    `;
	  const acceptanceReviewModule = (readonly = false) => readonly ? `
	      <section class="acceptance-module is-readonly-step">
	        <header><b>2</b><strong>主管部门审核</strong></header>
	        <div class="acceptance-review-summary">
	          <span class="status-pill green">同意</span>
	          <p>申请材料完整，同意进入下一步。</p>
	        </div>
	      </section>
	    ` : `
      <section class="acceptance-module">
        <header><b>2</b><strong>主管部门审核</strong></header>
        <div class="application-branch-conclusion application-branch-radio-group acceptance-decision-group">
          <span>审核结论</span>
          <label class="approval-option is-positive"><input type="radio" name="验收主管审核" checked /><span>同意</span></label>
          <label class="approval-option is-warning"><input type="radio" name="验收主管审核" /><span>退回修改</span></label>
          <label class="approval-option is-danger"><input type="radio" name="验收主管审核" /><span>不同意</span></label>
        </div>
	        <label class="acceptance-review-opinion"><span>审核意见</span><textarea>申请材料完整，同意进入下一步。</textarea></label>
	      </section>
	    `;
	  const acceptanceCollectionRows = (readonly = false) => acceptanceCollectionArchiveFiles.map((file, index) => {
	    const uploadedName = `${file}.${file.includes("整改") || file.includes("其他") ? "zip" : "pdf"}`;
	    return readonly
	      ? `<div><strong>${file}</strong><span>${uploadedName}</span><em>已上传 ${index === 4 ? 2 : 1} 个</em><span class="attach-actions"><button type="button" data-action="previewMaterial">查看</button></span></div>`
	      : `<div><strong>${file}</strong><span>按需上传</span><em>待上传</em><span class="attach-actions"><button type="button" data-action="uploadProjectAttachment">上传</button></span></div>`;
	  }).join("");
	  const acceptanceCollectionModule = (readonly = false) => readonly ? `
	      <section class="acceptance-module is-readonly-step">
	        <header><b>3</b><strong>验收材料归集</strong></header>
	        <div class="attachment-check-table application-upload-table acceptance-collection-upload-table acceptance-collection-readonly-table">
	          <div><span>材料名称</span><span>已传附件</span><span>状态</span><span>操作</span></div>
	          ${acceptanceCollectionRows(true)}
	        </div>
	        <div class="acceptance-review-summary">
	          <span class="status-pill green">材料已补齐</span>
	          <p>${expertReviewNeeded ? "专家验收日期：2026-12-15，专家意见材料已上传。" : "验收过程材料已归集，进入验收报告阶段。"}</p>
	        </div>
	      </section>
	    ` : `
	      <section class="acceptance-module">
		        <header><b>3</b><strong>验收材料归集</strong><div class="acceptance-module-actions acceptance-module-head-actions"><button type="button" data-action="uploadProjectAttachment">上传附件</button></div></header>
	        <div class="form-grid form-grid-3 acceptance-expert-fields acceptance-expert-fields-top">
	          <label><span>专家验收日期（选填）</span><input value="2026-12-15" /></label>
	          <label><span>专家意见材料（选填）</span><input value="专家意见材料.pdf" /></label>
          </div>
	        <div class="attachment-check-table application-upload-table acceptance-collection-upload-table">
	          <div><span>材料名称</span><span>要求</span><span>状态</span><span>操作</span></div>
	          ${acceptanceCollectionRows(false)}
	        </div>
      </section>
    `;
  const acceptanceReportModule = `
      <section class="acceptance-module">
        <header><b>4</b><strong>验收报告</strong></header>
        <div class="form-grid form-grid-3">
          <label><span>验收报告完成日期</span><input value="2026-12-20" /></label>
          <label><span>质保期开始日期</span><input value="2026-12-20" /></label>
          <label><span>验收报告上传</span><input value="验收报告最终稿.pdf" /></label>
        </div>
      </section>
    `;
  const acceptanceCityModule = `
      <section class="acceptance-module">
        <header><b>5</b><strong>市级项目验收报告</strong></header>
        <div class="process-upload-line">
          <span>市级验收清单</span>
          <strong>市级验收清单.pdf</strong>
          <button type="button" data-action="uploadProjectAttachment">上传附件</button>
        </div>
      </section>
    `;
  const acceptanceModuleStack = [
    acceptanceRequestModule(acceptanceStep > 0),
    acceptanceStep >= 1 ? acceptanceReviewModule(acceptanceStep > 1) : "",
    acceptanceStep >= 2 ? acceptanceCollectionModule(acceptanceStep > 2) : "",
    acceptanceStep >= 3 ? acceptanceReportModule : "",
    acceptanceStep >= 4 ? acceptanceCityModule : ""
  ].join("");
  const panels = {
    1: `
      <section class="process-extra-card">
        <h3>采购与合同信息</h3>
        <div class="form-grid form-grid-3 procurement-contract-grid">
          <label><span>* 采购方式</span><select><option>校内论证后采购</option><option>公开招标</option><option>单一来源</option><option>框架协议</option></select></label>
          <label><span>* 采购金额</span><input value="82 万" /></label>
          <label><span>* 预算编号</span><input value="XXH-2026-01、AQZL-2026-02" /></label>
          <label class="contract-field"><span>* 合同名称</span><input value="网络安全态势感知平台建设合同" /></label>
          <label class="contract-field"><span>* 合同金额</span><input value="82 万" /></label>
          <label class="contract-field"><span>* 合同签订日期</span><input value="2026-08-20" /></label>
          <label class="guarantee-toggle-field"><span>* 是否有履约保证金</span><select id="initiationDepositSelect"><option value="yes" ${state.initiationHasDeposit ? "selected" : ""}>是</option><option value="no" ${!state.initiationHasDeposit ? "selected" : ""}>否</option></select></label>
          <label class="guarantee-amount-field"><span>* 履约保证金金额</span><input value="${state.initiationHasDeposit ? "4.1 万" : ""}" placeholder="无" ${state.initiationHasDeposit ? "" : "disabled"} /></label>
          <div class="form-grid-placeholder" aria-hidden="true"></div>
          <label class="guarantee-toggle-field"><span>* 是否有质量保证金</span><select id="initiationQualityDepositSelect"><option value="yes" ${state.initiationHasQualityDeposit ? "selected" : ""}>是</option><option value="no" ${!state.initiationHasQualityDeposit ? "selected" : ""}>否</option></select></label>
          <label class="guarantee-amount-field"><span>* 质量保证金金额</span><input value="${state.initiationHasQualityDeposit ? "2.6 万" : ""}" placeholder="无" ${state.initiationHasQualityDeposit ? "" : "disabled"} /></label>
          <div class="form-grid-placeholder" aria-hidden="true"></div>
          <label><span>* 供应商</span><input value="上海某信息技术有限公司" /></label>
        </div>
      </section>
    `,
    2: `
      <section class="process-extra-card">
        <h3>付款计划及记录</h3>
        <div class="payment-summary-grid">
          <article><span>合同总金额</span><strong>82 万</strong></article>
          <article class="is-paid"><span>已付款合计</span><strong>24.6 万</strong></article>
          <article><span>待付款金额</span><strong>57.4 万</strong></article>
        </div>
        <div class="payment-record-head">
          <h4>付款计划</h4>
          <button type="button" data-action="addPaymentRecord">新增计划</button>
        </div>
        <div class="payment-plan-table">
          <div><span>序号</span><span>预算编号</span><span>本项目预算</span><span>已付款金额</span><span>待付款金额</span></div>
          <div><strong>1</strong><span>XXH-2026-01</span><span>82 万</span><span>24.6 万</span><span>57.4 万</span></div>
        </div>
        <div class="payment-record-head">
          <h4>付款记录</h4>
          <button type="button" data-action="addPaymentRecord">新增付款</button>
        </div>
        <div class="payment-record-table">
          <div><span>序号</span><span>付款时间</span><span>预算编号</span><span>付款金额</span><span>发票/凭证</span><span>证明材料</span><span>操作</span></div>
          <div><strong>1</strong><span>2026-09-15</span><span>XXH-2026-01</span><span>24.6 万</span><span>发票-001.pdf</span><span>付款审批单.pdf</span><span class="payment-row-actions"><button type="button" data-action="addPaymentRecord">编辑</button><button type="button" data-action="removePaymentRecord">删除</button></span></div>
        </div>
      </section>
    `,
    "2-record": `
      <section class="process-extra-card">
        <h3>实施过程记录材料</h3>
        <div class="implementation-record-table attachment-check-table application-upload-table">
          <div><span>序号</span><span>记录名称</span><span>日期</span><span>材料</span><span>操作</span></div>
          <div><strong>启动日期</strong><span>启动会材料</span><span>2026-09-01</span><span>启动会纪要.pdf</span><span class="attach-actions"><button type="button" data-action="uploadProjectAttachment">上传</button><button type="button" data-action="removeAttachment">删除</button></span></div>
          <div><strong>交付日期</strong><span>培训记录</span><span>2026-10-15</span><span>培训记录.pdf</span><span class="attach-actions"><button type="button" data-action="uploadProjectAttachment">上传</button><button type="button" data-action="removeAttachment">删除</button></span></div>
          <div><strong>自定义记录</strong><span><input value="联调记录" /></span><span><input value="2026-10-30" /></span><span><button class="upload-inline-btn" type="button" data-action="uploadProjectAttachment">上传附件</button></span><span class="attach-actions"><button type="button" data-action="removeAttachment">删除</button></span></div>
        </div>
      </section>
    `,
    3: `
      <section class="process-extra-card">
        <h3>试运行信息</h3>
        <div class="form-grid form-grid-3">
          <label><span>* 试运行开始时间</span><input value="2026-11-01" /></label>
          <label><span>* 试运行结束时间</span><input value="2026-11-30" /></label>
          <label><span>试运行结论</span><select><option>稳定，可申请验收</option><option>需整改后再申请</option></select></label>
        </div>
      </section>
    `,
    4: `
      <section class="process-extra-card">
        <h3>验收</h3>
        <div class="acceptance-module-list">
          ${acceptanceModuleStack}
        </div>
        ${acceptanceDecisionPanel}
      </section>
    `,
    5: `
      <section class="process-extra-card">
        <h3>履约保证金信息</h3>
        <div class="form-grid form-grid-3">
          <label><span>履约保证金金额</span><input value="4.1 万" /></label>
          <label><span>退还日期</span><input value="2027-01-10" /></label>
          <label><span>退还金额</span><input value="4.1 万" /></label>
          <label><span>确认状态</span><select><option>待财务确认</option><option>已确认退还</option></select></label>
        </div>
      </section>
    `,
	    6: `
	      <section class="process-extra-card">
	        <h3>归档材料池</h3>
	        <div class="archive-inline-toolbar">
	          <strong>已归档材料清单</strong>
	          <span class="archive-inline-actions">
	            <button class="ghost-btn" type="button" data-action="loadArchiveMaterialChecklist">加载材料清单</button>
	            <button class="ghost-btn" type="button" data-action="addSectionAttachment">新增附件</button>
	          </span>
	        </div>
	        <div class="attachment-check-table application-upload-table archive-material-inline-table">
	          <div><span>材料名称</span><span>归档来源</span><span>状态</span><span>操作</span></div>
	          ${archiveGeneratedMaterialRows()}
	        </div>
	      </section>
	    `
  };
  const titles = {
    1: "采购与合同信息",
    2: "付款计划及记录",
    3: "试运行信息",
    4: "验收",
    5: "履约保证金信息",
    6: "归档材料池"
  };
  const panel = panels[stage] || "";
  if (!panel || !titles[stage]) return panel;
  const body = panel
    .replace(/^\s*<section class="process-extra-card">\s*<h3>[^<]+<\/h3>/, "")
    .replace(/<\/section>\s*$/, "");
  const current = processSectionMarkup(titles[stage], body, "current-process-card", false);
  return stage === 2 ? `${current}${processSectionMarkup("实施过程记录材料", panels["2-record"]
    .replace(/^\s*<section class="process-extra-card">\s*<h3>[^<]+<\/h3>/, "")
    .replace(/<\/section>\s*$/, ""), "current-process-card implementation-record-section", false)}` : current;
}

function renderInitiationFlow() {
  const stage = Math.max(0, Math.min(initiationStageMeta.length - 1, state.initiationStage || 0));
  const meta = initiationStageMeta[stage];
  $("#initiationFlowCurrent") && ($("#initiationFlowCurrent").textContent = meta.label);
  $$("[data-initiation-stage]").forEach((item) => {
    const itemStage = Number(item.dataset.initiationStage);
    const skipped = isInitiationStageSkipped(itemStage);
    item.classList.toggle("is-current", itemStage === stage);
    item.classList.toggle("is-done", itemStage < stage && !skipped);
    item.classList.toggle("is-skipped", skipped);
    item.setAttribute("role", "button");
    item.setAttribute("tabindex", "0");
    item.setAttribute("aria-label", `查看${initiationStageMeta[itemStage]?.label || "当前"}环节快照`);
    if (item.dataset.snapshotBound !== "true") {
      item.dataset.snapshotBound = "true";
      item.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        selectInitiationStageSnapshot(item.dataset.initiationStage);
      });
      item.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        selectInitiationStageSnapshot(item.dataset.initiationStage);
      });
    }
  });
  const submit = $("#initiationFlowSubmit");
  if (submit) submit.textContent = initiationSubmitLabel(stage, meta);
  const title = $("#initiationProcessTitle");
  if (title) title.textContent = stage === 2 ? "实施过程记录材料" : `${meta.label}材料`;
  const currentGroupHead = $("#initiationCurrentGroupHead");
  if (currentGroupHead) {
    currentGroupHead.classList.toggle("is-hidden", stage === 0);
    const label = currentGroupHead.querySelector("strong");
    if (label) label.textContent = meta.label;
  }
  const rootGroupHead = $("#initiationRootGroupHead");
  if (rootGroupHead && rootGroupHead.dataset.directBound !== "true") {
    rootGroupHead.dataset.directBound = "true";
    rootGroupHead.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggleInitiationStageGroup(rootGroupHead);
    });
  }
  if (rootGroupHead) setInitiationRootGroupCollapsed(stage > 0);
  const amountLevelSelect = $("#initiationAmountLevelSelect");
  if (amountLevelSelect) amountLevelSelect.value = initiationUsesExpertAcceptance() ? "expert" : "self";
  const cityProjectSelect = $("#initiationCityProjectSelect");
  if (cityProjectSelect) cityProjectSelect.value = state.initiationIsCityProject ? "yes" : "no";
  const depositBaseSelect = $("#initiationDepositBaseSelect");
  if (depositBaseSelect) depositBaseSelect.value = state.initiationHasDeposit ? "yes" : "no";
  $$("input[name='initiationUseLibrary']").forEach((input) => {
    input.checked = input.value === state.initiationUseLibrary;
  });
  renderInitiationLibraryProjectSelect();
  const rootMaterialPane = $("#initiationRootMaterialPane");
  const rootMaterialTable = $("#initiationRootMaterialTable");
  if (rootMaterialPane) {
    rootMaterialPane.classList.remove("is-hidden");
    rootMaterialPane.classList.toggle("is-prior-readonly-section", stage > 0);
    setApplicationSectionCollapsed(rootMaterialPane, stage > 0);
  }
  if (rootMaterialTable) {
    const rootFiles = initiationMaterialFiles(0);
    rootMaterialTable.innerHTML = `
      <div><span>材料名称</span><span>要求</span><span>状态</span><span>操作</span></div>
      ${rootFiles.map((file, index) => {
        const required = initiationMaterialRequirement(0, index, file);
        const status = stage > 0 ? "已归集" : initiationMaterialStatus(0, index, file);
        return `<div><strong>${file}</strong><span>${required}</span><em>${status}</em><span class="attach-actions">${materialUploadActions(status)}</span></div>`;
      }).join("")}
    `;
	  }
	  const processPane = $("#initiationProcessPane");
	  if (processPane) processPane.classList.toggle("is-hidden", stage === 0 || stage === 2 || stage === 4);
  const initiationSections = $$("#initiationFormPanel > .wizard-pane.is-active");
  initiationSections.forEach((section) => {
    if (section.id === "initiationRootMaterialPane" || section.id === "initiationProcessPane") return;
    const isPriorInitiationInfo = stage > 0 && section.classList.contains("initiation-root-item");
    setApplicationSectionCollapsed(section, isPriorInitiationInfo);
    section.classList.toggle("is-prior-readonly-section", isPriorInitiationInfo);
  });
  const table = $("#initiationProcessMaterialTable");
  if (table) {
    const files = initiationMaterialFiles(stage);
    table.innerHTML = `
      <div><span>节点</span><span>材料名称</span><span>要求</span><span>状态</span><span>操作</span></div>
      ${files.map((file, index) => {
        const required = initiationMaterialRequirement(stage, index, file);
        const status = initiationMaterialStatus(stage, index, file);
        return `<div><span>${meta.label}</span><strong>${file}</strong><span>${required}</span><em>${status}</em><span class="attach-actions">${materialUploadActions(status)}</span></div>`;
      }).join("")}
    `;
  }
  updateInitiationProcessMaterialActions(stage);
  const extra = $("#initiationProcessExtra");
  const inheritedExtra = $("#initiationInheritedExtra");
  if (inheritedExtra) inheritedExtra.innerHTML = processInheritedCards(stage);
  $$("#initiationInheritedExtra .initiation-stage-group").forEach((group) => {
    group.querySelectorAll("[data-action='uploadProjectAttachment'], [data-action='downloadTemplate'], [data-action='editProject'], [data-action='removeRepeatRow'], [data-action='addSectionAttachment']").forEach((button) => {
      button.classList.add("is-hidden");
    });
  });
  if (extra) {
    extra.innerHTML = initiationProcessExtraMarkup(stage);
    extra.querySelectorAll("[data-action='addSectionAttachment']").forEach((button) => {
      if (button.dataset.directBound === "true") return;
      button.dataset.directBound = "true";
      button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (createCustomAttachmentRow(button)) showToast("已新增一行自定义附件，可直接修改名称或上传文件。");
      });
    });
    [
      ["#initiationExpertReviewDecision", (value) => {
        state.initiationNeedsExpertReview = value === "yes";
        renderInitiationFlow();
      }],
	      ["#initiationDepositSelect", (value) => {
	        state.initiationHasDeposit = value === "yes";
	        renderInitiationFlow();
	      }],
	      ["#initiationQualityDepositSelect", (value) => {
	        state.initiationHasQualityDeposit = value === "yes";
	        renderInitiationFlow();
	      }],
      ["#initiationDepositRefundDecision", (value) => {
        state.initiationHasDeposit = value === "yes";
        renderInitiationFlow();
      }],
    ].forEach(([selector, handler]) => {
      const field = extra.querySelector(selector);
      if (!field || field.dataset.directBound === "true") return;
      field.dataset.directBound = "true";
      field.addEventListener("change", () => handler(field.value));
    });
    extra.querySelectorAll("[data-action='addPaymentRecord']").forEach((button) => button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      openPaymentRecordDialog();
      showToast(button.textContent.trim() === "编辑" ? "已打开付款记录编辑。" : "已打开新增付款。");
    }));
    extra.querySelectorAll("[data-action='nextAcceptanceStep']").forEach((button) => {
      if (button.dataset.directBound === "true") return;
      button.dataset.directBound = "true";
      button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        advanceAcceptanceStep();
      });
    });
  }
  [
    ["#initiationCityProjectSelect", (value) => {
      state.initiationIsCityProject = value === "yes";
      state.initiationSkippedCityAcceptance = false;
      renderInitiationFlow();
    }],
    ["#initiationDepositBaseSelect", (value) => {
      state.initiationHasDeposit = value === "yes";
      state.initiationSkippedRefund = false;
      renderInitiationFlow();
    }],
    ["#initiationBudgetAmount", () => {
      const field = $("#initiationAmountLevelSelect");
      if (field) field.value = initiationUsesExpertAcceptance() ? "expert" : "self";
      renderInitiationFlow();
    }]
  ].forEach(([selector, handler]) => {
    const field = $(selector);
    if (!field || field.dataset.directBound === "true") return;
    field.dataset.directBound = "true";
    field.addEventListener("change", () => handler(field.value));
  });
  $$("#initiationFormPanel [data-action='addTeamRole'], #initiationFormPanel [data-action='addMilestone']").forEach((button) => {
    if (button.dataset.directBound === "true") return;
    button.dataset.directBound = "true";
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const isMember = button.dataset.action === "addTeamRole";
      const opened = isMember ? addTeamRoleCard(button) : addMilestoneRow(button);
      if (opened) showToast(isMember ? "已打开新增成员。" : "已打开新增里程碑。");
    });
  });
  bindProjectAttachmentUploadButtons($("#initiationFormPanel") || document);
  ensureAttachmentHeaderAddButtons($("#initiationFormPanel") || document);
  syncTableSequenceNumbers($("#initiationFormPanel") || document);
  styleRequiredAsterisks($("#initiationFormPanel") || document);
}

function selectInitiationStageSnapshot(stageIndex) {
  const nextStage = Math.max(0, Math.min(initiationStageMeta.length - 1, Number(stageIndex) || 0));
  state.initiationStage = nextStage;
  renderInitiationFlow();
  showToast(`已切换到${initiationStageMeta[nextStage].label}环节快照。`);
}

function advanceInitiationFlow() {
  const stage = state.initiationStage || 0;
  if (stage >= initiationStageMeta.length - 1) {
    switchScreen("portal");
    showToast("已确认归档，返回首页。");
    return;
  }
  if (stage === 4) {
    if ((state.initiationAcceptanceStep || 0) < acceptanceStepMax()) {
      advanceAcceptanceStep();
      return;
    }
    state.initiationAcceptanceSubmitted = true;
    state.initiationSkippedCityAcceptance = !state.initiationIsCityProject;
    if (!state.initiationHasDeposit) {
      state.initiationSkippedRefund = true;
      state.initiationStage = 6;
      renderInitiationFlow();
      showToast(state.initiationIsCityProject ? "验收审批已提交，市级材料在验收环节归集，无履约保证金，已自动进入归档。" : "验收审批已提交，无履约保证金，已自动进入归档。");
      return;
    }
    state.initiationStage = 5;
    renderInitiationFlow();
    showToast("验收审批已提交，进入退履约保金确认。");
    return;
  }
  if (stage === 5 && !state.initiationHasDeposit) {
    state.initiationSkippedRefund = true;
    state.initiationStage = 6;
    renderInitiationFlow();
    showToast("无履约保证金，已自动跳过退保进入归档。");
    return;
  }
  state.initiationStage = stage + 1;
  renderInitiationFlow();
  showToast(`已进入${initiationStageMeta[state.initiationStage].label}环节。`);
}

function selectedInitiationLibraryProjects() {
  const selectedIds = state.initiationSelectedLibraryProjectIds || [];
  return initiationLibraryProjectOptions.filter((project) => selectedIds.includes(project.id));
}

function syncInitiationLibraryProjectFields() {
  const selected = selectedInitiationLibraryProjects();
  const codes = $("#initiationProjectCodes");
  const status = $("#initiationProjectStatus");
  const names = $("#initiationProjectNames");
  const departments = $("#initiationProjectDepartments");
  const amount = $("#initiationBudgetAmount");
  if (codes) {
    const baseNumber = 26002;
    codes.value = selected.length
      ? selected.map((_, index) => `XXH20${baseNumber + index}`).join("、")
      : "系统提交后自动生成";
  }
  if (status) status.value = selected.length ? `已选择 ${selected.length} 个入库项目，可发起立项` : "请选择入库项目";
  if (names) names.value = selected.map((project) => project.name).join("、");
  if (departments) departments.value = [...new Set(selected.map((project) => project.department))].join("、");
  if (amount && selected.length) {
    const total = selected.reduce((sum, project) => sum + (Number(project.amount.replace(/[^\d.]/g, "")) || 0), 0);
    amount.value = `${total} 元`;
  }
}

function renderInitiationLibraryProjectSelect() {
  const root = $("#initiationLibraryMultiSelect");
  if (!root) return;
  const selectedIds = state.initiationSelectedLibraryProjectIds || [];
  const query = (state.initiationLibrarySearch || "").trim().toLowerCase();
  const tags = root.querySelector("[data-library-selected-tags]");
  const search = root.querySelector("[data-library-search]");
  const options = root.querySelector("[data-library-options]");
  const selected = selectedInitiationLibraryProjects();
  if (tags) {
    tags.innerHTML = selected.length
      ? selected.map((project) => `
          <button type="button" class="multi-project-tag" data-remove-library-project="${project.id}" title="移除${project.name}">
            <span>${project.name}</span><i aria-hidden="true">×</i>
          </button>
        `).join("")
      : `<span class="multi-project-placeholder">请选择入库项目</span>`;
  }
  if (search) search.value = state.initiationLibrarySearch || "";
  const filtered = initiationLibraryProjectOptions.filter((project) => {
    const haystack = [project.name, project.id, project.department, project.owner, project.type].join(" ").toLowerCase();
    return !query || haystack.includes(query);
  });
  if (options) {
    options.innerHTML = filtered.length ? filtered.map((project) => {
      const checked = selectedIds.includes(project.id);
      return `
        <label class="multi-project-option ${checked ? "is-selected" : ""}">
          <input type="checkbox" value="${project.id}" data-library-project-option ${checked ? "checked" : ""} />
          <span><strong>${project.name}</strong><em>${project.id} · ${project.department} · ${project.type}</em></span>
          <small>${project.amount}</small>
        </label>
      `;
    }).join("") : `<div class="multi-project-empty">未找到匹配项目</div>`;
  }
  if (root.dataset.libraryBound !== "true") {
    root.dataset.libraryBound = "true";
    root.querySelector("[data-action='toggleLibraryProjectSelect']")?.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      root.classList.toggle("is-open");
    });
    search?.addEventListener("input", () => {
      state.initiationLibrarySearch = search.value;
      renderInitiationLibraryProjectSelect();
    });
  }
  root.querySelectorAll("[data-library-project-option]").forEach((input) => {
    if (input.dataset.libraryOptionBound === "true") return;
    input.dataset.libraryOptionBound = "true";
    input.addEventListener("change", () => {
      const next = new Set(state.initiationSelectedLibraryProjectIds || []);
      if (input.checked) next.add(input.value);
      else next.delete(input.value);
      state.initiationSelectedLibraryProjectIds = [...next];
      renderInitiationLibraryProjectSelect();
    });
  });
  root.querySelectorAll("[data-remove-library-project]").forEach((button) => {
    if (button.dataset.removeBound === "true") return;
    button.dataset.removeBound = "true";
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      state.initiationSelectedLibraryProjectIds = (state.initiationSelectedLibraryProjectIds || []).filter((id) => id !== button.dataset.removeLibraryProject);
      renderInitiationLibraryProjectSelect();
    });
  });
  syncInitiationLibraryProjectFields();
}

function updateInitiationProcessMaterialActions(stage) {
  const pane = $("#initiationProcessPane");
  const head = pane?.querySelector(":scope > .application-section-head");
  if (!pane || !head) return;
  let actions = head.querySelector(".application-summary-actions");
  if (!actions) {
    actions = document.createElement("div");
    actions.className = "application-summary-actions";
    const collapse = head.querySelector(".application-section-collapse");
    if (collapse) actions.appendChild(collapse);
    head.appendChild(actions);
  }
  let button = actions.querySelector("[data-initiation-process-add='true']");
  if (!button) {
    button = document.createElement("button");
    button.className = "ghost-btn";
    button.type = "button";
    button.dataset.action = "addSectionAttachment";
    button.dataset.initiationProcessAdd = "true";
    button.textContent = "新增其他附件";
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (createCustomAttachmentRow(button)) showToast("已新增一行其他附件，可直接修改名称或上传文件。");
    });
    actions.insertBefore(button, actions.querySelector(".application-section-collapse"));
  }
  button.classList.toggle("is-hidden", ![1, 3, 4, 5, 6].includes(stage) || pane.classList.contains("is-hidden"));
}

function toggleInitiationLibraryMode() {
  const radioValue = document.querySelector("input[name='initiationUseLibrary']:checked")?.value;
  const selectValue = $("#initiationUseLibrary")?.value;
  const useLibrary = (radioValue || selectValue || "yes") !== "no";
  state.initiationUseLibrary = useLibrary ? "yes" : "no";
  $$(".initiation-linked-field").forEach((item) => item.classList.toggle("is-hidden", !useLibrary));
  $$(".initiation-free-field").forEach((item) => item.classList.toggle("is-hidden", useLibrary));
  const status = $("#initiationProjectStatus");
  if (status) status.value = useLibrary ? "已入库，可发起立项" : "手工立项，不关联申报库";
  if (useLibrary) renderInitiationLibraryProjectSelect();
}

function closeAvatarMenu() {
  $("#avatarPopover").classList.remove("is-open");
  $("#avatarButton").setAttribute("aria-expanded", "false");
}

function renderApplicantTodos() {
  const list = $("#applicantTodoList");
  if (!list) return;
  const currentTab = state.portalTodoTab || "pending";
  const source = applicantTodoBuckets[currentTab] || applicantTodos;
  const total = source.length;
  const summaryCount = document.querySelector(".todo-summary strong");
  const summaryText = document.querySelector(".todo-summary em");
  const panelCount = document.querySelector(".todo-panel .panel-head h2 span");
  if (summaryCount) summaryCount.textContent = String(applicantTodos.length);
  if (summaryText) summaryText.textContent = `您有 ${applicantTodos.length} 项待处理任务`;
  if (panelCount) panelCount.textContent = String(total);
  $$("#portalTodoTabs [data-todo-tab]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.todoTab === currentTab);
  });
  const totalPages = Math.max(1, Math.ceil(total / state.portalTodoPageSize));
  state.portalTodoPage = Math.min(Math.max(1, state.portalTodoPage), totalPages);
  const start = (state.portalTodoPage - 1) * state.portalTodoPageSize;
  const todos = source.slice(start, start + state.portalTodoPageSize);
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
        ${currentTab === "pending"
          ? `<button class="plain-btn" type="button" data-todo-action="handle" data-action="handleTodo">办理</button>`
          : `<button class="plain-btn" type="button" data-todo-action="view" data-action="todoDetail">查看</button>`}
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
    const headCells = rowDataCells(table.querySelector(".admin-table-head"));
    const dynamicIndex = headCells.findIndex((cell) => cell === button);
    const resolvedIndex = dynamicIndex >= 0 ? dynamicIndex : index;
    const text = rowDataCells(row)[resolvedIndex]?.textContent.trim() || "";
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
  syncTableSequenceNumbers(table);
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
  if (status.includes("未入库")) return "amber";
  if (status.includes("已出库")) return "violet";
  if (status.includes("已入库")) return "green";
  if (status.includes("通过") || status.includes("完成") || status.includes("已")) return "green";
  if (status.includes("退回") || status.includes("缺") || status.includes("延期")) return "amber";
  return "blue";
}

function processSummaryClass(label, tab = state.manageTab) {
  if (tab !== "processReview") return "";
  if (label === "未入库") return "is-library-unreviewed";
  if (label === "已入库") return "is-library-stored";
  if (label === "已出库") return "is-library-linked";
  return "";
}

function processStageFromTab(tab = state.manageTab) {
  const stageMap = {
    processReview: "项目库",
    processApproval: "立项",
    processPurchase: "采购",
    processImplement: "实施",
    processTrial: "试运行",
    processAcceptance: "验收",
    processCityAcceptance: "市级验收",
    processRefund: "退履约保金",
    processArchive: "归档"
  };
  return stageMap[tab] || processNodeData[tab]?.hero?.[0] || "项目过程";
}

function activeProcessStageLabels() {
  return initiationStageMeta
    .map((item, index) => ({ label: item.label, index }))
    .filter((item) => !isInitiationStageSkipped(item.index))
    .map((item) => item.label);
}

function processNodeTimeline(stage) {
  const nodes = activeProcessStageLabels();
  const index = Math.max(0, nodes.indexOf(stage));
  return nodes.map((node, nodeIndex) => `
    <article class="${nodeIndex < index ? "done" : nodeIndex === index ? "active" : ""}">
      <b>${nodeIndex + 1}</b>
      <strong>${node}</strong>
      <span>${nodeIndex < index ? "已完成" : nodeIndex === index ? "当前节点" : "后续节点"}</span>
    </article>
  `).join("");
}

const processMaterialStages = [
  {
    label: "立项",
    files: ["项目批复材料"]
  },
  {
    label: "采购",
    files: ["采购申请流程文件", "采购论证材料", "盖章合同"]
  },
  {
    label: "实施",
    files: ["付款计划及记录", "实施过程记录材料"]
  },
  {
    label: "试运行",
    files: ["培训记录", "试运行报告", "问题整改记录"]
  },
  {
    label: "验收",
    files: ["验收申请", "验收审批表", "专家验收意见", "验收报告", "市级验收材料"]
  },
  {
    label: "退履约保金",
    files: ["退保证金凭证"]
  },
  {
    label: "归档",
    files: ["归档移交清单", "全流程材料包", "补充归档材料"]
  }
];

function activeProcessMaterialStages() {
  const activeLabels = activeProcessStageLabels();
  return processMaterialStages.filter((stage) => activeLabels.includes(stage.label));
}

function archiveMaterialChecklistGroups() {
  return [
    {
      label: "项目申报",
      files: ["项目申报书", "预算测算明细表"]
    },
    ...activeProcessMaterialStages().map((stageItem) => stageItem.label === "验收"
      ? { ...stageItem, files: acceptanceCollectionArchiveFiles }
      : stageItem)
  ];
}

function archiveMaterialFileName(file) {
  if (/\.(pdf|docx?|xlsx?|zip|png|jpe?g)$/i.test(file)) return file;
  if (/预算|测算|明细|清单/.test(file) && !/移交|市级|验收/.test(file)) return `${file}.xlsx`;
  if (/材料包|全流程|整改|补充/.test(file)) return `${file}.zip`;
  return `${file}.pdf`;
}

function archiveGeneratedMaterialRows(items = null) {
  const sourceItems = items || archiveMaterialChecklistGroups().flatMap((stage) => stage.files.map((file, fileIndex) => ({
    stage: stage.label,
    file,
    fileIndex
  })));
  return sourceItems.map((item, index) => {
    const name = archiveMaterialFileName(item.file);
    const isCustom = item.file.includes("补充") || item.file.includes("自定义");
    const status = isCustom ? "待上传" : (item.stage === "归档" ? "待确认" : "已归档");
    const uploadText = status === "已归档" ? "重新上传" : "上传附件";
    return `
      <div data-archive-generated-row="true">
        <strong>${escapeHTML(name)}</strong>
        <span>${escapeHTML(item.stage)}</span>
        <em>${status}</em>
        <span class="attach-actions">
          <button type="button" data-action="previewMaterial">查看</button>
          <button type="button" data-action="uploadProjectAttachment">${uploadText}</button>
          <button type="button" data-action="removeAttachment">删除</button>
        </span>
      </div>
    `;
  }).join("");
}

function processMaterialStatus(stageIndex, currentIndex, material, fileIndex) {
  if (stageIndex < currentIndex) return "已归集";
  if (stageIndex > currentIndex) return "未到达";
  if (material.includes("齐全") || material.includes("已")) return "已上传";
  if (material.includes("缺")) return fileIndex === 0 ? material : "待补齐";
  if (material.includes("待")) return fileIndex === 0 ? "待上传" : "待确认";
  return material || "待确认";
}

function renderProcessMaterialRows(stage, task, material) {
  const stages = activeProcessMaterialStages();
  const currentIndex = Math.max(0, stages.findIndex((item) => item.label === stage));
  const visibleStages = stages.slice(0, currentIndex + 1);
  const rows = visibleStages.map((stageItem, stageIndex) => stageItem.files.map((file, fileIndex) => {
    const status = processMaterialStatus(stageIndex, currentIndex, material, fileIndex);
    const canUpload = stageIndex === currentIndex && /缺|待|未/.test(status);
    const action = canUpload ? "uploadProjectAttachment" : "previewMaterial";
    const actionText = canUpload ? "上传" : "查看";
    const materialName = stageIndex === currentIndex && fileIndex === 0 && task ? task : file;
    return `
      <div>
        <strong>${stageItem.label}</strong>
        <span>${materialName}</span>
        <em>${status}</em>
        <span class="row-actions"><button type="button" data-action="${action}">${actionText}</button></span>
      </div>
    `;
  }).join("")).join("");
  return rows;
}

function renderProcessMaterialGroups(stage, task, material) {
  const stages = activeProcessMaterialStages();
  const currentIndex = Math.max(0, stages.findIndex((item) => item.label === stage));
  const visibleStages = stages.slice(0, currentIndex + 1);
  return visibleStages.map((stageItem, stageIndex) => `
    <article class="process-material-stage ${stageIndex === currentIndex ? "is-current" : ""}">
      <header>
        <strong>${stageItem.label}</strong>
        <span>${stageItem.files.length} 个附件</span>
      </header>
      <div class="process-material-file-list">
        ${stageItem.files.map((file, fileIndex) => {
          const status = processMaterialStatus(stageIndex, currentIndex, material, fileIndex);
          const materialName = stageIndex === currentIndex && fileIndex === 0 && task ? task : file;
          return `
            <div>
              <strong>${materialName}</strong>
              <em>${status}</em>
              <span class="row-actions"><button type="button" data-action="previewMaterial">预览</button><button type="button" data-action="downloadTemplate">下载</button></span>
            </div>
          `;
        }).join("")}
      </div>
    </article>
  `).join("");
}

function stageIndexByLabel(stage) {
  return initiationStageMeta.findIndex((item) => item.label === stage);
}

function adminStageFields(stage) {
  const acceptanceMode = acceptanceNeedsExpertReview() ? "专家验收" : "自行验收";
  const fields = {
    立项: [["立项金额", "420000 元"], ["预算编号", "XXH-2026-01"], ["预算名称", "2026 年信息化建设专项"], ["是否市级数字化项目", state.initiationIsCityProject ? "是" : "否"], ["项目优先级", "普通"]],
    采购: [["采购方式", "校内论证后采购"], ["采购金额", "82 万"], ["合同名称", "网络安全态势感知平台建设合同"], ["合同签订日期", "2026-08-20"], ["供应商", "上海某信息技术有限公司"], ["履约保证金金额", state.initiationHasDeposit ? "4.1 万" : "无"]],
    实施: [["合同总金额", "82 万"], ["已付款合计", "24.6 万"], ["待付款金额", "57.4 万"], ["启动日期", "2026-09-01"], ["启动会材料", "启动会纪要.pdf"], ["付款记录", "1 笔"]],
    试运行: [["试运行开始时间", "2026-11-01"], ["试运行结束时间", "2026-11-30"], ["试运行结论", "稳定，可申请验收"], ["问题整改", "已关闭"]],
    验收: [["验收方式", acceptanceMode], ["验收申请", "验收申请单、验收材料"], ["验收报告完成日期", "2026-12-20"], ["质保期开始日期", "2026-12-20"], ["市级项目", state.initiationIsCityProject ? "是" : "否"]],
    退履约保金: [["触发条件", "有履约保证金"], ["保证金金额", "4.1 万"], ["退还日期", "2027-01-10"], ["退还金额", "4.1 万"]],
    归档: [["自动汇集", "申报、立项、采购、实施、试运行、验收、退保附件"], ["归档前补充", "支持删除和补充材料"], ["归档状态", "待项目主管确认"], ["移交部门", "档案室"]]
  };
  return fields[stage] || [["当前阶段", stage], ["处理说明", "按当前节点维护业务字段、里程碑和附件。"]];
}

function adminStageFieldGrid(stage) {
  return `<div class="process-history-fields admin-stage-fields">${adminStageFields(stage).map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("")}</div>`;
}

function adminStageAttachmentRows(stage, material = "齐全") {
  const stageIndex = stageIndexByLabel(stage);
  const files = stageIndex >= 0 ? initiationMaterialFiles(stageIndex) : [];
  if (!files.length) return `<div><strong>${stage}</strong><span>无须上传附件</span><em>已按条件跳过</em><span class="row-actions"><button type="button" data-action="previewMaterial">查看规则</button></span></div>`;
  return files.map((file, fileIndex) => {
    const status = processMaterialStatus(stageIndex, stageIndex, material, fileIndex);
    return `<div><strong>${stage}</strong><span>${file}</span><em>${status}</em><span class="row-actions"><button type="button" data-action="previewMaterial">预览</button><button type="button" data-action="downloadTemplate">下载</button></span></div>`;
  }).join("");
}

function openProcessRowDetail(button, viewType = "detail") {
  const row = button.closest("[data-process-row]");
  if (!row) return false;
  const stage = row.dataset.processStage || processStageFromTab();
  const cells = rowCellTexts(row);
  const [code, name, dept, owner, year, status, task, amount, material] = cells;
  if (viewType === "progress") {
    openCustomDetail({
      type: "processProgress",
      eyebrow: `${stage}进度`,
      title: name,
      meta: `${code} · 当前节点：${stage} · ${status}`,
      body: `
        <section class="process-modal-summary">
          <article><span>当前节点</span><strong>${stage}</strong></article>
          <article><span>节点状态</span><strong>${status}</strong></article>
          <article><span>责任人</span><strong>${owner}</strong></article>
          <article><span>材料</span><strong>${material}</strong></article>
        </section>
        <section class="process-modal-section">
          <h3>节点进度</h3>
          <div class="completed-flow full-process-flow compact-flow">${processNodeTimeline(stage)}</div>
        </section>
        <section class="process-modal-section">
          <h3>当前办理</h3>
          <div class="process-modal-list">
            <div><span>任务</span><strong>${task}</strong><em>${status}</em></div>
            <div><span>预算/合同</span><strong>${amount}</strong><em>${year}</em></div>
            <div><span>下一步</span><strong>${material.includes("缺") ? "补齐材料后继续流转" : "可进入下一节点"}</strong><em>${stage}</em></div>
          </div>
        </section>
      `
    });
    return true;
  }
  if (viewType === "material") {
    openCustomDetail({
      type: "processMaterial",
      eyebrow: `${stage}材料`,
      title: `${name}材料清单`,
      meta: `${code} · ${material}`,
      body: `
        <section class="process-material-stage-list">
          ${renderProcessMaterialGroups(stage, task, material)}
        </section>
      `
    });
    return true;
  }
  openCustomDetail({
    type: "processDetail",
    eyebrow: `${stage}详情`,
    title: name,
    meta: `${code} · ${dept} · ${year}`,
    body: `
      <section class="process-modal-summary">
        <article><span>当前节点</span><strong>${stage}</strong></article>
        <article><span>节点状态</span><strong>${status}</strong></article>
        <article><span>当前任务</span><strong>${task}</strong></article>
        <article><span>责任人</span><strong>${owner}</strong></article>
        <article><span>预算/合同</span><strong>${amount}</strong></article>
        <article><span>材料状态</span><strong>${material}</strong></article>
      </section>
      <section class="process-modal-section">
        <h3>${stage}办理说明</h3>
        ${adminStageFieldGrid(stage)}
      </section>
      <section class="process-modal-section">
        <h3>${stage}里程碑与附件</h3>
        <div class="process-modal-list">
          <div><span>里程碑事项</span><strong>${task}</strong><em>${status}</em></div>
        </div>
        <div class="process-material-file-list admin-stage-attachment-list">
          ${adminStageAttachmentRows(stage, material)}
        </div>
      </section>
    `
  });
  return true;
}

function processSummaryLabel(text) {
  return text.replace(/\s*\d+\s*$/, "").trim();
}

function processSummaryMatches(row, label) {
  if (label === "全部") return true;
  const cells = rowCellTexts(row);
  const [, , , , , status = "", task = "", amount = "", material = ""] = cells;
  const search = row.dataset.processSearch || cells.join(" ");
  if ([status, task, amount, material].some((item) => item === label || item.includes(label))) return true;
  const aliases = {
    草稿: ["申报", "后提交"],
    已提交: ["已提交", "申报材料已提交"],
    未入库: ["未入库", "待确认入库"],
    已入库: ["已入库", "齐全"],
    待经费确认: ["预算来源待确认", "经费关联", "待经费确认"],
    待关联预算: ["待关联预算", "预算来源待确认", "经费关联"],
    可立项: ["可立项"],
    超预算: ["超预算", "预算不足"],
    评审中: ["评审中", "专家评审"],
    已立项: ["已立项", "已生成项目编号"],
    待登记: ["采购", "登记"],
    采购论证: ["采购论证"],
    合同待补: ["合同待补", "合同"],
    实施中: ["实施中", "上传阶段报告"],
    延期风险: ["延期风险", "延期"],
    待上传: ["上传", "待确认"],
    试运行中: ["试运行中"],
    待报告: ["提交试运行报告", "待提交报告", "报告"],
    待整改: ["待整改", "整改"],
    可验收: ["可验收"],
    验收中: ["验收中"],
    待申请: ["待申请"],
    整改中: ["整改中"],
    通过: ["通过"],
    待审核: ["待审核"],
    审核中: ["审核中"],
    待补齐: ["待补", "缺"],
    预检通过: ["预检通过"],
    待确认: ["待确认"],
    待退履约保金: ["待退履约保金"],
    已退履约保金: ["已退履约保金"],
    无需退履约保金: ["无需退履约保金"],
    待归档: ["待归档"],
    已归档: ["已归档"],
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

function filterApplicationLibrarySummary(button) {
  const label = button.dataset.processSummary || processSummaryLabel(button.textContent);
  const card = button.closest(".process-list-card, .admin-main-card");
  const rows = card?.querySelectorAll("[data-process-row]") || [];
  card?.querySelectorAll("[data-process-summary]").forEach((item) => item.classList.toggle("is-active", item === button));
  rows.forEach((row) => {
    const status = row.dataset.libraryStatus || "";
    row.classList.toggle("is-filtered-out", label !== "全部" && status !== label);
  });
  const empty = $("#processNodeEmpty");
  const visibleCount = [...rows].filter((row) => !row.classList.contains("is-filtered-out")).length;
  if (empty) {
    empty.classList.toggle("is-hidden", visibleCount > 0);
    const emptyLabel = empty.querySelector("strong");
    if (emptyLabel) emptyLabel.textContent = label;
  }
  showToast(`已切换到${label}项目。`);
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
    return `<button class="${[index === 0 ? "is-active" : "", processSummaryClass(label, tab)].filter(Boolean).join(" ")}" type="button" data-process-summary="${label}">${item}</button>`;
  }).join("");
  rows.innerHTML = `
    <div class="admin-table-row admin-table-head">
      <span>编号</span><span>项目名称</span><span>申报部门</span><span>责任人</span><button class="sort-head" type="button" data-action="sortColumn" data-sort-key="year">年度 ↕</button><span>当前节点</span><span>当前任务</span><button class="sort-head" type="button" data-action="sortColumn" data-sort-key="budget">预算/合同 ↕</button><span>材料</span><span>操作</span>
    </div>
    ${data.rows.map((row) => `
      <div class="admin-table-row" data-process-row data-process-stage="${processStageFromTab(tab)}" data-library-status="${row[5]}" data-process-search="${row.join(" ")}">
        <span>${row[0]}</span>
        <strong>${row[1]}</strong>
        <span>${row[2]}</span>
        <span>${row[3]}</span>
        <span>${row[4]}</span>
        <span><b class="admin-badge ${processStatusClass(row[5])}">${row[5]}</b></span>
        <span>${row[6]}</span>
        <span>${row[7]}</span>
        <span>${row[8]}</span>
        <span class="row-actions"><button type="button" data-action="processRowDetail" data-process-view="detail">详情</button><button type="button" data-action="processRowProgress" data-process-view="progress">进度</button><button type="button" data-action="processRowMaterial" data-process-view="material">材料</button></span>
      </div>
    `).join("")}
    <div class="admin-table-row process-empty-row is-hidden" id="processNodeEmpty"><span>暂无<strong>全部</strong>分类数据</span></div>
  `;
  syncTableSequenceNumbers(rows.parentElement || document);
  summary.querySelectorAll("[data-process-summary]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (tab === "processReview") filterApplicationLibrarySummary(button);
      else filterProcessSummary(button);
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
      if (openProcessRowDetail(button, button.dataset.processView || "detail")) {
        const copy = {
          detail: "当前节点详情已打开。",
          progress: "当前节点进度已打开。",
          material: "当前节点材料已打开。"
        };
        showToast(copy[button.dataset.processView] || "详情已打开。");
      }
    });
  });
}

function filterMyProjects() {
  const keyword = $("#myProjectSearch")?.value.trim() || "";
  const year = $("#myProjectYear")?.value || "all";
  const status = $("#myProjectStatus")?.value || "all";
  const fund = $("#myFundSource")?.value || "all";
  const type = $("#myProjectType")?.value || "all";
  const material = $("#myMaterialState")?.value || "all";
  const matchedRows = $$("[data-my-project-row]").filter((row) => {
    const nameMatch = !keyword || row.textContent.includes(keyword);
    const yearMatch = year === "all" || row.dataset.year === year;
    const statusMatch = status === "all" || row.dataset.status === status;
    const fundMatch = fund === "all" || row.dataset.fund === fund;
    const typeMatch = type === "all" || row.dataset.type === type;
    const materialMatch = material === "all" || row.dataset.material === material;
    const bucketMatch = state.myProjectBucket === "all" || row.dataset.bucket === state.myProjectBucket;
    const pendingMatch = !state.myPendingOnly || row.dataset.pending === "true";
    return nameMatch && yearMatch && statusMatch && fundMatch && typeMatch && materialMatch && bucketMatch && pendingMatch;
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
  if ($("#myFundSource")) $("#myFundSource").value = "all";
  if ($("#myProjectType")) $("#myProjectType").value = "all";
  $("#myMaterialState").value = "all";
}

function openInitiationDialog() {
  state.initiationStage = 0;
  state.applicationBudgetAmount = null;
  state.initiationUseLibrary = "yes";
  state.initiationSelectedLibraryProjectIds = ["RK2026002"];
  state.initiationLibrarySearch = "";
  state.initiationHasDeposit = true;
  state.initiationHasQualityDeposit = true;
  state.initiationIsCityProject = false;
  state.initiationAcceptanceStep = 0;
  state.initiationCityAcceptanceSubmitted = false;
  state.initiationAcceptanceSubmitted = false;
  state.initiationSkippedCityAcceptance = false;
  state.initiationSkippedRefund = false;
  switchScreen("initiationFormPage");
  renderInitiationFlow();
  toggleInitiationLibraryMode();
  requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
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
  openApplicationForm("new");
  showToast("已打开新增申报。");
}

function openApplicationForm(mode = "edit", options = {}) {
  const previousScreen = state.screen || "applyWizard";
  const isReadonly = mode === "readonly";
  state.wizardStep = 0;
  state.applicationStage = 0;
  state.applicationDecision = "agree";
  state.applicationBudgetAmount = null;
  state.applicationTerminated = false;
  state.applicationBranch = {
    standardConclusion: "待确认",
    expertConclusion: "待确认",
    schoolConclusion: "待确认"
  };
  state.applicationApprovals = isReadonly ? [
    {
      node: "网信办审核",
      actor: "网信办李老师",
      time: "2026-07-14 11:25",
      result: "同意",
      opinion: "已上传网信办评审材料。"
    },
    {
      node: "校级审核",
      actor: "校级评审组",
      time: "2026-07-14 14:30",
      result: "完成入库",
      opinion: "已上传校级评审结论和评审材料，可进入立项。"
    }
  ] : [];
  state.applicationReturnScreen = options.returnScreen || (isReadonly ? previousScreen : "applyWizard");
  switchScreen("applicationFormPage");
  setWizardStep(0);
  renderApplicationFlow();
  const isNew = mode === "new";
  const panel = $("#applicationFormPanel");
  if (panel) {
    panel.dataset.applicationMode = isReadonly ? "readonly" : isNew ? "new" : "edit";
    panel.classList.toggle("is-readonly-detail", isReadonly);
  }
  if (isReadonly) {
    setApplicationReadOnly(true);
    $("#applicationHistoryPane")?.classList.remove("is-hidden");
    $("#applicationApprovalPane")?.classList.add("is-hidden");
    $("#applicationSaveDraft")?.classList.add("is-hidden");
    $("#applicationReturnBtn")?.classList.add("is-hidden");
    $("#applicationRejectBtn")?.classList.add("is-hidden");
    $("#applicationFlowSubmit")?.classList.add("is-hidden");
    renderApplicationApprovalTimeline();
  }
  const backButton = $("#applicationFormPanel [data-action='backToApplicationList']");
  if (backButton) backButton.textContent = "返回";
  requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
}

function closeApplicationForm() {
  switchScreen(state.applicationReturnScreen || "applyWizard");
}

function openTodoCenterScreen() {
  switchScreen("todoCenter");
  showToast("已打开全部待办。");
}

function openTodoHandlePage(todo) {
  const step = todo?.type === "可提交" ? 4 : todo?.type === "退回修改" ? 1 : 3;
  state.wizardStep = step;
  openApplicationForm("edit");
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
  const list = button.closest(".team-section")?.querySelector(".team-role-cards") ||
    button.closest(".wizard-pane")?.querySelector(".repeat-table-team");
  if (!list) return false;
  const nextIndex = list.querySelectorAll(".repeat-table-row:not(.repeat-table-head)").length + 1;
  if (button.closest(".initiation-form-panel")) {
    openInitiationMemberDialog(button, "new");
    return true;
  }
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
  syncTableSequenceNumbers(list);
  row.scrollIntoView({ block: "nearest", behavior: "smooth" });
  return true;
}

function addMilestoneRow(button) {
  const table = button.closest(".repeat-section")?.querySelector(".milestone-table") ||
    button.closest(".team-subpanel")?.querySelector(".milestone-table") ||
    button.closest(".wizard-pane")?.querySelector(".repeat-table-milestone");
  if (!table) return false;
  const nextIndex = table.querySelectorAll(".repeat-table-row:not(.repeat-table-head)").length + 1;
  if (button.closest(".initiation-form-panel")) {
    openInitiationMilestoneDialog(button, "new");
    return true;
  }
  const examples = [
    ["2027-01", "上线移交", "赵工", "完成系统上线和运维移交"],
    ["2027-02", "成效复盘", "张工", "整理运行数据和问题清单"],
    ["2027-03", "材料补正", "李老师", "补齐归档与归档材料"]
  ];
  const item = examples[(nextIndex - 5) % examples.length];
  const row = document.createElement("div");
  row.className = "repeat-table-row is-added";
  row.innerHTML = `<strong>计划 ${nextIndex}</strong><span>${item[0]}</span><span>${item[1]}</span><span>${item[2]}</span><span>${item[3]}</span><span class="repeat-actions"><button type="button" data-action="viewDetail" data-detail="contentDetail">详情</button><button type="button" data-action="editProject">编辑</button><button type="button" data-action="removeRepeatRow">删除</button></span>`;
  table.appendChild(row);
  syncTableSequenceNumbers(table);
  row.scrollIntoView({ block: "nearest", behavior: "smooth" });
  return true;
}

function removeRepeatRow(button) {
  const row = button.closest(".repeat-table-row, .admin-table-row");
  if (!row || row.classList.contains("repeat-table-head") || row.classList.contains("admin-table-head")) return false;
  const table = row.parentElement;
  row.remove();
  syncTableSequenceNumbers(table || document);
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

function toggleApplicationSection(button) {
  const section = button.closest(".wizard-pane");
  if (!section) return false;
  setApplicationSectionCollapsed(section, !section.classList.contains("is-collapsed"));
  return true;
}

function setInitiationRootGroupCollapsed(collapsed) {
  const head = $("#initiationRootGroupHead");
  const items = $$("#initiationFormPanel > .initiation-root-item");
  head?.classList.toggle("is-collapsed", collapsed);
  head?.setAttribute("aria-expanded", String(!collapsed));
  const button = head?.querySelector(".initiation-stage-group-toggle");
  if (button) {
    button.textContent = collapsed ? "⌄" : "⌃";
    button.setAttribute("aria-label", `${collapsed ? "展开" : "收起"}立项`);
  }
  items.forEach((item) => item.classList.toggle("is-hidden-by-stage-group", collapsed));
  return Boolean(head);
}

function toggleInitiationStageGroup(target) {
  const head = target.closest(".initiation-stage-group-head");
  if (!head) return false;
  if (head.id === "initiationRootGroupHead") {
    return setInitiationRootGroupCollapsed(head.getAttribute("aria-expanded") !== "false");
  }
  const group = head.closest(".initiation-stage-group");
  if (!group) return false;
  const collapsed = !group.classList.contains("is-collapsed");
  group.classList.toggle("is-collapsed", collapsed);
  head.setAttribute("aria-expanded", String(!collapsed));
  const title = head.querySelector("strong")?.textContent.trim() || "当前环节";
  const button = head.querySelector(".initiation-stage-group-toggle");
  if (button) {
    button.textContent = collapsed ? "⌄" : "⌃";
    button.setAttribute("aria-label", `${collapsed ? "展开" : "收起"}${title}`);
  }
  return true;
}

function setApplicationSectionCollapsed(section, collapsed) {
  if (!section) return false;
  section.classList.toggle("is-collapsed", collapsed);
  const button = section.querySelector(".application-section-collapse");
  if (!button) return true;
  const title = section.querySelector("h2")?.textContent.trim() || "当前模块";
  button.textContent = collapsed ? "⌄" : "⌃";
  button.setAttribute("aria-label", `${collapsed ? "展开" : "收起"}${title}`);
  button.setAttribute("aria-expanded", String(!collapsed));
  return true;
}

function repeatRowData(row) {
  const cells = [...row.children].filter((cell) => !cell.dataset.sequenceCell && !cell.classList.contains("repeat-actions"));
  return cells.map((cell) => cell.textContent.trim());
}

function rowDataCells(row) {
  return [...(row?.children || [])].filter((cell) => !cell.dataset.sequenceCell);
}

function rowCellTexts(row) {
  return rowDataCells(row).map((cell) => cell.textContent.trim());
}

function rowSequenceValue(row, container, fallback = "自动生成") {
  const existing = row?.querySelector?.("[data-sequence-cell]")?.textContent.trim();
  if (existing) return existing;
  const list = container || row?.parentElement;
  const count = list?.querySelectorAll?.(".repeat-table-row:not(.repeat-table-head)")?.length || 0;
  return count ? String(count + 1) : fallback;
}

function styleRequiredAsterisks(scope = document) {
  const labels = [
    ...(scope.matches?.("label span") ? [scope] : []),
    ...scope.querySelectorAll("label span")
  ];
  labels.forEach((span) => {
    if (span.querySelector(".required-star")) return;
    const text = span.textContent.trim();
    if (!text.startsWith("*")) return;
    const label = text.replace(/^\*\s*/, "");
    span.innerHTML = `<i class="required-star" aria-hidden="true">*</i>${label}`;
  });
  const requiredCells = [
    ...(scope.matches?.(".attachment-check-table > div:not(:first-child) span, .attachment-check-table > div:not(:first-child) em, .attachment-check-table > div:not(:first-child) strong") ? [scope] : []),
    ...scope.querySelectorAll(".attachment-check-table > div:not(:first-child) span, .attachment-check-table > div:not(:first-child) em, .attachment-check-table > div:not(:first-child) strong")
  ];
  requiredCells.forEach((cell) => {
    if (cell.querySelector(".required-star")) return;
    const text = cell.textContent.trim();
    if (text.startsWith("*")) {
      cell.innerHTML = `<i class="required-star" aria-hidden="true">*</i>${text.replace(/^\*\s*/, "")}`;
      return;
    }
    if (text.startsWith("必填")) {
      cell.innerHTML = `<i class="required-star" aria-hidden="true">*</i>${text}`;
    }
  });
}

function syncTableSequenceNumbers(scope = document) {
  const configs = [
    [".admin-table", ".admin-table-row", ".admin-table-head"],
    [".data-table", ".table-row", ".table-head"],
    [".todo-table", ".todo-table-row", ".todo-table-head"],
    [".attachment-check-table", ":scope > div", ":scope > div:first-child"],
    [".repeat-table", ".repeat-table-row", ".repeat-table-head"]
  ];
  configs.forEach(([tableSelector, rowSelector, headSelector]) => {
    const tables = [
      ...(scope.matches?.(tableSelector) ? [scope] : []),
      ...scope.querySelectorAll(tableSelector)
    ];
    tables.forEach((table) => {
      const head = table.querySelector(headSelector);
      if (!head) return;
      if (table.matches(".attachment-check-table")) {
        const originalHeadCells = rowDataCells(head).filter((cell) => !cell.matches("[data-sequence-cell]"));
        const hasNodeColumn = originalHeadCells[0]?.textContent.trim() === "节点";
        const hasUploadedColumn = originalHeadCells.some((cell) => cell.textContent.trim() === "已传附件");
        table.classList.toggle("is-material-table", !hasUploadedColumn);
        table.classList.toggle("is-node-column-hidden", hasNodeColumn);
        [...table.querySelectorAll(rowSelector)].forEach((row) => {
          const firstDataCell = rowDataCells(row).filter((cell) => !cell.matches("[data-sequence-cell]"))[0];
          if (firstDataCell) firstDataCell.dataset.nodeCell = hasNodeColumn ? "true" : "false";
        });
      }
      const hasSequenceHead = rowDataCells(head)[0]?.textContent.trim() === "序号";
      if (hasSequenceHead && !head.firstElementChild?.dataset.sequenceCell) {
        head.firstElementChild.classList.add("sequence-cell");
        head.firstElementChild.dataset.sequenceCell = "true";
      }
      if (!hasSequenceHead && !head.querySelector("[data-sequence-cell]")) {
        const cell = document.createElement("span");
        cell.className = "sequence-cell";
        cell.dataset.sequenceCell = "true";
        cell.textContent = "序号";
        head.insertBefore(cell, head.firstElementChild);
      }
      table.classList.add("has-row-sequence");
      const rows = [...table.querySelectorAll(rowSelector)]
        .filter((row) => row !== head && !row.classList.contains("process-empty-row"));
      rows.forEach((row, index) => {
        let cell = row.querySelector("[data-sequence-cell]");
        if (!cell && hasSequenceHead && row.firstElementChild) {
          cell = row.firstElementChild;
          cell.classList.add("sequence-cell");
          cell.dataset.sequenceCell = "true";
        }
        if (!cell) {
          cell = document.createElement("span");
          cell.className = "sequence-cell";
          cell.dataset.sequenceCell = "true";
          row.insertBefore(cell, row.firstElementChild);
        }
        cell.textContent = String(index + 1);
      });
    });
  });
}

function openCustomDetail({ eyebrow, title, meta, body, type = "customDetail" }) {
  $("#detailEyebrow").textContent = eyebrow;
  $("#detailTitle").textContent = title;
  $("#detailMeta").textContent = meta;
  $("#detailBody").innerHTML = body;
  styleRequiredAsterisks($("#detailBody"));
  $("#detailDrawer").dataset.detailType = type;
  $("#detailDrawer").classList.add("is-open");
  $("#detailDrawer").setAttribute("aria-hidden", "false");
}

function chartActionContext(button) {
  const card = button.closest(".chart-card, .analytics-table-card");
  const title = card?.querySelector("h3")?.textContent?.trim() || "统计图表";
  const format = card?.querySelector(".chart-actions select")?.value || "PNG";
  return { title, format };
}

function openChartDownloadPreview(button) {
  const { title, format } = chartActionContext(button);
  openCustomDetail({
    eyebrow: "下载图片",
    title,
    meta: `图片格式：${format}`,
    type: "chartAction",
    body: `
      <div class="chart-export-preview">
        <strong>${title}.${format.toLowerCase()}</strong>
        <span>已按当前筛选条件生成图片下载任务。原型中展示确认效果，实际系统可接入图表截图服务。</span>
        <div class="inline-action-row">
          <button class="primary-btn" type="button" data-close-detail>完成</button>
        </div>
      </div>
    `
  });
}

function openChartExportPreview(button) {
  const { title } = chartActionContext(button);
  openCustomDetail({
    eyebrow: "导出统计",
    title,
    meta: "Excel / CSV",
    type: "chartAction",
    body: `
      <div class="chart-export-preview">
        <strong>${title}统计数据</strong>
        <span>已整理当前图表对应的统计范围、筛选条件和明细数据。原型中展示导出确认。</span>
        <div class="detail-table">
          <div><span>导出范围</span><span>当前图表</span></div>
          <div><strong>筛选条件</strong><span>2024-01-01 ~ 2024-12-31 · 全部单位</span></div>
          <div><strong>文件格式</strong><span>Excel，可扩展 CSV</span></div>
        </div>
        <div class="inline-action-row">
          <button class="primary-btn" type="button" data-close-detail>完成</button>
        </div>
      </div>
    `
  });
}

function openApprovalActionDialog(scope = "待办审批") {
  openCustomDetail({
    eyebrow: scope,
    title: "审批处理",
    meta: "选择处理结果并填写审批意见",
    body: `
      <div class="approval-panel approval-panel-modal">
        <div class="approval-choice-group">
          <button class="is-active" type="button" data-modal-approval="agree">同意</button>
          <button type="button" data-modal-approval="return">退回修改</button>
          <button type="button" data-modal-approval="reject">不同意</button>
        </div>
        <label><span>审批意见</span><textarea placeholder="请输入审批意见">材料已核对，按当前意见处理。</textarea></label>
        <div class="inline-action-row">
          <button class="primary-btn" type="button" data-action="confirmApprovalDialog">确认审核</button>
          <button class="ghost-btn" type="button" data-close-detail>取消</button>
        </div>
      </div>
    `,
    type: "approvalDialog"
  });
}

function directText(node) {
  if (!node) return "";
  const text = [...node.childNodes]
    .filter((child) => child.nodeType === Node.TEXT_NODE)
    .map((child) => child.textContent.trim())
    .join("");
  return text || node.textContent.trim();
}

function defaultProjectUploadFiles(title = "项目附件") {
  const cleanTitle = title.replace(/\.(pdf|docx?|xlsx?|zip|png|jpe?g)$/i, "");
  if (cleanTitle.includes("付款")) return ["付款审批单.pdf", "银行回单.pdf"];
  if (cleanTitle.includes("启动会")) return ["启动会纪要.pdf", "签到表.xlsx"];
  return [`${cleanTitle || "项目附件"}.pdf`, "补充佐证材料.zip"];
}

function pendingUploadFileNames() {
  return state.pendingUploadFiles.length ? state.pendingUploadFiles : defaultProjectUploadFiles(state.pendingUploadTitle);
}

function renderProjectUploadFileList(files = pendingUploadFileNames()) {
  const list = $("#projectUploadFileList");
  if (!list) return;
  list.innerHTML = files.map((name, index) => `
    <div>
      <strong>${escapeHTML(name)}</strong>
      <span>${index === 0 ? "主附件" : "补充附件"}</span>
    </div>
  `).join("");
  const count = $("#projectUploadCount");
  if (count) count.textContent = `已选择 ${files.length} 个文件`;
}

function handleProjectUploadInput(input) {
  state.pendingUploadFiles = [...input.files].map((file) => file.name);
  renderProjectUploadFileList();
}

function attachFileNamesMarkup(names) {
  return `<small class="attachment-file-names">${names.map(escapeHTML).join("、")}</small>`;
}

function uploadedAttachmentLinksMarkup(names) {
  return names.map((name) => `<a href="javascript:void(0)" data-action="previewMaterial">${escapeHTML(name)}</a>`).join("");
}

function applyUploadedFilesToRow(row, names) {
  if (!row) return false;
  const titleNode = row.querySelector("strong") || row.querySelector("span");
  const title = directText(titleNode) || state.pendingUploadTitle || "项目附件";
  const uploadedColumn = row.closest("#applicationAttachmentTable") ? row.querySelector(".uploaded-attachment-list") : null;
  const shouldUseFileNameAsTitle = row.dataset.customAttachment === "true" || title.includes("自定义附件");
  if (titleNode && shouldUseFileNameAsTitle && names[0]) {
    titleNode.textContent = names[0];
  }
  if (uploadedColumn) {
    uploadedColumn.classList.remove("is-empty");
    uploadedColumn.innerHTML = uploadedAttachmentLinksMarkup(names);
  } else if (titleNode) {
    const nextTitle = shouldUseFileNameAsTitle && names[0] ? names[0] : title;
    titleNode.innerHTML = `${escapeHTML(nextTitle)}${attachFileNamesMarkup(names)}`;
  }
  const status = row.querySelector("em");
  if (status) status.textContent = `已上传 ${names.length} 个`;
  row.classList.remove("is-attachment-removed");
  row.classList.add("has-multiple-attachments");
  row.dataset.uploadedFiles = names.join("、");
  row.querySelectorAll("button").forEach((item) => {
    item.disabled = false;
    if (item.dataset.action === "uploadProjectAttachment") {
      item.textContent = item.textContent.includes("添加") ? "继续添加" : "重新上传";
    }
  });
  const actionCell = row.querySelector(".attach-actions");
  if (actionCell && !actionCell.querySelector("[data-action='removeAttachment']")) {
    actionCell.insertAdjacentHTML("beforeend", `<button type="button" data-action="removeAttachment">删除</button>`);
    actionCell.querySelector("[data-action='removeAttachment']")?.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (removeAttachmentRow(event.currentTarget)) showToast("附件已删除。");
    });
  }
  return true;
}

function isAddAttachmentButton(button) {
  return button?.dataset?.action === "uploadProjectAttachment" && /添加附件/.test(button.textContent.trim());
}

function createCustomAttachmentRow(button) {
  const directRow = button?.closest?.(".attachment-check-table > div");
	  const table = directRow?.closest?.(".attachment-check-table")
	    || button?.closest?.(".application-branch-attachments")?.querySelector?.(".attachment-check-table")
	    || button?.closest?.(".current-process-card")?.querySelector?.(".attachment-check-table")
	    || button?.closest?.(".process-extra-card")?.querySelector?.(".attachment-check-table")
	    || button?.closest?.(".wizard-pane")?.querySelector?.(".attachment-check-table")
	    || button?.closest?.("#detailBody")?.querySelector?.(".attachment-check-table");
  const sourceRow = directRow
    || [...(table?.querySelectorAll(":scope > div:not(:first-child)") || [])].find((row) => /添加附件/.test(row.textContent))
    || table?.querySelector?.(":scope > div:last-child");
  if (!table || !sourceRow || sourceRow === table.firstElementChild) return false;
  const hasNodeColumn = table.classList.contains("is-node-column-hidden")
    || rowDataCells(table.firstElementChild).some((cell) => cell.textContent.trim() === "节点");
  const nodeLabel = hasNodeColumn
    ? rowDataCells(sourceRow).filter((cell) => !cell.matches("[data-sequence-cell]"))[0]?.textContent.trim() || "当前节点"
    : "";
  const row = document.createElement("div");
  row.dataset.customAttachment = "true";
  row.innerHTML = table.id === "applicationAttachmentTable" ? `
    <strong contenteditable="true" title="可直接修改附件名称">自定义附件</strong>
    <span class="uploaded-attachment-list is-empty">未上传</span>
    <span>选填</span>
    <em>待上传</em>
    <span class="attach-actions"><button type="button" data-action="uploadProjectAttachment">上传附件</button><button type="button" data-action="removeAttachment">删除</button></span>
  ` : `
    ${hasNodeColumn ? `<span>${escapeHTML(nodeLabel)}</span>` : ""}
    <strong contenteditable="true" title="可直接修改附件名称">自定义附件</strong>
    <span>选填</span>
    <em>待上传</em>
    <span class="attach-actions"><button type="button" data-action="uploadProjectAttachment">上传附件</button><button type="button" data-action="removeAttachment">删除</button></span>
  `;
  table.insertBefore(row, /添加附件/.test(sourceRow.textContent) ? sourceRow : sourceRow.nextElementSibling);
  bindProjectAttachmentUploadButtons(row);
  syncTableSequenceNumbers(table);
  return true;
}

function ensureAttachmentHeaderAddButtons(scope = document) {
  const panes = [
    ...(scope.matches?.(".wizard-pane") ? [scope] : []),
    ...scope.querySelectorAll(".wizard-pane")
  ];
  panes.forEach((pane) => {
    const table = pane.querySelector(".attachment-check-table");
    if (!table || table.classList.contains("is-readonly-attachments")) return;
    const isInitiationFormPane = Boolean(pane.closest("#initiationFormPanel"));
    const isEditableInitiationMaterialPane = isInitiationFormPane
      && (pane.id === "initiationRootMaterialPane" || pane.id === "initiationProcessPane")
      && !pane.classList.contains("is-hidden")
      && !pane.classList.contains("is-prior-readonly-section");
    if (
      pane.closest("#applicationApprovalPane") ||
      pane.classList.contains("inherited-process-section") ||
      (isInitiationFormPane && !isEditableInitiationMaterialPane)
    ) return;
    if (!table.querySelector("[data-action='uploadProjectAttachment']")) return;
    const head = pane.querySelector(":scope > .application-section-head");
    if (!head || head.querySelector("[data-action='addSectionAttachment']")) return;
    let actions = head.querySelector(".application-summary-actions");
    if (!actions) {
      actions = document.createElement("div");
      actions.className = "application-summary-actions";
      const collapse = head.querySelector(".application-section-collapse");
      if (collapse) actions.appendChild(collapse);
      head.appendChild(actions);
    }
    const button = document.createElement("button");
    button.className = "ghost-btn";
    button.type = "button";
    button.dataset.action = "addSectionAttachment";
    button.textContent = "新增附件";
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (createCustomAttachmentRow(button)) showToast("已新增一行自定义附件，可直接修改名称或上传文件。");
    });
    actions.insertBefore(button, actions.querySelector(".application-section-collapse"));
  });
}

function confirmProjectAttachmentUpload() {
  const names = pendingUploadFileNames();
  const applied = applyUploadedFilesToRow(state.pendingUploadRow, names);
  state.pendingUploadRow = null;
  state.pendingUploadTitle = "";
  state.pendingUploadFiles = [];
  closeDetail();
  showToast(applied ? `已上传 ${names.length} 个附件。` : "项目附件已上传。");
}

function bindProjectAttachmentUploadButtons(scope = document) {
  scope.querySelectorAll("[data-action='uploadProjectAttachment']").forEach((button) => {
    if (button.dataset.uploadBound === "true") return;
    button.dataset.uploadBound = "true";
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (isAddAttachmentButton(button) && createCustomAttachmentRow(button)) {
        showToast("已新增一行自定义附件，可直接修改名称或上传文件。");
        return;
      }
      openProjectAttachmentUpload(button);
      showToast("已打开项目附件上传。");
    });
  });
}

function openProjectAttachmentUpload(button) {
  const row = button?.closest?.(".attachment-check-table > div, .application-branch-file, .process-upload-line")
    || button?.closest?.(".acceptance-module")?.querySelector?.(".acceptance-collection-upload-table > div:not(:first-child)");
  const cells = row ? rowCellTexts(row).filter(Boolean) : [];
  const currentName = row && row !== row.parentElement?.firstElementChild
    ? (directText(row.querySelector("strong")) || cells[1] || cells[0] || "项目附件")
    : "项目附件";
  state.pendingUploadRow = row || null;
  state.pendingUploadTitle = currentName;
  state.pendingUploadFiles = [];
  openCustomDetail({
    eyebrow: "项目附件上传",
    title: currentName.includes("添加") ? "新增附件" : currentName,
    meta: "",
    type: "projectAttachmentUpload",
    body: `
      <div class="project-upload-panel">
        <label class="project-upload-drop">
          <input type="file" multiple data-project-upload-input />
          <strong>选择附件</strong>
          <span>可一次选择多个文件，支持 PDF、Word、Excel、图片和压缩包。</span>
        </label>
        <div class="upload-selected-summary" id="projectUploadCount">已选择 ${defaultProjectUploadFiles(currentName).length} 个文件</div>
        <div class="upload-file-list" id="projectUploadFileList">
          ${defaultProjectUploadFiles(currentName).map((name, index) => `
            <div><strong>${escapeHTML(name)}</strong><span>${index === 0 ? "主附件" : "补充附件"}</span></div>
          `).join("")}
        </div>
        <div class="inline-action-row">
          <button class="primary-btn" type="button" data-action="confirmProjectAttachmentUpload">确认上传</button>
          <button class="ghost-btn" type="button" data-close-detail>取消</button>
        </div>
      </div>
    `
  });
  const drawer = $("#detailDrawer");
  drawer.querySelector("input[data-project-upload-input]")?.addEventListener("change", (event) => {
    handleProjectUploadInput(event.currentTarget);
  });
  drawer.querySelector("[data-action='confirmProjectAttachmentUpload']")?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    confirmProjectAttachmentUpload();
  });
}

function openPaymentRecordDialog() {
  openCustomDetail({
    eyebrow: "付款记录",
    title: "新增付款",
    meta: "逐笔登记付款时间、金额、发票和证明材料",
    type: "paymentRecord",
    body: `
      <div class="detail-form">
        <label><span>付款时间</span><input value="2026-10-15" /></label>
        <label><span>付款金额</span><input value="待填写" /></label>
        <label><span>发票/凭证</span><button class="upload-inline-btn" type="button" data-action="uploadProjectAttachment">上传附件</button></label>
        <label><span>证明材料</span><button class="upload-inline-btn" type="button" data-action="uploadProjectAttachment">上传附件</button></label>
      </div>
      <div class="inline-action-row">
        <button class="primary-btn" type="button" data-close-detail>保存</button>
        <button class="ghost-btn" type="button" data-close-detail>取消</button>
      </div>
    `
  });
  bindProjectAttachmentUploadButtons($("#detailDrawer") || document);
}

function openInitiationMemberDialog(button, mode = "new") {
  const row = button?.closest?.(".repeat-table-row");
  const cells = row && !row.classList.contains("repeat-table-head") ? repeatRowData(row) : [];
  const [role = "实施联系人", name = "王工", dept = "网络中心", phone = "139****1120", email = "wangg@sdju.edu.cn", duty = "实施协调、材料归集"] = cells;
  const sequence = rowSequenceValue(row, button?.closest?.(".wizard-pane")?.querySelector(".repeat-table-team"));
  const isEdit = mode === "edit";
  const isDetail = mode === "detail";
  openCustomDetail({
    eyebrow: isDetail ? "成员详情" : isEdit ? "编辑成员" : "新增成员",
    title: isDetail ? `${role}：${name}` : "立项团队成员",
    meta: isDetail ? `${dept} · ${phone} · ${email}` : "维护角色、姓名、部门、联系方式和职责",
    body: isDetail ? `
      <div class="detail-table member-detail-table">
        <div><span>字段</span><span>内容</span></div>
        <div><strong>序号</strong><span>${sequence}</span></div>
        <div><strong>角色</strong><span>${role}</span></div>
        <div><strong>姓名</strong><span>${name}</span></div>
        <div><strong>部门</strong><span>${dept}</span></div>
        <div><strong>手机号</strong><span>${phone}</span></div>
        <div><strong>邮箱</strong><span>${email}</span></div>
        <div><strong>职责</strong><span>${duty}</span></div>
      </div>
    ` : `
      <div class="detail-form">
        <label><span>序号</span><input value="${sequence}" readonly /></label>
        <label><span>角色</span><input value="${role}" /></label>
        <label><span>姓名</span><input value="${name}" /></label>
        <label><span>部门</span><input value="${dept}" /></label>
        <label><span>手机号</span><input value="${phone}" /></label>
        <label><span>邮箱</span><input value="${email}" /></label>
        <label class="full-row"><span>职责</span><textarea>${duty}</textarea></label>
      </div>
      <div class="inline-action-row">
        <button class="primary-btn" type="button" data-close-detail>${isEdit ? "保存修改" : "保存成员"}</button>
        <button class="ghost-btn" type="button" data-close-detail>取消</button>
      </div>
    `
  });
  return true;
}

function openInitiationMilestoneDialog(button, mode = "new") {
  const row = button?.closest?.(".repeat-table-row");
  const cells = row && !row.classList.contains("repeat-table-head") ? repeatRowData(row) : [];
  const [stage = "采购", time = "2026-08", eventName = "采购论证与合同签订", owner = "采购办", material = "采购论证、采购结果、合同文件"] = cells;
  const sequence = rowSequenceValue(row, button?.closest?.(".wizard-pane")?.querySelector(".repeat-table-milestone"));
  openCustomDetail({
    eyebrow: mode === "detail" ? "里程碑详情" : "新增里程碑",
    title: eventName,
    meta: `${stage} · ${time}`,
    body: mode === "detail" ? `
      <div class="detail-table">
        <div><span>字段</span><span>内容</span></div>
        <div><strong>序号</strong><span>${sequence}</span></div>
        <div><strong>流程节点</strong><span>${stage}</span></div>
        <div><strong>计划时间</strong><span>${time}</span></div>
        <div><strong>里程碑事项</strong><span>${eventName}</span></div>
        <div><strong>责任人</strong><span>${owner}</span></div>
        <div><strong>材料要求</strong><span>${material}</span></div>
      </div>
      <section class="process-modal-section">
        <h3>${stage}业务信息</h3>
        ${adminStageFieldGrid(stage)}
      </section>
      <section class="process-modal-section">
        <h3>${stage}附件</h3>
        <div class="process-material-file-list admin-stage-attachment-list">
          ${adminStageAttachmentRows(stage, "齐全")}
        </div>
      </section>
    ` : `
      <div class="detail-form">
        <label><span>序号</span><input value="${sequence}" readonly /></label>
        <label><span>流程节点</span><select><option>${stage}</option><option>立项</option><option>采购</option><option>实施</option><option>试运行</option><option>验收</option><option>市级验收</option><option>退履约保金</option><option>归档</option></select></label>
        <label><span>计划时间</span><input value="${time}" /></label>
        <label><span>责任人</span><input value="${owner}" /></label>
        <label class="full-row"><span>里程碑事项</span><textarea>${eventName}</textarea></label>
        <label class="full-row"><span>材料要求</span><textarea>${material}</textarea></label>
        <label class="full-row project-upload-panel compact-upload-panel">
          <span>关联附件</span>
          <span class="project-upload-drop"><input type="file" multiple />上传/更换多附件</span>
        </label>
      </div>
      <div class="inline-action-row">
        <button class="primary-btn" type="button" data-close-detail>保存里程碑</button>
        <button class="ghost-btn" type="button" data-close-detail>取消</button>
      </div>
    `
  });
  return true;
}

function openRepeatRowDetail(button, mode = "detail") {
  const row = button.closest(".repeat-table-row");
  if (!row || row.classList.contains("repeat-table-head")) return false;
  const section = button.closest(".repeat-section");
  const values = repeatRowData(row);
  const isEdit = mode === "edit";

  if (button.closest(".initiation-form-panel")) {
    if (button.closest(".repeat-table-team")) return openInitiationMemberDialog(button, mode);
    if (button.closest(".repeat-table-milestone")) return openInitiationMilestoneDialog(button, mode);
  }

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
    if (addTeamRoleCard(button)) showToast(button.closest(".initiation-form-panel") ? "已打开新增成员。" : "已新增一名团队角色。");
    return true;
  }
  if (actionType === "addMilestone") {
    if (addMilestoneRow(button)) showToast(button.closest(".initiation-form-panel") ? "已打开新增里程碑。" : "已新增一条项目里程碑。");
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
      title: "网络安全态势感知平台已提交申报",
      meta: "申报已提交 · 当前节点：网信办审核",
    body: `
      <div class="detail-stat-grid">
        <article><span>提交结果</span><strong>已提交成功</strong></article>
        <article><span>当前节点</span><strong>网信办审核</strong></article>
        <article><span>下一步</span><strong>网信办审核</strong></article>
        <article><span>预计提醒</span><strong>3 个关键节点</strong></article>
      </div>
      <section class="detail-section">
        <h3>申报审核流程</h3>
        <div class="progress-milestone-list">
          <article class="done"><b>1</b><strong>项目申报</strong><span>申报表单、建设说明、经费关联和附件已提交。</span></article>
          <article class="active"><b>2</b><strong>网信办审核</strong><span>上传网信办评审材料。</span></article>
          <article><b>3</b><strong>校级审核</strong><span>上传校级评审材料。</span></article>
          <article><b>4</b><strong>进入项目库</strong><span>审核结论齐备后才可发起立项。</span></article>
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
    acceptance: "待验收项目",
    accepted: "已完成验收项目",
    refund: "待退履约保证金项目",
    archive: "待归档项目"
  };
  const card = button.closest(".admin-main-card");
  const buttons = [...(card?.querySelectorAll("[data-ledger-filter]") || [])];
  if (filter === "all") {
    buttons.forEach((item) => item.classList.toggle("is-active", item === button));
  } else {
    buttons.find((item) => item.dataset.ledgerFilter === "all")?.classList.remove("is-active");
    button.classList.toggle("is-active");
    if (!buttons.some((item) => item.dataset.ledgerFilter !== "all" && item.classList.contains("is-active"))) {
      buttons.find((item) => item.dataset.ledgerFilter === "all")?.classList.add("is-active");
    }
  }
  const activeFilters = buttons
    .filter((item) => item.classList.contains("is-active"))
    .map((item) => item.dataset.ledgerFilter)
    .filter((item) => item !== "all");
  card?.querySelectorAll("[data-ledger-row]").forEach((row) => {
    const buckets = (row.dataset.ledgerBucket || "").split(/\s+/);
    row.classList.toggle("is-filtered-out", activeFilters.length > 0 && !activeFilters.every((item) => buckets.includes(item)));
  });
  const activeLabels = activeFilters.map((item) => rowLabels[item] || item);
  showToast(activeLabels.length ? `已组合筛选：${activeLabels.join("、")}。` : "已切换到全部项目。");
  return true;
}

function removeAttachmentRow(button) {
  const table = button.closest(".attachment-check-table");
  const row = button.closest("div");
  if (!table || !row || row === table.firstElementChild) return false;
  const status = row.querySelector("em");
  if (status) status.textContent = "已删除";
  row.classList.add("is-attachment-removed");
  row.querySelectorAll("button").forEach((item) => {
    if (item !== button) item.disabled = true;
  });
  button.disabled = true;
  button.textContent = "已删除";
  return true;
}

function removePaymentRecordRow(button) {
  const row = button.closest(".payment-record-table > div");
  const table = row?.parentElement;
  if (!row || row === table?.firstElementChild) return false;
  row.remove();
  syncTableSequenceNumbers(table || document);
  return true;
}

function archiveAttachmentDialogRows() {
  return activeProcessMaterialStages().map((stageItem) => stageItem.files.map((file) => `
    <div><strong>${stageItem.label}</strong><span>${file}</span><span>按需</span><em>已归集</em><span class="attach-actions"><button type="button" data-action="uploadProjectAttachment">上传</button><button type="button" data-action="removeAttachment">删除</button></span></div>
  `).join("")).join("");
}

function archiveMaterialChecklistMarkup() {
  return archiveMaterialChecklistGroups().map((stageItem, stageIndex) => `
    <section class="archive-material-select-group">
      <header>
        <strong>${escapeHTML(stageItem.label)}</strong>
        <span>${stageItem.files.length} 项材料</span>
      </header>
      <div class="archive-material-select-list">
        ${stageItem.files.map((file, fileIndex) => {
          const id = `archive-material-${stageIndex}-${fileIndex}`;
          return `
            <label for="${id}">
              <input id="${id}" type="checkbox" data-archive-stage="${escapeHTML(stageItem.label)}" data-archive-file="${escapeHTML(file)}" checked />
              <span>${escapeHTML(file)}</span>
              <em>${escapeHTML(archiveMaterialFileName(file))}</em>
            </label>
          `;
        }).join("")}
      </div>
    </section>
  `).join("");
}

function openArchiveMaterialChecklistDialog(button) {
  state.pendingArchiveMaterialTable = button?.closest?.(".current-process-card")?.querySelector?.(".archive-material-inline-table")
    || button?.closest?.(".process-extra-card")?.querySelector?.(".archive-material-inline-table")
    || $("#initiationProcessExtra .archive-material-inline-table");
  openCustomDetail({
    eyebrow: "归档材料",
    title: "加载材料清单",
    meta: "按阶段选择需要生成到归档池的材料",
    type: "archiveMaterialChecklist",
    body: `
      <div class="archive-material-picker">
        ${archiveMaterialChecklistMarkup()}
      </div>
      <div class="inline-action-row">
        <button class="ghost-btn" type="button" data-close-detail>取消</button>
        <button class="primary-btn" type="button" data-action="confirmArchiveMaterialChecklist">确认生成材料清单</button>
      </div>
    `
  });
}

function confirmArchiveMaterialChecklist() {
  const table = state.pendingArchiveMaterialTable || $("#initiationProcessExtra .archive-material-inline-table");
  if (!table) return false;
  const detailBody = $("#detailBody");
  const selectedInputs = detailBody ? [...detailBody.querySelectorAll("[data-archive-file]:checked")] : [];
  const selected = selectedInputs.map((input) => ({
    stage: input.dataset.archiveStage || "归档",
    file: input.dataset.archiveFile || "自定义附件"
  }));
  if (!selected.length) {
    showToast("请至少选择一项材料。");
    return true;
  }
  const head = table.querySelector(":scope > div:first-child")?.outerHTML || `<div><span>材料名称</span><span>归档来源</span><span>状态</span><span>操作</span></div>`;
  table.innerHTML = `${head}${archiveGeneratedMaterialRows(selected)}`;
  bindProjectAttachmentUploadButtons(table);
  syncTableSequenceNumbers(table);
  state.pendingArchiveMaterialTable = null;
  closeDetail();
  showToast(`已生成 ${selected.length} 项归档材料清单。`);
  return true;
}

function toggleBudgetNameSelect(button) {
  button?.closest?.(".budget-name-multi-select")?.classList.toggle("is-open");
}

function openArchiveMaterialDialog() {
  openCustomDetail({
    eyebrow: "归档",
    title: "归档附件清单",
    meta: "全流程附件归集",
    type: "archiveMaterialPool",
    body: `
      <div class="attachment-check-table application-upload-table archive-dialog-table">
        <div><span>节点</span><span>附件名称</span><span>要求</span><span>状态</span><span>操作</span></div>
        ${archiveAttachmentDialogRows()}
      </div>
      <div class="inline-action-row">
        <button class="ghost-btn" type="button" data-action="addSectionAttachment">新增附件</button>
        <button class="primary-btn" type="button" data-close-detail>确认归档附件</button>
      </div>
    `
  });
  const body = $("#detailBody");
  if (body) {
    bindProjectAttachmentUploadButtons(body);
    syncTableSequenceNumbers(body);
  }
}

function openReminderMarkDialog(button) {
  const row = button.closest(".reminder-table > div, .reminder-card");
  state.pendingReminderMarkRow = row || null;
  const title = row?.querySelector("strong")?.textContent.trim() || "待办事项";
  openCustomDetail({
    eyebrow: "待办标记",
    title,
    meta: "重点、置顶和备注",
    type: "reminderMark",
    body: `
      <div class="detail-form reminder-mark-form">
        <label><span>标记类型</span><select id="reminderMarkType"><option>标记为重点</option><option>置顶</option><option>标记为重点并置顶</option></select></label>
        <label><span>备注</span><textarea id="reminderMarkNote" placeholder="填写备注，便于后续跟进">需优先跟进材料补交。</textarea></label>
      </div>
      <div class="inline-action-row">
        <button class="primary-btn" type="button" data-action="confirmReminderMark">确认标记</button>
        <button class="ghost-btn" type="button" data-close-detail>取消</button>
      </div>
    `
  });
}

function confirmReminderMark() {
  const row = state.pendingReminderMarkRow;
  if (!row) return false;
  const type = $("#reminderMarkType")?.value || "标记为重点";
  const note = $("#reminderMarkNote")?.value?.trim() || "";
  row.classList.add("is-marked-reminder");
  row.classList.toggle("is-pinned-reminder", type.includes("置顶"));
  row.dataset.markNote = note;
  const action = row.querySelector("[data-action='markReminderRead']");
  if (action) action.textContent = type.includes("置顶") ? "已置顶" : "已重点";
  if (!row.querySelector(".reminder-mark-note") && note) {
    const title = row.querySelector("strong");
    title?.insertAdjacentHTML("afterend", `<small class="reminder-mark-note">${escapeHTML(note)}</small>`);
  }
  state.pendingReminderMarkRow = null;
  closeDetail();
  return true;
}

function handleDirectDetailAction(button) {
  const actionType = button.dataset.detail || button.dataset.action;
  if (actionType === "removeAttachment") {
    if (removeAttachmentRow(button)) showToast("附件已删除。");
    return true;
  }
  if (actionType === "batchProcess") {
    openApprovalActionDialog("一键办理");
    return true;
  }
  if (actionType === "removePaymentRecord") {
    if (removePaymentRecordRow(button)) showToast("付款记录已删除。");
    return true;
  }
  if (actionType === "markReminderRead") {
    openReminderMarkDialog(button);
    return true;
  }
  if (actionType === "confirmReminderMark") {
    if (confirmReminderMark()) showToast("待办标记已保存。");
    return true;
  }
  if (actionType === "addBranchAttachment") {
    if (createCustomAttachmentRow(button)) showToast("已新增一行自定义附件，可直接修改名称或上传文件。");
    return true;
  }
  if (actionType === "toggleBudgetNameSelect") {
    toggleBudgetNameSelect(button);
    return true;
  }
  if (actionType === "openArchiveMaterialPool") {
    openArchiveMaterialDialog();
    return true;
  }
  if (actionType === "loadArchiveMaterialChecklist") {
    openArchiveMaterialChecklistDialog(button);
    return true;
  }
  if (actionType === "confirmArchiveMaterialChecklist") {
    return confirmArchiveMaterialChecklist();
  }
  if (actionType === "applicationDetail") {
    openApplicationReadonlyDetail(button.closest("#manage") ? "manage" : state.screen || "applyWizard");
    return true;
  }
  if (actionType === "confirmApprovalDialog") {
    closeDetail();
    showToast("审批意见已提交。");
    return true;
  }
  if (actionType === "downloadChart") {
    openChartDownloadPreview(button);
    return true;
  }
  if (actionType === "exportChart") {
    openChartExportPreview(button);
    return true;
  }
  if (actionType === "fundPoolDetail") {
    prepareFundPoolDetail(button);
    openDetail("fundPoolDetail");
    showToast("经费信息维护已打开。");
    return true;
  }
  if (actionType === "fundLinkedProjects") {
    openFundLinkedProjects(button);
    showToast("关联项目已打开。");
    return true;
  }
  if (actionType === "openLinkedProjectMenu") {
    closeDetail();
    switchScreen("manage");
    setManageTab(button.dataset.targetTab || "processApproval");
    showToast("已跳转到项目对应菜单。");
    return true;
  }
  if (actionType === "pinRow") {
    if (pinAdminRow(button)) {
      showToast(button.classList.contains("is-active") ? "项目已置顶。" : "已取消置顶。");
      return true;
    }
  }
  if (actionType === "adminProjectMaterials" || (actionType === "previewMaterial" && button.closest("#manage") && button.textContent.trim() === "材料")) {
    openAdminProjectMaterials(button);
    showToast("管理端材料归档已打开。");
    return true;
  }
  if (actionType === "roleForm") {
    openRoleForm(button);
    showToast(button.dataset.roleMode === "new" ? "新增角色已打开。" : "角色编辑已打开。");
    return true;
  }
  if (actionType === "rolePermission") {
    openRolePermission(button);
    showToast("权限配置已打开。");
    return true;
  }
  if (actionType === "confirmRoleConfig") {
    closeDetail();
    showToast("角色配置已保存。");
    return true;
  }
  if (actionType === "addTeamRole") {
    if (addTeamRoleCard(button)) {
      showToast(button.closest(".initiation-form-panel") ? "已打开新增成员。" : "已新增一名团队角色。");
      return true;
    }
  }
  if (actionType === "addMilestone") {
    if (addMilestoneRow(button)) {
      showToast(button.closest(".initiation-form-panel") ? "已打开新增里程碑。" : "已新增一条项目里程碑。");
      return true;
    }
  }
  if (actionType === "removeRepeatRow") {
    if (removeRepeatRow(button)) {
      showToast("已删除当前行。");
      return true;
    }
  }
  if ((actionType === "teamDetail" || actionType === "editProject") && button.closest(".initiation-form-panel")) {
    if (openRepeatRowDetail(button, actionType === "editProject" ? "edit" : "detail")) {
      showToast(actionType === "editProject" ? "编辑页已打开。" : "详情已打开。");
      return true;
    }
  }
  if (actionType === "uploadProjectAttachment") {
    openProjectAttachmentUpload(button);
    showToast("已打开项目附件上传。");
    return true;
  }
  if (actionType === "addPaymentRecord") {
    openPaymentRecordDialog();
    showToast("已打开新增付款。");
    return true;
  }
  if (actionType === "confirmProjectAttachmentUpload") {
    confirmProjectAttachmentUpload();
    return true;
  }
  const detailActions = new Set([
    "viewDetail",
    "previewMaterial",
    "downloadTemplate",
    "useTemplate",
    "fieldConfig",
    "uploadMaterial",
    "teamDetail",
    "editProject",
    "todoDetail",
    "reminderDetail",
    "fullProcessDetail",
    "projectProgress",
    "quickProcess",
    "fundPoolDetail",
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

function createAdvancedFilter(field) {
  const label = document.createElement("label");
  label.className = "advanced-filter";
  const caption = document.createElement("span");
  caption.textContent = field.label;
  label.appendChild(caption);
  if (field.options) {
    const select = document.createElement("select");
    field.options.forEach((optionText) => {
      const option = document.createElement("option");
      option.textContent = optionText;
      select.appendChild(option);
    });
    label.appendChild(select);
  } else {
    const input = document.createElement("input");
    input.type = field.type || "search";
    if (field.value) input.value = field.value;
    input.placeholder = field.placeholder || `输入${field.label}`;
    label.appendChild(input);
  }
  return label;
}

function getAdvancedFilterPreset(query) {
  if (query.classList.contains("reminder-query-grid")) return advancedFilterPresets.reminders;
  const screen = query.closest(".screen")?.id;
  const managePanel = query.closest("[data-manage-panel]")?.dataset.managePanel;
  if (screen === "budget") return advancedFilterPresets.budget;
  if (screen === "fundPool") return advancedFilterPresets.fundPool;
  if (query.classList.contains("process-node-query")) return advancedFilterPresets.processNode;
  const map = {
    business: "ledger",
    applications: "applications",
    content: "content",
    acceptance: "acceptance",
    fund: "fund",
    docs: "docs"
  };
  return advancedFilterPresets[map[managePanel]] || [];
}

function findAdvancedFilterActions(query) {
  if (query.classList.contains("reminder-query-grid")) {
    return query.closest(".reminder-filter-card")?.querySelector(".reminder-actions");
  }
  return query.nextElementSibling?.classList.contains("query-actions-row")
    ? query.nextElementSibling
    : query.closest(".admin-main-card, .budget-query-card, .fund-pool-query-card, .panel")?.querySelector(".query-actions-row");
}

function setupAdvancedFilters() {
  $$("#manage .admin-query-panel, #budget .admin-query-panel, #fundPool .admin-query-panel, #leader .reminder-query-grid").forEach((query) => {
    if (query.dataset.advancedReady === "true") return;
    const fields = getAdvancedFilterPreset(query);
    if (!fields.length) return;
    fields.forEach((field) => query.appendChild(createAdvancedFilter(field)));
    query.dataset.advancedReady = "true";
    query.classList.add("has-advanced-filters");
    query.setAttribute("aria-expanded", "false");
    const actions = findAdvancedFilterActions(query);
    if (!actions || actions.querySelector("[data-action='toggleAdvancedFilters']")) return;
    const button = document.createElement("button");
    button.className = "ghost-btn filter-more-btn";
    button.type = "button";
    button.dataset.action = "toggleAdvancedFilters";
    button.setAttribute("aria-expanded", "false");
    button.textContent = "查看更多条件";
    actions.insertBefore(button, actions.firstElementChild);
  });
}

function toggleAdvancedFilters(button) {
  const actions = button.closest(".query-actions-row, .reminder-actions");
  const query = actions?.previousElementSibling?.classList.contains("has-advanced-filters")
    ? actions.previousElementSibling
    : button.closest(".admin-main-card, .budget-query-card, .fund-pool-query-card, .reminder-filter-card, .panel")?.querySelector(".has-advanced-filters");
  if (!query) return false;
  const expanded = query.classList.toggle("is-expanded");
  query.setAttribute("aria-expanded", String(expanded));
  button.setAttribute("aria-expanded", String(expanded));
  button.textContent = expanded ? "收起筛选条件" : "查看更多条件";
  return true;
}

function bindDirectShortcuts() {
  $$(".application-section-head").forEach((head) => {
    if (head.dataset.collapseBound === "true") return;
    head.dataset.collapseBound = "true";
    head.addEventListener("click", (event) => {
      if (event.target.closest(".application-summary-actions [data-action]:not(.application-section-collapse)")) return;
      const button = head.querySelector(".application-section-collapse");
      if (!button) return;
      event.preventDefault();
      event.stopPropagation();
      if (toggleApplicationSection(button)) {
        showToast(head.closest(".wizard-pane")?.classList.contains("is-collapsed") ? "已收起该模块。" : "已展开该模块。");
      }
    });
  });
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
  $$('[data-action="newInitiation"]').forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      openInitiationDialog();
      showToast("已打开新建立项。");
    });
  });
  const fundPool = $("#fundPool");
  if (fundPool && fundPool.dataset.directBound !== "true") {
    fundPool.dataset.directBound = "true";
    fundPool.addEventListener("click", (event) => {
      const action = event.target.closest(".fund-pool-card [data-action], .fund-pool-table [data-action], .fund-pool-metrics [data-action]");
      if (!action || !fundPool.contains(action)) return;
      const actionType = action.dataset.action;
      if (!["fundPoolDetail", "fundLinkedProjects", "removeRepeatRow"].includes(actionType)) return;
      event.preventDefault();
      event.stopPropagation();
      if (actionType === "fundPoolDetail") {
        prepareFundPoolDetail(action);
        openDetail("fundPoolDetail");
        showToast("经费信息维护已打开。");
        return;
      }
      if (actionType === "fundLinkedProjects") {
        openFundLinkedProjects(action);
        showToast("关联项目已打开。");
        return;
      }
      if (removeRepeatRow(action)) showToast("已删除当前行。");
    });
  }
  const applicationFlowSubmit = $("#applicationFlowSubmit");
  if (applicationFlowSubmit && applicationFlowSubmit.dataset.directBound !== "true") {
    applicationFlowSubmit.dataset.directBound = "true";
    applicationFlowSubmit.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      submitApplicationFlowFromButton(applicationFlowSubmit);
    });
  }
  $$("#applicationReturnBtn, #applicationRejectBtn").forEach((button) => {
    if (button.dataset.directBound === "true") return;
    button.dataset.directBound = "true";
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      submitApplicationFlowFromButton(button);
    });
  });
  const initiationFlowSubmit = $("#initiationFlowSubmit");
  if (initiationFlowSubmit && initiationFlowSubmit.dataset.directBound !== "true") {
    initiationFlowSubmit.dataset.directBound = "true";
    initiationFlowSubmit.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      advanceInitiationFlow();
    });
  }
  $$("#applyWizard [data-action='openApplicationForm']").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      openApplicationForm(button.dataset.applicationMode || "new");
      showToast("已打开申报弹窗。");
    });
  });
  $$("#applyWizard [data-action='editApplication']").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      openApplicationForm("edit");
      showToast("已进入申报编辑。");
    });
  });
  $$("#applyWizard [data-action='applicationDetail']").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      openApplicationReadonlyDetail("applyWizard");
    });
  });
  $$("#applyWizard [data-action='removeRepeatRow']").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (removeRepeatRow(button)) showToast("已删除当前申报记录。");
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
    renderTemplates();
  });
  $("#systemRoles")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action='roleForm'], [data-action='rolePermission']");
    if (!button) return;
    event.preventDefault();
    event.stopPropagation();
    if (button.dataset.action === "roleForm") {
      openRoleForm(button);
      showToast(button.dataset.roleMode === "new" ? "新增角色已打开。" : "角色编辑已打开。");
      return;
    }
    openRolePermission(button);
    showToast("权限配置已打开。");
  });
  $("#portalTodoPageSize")?.addEventListener("change", (event) => {
    state.portalTodoPageSize = Number(event.currentTarget.value) || 3;
    state.portalTodoPage = 1;
    renderApplicantTodos();
  });
  $("#portalTodoTabs")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-todo-tab]");
    if (!button) return;
    event.preventDefault();
    state.portalTodoTab = button.dataset.todoTab || "pending";
    state.portalTodoPage = 1;
    renderApplicantTodos();
  });
  $("#portalTodoPageButtons")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-portal-page]");
    if (!button || button.disabled) return;
    event.preventDefault();
    const page = button.dataset.portalPage;
    const source = applicantTodoBuckets[state.portalTodoTab || "pending"] || applicantTodos;
    const totalPages = Math.max(1, Math.ceil(source.length / state.portalTodoPageSize));
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
    applications: "申报管理",
    processCreate: "申报",
    processReview: "项目申报库",
    processApproval: "立项",
    processPurchase: "采购",
    processImplement: "实施",
    processTrial: "试运行",
    processAcceptance: "验收",
    processCityAcceptance: "市级验收",
    processRefund: "退履约保金",
    processArchive: "归档",
    overview: "项目详情",
    content: "采购管理",
    team: "项目团队维护",
    plan: "项目计划管理",
    acceptance: "验收管理",
    fund: "立项",
    docs: "资料模板维护",
    changes: "项目变更记录",
    logs: "操作日志"
  };
  const manageHero = {
    business: ["项目台账", "按年度、状态、预算、负责人、项目类型和归档状态快速查询", "支持字段配置、置顶和导出"],
    applications: ["申报管理", "全年开放申报", "查看申报年度、项目类型、提交状态和关联项目"],
    processCreate: processNodeData.processCreate.hero,
    processReview: processNodeData.processReview.hero,
    processApproval: processNodeData.processApproval.hero,
    processPurchase: processNodeData.processPurchase.hero,
    processImplement: processNodeData.processImplement.hero,
    processTrial: processNodeData.processTrial.hero,
    processAcceptance: processNodeData.processAcceptance.hero,
    processCityAcceptance: processNodeData.processCityAcceptance.hero,
    processRefund: processNodeData.processRefund.hero,
    processArchive: processNodeData.processArchive.hero,
    overview: ["项目详情", "查看单个项目从申报到归档的完整档案", "当前阶段：立项", "材料：缺 1 项"],
    content: ["采购管理", "采购资料归集", "只做采购论证过程文件、采购结果和合同材料归集"],
    team: ["项目团队维护", "维护负责人、归口负责人、实施联系人和职责", "团队角色：3", "联系方式齐全"],
    plan: ["项目计划管理", "跟进里程碑、阶段计划和延期风险", "当前节点：立项", "计划完成：2026-12"],
    acceptance: ["验收管理", "提交申请、上传材料、初审、分级评审并出具结论", "通过后触发退履约保金"],
    fund: ["立项", "经费关联、资金编号和项目编号确认", "立项后进入采购资料归集"],
    docs: ["资料模板维护", "按流程节点维护制度、清单、模板和填报样例", "发布后用户端仅提供下载和材料要求查看"],
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
  if (status === "已归档" || status === "已归档") return "green";
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
      { id: 25, stage: "退履约保金", name: "退履约保金确认记录", status: "已确认" },
      { id: 26, stage: "归档", name: "项目归档单", status: "已确认" }
    ];
  }
  return [
    { id: 31, stage: "申报", name: "项目申报书", status: "已确认" },
    { id: 32, stage: "预算", name: "预算测算表", status: "已确认" },
    { id: 33, stage: "验收", name: "验收意见签字页", status: "缺失" },
    { id: 34, stage: "归档", name: "归档移交清单", status: "待生成" },
    { id: 35, stage: "退履约保金", name: "退履约保金确认记录", status: project.status === "待退履约保金" ? "待生成" : "已确认" },
    { id: 36, stage: "归档", name: "项目归档单", status: project.status === "已归档" ? "已确认" : "待生成" }
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
  $("#archiveCopy").textContent = missing ? `还差 ${missing} 项必填材料，补齐后才能进入退履约保金。` : "必填材料已齐，可生成归档包并推进退履约保金或归档。";
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
  const stageData = materialStageData[state.selectedPrepStage] || {
    templateNote: "",
    note: "全流程资料模板。",
    references: []
  };
  const list = templates.filter((item) => {
    const stageMatch = state.selectedPrepStage === "all" || item.stage === state.selectedPrepStage;
    const typeMatch = state.selectedTemplate === "all" || item.type === state.selectedTemplate;
    const keywordMatch = !keyword || `${item.name}${item.type}${item.desc}`.includes(keyword);
    return stageMatch && typeMatch && keywordMatch;
  });

  const templateIcon = (type) => {
    if (type === "项目库") return "icon-shield.png";
    if (type === "立项") return "icon-apply.png";
    if (type === "采购") return "icon-material.png";
    if (type === "预算") return "icon-database.png";
    if (type === "实施") return "icon-progress.png";
    if (type === "试运行") return "icon-calendar.png";
    if (type === "验收") return "icon-shield.png";
    if (type === "市级验收") return "icon-material.png";
    if (type === "退履约保金") return "icon-database.png";
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
    material: ["材料截止", "预算测算表补交截止", "网络安全态势感知平台需在 5 月 3 日前补齐预算测算表，补齐后进入申报库评审。"],
    review: ["申报库评审", "网络安全态势感知平台申报库评审会", "评审重点为建设必要性、预算测算、团队角色和采购判断。"],
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
  bindProjectAttachmentUploadButtons();

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

  document.body.addEventListener("change", (event) => {
    const uploadInput = event.target.closest("input[data-project-upload-input]");
    if (uploadInput) {
      handleProjectUploadInput(uploadInput);
    }
  });

  document.body.addEventListener("click", (event) => {
    if (event.target.closest("[data-close-detail]")) {
      closeDetail();
      return;
    }

    const approvalDecision = event.target.closest("[data-approval-result]");
    if (approvalDecision) {
      event.preventDefault();
      event.stopPropagation();
      selectApplicationDecision(approvalDecision);
      return;
    }

    if (event.target.closest('[data-action="closeApplicationForm"]')) {
      event.preventDefault();
      event.stopPropagation();
      closeApplicationForm();
      return;
    }

    if (event.target.closest('[data-action="backToApplicationList"]')) {
      event.preventDefault();
      event.stopPropagation();
      closeApplicationForm();
      return;
    }

    if (event.target.closest('[data-action="backToMyProjects"]')) {
      event.preventDefault();
      event.stopPropagation();
      openMyProjects(false);
      return;
    }

    if (event.target.closest(".reminder-table input[type='checkbox']")) {
      event.stopPropagation();
      return;
    }

    const applicationListAction = event.target.closest(".application-list-table [data-action]");
    if (applicationListAction) {
      event.preventDefault();
      event.stopPropagation();
      const applicationActionType = applicationListAction.dataset.detail || applicationListAction.dataset.action;
      if (applicationActionType === "editApplication") {
        openApplicationForm("edit");
        showToast("已进入申报编辑。");
        return;
      }
      if (applicationActionType === "applicationDetail") {
        openApplicationReadonlyDetail("applyWizard");
        return;
      }
      if (applicationActionType === "removeRepeatRow") {
        if (removeRepeatRow(applicationListAction)) showToast("已删除当前申报记录。");
        return;
      }
    }

    const pinButton = event.target.closest('.star-btn[data-action="pinRow"]');
    if (pinButton) {
      event.preventDefault();
      event.stopPropagation();
      if (pinAdminRow(pinButton)) showToast(pinButton.classList.contains("is-active") ? "项目已置顶。" : "已取消置顶。");
      return;
    }

    const processSummary = event.target.closest("[data-process-summary]");
    if (processSummary) {
      event.preventDefault();
      event.stopPropagation();
      if (state.manageTab === "processReview") filterApplicationLibrarySummary(processSummary);
      else filterProcessSummary(processSummary);
      return;
    }

    const navToggle = event.target.closest("[data-nav-toggle]");
    if (navToggle) {
      event.preventDefault();
      event.stopPropagation();
      const clickedArrow = Boolean(event.target.closest("b"));
      if (clickedArrow) {
        toggleNavGroup(navToggle);
        return;
      }
      const navGroup = navToggle.closest(".nav-group");
      if (navGroup?.classList.contains("is-collapsed")) toggleNavGroup(navToggle);
      if (navToggle.dataset.screen === "manage" && navToggle.dataset.manageOpen) {
        switchScreen("manage");
        setManageTab(navToggle.dataset.manageOpen);
      } else if (navToggle.dataset.screen) {
        switchScreen(navToggle.dataset.screen);
      }
      return;
    }

    const advancedFilterToggle = event.target.closest("[data-action='toggleAdvancedFilters']");
    if (advancedFilterToggle) {
      event.preventDefault();
      event.stopPropagation();
      if (toggleAdvancedFilters(advancedFilterToggle)) {
        showToast(advancedFilterToggle.getAttribute("aria-expanded") === "true" ? "已展开更多筛选条件。" : "已收起高级筛选条件。");
      }
      return;
    }

    const nav = event.target.closest("[data-screen]");
    if (nav) {
      if (nav.dataset.screen === "myProjects") {
        openMyProjects(false);
      } else if (nav.dataset.screen === "applyWizard") {
        switchScreen("applyWizard");
        closeApplicationForm();
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

    const initiationStageStep = event.target.closest("[data-initiation-stage]");
    if (initiationStageStep) {
      event.preventDefault();
      event.stopPropagation();
      selectInitiationStageSnapshot(initiationStageStep.dataset.initiationStage);
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

	    const applicationSectionCollapse = event.target.closest(".application-section-collapse");
	    if (applicationSectionCollapse) {
	      event.preventDefault();
	      event.stopPropagation();
      if (toggleApplicationSection(applicationSectionCollapse)) {
        showToast(applicationSectionCollapse.closest(".wizard-pane")?.classList.contains("is-collapsed") ? "已收起该模块。" : "已展开该模块。");
      }
	      return;
	    }

	    const initiationStageGroupHead = event.target.closest(".initiation-stage-group-head");
	    if (initiationStageGroupHead && initiationStageGroupHead.closest("#initiationFormPanel")) {
	      event.preventDefault();
	      event.stopPropagation();
	      if (toggleInitiationStageGroup(initiationStageGroupHead)) {
	        showToast(initiationStageGroupHead.getAttribute("aria-expanded") === "false" ? "已收起该阶段。" : "已展开该阶段。");
	      }
	      return;
	    }

	    const applicationSectionHead = event.target.closest(".application-section-head");
    if (applicationSectionHead && !event.target.closest(".application-summary-actions [data-action]")) {
      event.preventDefault();
      event.stopPropagation();
      const button = applicationSectionHead.querySelector(".application-section-collapse");
      if (button && toggleApplicationSection(button)) {
        showToast(applicationSectionHead.closest(".wizard-pane")?.classList.contains("is-collapsed") ? "已收起该模块。" : "已展开该模块。");
      }
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

    const modalApproval = event.target.closest("[data-modal-approval]");
    if (modalApproval) {
      modalApproval.closest(".approval-choice-group")?.querySelectorAll("[data-modal-approval]").forEach((item) => {
        item.classList.toggle("is-active", item === modalApproval);
      });
      return;
    }

    const action = event.target.closest("[data-action]");
    if (action) {
      const actionType = action.dataset.detail || action.dataset.action;
      if (action.dataset.action === "openApplyWizard") {
        openApplyWizardScreen();
        return;
      }
      if (action.dataset.action === "toggleBudgetNameSelect") {
        toggleBudgetNameSelect(action);
        return;
      }
      if (action.dataset.action === "openApplicationForm") {
        openApplicationForm(action.dataset.applicationMode || "new");
        showToast("已打开申报弹窗。");
        return;
      }
      if (action.dataset.action === "newInitiation") {
        openInitiationDialog();
        showToast("已打开新建立项。");
        return;
      }
      if (action.dataset.action === "advanceApplicationFlow") {
        submitApplicationFlowFromButton(action);
        return;
      }
      if (action.dataset.action === "advanceInitiationFlow") {
        advanceInitiationFlow();
        return;
      }
      if (action.dataset.action === "nextAcceptanceStep") {
        advanceAcceptanceStep();
        return;
      }
      if (action.dataset.action === "returnProject") {
        showToast("已记录退回修改意见。");
        return;
      }
      if (action.dataset.action === "rejectAcceptance") {
        showToast("已记录不同意意见。");
        return;
      }
      if (action.dataset.action === "batchProcess") {
        openApprovalActionDialog("一键办理");
        return;
      }
      if (action.dataset.action === "confirmApprovalDialog") {
        closeDetail();
        showToast("审批意见已提交。");
        return;
      }
      if (action.dataset.action === "removeAttachment") {
        if (removeAttachmentRow(action)) showToast("附件已删除。");
        return;
      }
      if (action.dataset.action === "uploadProjectAttachment") {
        openProjectAttachmentUpload(action);
        showToast("已打开项目附件上传。");
        return;
      }
      if (action.dataset.action === "addSectionAttachment") {
        if (createCustomAttachmentRow(action)) showToast("已新增一行自定义附件，可直接修改名称或上传文件。");
        return;
      }
      if (action.dataset.action === "loadArchiveMaterialChecklist") {
        openArchiveMaterialChecklistDialog(action);
        return;
      }
      if (action.dataset.action === "confirmArchiveMaterialChecklist") {
        confirmArchiveMaterialChecklist();
        return;
      }
      if (action.dataset.action === "confirmProjectAttachmentUpload") {
        confirmProjectAttachmentUpload();
        return;
      }
      if (action.dataset.action === "addPaymentRecord") {
        openPaymentRecordDialog();
        showToast("已打开新增付款。");
        return;
      }
      if (actionType === "applicationDetail") {
        openApplicationReadonlyDetail(action.closest("#manage") ? "manage" : state.screen || "applyWizard");
        return;
      }
      if (action.dataset.action === "editApplication") {
        openApplicationForm("edit");
        showToast("已进入申报编辑。");
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
          showToast("经费关联条件已重置。");
          return;
        }
        const queryScope = action.closest(".admin-main-card, .budget-query-card, .fund-pool-query-card, .reminder-filter-card, .panel");
        queryScope?.querySelectorAll("input").forEach((input) => { input.value = ""; });
        queryScope?.querySelectorAll("select").forEach((select) => { select.selectedIndex = 0; });
        if (state.screen === "fundPool") {
          showToast("经费池查询条件已重置。");
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
        if (addTeamRoleCard(action)) showToast(action.closest(".initiation-form-panel") ? "已打开新增成员。" : "已新增一名团队角色。");
        else showToast("已打开团队角色维护。");
        return;
      }
      if (action.dataset.action === "addMilestone") {
        if (addMilestoneRow(action)) showToast(action.closest(".initiation-form-panel") ? "已打开新增里程碑。" : "已新增一条项目里程碑。");
        else showToast("已打开里程碑维护。");
        return;
      }
      if (action.dataset.action === "removeRepeatRow") {
        if (removeRepeatRow(action)) showToast("已删除当前行。");
        return;
      }
      if ((action.dataset.action === "teamDetail" || action.dataset.action === "editProject") && action.closest(".initiation-form-panel")) {
        if (openRepeatRowDetail(action, action.dataset.action === "editProject" ? "edit" : "detail")) {
          showToast(action.dataset.action === "editProject" ? "编辑页已打开。" : "详情已打开。");
        }
        return;
      }
      if (action.dataset.action === "submitProject") {
        closeApplicationForm();
        openMyProjects(false);
        openSubmitSuccessDetail();
        showToast("已提交成功，可在我的项目查看后续进度。");
        return;
      }
      if (action.dataset.action === "submitAcceptance") {
        action.textContent = "已提交";
        action.disabled = true;
        const row = action.closest("[data-my-project-row]");
        const status = row?.querySelector(".pill");
        if (status) {
          status.textContent = "验收申请已提交";
          status.className = "pill green";
        }
        showToast("验收申请已提交，项目主管将在首页待办中收到提醒。");
        return;
      }
      if (action.dataset.action === "sortColumn") {
        sortAdminTable(action);
      }
      if (action.dataset.action === "pinRow") {
        if (pinAdminRow(action)) showToast(action.classList.contains("is-active") ? "项目已置顶。" : "已取消置顶。");
        return;
      }
      if (action.dataset.action === "adminProjectMaterials" || (action.dataset.action === "previewMaterial" && action.closest("#manage") && action.textContent.trim() === "材料")) {
        openAdminProjectMaterials(action);
        showToast("管理端材料归档已打开。");
        return;
      }
      if (action.dataset.action === "roleForm") {
        openRoleForm(action);
        showToast(action.dataset.roleMode === "new" ? "新增角色已打开。" : "角色编辑已打开。");
        return;
      }
      if (action.dataset.action === "rolePermission") {
        openRolePermission(action);
        showToast("权限配置已打开。");
        return;
      }
      if (action.dataset.action === "confirmRoleConfig") {
        closeDetail();
        showToast("角色配置已保存。");
        return;
      }
      if (action.dataset.action === "fundPoolDetail") {
        prepareFundPoolDetail(action);
        openDetail("fundPoolDetail");
        showToast("经费信息维护已打开。");
        return;
      }
      if (action.dataset.action === "fundLinkedProjects") {
        openFundLinkedProjects(action);
        showToast("关联项目已打开。");
        return;
      }
      if (action.dataset.action === "openLinkedProjectMenu") {
        closeDetail();
        switchScreen("manage");
        setManageTab(action.dataset.targetTab || "processApproval");
        showToast("已跳转到项目对应菜单。");
        return;
      }
      if (action.dataset.action === "downloadChart") {
        openChartDownloadPreview(action);
        return;
      }
      if (action.dataset.action === "exportChart") {
        openChartExportPreview(action);
        return;
      }
      if (action.dataset.action === "markReminderRead") {
        openReminderMarkDialog(action);
        showToast("已打开待办标记。");
        return;
      }
      if (action.dataset.action === "confirmReminderMark") {
        if (confirmReminderMark()) showToast("待办标记已保存。");
        return;
      }
      if (action.dataset.action === "removePaymentRecord") {
        if (removePaymentRecordRow(action)) showToast("付款记录已删除。");
        return;
      }
      if (action.dataset.action === "returnProject") {
        showToast("已记录退回修改意见。");
        return;
      }
      if (action.dataset.action === "rejectAcceptance") {
        showToast("已记录不同意意见。");
        return;
      }
      if (action.dataset.action === "addBranchAttachment") {
        if (createCustomAttachmentRow(action)) showToast("已新增一行自定义附件，可直接修改名称或上传文件。");
        return;
      }
      if (action.dataset.action === "toggleBudgetNameSelect") {
        toggleBudgetNameSelect(action);
        return;
      }
      if (action.dataset.action === "openArchiveMaterialPool") {
        openArchiveMaterialDialog();
        return;
      }
      if (action.dataset.action === "loadArchiveMaterialChecklist") {
        openArchiveMaterialChecklistDialog(action);
        return;
      }
      if (action.dataset.action === "confirmArchiveMaterialChecklist") {
        confirmArchiveMaterialChecklist();
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
        "fundPoolDetail",
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
        exportReport: "已按当前筛选条件准备导出。",
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
        fundPoolDetail: "经费信息维护已打开。",
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
        batchProcess: "已一键办理选中待办。",
        downloadChart: "已按所选图片格式准备下载。",
        exportChart: "图表统计数据已准备导出。",
        submitInitiation: "立项申请已提交，等待审核。",
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
  $("#myFundSource")?.addEventListener("change", () => {
    state.myPendingOnly = false;
    state.myProjectPage = 1;
    filterMyProjects();
  });
  $("#myProjectType")?.addEventListener("change", () => {
    state.myPendingOnly = false;
    state.myProjectPage = 1;
    filterMyProjects();
  });
  $("#initiationUseLibrary")?.addEventListener("change", toggleInitiationLibraryMode);
  $$("input[name='initiationUseLibrary']").forEach((input) => input.addEventListener("change", toggleInitiationLibraryMode));
  $("#applicationBudgetInput")?.addEventListener("input", () => {
    state.applicationBudgetAmount = null;
    renderApplicationFlow();
  });
  $("#applicationBudgetInput")?.addEventListener("change", () => {
    state.applicationBudgetAmount = null;
    renderApplicationFlow();
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

  $("#templateSearch")?.addEventListener("input", renderTemplates);
  $("#templateFilter")?.addEventListener("click", (event) => {
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
      if ($("#templateSearch")) $("#templateSearch").value = event.currentTarget.value;
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
  setupAdvancedFilters();
  renderApplicationBudgetHint();
  syncTableSequenceNumbers();
  styleRequiredAsterisks();
  bindEvents();
  setMode("applicant", "portal");
}

init();
