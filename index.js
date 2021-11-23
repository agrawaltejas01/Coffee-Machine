const Bottleneck = require('bottleneck');
const async = require('async');
const coffeeMachineService = require('./service/coffeeMachine');
const coffeeMachineRepo = require('./repository/coffeeMachine');

async function processDrinks(filePath) {
  filePath = filePath || './input/1.json';
  const data = require(filePath);

  let machineOutlet = coffeeMachineRepo.getMachineOutlet(data);
  let requriedBeverages = coffeeMachineRepo.getRequiredBeverage(data);
  let availableIngredients = coffeeMachineRepo.getAvailableIngredients(data);

  const limiter = new Bottleneck({ maxConcurrent: machineOutlet });
  let tasks = requriedBeverages.map((beverage) => {
    limiter.schedule(() =>
      coffeeMachineService.serveBeverage(availableIngredients, beverage)
    );
  });

  const result = await Promise.all(tasks);
  console.log(result);
}

function processDrinksAsync(filePath) {
  filePath = filePath || './input/1.json';
  const data = require(filePath);
  const resultArray = [];

  let machineOutlet = coffeeMachineRepo.getMachineOutlet(data);
  let requriedBeverages = coffeeMachineRepo.getRequiredBeverage(data);
  let availableIngredients = coffeeMachineRepo.getAvailableIngredients(data);
  async.eachLimit(
    requriedBeverages,
    machineOutlet,
    coffeeMachineService.serveBeverage.bind(null, {
      availableIngredients,
      resultArray,
    }),
    function (err) {
      if (err) console.log(err);
      else console.log(resultArray);
    }
  );
}

processDrinksAsync();

// processDrinks()
//   //   .then(console.log())
//   .then(() => console.log('Done'))
//   .catch((err) => console.log(err));

module.exports = {
  processDrinks,
};
