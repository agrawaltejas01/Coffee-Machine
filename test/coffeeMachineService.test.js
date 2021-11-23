const { assert, expect } = require('chai');

const processDrinksAsync = require('../index').processDrinksAsync;

describe('Process Drink Should work as expected', () => {
  it('All drinks should be prepared if ingredients are available sufficientely', async () => {
    const fileName = 'test_sufficient_ingredients';
    let expectedOutput = [
      'black_tea is prepared',
      'hot_tea is prepared',
      'hot_coffee is prepared',
      'black_coffee is prepared',
      'green_tea is prepared',
    ];

    let result = await processDrinksAsync(fileName);

    assert.sameMembers(
      result,
      expectedOutput,
      'All drinks should have been prepared witohout any error'
    );
  });

  it('No drinks should be prepared if no ingredient is available in sufficient quantity', async () => {
    const fileName = 'test_insufficient_ingredients';
    let expectedOutput = [
      'hot_tea cannot be prepared  -> hot_water is Not Avaialble in sufficient quantity',
      'black_coffee cannot be prepared  -> hot_water is Not Avaialble in sufficient quantity',
      'hot_coffee cannot be prepared  -> hot_water is Not Avaialble in sufficient quantity',
      'black_tea cannot be prepared  -> hot_water is Not Avaialble in sufficient quantity',
      'green_tea cannot be prepared  -> hot_water is Not Avaialble in sufficient quantity',
    ];

    let result = await processDrinksAsync(fileName);
    assert.sameMembers(
      result,
      expectedOutput,
      'No Drink should have been prepared when insufficient ingredients'
    );
  });

  it('All beverage expect the ones that require the unavailable ingredient should be prepared', async () => {
    const fileName = 'test_unavailable_ingredient';
    let expectedOutput = [
      'hot_tea is prepared',
      'hot_coffee is prepared',
      'black_tea is prepared',
      'black_coffee is prepared',
      'green_tea cannot be prepared  -> green_mixture is Not Avaialble',
    ];

    let result = await processDrinksAsync(fileName);
    console.log(result);
    assert.sameMembers(
      result,
      expectedOutput,
      'No Drink should have been prepared when insufficient ingredients'
    );
  });
});
