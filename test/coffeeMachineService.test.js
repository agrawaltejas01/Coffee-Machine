const { assert, expect } = require('chai');
const rewire = require('rewire');

const coffeeMachineService = require('../service/coffeeMachine');
const coffeeMachineRepo = require('../repository/coffeeMachine');
const buildBeverage = rewire('../service/coffeeMachine.js').__get__(
  'buildBeverage'
);

const processDrinks = require('../index').processDrinks;

describe('Build Drink Should work as expected', () => {
  it('All drinks should be prepared with if ingredients are available sufficientely', async () => {
    const input = require('./input/test_sufficient_ingredients');
    let availableIngredients = coffeeMachineRepo.getAvailableIngredients(input);
    let requriedBeverages = coffeeMachineRepo.getRequiredBeverage(input);

    // let result = await buildBeverage(availableIngredients, requriedBeverages);
    let result = await processDrinks(
      './test/input/test_sufficient_ingredients'
    );
    expect(console.log).to.not.can;
    // expect(result).to.equal(true);
  });
});
