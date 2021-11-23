const { assert, expect } = require('chai');

const processDrinksAsync = require('../index').processDrinksAsync;
const expectedOutput = require('./expectedOutput');

describe('Process Drink Should work as expected', () => {
  it('Sample Input should pass as expected', async () => {
    const fileName = 'test_sample_input';
    let output = expectedOutput.sample_input;

    let result = await processDrinksAsync(fileName);
    console.log(result);
    assert.sameMembers(
      result,
      output,
      'Sample input did not give expected result'
    );
  });

  it('All drinks should be prepared if ingredients are available sufficientely', async () => {
    const fileName = 'test_sufficient_ingredients';
    let output = expectedOutput.sufficient_ingredient;

    let result = await processDrinksAsync(fileName);

    assert.sameMembers(
      result,
      output,
      'All drinks should have been prepared witohout any error'
    );
  });

  it('No drinks should be prepared if no ingredient is available in sufficient quantity', async () => {
    const fileName = 'test_insufficient_ingredients';
    let output = expectedOutput.insufficient_ingredient;

    let result = await processDrinksAsync(fileName);
    assert.sameMembers(
      result,
      output,
      'No Drink should have been prepared when insufficient ingredients'
    );
  });

  it('All beverage expect the ones that require the unavailable ingredient should be prepared', async () => {
    const fileName = 'test_unavailable_ingredient';
    let output = expectedOutput.unavailable_ingredient;

    let result = await processDrinksAsync(fileName);
    assert.sameMembers(
      result,
      output,
      'Only drinks that include unavailable ingredient should not have prepared'
    );
  });

  it('Stress test', async () => {
    const fileName = 'test_stress_input';
    let output = expectedOutput.stressTest;

    let result = await processDrinksAsync(fileName);
    assert.sameMembers(
      result,
      output,
      'Stress test did not give expected result'
    );
  });
});
