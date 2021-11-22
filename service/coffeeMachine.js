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
      canBeServed = true;
    });
    // Critical Section Over
    releaseLock();
  } catch (error) {
    releaseLock();
    throw error;
  }

  return canBeServed;
}

async function serveBeverage(availableIngredients, beverageObject) {
  let name = beverageObject.name;
  let requiredIngredients = beverageObject.ingredients;
  try {
    await buildBeverage(availableIngredients, requiredIngredients);
    console.log(`${name} is prepared`);
  } catch (error) {
    console.log(`${name} cannot be prepared  -> ${error.message}`);
  }
}

module.exports = {
  serveBeverage,
};
