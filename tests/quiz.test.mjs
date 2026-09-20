import { test } from 'node:test';
import assert from 'node:assert/strict';
import { questions } from '../questions.js';

test('question bank has the intended emphasis and unique prompts', () => {
  assert.equal(questions.length, 20);
  assert.deepEqual(
    ['Feature expansion', 'Regularization', 'Kernel ridge'].map(section => questions.filter(q => q.section === section).length),
    [4, 12, 4]
  );
  assert.equal(new Set(questions.map(q => q.prompt)).size, questions.length);
  assert.deepEqual([0, 1, 2, 3].map(answer => questions.filter(q => q.answer === answer).length), [5, 5, 5, 5]);
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
