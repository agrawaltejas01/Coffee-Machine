const async = require('async');
const yargs = require('yargs');

const coffeeMachineService = require('./service/coffeeMachine');
const coffeeMachineRepo = require('./repository/coffeeMachine');

function processDrinks(fileName, callback) {
  fileName = fileName || 'sample_input';
  let filePath = `./input/${fileName}`;
  const data = require(filePath);
  const resultArray = [];

  // Init
  let machineOutlet = coffeeMachineRepo.getMachineOutlet(data);
  let requriedBeverages = coffeeMachineRepo.getRequiredBeverage(data);
  let availableIngredients = coffeeMachineRepo.getAvailableIngredients(data);

  // Serve 'N' the beverages parallely
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

let inputFileName = yargs.argv.input || '';
processDrinks(inputFileName, function (err, result) {
  if (err) console.error(err);
  else console.log(result);
});

// Exported for Tests
function processDrinksAsync(inputFileName = 'sample_input') {
  return new Promise(function (resolve, reject) {
    processDrinks(inputFileName, function (err, result) {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

module.exports = {
  processDrinksAsync,
};

process.on('uncaughtException', (err) => {
  console.error(err);
});
