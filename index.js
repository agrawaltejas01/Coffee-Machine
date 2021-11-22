const input = require("./input/2");
let availableIngredients = require("./models/ingredients");
let Beverage = require("./models/beverage").Beverage;
const Bottleneck = require("bottleneck");

let machineOutlet = input.machine.outlets.count_n;
availableIngredients = input.machine.total_items_quantity;
console.log(availableIngredients);


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

function checkIfAllIngredientsArePresent(requiredIngredients) {
    requiredIngredients.forEach(ingredient => {
        if(availableIngredients[ingredient] === undefined)
            throw new Error(`${ingredient} is Not Avaialble`);
    })
    
}

function isIngredientSufficient(ingredient, quantity) {
    if(availableIngredients[ingredient] < quantity)
        throw new Error(`${ingredient} is Not Avaialble in sufficient quantity`);    
}

function deductAvaialbleIngredients(ingredient, quantity) {
    availableIngredients[ingredient] -= quantity;
}

function buildBeverage(requiredIngredients) {
        
    let ingredients = Object.keys(requiredIngredients);   
    let canBeServed = false; 
    checkIfAllIngredientsArePresent(ingredients);
    ingredients.forEach(ingredient => {
        let quantity = requiredIngredients[ingredient];                
        isIngredientSufficient(ingredient, quantity)
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



let requriedBeverages = getRequiredBeverage();

const limiter = new Bottleneck({ maxConcurrent: machineOutlet })
let tasks = requriedBeverages.map((beverage) => limiter.schedule(() => serveBeverage(beverage)));
Promise.all(tasks).then(() => console.log("DONE"));