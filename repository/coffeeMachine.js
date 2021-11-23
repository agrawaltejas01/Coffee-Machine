let Beverage = require('../models/beverage').Beverage;

exports.getMachineOutlet = function (data) {
  let machineOutlet =
    (data &&
      data.machine &&
      data.machine.outlets &&
      data.machine.outlets.count_n) ||
    null;

  if (machineOutlet === null)
    throw new Error('Outlet Count not in expected JSON structure');
  return machineOutlet;
};

exports.getAvailableIngredients = function (data) {
  let availableIngredients =
    (data && data.machine && data.machine.total_items_quantity) || null;

  if (availableIngredients === null)
    throw new Error('Avaialble Ingredients not in expected JSON structure');
  return availableIngredients;
};

exports.getRequiredBeverage = function (data) {
  let toReturn = [];
  let machineBeverageJson =
    (data && data.machine && data.machine.beverages) || null;

  if (machineBeverageJson === null)
    throw new Error('Beverages not in expected JSON structure');

  let requiredBeverages = Object.keys(machineBeverageJson);
  if (!requiredBeverages.length) throw new Error('No beverages required');

  requiredBeverages.forEach((beverage) => {
    let ingredients = data.machine.beverages[beverage];
    let beverageObject = new Beverage(beverage, ingredients);
    toReturn.push(beverageObject);
  });

  return toReturn;
};

exports.checkIfAllIngredientsArePresent = function (
  availableIngredients,
  requiredIngredients
) {
  // console.log('------ Inside repo -------');
  // console.log(availableIngredients);
  // console.log(requiredIngredients);

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
