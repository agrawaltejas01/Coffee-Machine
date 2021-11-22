const Bottleneck = require('bottleneck');

const coffeeMachineService = require('./service/coffeeMachine');
const coffeeMachineRepo = require('./repository/coffeeMachine');

let machineOutlet = coffeeMachineRepo.getMachineOutlet();
let requriedBeverages = coffeeMachineRepo.getRequiredBeverage();
let availableIngredients = coffeeMachineRepo.getAvailableIngredients();

const limiter = new Bottleneck({ maxConcurrent: machineOutlet });
let tasks = requriedBeverages.map(async (beverage) => {
  limiter.schedule(() =>
    coffeeMachineService.serveBeverage(availableIngredients, beverage)
  );
});
Promise.all(tasks).then(() => console.log('DONE'));
