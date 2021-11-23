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
      'Expected output was not recived from processDrinks'
    );
  });
});
