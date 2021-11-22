const input = require("./input/1");
let availableIngredients = require("./models/ingredients");
let Beverage = require("./models/beverage").Beverage;

let machineOutlet = input.machine.outlets.count_n;
availableIngredients = input.machine.total_items_quantity;
let beverages = [];
console.log(availableIngredients);

let tasks = [];

// function getAvailableIngredients() {
//     let availableRightNow = [];
//     let ingredients = Object.keys(availableIngredients);
//     ingredients.forEach(ingredient => {
//         if(availableIngredients[ingredient])
//         availableRightNow.push(ingredient);        
//     });

//     return availableRightNow;

// }

function isIngredientAvailable(ingredient, quantity) {
    if(availableIngredients[ingredient] === undefined)
        throw new Error(`${ingredient} is Not Avaialble`);
        // throw some error
        // return false;
    if(availableIngredients[ingredient] < quantity)
        throw new Error(`${ingredient} is Not Avaialble in sufficient quantity`);
        // throw some error
        // return false;
    return true;
}

function deductAvaialbleIngredients(ingredient, quantity) {
    availableIngredients[ingredient] -= quantity;
}

function buildBeverage(requiredIngredients) {
        
    let ingredients = Object.keys(requiredIngredients);   
    let canBeServed = false; 
    ingredients.forEach(ingredient => {
        let quantity = requiredIngredients[ingredient];        
        if(! isIngredientAvailable(ingredient, quantity)){
            console.log(`${ingredient} Not Available`);
            return;
        }
        // console.log(`${ingredient} -> ${quantity} Available`);
        deductAvaialbleIngredients(ingredient, quantity);
        canBeServed = true;
    });

    return canBeServed;
}

function serveBeverage(beverageObject) {
    let name = beverageObject.name;
    let requiredIngredients = beverageObject.ingredients;

    try {
        buildBeverage(requiredIngredients);
        console.log(`${name} is prepared`);
    } catch (error) {
        console.log(`${name} cannot be prepared  -> ${error.message}`)
    }

}

function getRequiredBeverage() {
    let toReturn = [];
    let requriedBeverages = Object.keys(input.machine.beverages);
    requriedBeverages.forEach(beverage => {
        let ingredients = input.machine.beverages[beverage];
        let beverageObject = new Beverage(beverage, ingredients);
        toReturn.push(beverageObject);
    });

    return toReturn;
}

let requriedBeverages = getRequiredBeverage();

requriedBeverages.forEach(beverage => {
    serveBeverage(beverage)
})


