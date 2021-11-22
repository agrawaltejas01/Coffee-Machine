const Bottleneck = require('bottleneck');
const data = require('./input/2');
const coffeeMachineService = require('./service/coffeeMachine');
const coffeeMachineRepo = require('./repository/coffeeMachine');

let machineOutlet = coffeeMachineRepo.getMachineOutlet(data);
let requriedBeverages = coffeeMachineRepo.getRequiredBeverage(data);
let availableIngredients = coffeeMachineRepo.getAvailableIngredients(data);

const limiter = new Bottleneck({ maxConcurrent: machineOutlet });
let tasks = requriedBeverages.map(async (beverage) => {
  limiter.schedule(() =>
    coffeeMachineService.serveBeverage(availableIngredients, beverage)
  );
});
Promise.all(tasks).then(() => console.log('DONE'));
