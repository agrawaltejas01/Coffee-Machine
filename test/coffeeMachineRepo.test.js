const { assert, expect } = require('chai');
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

describe('Correct Machine Outlets are being read', () => {
  it('Reads outlet number correctly', () => {
    let outletCount = coffeeMachineRepo.getMachineOutlet({
      machine: {
        outlets: {
          count_n: 2,
        },
      },
    });
    assert.strictEqual(outletCount, 2, 'Outlet count not being read correctly');
  });

  it('Throws an error if json structure is not as expected', () => {
    expect(() => {
      coffeeMachineRepo.getMachineOutlet({
        count_n: 1,
      });
    }).to.throw('Outlet Count not in expected JSON structure');
  });
});

describe('Available Ingredients are being read correctly', () => {
  let availableIngredients = {
    hot_water: 1000,
    hot_milk: 500,
  };
  it('Reads avaialble ingredients correctly', () => {
    let readData = coffeeMachineRepo.getAvailableIngredients({
      machine: {
        total_items_quantity: availableIngredients,
      },
    });
    assert.strictEqual(
      readData,
      availableIngredients,
      'Avaiable ingredients not being read correctly'
    );
  });

  it('Throws an error if json structure is not as expected', () => {
    expect(() => {
      coffeeMachineRepo.getAvailableIngredients({
        total_items_quantity: availableIngredients,
      });
    }).to.throw('Avaialble Ingredients not in expected JSON structure');
  });
});

describe('Required Beverages are being read correctly', () => {
  let tea = {
    hot_water: 200,
    hot_milk: 100,
    ginger_syrup: 10,
    sugar_syrup: 10,
    tea_leaves_syrup: 30,
  };
  it('Reads required beverages correctly', () => {
    let readData = coffeeMachineRepo.getRequiredBeverage({
      machine: {
        beverages: { hot_tea: tea },
      },
    });
    assert.strictEqual(
      readData[0].name,
      'hot_tea',
      'Beverage name not read correctly'
    );
    assert.strictEqual(
      readData[0].ingredients,
      tea,
      'Beverage ingredients not read correctly'
    );
  });

  it('Throws an error if json structure is not as expected', () => {
    expect(() => {
      coffeeMachineRepo.getRequiredBeverage({
        beverages: { hot_tea: tea },
      });
    }).to.throw('Beverages not in expected JSON structure');
  });

  it('Throws an error if no beverages are required', () => {
    expect(() =>
      coffeeMachineRepo.getRequiredBeverage({
        machine: {
          beverages: {},
        },
      })
    ).to.throw('No beverages required');
  });
});
