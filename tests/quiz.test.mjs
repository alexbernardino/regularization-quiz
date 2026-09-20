import { test } from 'node:test';
import assert from 'node:assert/strict';
import { questions } from '../questions.js';

test('question bank has the intended emphasis and unique prompts', () => {
  assert.equal(questions.length, 19);
  assert.deepEqual(
    ['Feature expansion', 'Regularization', 'Kernel ridge'].map(section => questions.filter(q => q.section === section).length),
    [4, 11, 4]
  );
  assert.equal(new Set(questions.map(q => q.prompt)).size, questions.length);
  assert.deepEqual([0, 1, 2, 3].map(answer => questions.filter(q => q.answer === answer).length), [4, 5, 5, 5]);
  assert.ok(!questions.some(q => q.category === 'Choosing λ'));
});

test('every question has one valid answer and substantive feedback', () => {
  for (const q of questions) {
    assert.equal(q.options.length, 4, q.prompt);
    assert.equal(new Set(q.options).size, 4, q.prompt);
    assert.ok(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < 4, q.prompt);
    assert.ok(q.options[q.answer].length > 4, q.prompt);
    assert.ok(q.explanation.length > 70, q.prompt);
    assert.ok(q.activity.length > 25, q.prompt);
    assert.equal(typeof q.demo, 'boolean', q.prompt);
  }
});

test('demo links are reserved for topics supported by the companion demo', () => {
  for (const q of questions.filter(q => q.demo)) {
    assert.equal(q.section, 'Regularization', q.prompt);
  }
});

test('intercept question defines its coefficients and excludes the intercept from the penalty', () => {
  const q = questions[9];
  assert.match(q.prompt, /β₀ is the intercept/);
  assert.match(q.prompt, /β = .*contains only feature coefficients/);
  assert.equal(q.options[q.answer], 'λ‖β‖₂²');
  assert.match(q.explanation, /1ₙ is the n-vector of ones/);
});

test('kernel ridge questions use the slides coefficient notation', () => {
  const kernelQuestions = questions.filter(q => q.section === 'Kernel ridge');
  assert.match(kernelQuestions.find(q => q.category === 'KRR coefficients').prompt, /Kβ/);
  assert.doesNotMatch(JSON.stringify(kernelQuestions), /α/);
});
