# Coffee Machine

## Description

- A sample project to simulate the interface of a coffee machine
- The Coffee Machine can have <b>N<b> parallel outlets
- Machine can serve some specific beverages
- Each beverage needs certain ingredients in specific quantity
- Beverage cannot be served if any of the ingredient is not present or is insufficient

## Input

- Project takes a json file as an input for specifying
  - No of outlets (N)
  - Initial quantity of each ingredient
  - Beverages that can be served
  - Ingredients and quantity of respective ingredient for each beverage
- Please Refer [Sample Input](input/sample_input.json)

## Running the project

### Setup

- You need to install and setup node.js
- Go to the repo and run command

```bash
npm i
```

### Execute

- Project by default runs for the sample input
- If you want to specify a custom input file
  - Add the json file in <b>input</b> folder
  - Edit the <b>inputFileName<b> in [index.js](index.js#L29)
- Run the project by command

```bash
node index.js
```

### Running Tests

- Execute following command to run the test suites

```bash
npm test
```
