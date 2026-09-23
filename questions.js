// The quiz is deliberately self-contained so it can be hosted at any GitHub Pages path.
// Answer indices are zero-based. Every question has one unambiguous best answer.
export const questions = [
  {
    section: "Feature expansion",
    category: "Polynomial features",
    prompt: "For ϕ(x) = (1, x, x²), what kind of model is f(x) = βᵀϕ(x)?",
    options: [
      "Linear in x, but nonlinear in the coefficients",
      "Nonlinear in x, but linear in the coefficients β₀, β₁ and β₂",
      "Linear in both x and the coefficients",
      "A model that cannot be fitted by least squares"
    ],
    answer: 1,
    explanation: "The x² term makes the fitted curve nonlinear as a function of x. The prediction is still a linear combination of the unknown β coefficients, so ordinary least squares can estimate them.",
    activity: "Write f(x) = β₀ + β₁x + β₂x². Which symbols are data-dependent features, and which are parameters?",
    demo: false
  },
  {
    section: "Feature expansion",
    category: "Model order",
    prompt: "You increase a polynomial fit from degree 2 to degree 5 on the same training set, retaining all lower-degree terms. What must happen?",
    options: [
      "The minimum training sum of squared errors cannot increase",
      "The test error must decrease",
      "Every new coefficient must be nonzero",
      "The training error must become exactly zero"
    ],
    answer: 0,
    explanation: "The degree-5 model contains every degree-2 fit as a special case: set its extra coefficients to zero. Its best training SSE is therefore no larger, but performance on unseen data can deteriorate.",
    activity: "Imagine fitting five noisy observations with increasingly high-degree polynomials. Separate what is guaranteed for training SSE from what is possible for test error.",
    demo: false
  },
  {
    section: "Feature expansion",
    category: "RBF intercept",
    prompt: "In f(x) = w₀ + Σₖ wₖGₖ(x), what is predicted where every Gaussian basis function Gₖ(x) is close to zero?",
    options: ["Zero", "The nearest centre", "The average of the centres", "Approximately w₀"],
    answer: 3,
    explanation: "Far from all RBF centres, the local basis functions contribute little. The constant basis function G₀(x) = 1 leaves the intercept w₀ as the baseline prediction.",
    activity: "Set G₁(x) = ⋯ = Gₚ(x) = 0 in the model equation and simplify.",
    demo: false
  },
  {
    section: "Feature expansion",
    category: "RBF fitting",
    prompt: "After the RBF centres and bandwidth are fixed, which quantities are estimated by ordinary least squares?",
    options: ["Only the centres", "Only the bandwidth", "The intercept and the RBF weights", "The training inputs"],
    answer: 2,
    explanation: "Fixed centres and bandwidth define the feature columns Gₖ(x). A leading column of ones represents the intercept; least squares then fits w₀, w₁, …, wₚ.",
    activity: "Sketch the design matrix for two observations and two RBFs. Include its column of ones.",
    demo: false
  },
  {
    section: "Regularization",
    category: "Singular normal equations",
    prompt: "For a centred design without an intercept, XᵀX is singular. What does ridge with λ > 0 guarantee?",
    options: [
      "The training error becomes zero",
      "XᵀX + λI is positive definite, giving a unique coefficient vector",
      "All coefficients become exactly zero",
      "The test error is lower than for least squares"
    ],
    answer: 1,
    explanation: "XᵀX is positive semidefinite. Adding λI with λ > 0 raises every eigenvalue by λ, so the ridge normal-equation matrix is invertible. This does not guarantee better test performance for every dataset.",
    activity: "In the lecture's one-observation example, β₁ + β₂ = 3 has infinitely many least-squares solutions. Add an L2 penalty and consider which solution is preferred.",
    demo: false
  },
  {
    section: "Regularization",
    category: "Ridge objective",
    prompt: "Which objective is ridge regression for a centred design matrix X?",
    options: [
      "‖y − Xβ‖₂² + λ‖β‖₂²",
      "‖y − Xβ‖₂² + λ‖β‖₁",
      "‖y − Xβ‖₂² − λ‖β‖₂²",
      "‖y − Xβ‖₂² + λ‖X‖₂²"
    ],
    answer: 0,
    explanation: "Ridge balances squared training residuals against the squared Euclidean norm of the coefficient vector. The L1 option is lasso; λ controls the relative strength of the penalty.",
    activity: "Keep the L1 slider at zero and increase the L2 slider. Watch how the fitted slope changes.",
    demo: true
  },
  {
    section: "Regularization",
    category: "One-feature shrinkage",
    prompt: "With one centred feature and S = xᵀx > 0, how is the ridge coefficient related to the least-squares coefficient?",
    options: [
      "β̂ridge = (S + λ)β̂LS",
      "β̂ridge = β̂LS + λ",
      "β̂ridge = [S/(S + λ)]β̂LS",
      "β̂ridge = [λ/(S + λ)]β̂LS"
    ],
    answer: 2,
    explanation: "Since β̂LS = (xᵀy)/S and β̂ridge = (xᵀy)/(S + λ), ridge multiplies the least-squares coefficient by S/(S + λ), a number between zero and one when λ > 0.",
    activity: "Set S = 4 and λ = 4. What fraction of the least-squares coefficient remains?",
    demo: false
  },
  {
    section: "Regularization",
    category: "Eigenvalues",
    prompt: "How does adding λI change the eigensystem of XᵀX?",
    options: [
      "It rotates every eigenvector by 90°",
      "It sets every eigenvalue to λ",
      "It changes only the eigenvectors",
      "It keeps the eigenvectors and adds λ to each eigenvalue"
    ],
    answer: 3,
    explanation: "If XᵀXv = dv, then (XᵀX + λI)v = (d + λ)v. The directions are unchanged, while zero and small eigenvalues are shifted away from zero.",
    activity: "Apply XᵀX + λI to an eigenvector v and factor out v.",
    demo: false
  },
  {
    section: "Regularization",
    category: "Strength of the penalty",
    prompt: "As the ridge penalty λ increases on a fixed training set, which trend is guaranteed?",
    options: [
      "Training SSE decreases and coefficient norm increases",
      "Training SSE cannot decrease and coefficient norm cannot increase",
      "Test error must decrease",
      "Every coefficient becomes exactly zero at a finite λ"
    ],
    answer: 1,
    explanation: "A stronger ridge penalty favours a no-larger coefficient norm, potentially at the cost of a no-smaller training SSE. Test error may improve or worsen; ridge coefficients generally approach zero rather than becoming exactly zero at finite λ.",
    activity: "Increase L2 strength while keeping L1 at zero. Compare slope magnitude and training R²; resample to see why test R² need not move monotonically.",
    demo: true
  },
  {
    section: "Regularization",
    category: "The intercept",
    prompt: "In ŷ(x) = β₀ + xᵀβ, β₀ is the intercept and β = (β₁, …, βₚ)ᵀ contains only feature coefficients. Which ridge penalty leaves the intercept unpenalized?",
    options: [
      "λ(β₀² + ‖β‖₂²)",
      "λβ₀²",
      "λ‖β‖₂²",
      "λ‖β‖₁"
    ],
    answer: 2,
    explanation: "Only the feature coefficients are penalized. The full objective is min over β₀ and β of ‖y − β₀·1ₙ − Xβ‖₂² + λ‖β‖₂², where 1ₙ is the n-vector of ones. The intercept is excluded; at the optimum, β̂₀ = ȳ − x̄ᵀβ̂.",
    activity: "The demo penalizes the slope but not the intercept. Raise L2 strength and observe how the line pivots toward a constant prediction.",
    demo: true
  },
  {
    section: "Regularization",
    category: "Feature scaling",
    prompt: "Why should predictor scales be considered before using ridge or lasso?",
    options: [
      "Changing a feature's units changes its coefficient and therefore the penalty for an equivalent predictor",
      "Scaling changes the target y automatically",
      "Regularization is exactly invariant to every feature rescaling",
      "Standardization guarantees perfect test predictions"
    ],
    answer: 0,
    explanation: "If a feature is multiplied by c, its equivalent coefficient is divided by c. The L1 or L2 penalty then changes even though the predictions do not. Scaling features on the training set makes the penalty more comparable across them.",
    activity: "If x′ = 10x and β′ = β/10, compare (β′)² with β² for the same fitted predictions.",
    demo: false
  },
  {
    section: "Regularization",
    category: "Ridge versus lasso",
    prompt: "Which statement best distinguishes lasso from ridge?",
    options: [
      "Ridge always selects a strict subset of features",
      "Lasso cannot be used for regression",
      "They always give identical coefficients",
      "Lasso can set coefficients exactly to zero; ridge usually shrinks them without exact zeros"
    ],
    answer: 3,
    explanation: "The L1 penalty has a corner at zero and often yields sparse solutions. The smooth L2 penalty usually shrinks coefficients continuously. Neither method is guaranteed to improve generalization in every setting.",
    activity: "Keep L2 at zero, increase L1 strength and watch the slope. Compare with L2-only shrinkage.",
    demo: true
  },
  {
    section: "Regularization",
    category: "Sparsity",
    prompt: "What does ‖β‖₀ count in the lecture's feature-selection formulation?",
    options: [
      "The sum of coefficient magnitudes",
      "The number of nonzero coefficients",
      "The square root of the sum of squares",
      "The number of training observations"
    ],
    answer: 1,
    explanation: "The so-called L0 'norm' counts nonzero entries of β. Penalizing it directly asks for a small selected feature set, but that combinatorial problem is generally harder than L1-penalized optimization.",
    activity: "For β = (3, 0, −2, 0), compute ‖β‖₀, ‖β‖₁ and ‖β‖₂².",
    demo: false
  },
  {
    section: "Regularization",
    category: "Lasso optimization",
    prompt: "Why does the lasso objective not yield the same simple linear-system solution as ridge?",
    options: [
      "Its squared-error term is nonconvex",
      "It has no minimum",
      "The absolute-value penalty is not differentiable at zero",
      "The design matrix must be square"
    ],
    answer: 2,
    explanation: "The L1 penalty Σ|βⱼ| has a kink at zero. Lasso remains a convex optimization problem, but the ridge gradient equation cannot simply be rearranged into one inverse formula.",
    activity: "Draw |β| and β² near β = 0. Which graph has a corner?",
    demo: false
  },
  {
    section: "Regularization",
    category: "Bias and variance",
    prompt: "What is a plausible effect of a moderate ridge penalty on predictions from repeated training samples?",
    options: [
      "It removes both bias and variance completely",
      "It can only increase prediction variance",
      "It guarantees lower test error on every sample",
      "It can add some bias while reducing variance, sometimes improving test performance"
    ],
    answer: 3,
    explanation: "Shrinking a flexible or unstable fit can make estimates less sensitive to training-sample fluctuations. This variance reduction may outweigh added bias, but the optimal strength depends on the data.",
    activity: "With few, noisy training points and no outliers, compare repeated training resamples at L2 = 0 and at a moderate L2 strength.",
    demo: true
  }
];
