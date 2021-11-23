let toReturn = {};
// for (let i = 65; i < 91; i++)
//   toReturn[String.fromCharCode(i)] = {
//     hot_water: 200,
//     hot_milk: 100,
//     ginger_syrup: 10,
//     sugar_syrup: 10,
//     tea_leaves_syrup: 30,
//   };
for (let i = 97; i < 97 + 26; i++)
  toReturn[String.fromCharCode(i)] = {
    hot_water: 100,
    ginger_syrup: 30,
    sugar_syrup: 50,
    green_mixture: 30,
  };
console.log(JSON.stringify(toReturn, null, 4));
