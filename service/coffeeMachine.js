const Mutex = require('async-mutex').Mutex;
const mutex = new Mutex();

const coffeeMachineRepo = require('../repository/coffeeMachine');

// function areIngredientsAreAvaialble(requiredIngredients) {
//     let ingredients = Object.keys(requiredIngredients);
//     checkIfAllIngredientsArePresent(ingredients);

// }

async function buildBeverage(requiredIngredients) {
  let ingredients = Object.keys(requiredIngredients);
  let canBeServed = false;

  let releaseLock = await mutex.acquire();
  // Critical Section
  try {
    coffeeMachineRepo.checkIfAllIngredientsArePresent(ingredients);
    ingredients.forEach((ingredient) => {
      let quantity = requiredIngredients[ingredient];
      coffeeMachineRepo.isIngredientSufficient(ingredient, quantity);
      coffeeMachineRepo.deductAvaialbleIngredients(ingredient, quantity);
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

async function serveBeverage(beverageObject) {
  let name = beverageObject.name;
  let requiredIngredients = beverageObject.ingredients;
  try {
    await buildBeverage(requiredIngredients);
    console.log(`${name} is prepared`);
  } catch (error) {
    console.log(`${name} cannot be prepared  -> ${error.message}`);
  }
}

module.exports = {
  serveBeverage,
};
