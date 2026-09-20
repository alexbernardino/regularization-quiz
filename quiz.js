import { questions } from "./questions.js";

const root = document.querySelector("#quiz-root");
const demoUrl = "https://alexbernardino.github.io/regression-interactive/";
const sections = ["Feature expansion", "Regularization", "Kernel ridge"];
let answers = Array(questions.length).fill(null);
let current = 0;
let finished = false;

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function score() {
  return answers.reduce((total, choice, index) => total + Number(choice === questions[index].answer), 0);
}

function visual(section) {
  if (section === "Feature expansion") {
    return `<svg class="mini-visual" viewBox="0 0 240 170" role="img" aria-label="Schematic nonlinear fit through data; illustration, not measured data">
      <rect width="240" height="170" fill="#f4f1e8"/><path d="M28 20V140H220" fill="none" stroke="#697183"/>
      <path d="M37 121 C73 105 82 34 119 53 S175 132 212 51" fill="none" stroke="#315fc7" stroke-width="2.5"/>
      <g fill="#cf4d45"><circle cx="48" cy="116" r="4"/><circle cx="78" cy="78" r="4"/><circle cx="106" cy="55" r="4"/><circle cx="140" cy="65" r="4"/><circle cx="171" cy="99" r="4"/><circle cx="200" cy="65" r="4"/></g>
      <text x="207" y="154">x</text><text x="14" y="22">y</text><text x="36" y="161" class="visual-caption">Illustration · not live data</text>
    </svg>`;
  }
  if (section === "Regularization") {
    return `<svg class="mini-visual" viewBox="0 0 240 170" role="img" aria-label="Schematic coefficient-space contours and regularization boundaries">
      <rect width="240" height="170" fill="#f4f1e8"/><path d="M25 86H221M118 18V145" fill="none" stroke="#697183"/>
      <ellipse cx="151" cy="65" rx="54" ry="25" transform="rotate(-31 151 65)" fill="none" stroke="#cf4d45" stroke-width="1.5"/>
      <ellipse cx="151" cy="65" rx="36" ry="16" transform="rotate(-31 151 65)" fill="none" stroke="#cf4d45" opacity=".55"/>
      <circle cx="118" cy="86" r="42" fill="#315fc70f" stroke="#315fc7" stroke-width="2"/>
      <path d="M118 36L168 86L118 136L68 86Z" fill="none" stroke="#178464" stroke-width="2"/>
      <circle cx="151" cy="65" r="3.5" fill="#cf4d45"/><text x="198" y="101">β₁</text><text x="121" y="19">β₂</text>
      <text x="37" y="161" class="visual-caption">Coefficient-space sketch</text>
    </svg>`;
  }
  return `<svg class="mini-visual" viewBox="0 0 240 170" role="img" aria-label="A new input compared with three training inputs using kernel similarities">
    <rect width="240" height="170" fill="#f4f1e8"/>
    <path d="M48 115L119 52M119 52L187 97M48 115L187 97" stroke="#aeb7c9" stroke-dasharray="4 4"/>
    <path d="M119 52L122 118" stroke="#315fc7" stroke-width="2" stroke-dasharray="4 3"/>
    <circle cx="48" cy="115" r="8" fill="#cf4d45"/><circle cx="119" cy="52" r="8" fill="#cf4d45"/><circle cx="187" cy="97" r="8" fill="#cf4d45"/><circle cx="122" cy="118" r="8" fill="#315fc7"/>
    <text x="30" y="137">x₁</text><text x="102" y="35">x₂</text><text x="184" y="121">x₃</text><text x="127" y="137">x</text>
    <text x="35" y="160" class="visual-caption">Similarity to training inputs</text>
  </svg>`;
}

function renderQuestion() {
  const q = questions[current];
  const choice = answers[current];
  const answered = choice !== null;
  root.innerHTML = `<div class="quiz-layout">
    <aside class="lesson-rail" aria-label="Learning path">
      <p class="eyebrow">Learning path</p>
      <h2>From features to stable predictions</h2>
      <ol>${sections.map((section, index) => `<li class="${q.section === section ? "active" : ""}" ${q.section === section ? 'aria-current="step"' : ""}><span>0${index + 1}</span>${escapeHtml(section)}</li>`).join("")}</ol>
      <div class="rail-note"><p>Answer first, then read the explanation. Your responses stay in this browser tab; nothing is submitted.</p></div>
    </aside>
    <section class="question-stage" aria-label="Quiz question">
      <p class="setup-note"><strong>Demo setup:</strong> For slider experiments, use generated points with zero outliers. The demo penalizes the slope, not the intercept; its mean-squared-error convention gives λ a different numerical scale from the slides' summed-error convention. Compare trends, not λ values.</p>
      <div class="progress-row"><span>Question ${current + 1} of ${questions.length}</span><div class="progress-track" role="progressbar" aria-label="Quiz progress" aria-valuemin="0" aria-valuemax="${questions.length}" aria-valuenow="${current + 1}"><div style="width:${((current + 1) / questions.length) * 100}%"></div></div><strong>${score()} points</strong></div>
      <article class="question-card">
        <div class="question-top"><div><p class="question-label">${escapeHtml(q.category)}</p><h2 id="question-title" tabindex="-1">${escapeHtml(q.prompt)}</h2></div>${visual(q.section)}</div>
        <div class="answers" role="group" aria-label="Answer choices">${q.options.map((option, index) => {
          const status = answered ? (index === q.answer ? "answer-correct" : index === choice ? "answer-wrong" : "") : "";
          const mark = answered && index === q.answer ? "✓" : answered && index === choice ? "×" : String.fromCharCode(65 + index);
          return `<button type="button" data-choice="${index}" ${answered ? "disabled" : ""} aria-pressed="${choice === index}" class="${status}"><span aria-hidden="true">${mark}</span>${escapeHtml(option)}</button>`;
        }).join("")}</div>
        ${answered ? `<div class="feedback ${choice === q.answer ? "correct" : "incorrect"}" role="status" tabindex="-1"><strong>${choice === q.answer ? "Correct." : "Not quite."}</strong><p>${escapeHtml(q.explanation)}</p><div class="try-it"><b>${q.demo ? "Try it in the demo:" : "Work it out:"}</b> ${escapeHtml(q.activity)} ${q.demo ? `<a href="${demoUrl}" target="_blank" rel="noopener noreferrer">Open demo ↗</a>` : ""}</div></div>` : ""}
        <div class="card-actions"><button type="button" class="secondary" data-action="previous" ${current === 0 ? "disabled" : ""}>← Previous</button><button type="button" class="primary" data-action="next" ${!answered ? "disabled" : ""}>${current === questions.length - 1 ? "See results" : "Next question →"}</button></div>
      </article>
    </section>
  </div>`;
}

function renderResults() {
  const total = score();
  const summary = sections.map(section => {
    const indices = questions.map((question, index) => question.section === section ? index : -1).filter(index => index >= 0);
    const correct = indices.filter(index => answers[index] === questions[index].answer).length;
    return `<li><span>${escapeHtml(section)}</span><strong>${correct} / ${indices.length}</strong></li>`;
  }).join("");
  root.innerHTML = `<section class="results" aria-labelledby="results-title">
    <p class="eyebrow">Quiz complete</p>
    <div class="score-ring" style="--score:${(total / questions.length) * 360}deg"><span>${total}/${questions.length}</span></div>
    <h2 id="results-title" tabindex="-1">${total} out of ${questions.length} correct</h2>
    <p>Review the explanations, then use the interactive regression demo for the ridge and lasso questions.</p>
    <ul class="section-results">${summary}</ul>
    <div class="result-actions"><button type="button" class="secondary" data-action="review">Review answers</button><button type="button" class="primary" data-action="restart">Restart quiz</button></div>
    <a class="demo-link" href="${demoUrl}" target="_blank" rel="noopener noreferrer">Continue experimenting ↗</a>
  </section>`;
}

function render(focusTarget) {
  if (finished) renderResults(); else renderQuestion();
  if (focusTarget) root.querySelector(focusTarget)?.focus();
}

root.addEventListener("click", event => {
  const choiceButton = event.target.closest("[data-choice]");
  if (choiceButton && answers[current] === null) {
    answers[current] = Number(choiceButton.dataset.choice);
    render(".feedback");
    return;
  }
  const action = event.target.closest("[data-action]")?.dataset.action;
  if (action === "previous" && current > 0) {
    current -= 1;
    render("#question-title");
  } else if (action === "next" && answers[current] !== null) {
    if (current === questions.length - 1) {
      finished = true;
      render("#results-title");
    } else {
      current += 1;
      render("#question-title");
    }
  } else if (action === "review") {
    finished = false;
    current = 0;
    render("#question-title");
  } else if (action === "restart") {
    answers = Array(questions.length).fill(null);
    current = 0;
    finished = false;
    render("#question-title");
  }
});

render();
