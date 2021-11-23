const Mutex = require('async-mutex').Mutex;
const mutex = new Mutex();

const coffeeMachineRepo = require('../repository/coffeeMachine');

async function buildBeverage(availableIngredients, requiredIngredients) {
  let ingredients = Object.keys(requiredIngredients);
  let canBeServed = false;

  let releaseLock = await mutex.acquire();
  // Critical Section
  try {
    coffeeMachineRepo.checkIfAllIngredientsArePresent(
      availableIngredients,
      ingredients
    );
    ingredients.forEach((ingredient) => {
      let quantity = requiredIngredients[ingredient];
      coffeeMachineRepo.isIngredientSufficient(
        availableIngredients,
        ingredient,
        quantity
      );
      coffeeMachineRepo.deductAvaialbleIngredients(
        availableIngredients,
        ingredient,
        quantity
      );
    });
    canBeServed = true;
    // Critical Section Over
    releaseLock();
  } catch (error) {
    releaseLock();
    throw error;
  }

  return canBeServed;
}

function serveBeverage(
  { availableIngredients, resultArray },
  beverageObject,
  callback
) {
  let name = beverageObject.name;
  let requiredIngredients = beverageObject.ingredients;
  let result = '';

  buildBeverage(availableIngredients, requiredIngredients)
    .then((isServable) => {
      if (isServable) {
        result = `${name} is prepared`;
        resultArray.push(result);
        callback(null);
      } else callback('Unexpected error in buildBeverage');
    })
    .catch((error) => {
      result = `${name} cannot be prepared  -> ${error.message}`;
      resultArray.push(result);
      callback(null);
    });
}

module.exports = {
  serveBeverage,
};
