# Regularization concept check

A 19-question formative quiz in the visual and interaction style of the existing [KNN](https://alexbernardino.github.io/knn-quiz/) and [regression](https://alexbernardino.github.io/regression-quiz/) quizzes.

- 4 questions on nonlinear feature expansion and RBFs
- 11 on ridge, lasso, sparsity, scaling, intercepts, and bias–variance
- 4 on kernels and kernel ridge regression

Students answer one question at a time, get immediate feedback, can go back to review, and see a section-by-section result. Relevant questions link to the [interactive regression demo](https://alexbernardino.github.io/regression-interactive/). The quiz needs no account, server, package installation, or network API; answers and scores live only in the open browser tab.

## Local preview

Run `python3 -m http.server 8000` in this folder, then open <http://localhost:8000/>. A local server is required because the quiz loads JavaScript modules.

Run `node --test tests/quiz.test.mjs` to check the question bank (Node.js 22 recommended).

## GitHub Pages deployment

1. Create a public GitHub repository named `regularization-quiz` in the `alexbernardino` account.
2. Push the contents of this folder to its `main` branch.
3. In repository **Settings → Pages**, select **GitHub Actions** as the build and deployment source.
4. The included workflow tests and publishes the static site after each push to `main`.

The expected URL is <https://alexbernardino.github.io/regularization-quiz/>. All local assets use relative paths, so the site works at this GitHub Pages project URL without a build-time base-path setting.

## Teaching notes

The quiz follows the updated lecture PDF's nonlinear feature expansion, RBF, ridge/lasso, and kernel ridge sections (slide numbers 62–85). It deliberately distinguishes the lecture's summed squared-error objective from the companion demo's mean-squared-error convention: slider values need not match λ values numerically. In the slides' notation, KRR uses the canonical penalty βᵀKβ, not a Euclidean penalty on β. The intercept is not penalized.

Edit `questions.js` to revise the bank. Each item has four options, a zero-based answer index, feedback, a follow-up activity, and a Boolean indicating whether the companion demo genuinely supports the activity. Update the count assertions in `tests/quiz.test.mjs` if you add or remove questions.
