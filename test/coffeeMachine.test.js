const { assert } = require('chai');
const chai = require('chai');
const expect = chai.expect;
const coffeeMachineRepo = require('../repository/coffeeMachine');

describe('Check if All Ingredients are available', () => {
  const availableIngredients = {
    hot_water: 10,
    sugar_syrup: 10,
  };

  it('throws an error if all ingredients are not avaialble', () => {
    expect(() => {
      coffeeMachineRepo.checkIfAllIngredientsArePresent(availableIngredients, [
        'hot_water',
        'green_mixture',
      ]);
    }).to.throw('green_mixture is Not Avaialble');
  });

  it('Does not throw error if all ingredients are avaialble', () => {
    expect(() => {
      coffeeMachineRepo.checkIfAllIngredientsArePresent(availableIngredients, [
        'hot_water',
        'sugar_syrup',
      ]);
    }).to.not.throw();
  });
});

describe('Check if All Ingredients are sufficient', () => {
  const availableIngredients = {
    hot_water: 10,
    sugar_syrup: 10,
  };

  it('throws an error if all ingredients are not avaialble', () => {
    expect(() => {
      coffeeMachineRepo.isIngredientSufficient(
        availableIngredients,
        'hot_water',
        20
      );
    }).to.throw('hot_water is Not Avaialble in sufficient quantity');
  });

  it('Does not throw error if all ingredients are sufficient', () => {
    expect(() => {
      coffeeMachineRepo.isIngredientSufficient(
        availableIngredients,
        'hot_water',
        10
      );
    }).to.not.throw();
  });
});

describe('Correct Amount is being deducted from a avaialble ingredients', () => {
  const availableIngredients = {
    hot_water: 10,
    sugar_syrup: 10,
  };

  it('throws an error if all ingredients are not avaialble', () => {
    coffeeMachineRepo.deductAvaialbleIngredients(
      availableIngredients,
      'hot_water',
      5
    );

    assert.strictEqual(
      availableIngredients.hot_water,
      5,
      'hot_water was not reduced as expected'
    );
    assert.strictEqual(
      availableIngredients.sugar_syrup,
      10,
      'sugar_syrup was reduced unexpectedly'
    );
  });
});
