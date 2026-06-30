const LOCKED_MODEL = Object.freeze({
  intercept: 0.614173247543,
  means: Object.freeze({ annulus: 78.5479272727, stjHeight: 25.38, delta: 3.79636363636 }),
  sds: Object.freeze({ annulus: 6.0619659573, stjHeight: 5.02424666447, delta: 2.72964957034 }),
  coefficients: Object.freeze({ annulus: -0.937277505524, stjHeight: -0.438972131400, delta: 0.297840819416 })
});

const COPY = Object.freeze({
  cn: Object.freeze({
    pageTitle: "自膨瓣TAVR术前评估工具",
    title: "自膨瓣TAVR术前评估工具",
    subtitle: "该工具仅用于单纯主动脉瓣反流患者接受自膨瓣TAVR时的30天VARC-3装置成功概率估计。",
    inputTitle: "输入参数",
    annulusLabel: "1. 瓣环周长",
    stjHeightLabel: "2. STJ高度",
    aortaLabel: "3. 升主动脉直径（距瓣环40 mm）",
    stjDiameterLabel: "4. STJ直径",
    placeholder: "输入数值",
    deltaLabel: "ΔMAo-STJ.（升主动脉直径−STJ直径）",
    calculate: "计算",
    resultTitle: "评估结果",
    probabilityTitle: "预测30天VARC-3装置成功概率",
    scoreNote: "该评分用于估计自膨瓣TAVR术后30天VARC-3装置成功概率。",
    prognosisTitle: "预后信息",
    kmTitle: "无MACE事件生存图",
    legendSuccess: "装置成功组",
    legendFailure: "装置失败组",
    kmYAxis: "无MACE事件率",
    kmXAxis: "随访时间（年）",
    kmImageFile: "KM_Device_Success_MACE_CN_web_no_risk_table.png",
    kmImageAlt: "基于真实 v08 统计分析的无MACE事件生存曲线图",
    prognosisNote: "装置成功组在随访期间总体无MACE事件率更高。",
    developerTeam: "本研究用模型由中山大学孙逸仙纪念医院 TAVR 团队开发。",
    disclaimer: "仅供研究使用，不用于临床决策。",
    acknowledgementButton: "致谢",
    acknowledgementTitle: "致谢",
    acknowledgementText: "致谢：感谢广东省人民医院、佛山市人民医院、玉林市第一人民医院、暨南大学附属第一医院、广东医科大学附属医院在研究数据收集与项目推进中的支持。",
    acknowledgementCloseLabel: "关闭致谢弹窗",
    inputError: "请补全所有CT参数并输入有效数值。",
    ariaProbability: "预测30天VARC-3装置成功概率"
  }),
  en: Object.freeze({
    pageTitle: "Self-Expandable TAVR Pre-Procedure Assessment Tool",
    title: "Self-Expandable TAVR Pre-Procedure Assessment Tool",
    subtitle: "This tool is designed to estimate the 30-day probability of VARC-3 device success following TAVR.",
    inputTitle: "Input Parameters",
    annulusLabel: "1. Annulus Perimeter",
    stjHeightLabel: "2. STJ Height",
    aortaLabel: "3. Ascending Aorta Diameter (40 mm above annulus)",
    stjDiameterLabel: "4. STJ Diameter",
    placeholder: "Enter value",
    deltaLabel: "ΔMAo-STJ. (Ascending Aorta Diameter − STJ Diameter)",
    calculate: "Calculate",
    resultTitle: "Assessment Results",
    probabilityTitle: "Predicted 30-Day VARC-3 Device Success Probability",
    scoreNote: "This score estimates the probability of 30-day VARC-3 device success following TAVR.",
    prognosisTitle: "Prognostic Information",
    kmTitle: "Kaplan–Meier Curve for MACE-Free Survival",
    legendSuccess: "Device Success Group",
    legendFailure: "Device Failure Group",
    kmYAxis: "MACE-Free Survival",
    kmXAxis: "Follow-up Time (Years)",
    kmImageFile: "KM_Device_Success_MACE_EN_web_no_risk_table.png",
    kmImageAlt: "MACE-free survival based on the verified v08 statistical analysis",
    prognosisNote: "The device success group had a higher overall MACE-free rate during follow-up.",
    developerTeam: "This research-use model was developed by the TAVR team at Sun Yat-sen Memorial Hospital, Sun Yat-sen University.",
    disclaimer: "For research use only. Not for use in clinical decision-making.",
    acknowledgementButton: "Acknowledgements",
    acknowledgementTitle: "Acknowledgements",
    acknowledgementText: "Acknowledgements: We thank Guangdong Provincial People’s Hospital, Foshan People’s Hospital, Yulin First People’s Hospital, the First Affiliated Hospital of Jinan University, and the Affiliated Hospital of Guangdong Medical University for their support in data collection and project development.",
    acknowledgementCloseLabel: "Close acknowledgements dialog",
    inputError: "Please complete all CT parameters with valid numeric values.",
    ariaProbability: "Predicted 30-Day VARC-3 Device Success Probability"
  })
});

let activeLanguage = "cn";
let latestResult = null;
let acknowledgementTrigger = null;

function logistic(value) {
  return 1 / (1 + Math.exp(-value));
}

function calculateDeviceSuccess(inputs) {
  const values = [inputs.annulus, inputs.stjHeight, inputs.aortaDiameter, inputs.stjDiameter];
  if (!values.every(Number.isFinite)) {
    throw new Error(COPY[activeLanguage].inputError);
  }
  const delta = inputs.aortaDiameter - inputs.stjDiameter;
  const zAnnulus = (inputs.annulus - LOCKED_MODEL.means.annulus) / LOCKED_MODEL.sds.annulus;
  const zStjHeight = (inputs.stjHeight - LOCKED_MODEL.means.stjHeight) / LOCKED_MODEL.sds.stjHeight;
  const zDelta = (delta - LOCKED_MODEL.means.delta) / LOCKED_MODEL.sds.delta;
  const score = LOCKED_MODEL.intercept
    + LOCKED_MODEL.coefficients.annulus * zAnnulus
    + LOCKED_MODEL.coefficients.stjHeight * zStjHeight
    + LOCKED_MODEL.coefficients.delta * zDelta;
  return { delta, score, probability: logistic(score) };
}

function readNumber(id) {
  const raw = document.getElementById(id).value.trim();
  return raw === "" ? Number.NaN : Number(raw);
}

function updateDeltaPreview() {
  const aorta = readNumber("aorta-diameter");
  const stj = readNumber("stj-diameter");
  document.getElementById("delta-output").textContent = Number.isFinite(aorta) && Number.isFinite(stj)
    ? (aorta - stj).toFixed(2)
    : "---";
}

function renderResult(result) {
  latestResult = result;
  const percent = result.probability * 100;
  document.getElementById("score-output").textContent = result.score.toFixed(2);
  document.getElementById("probability-output").textContent = `${Math.round(percent)}%`;
  document.getElementById("probability-ring").style.setProperty("--probability-angle", `${percent * 3.6}deg`);
  document.getElementById("probability-ring").setAttribute("aria-label", `${COPY[activeLanguage].ariaProbability}: ${percent.toFixed(1)}%`);
  document.getElementById("delta-output").textContent = result.delta.toFixed(2);
}

function submitCalculation(event) {
  event.preventDefault();
  const message = document.getElementById("input-error");
  try {
    const result = calculateDeviceSuccess({
      annulus: readNumber("annulus"),
      stjHeight: readNumber("stj-height"),
      aortaDiameter: readNumber("aorta-diameter"),
      stjDiameter: readNumber("stj-diameter")
    });
    message.textContent = "";
    renderResult(result);
  } catch (error) {
    message.textContent = error.message;
  }
}

function applyLanguage(language) {
  activeLanguage = language === "en" ? "en" : "cn";
  const copy = COPY[activeLanguage];
  document.documentElement.lang = activeLanguage === "cn" ? "zh-CN" : "en";
  document.title = copy.pageTitle;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = copy[element.dataset.i18n];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = copy[element.dataset.i18nPlaceholder];
  });
  document.querySelectorAll("[data-i18n-svg]").forEach((element) => {
    element.textContent = copy[element.dataset.i18nSvg];
  });
  document.getElementById("language-cn").classList.toggle("active", activeLanguage === "cn");
  document.getElementById("language-en").classList.toggle("active", activeLanguage === "en");
  document.getElementById("language-cn").setAttribute("aria-pressed", String(activeLanguage === "cn"));
  document.getElementById("language-en").setAttribute("aria-pressed", String(activeLanguage === "en"));
  document.getElementById("km-image").src = copy.kmImageFile;
  document.getElementById("km-image").alt = copy.kmImageAlt;
  document.getElementById("acknowledgement-close").setAttribute("aria-label", copy.acknowledgementCloseLabel);
  const currentError = document.getElementById("input-error");
  if (currentError.textContent) currentError.textContent = copy.inputError;
  if (latestResult) renderResult(latestResult);
  localStorage.setItem("tavr-calculator-language", activeLanguage);
}

function openAcknowledgements() {
  const modal = document.getElementById("acknowledgement-modal");
  acknowledgementTrigger = document.activeElement;
  modal.hidden = false;
  document.body.classList.add("modal-open");
  document.getElementById("acknowledgement-close").focus();
}

function closeAcknowledgements() {
  const modal = document.getElementById("acknowledgement-modal");
  modal.hidden = true;
  document.body.classList.remove("modal-open");
  if (acknowledgementTrigger instanceof HTMLElement) acknowledgementTrigger.focus();
}

function seedFigureExample() {
  document.getElementById("annulus").value = "70.78";
  document.getElementById("stj-height").value = "25.38";
  document.getElementById("aorta-diameter").value = "35.00";
  document.getElementById("stj-diameter").value = "31.20";
  updateDeltaPreview();
  submitCalculation(new Event("submit"));
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("calculator-form").addEventListener("submit", submitCalculation);
    document.getElementById("aorta-diameter").addEventListener("input", updateDeltaPreview);
    document.getElementById("stj-diameter").addEventListener("input", updateDeltaPreview);
    document.getElementById("language-cn").addEventListener("click", () => applyLanguage("cn"));
    document.getElementById("language-en").addEventListener("click", () => applyLanguage("en"));
    document.getElementById("acknowledgement-open").addEventListener("click", openAcknowledgements);
    document.getElementById("acknowledgement-close").addEventListener("click", closeAcknowledgements);
    document.querySelector("[data-modal-close]").addEventListener("click", closeAcknowledgements);
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !document.getElementById("acknowledgement-modal").hidden) closeAcknowledgements();
    });
    const params = new URLSearchParams(window.location.search);
    const requestedLanguage = params.get("lang") || localStorage.getItem("tavr-calculator-language") || "cn";
    applyLanguage(requestedLanguage);
    if (params.get("figure") === "1") seedFigureExample();
    if (params.get("ack") === "1") openAcknowledgements();
  });
}

if (typeof module !== "undefined") {
  module.exports = { LOCKED_MODEL, COPY, logistic, calculateDeviceSuccess };
}
