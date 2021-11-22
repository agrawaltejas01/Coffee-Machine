const input = require('../input/2');
let Beverage = require('../models/beverage').Beverage;

exports.getMachineOutlet = function () {
  let machineOutlet = input.machine.outlets.count_n;
  return machineOutlet;
};

exports.getAvailableIngredients = function () {
  let availableIngredients = input.machine.total_items_quantity;
  return availableIngredients;
};

exports.getRequiredBeverage = function () {
  let toReturn = [];
  let requriedBeverages = Object.keys(input.machine.beverages);
  requriedBeverages.forEach((beverage) => {
    let ingredients = input.machine.beverages[beverage];
    let beverageObject = new Beverage(beverage, ingredients);
    toReturn.push(beverageObject);
  });

  return toReturn;
};

exports.checkIfAllIngredientsArePresent = function (
  availableIngredients,
  requiredIngredients
) {
  requiredIngredients.forEach((ingredient) => {
    if (availableIngredients[ingredient] === undefined)
      throw new Error(`${ingredient} is Not Avaialble`);
  });
};

exports.isIngredientSufficient = function (
  availableIngredients,
  ingredient,
  quantity
) {
  if (availableIngredients[ingredient] < quantity)
    throw new Error(`${ingredient} is Not Avaialble in sufficient quantity`);
};

exports.deductAvaialbleIngredients = function (
  availableIngredients,
  ingredient,
  quantity
) {
  availableIngredients[ingredient] -= quantity;
};
