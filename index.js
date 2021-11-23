const async = require('async');
const coffeeMachineService = require('./service/coffeeMachine');
const coffeeMachineRepo = require('./repository/coffeeMachine');

function processDrinks(filePath, callback) {
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
      if (err) callback(err);
      else callback(null, resultArray);
    }
  );
}

processDrinks('', function (err, result) {
  if (err) console.error(err);
  else console.log(result);
});

function processDrinksAsync(filePath = '') {
  return new Promise(function (resolve, reject) {
    processDrinks(filePath, function (err, result) {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

module.exports = {
  processDrinksAsync,
};
