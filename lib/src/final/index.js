const inquirer = require('inquirer');
const Table = require('cli-table');

class RecipeBook {
  constructor() {
    this.recipes = [];
    this.names = [];

    this.showAll();
  }

  showAll() {
    const tableRecipes = this.recipes.map(({ name, ingredients }, i) => [
      i,
      name,
      ingredients.map(ingredient => ingredient + '\n').toString()
    ]);

    const table = new Table({
      head: ['ID', 'Nombre', 'Ingredientes'],
      colWidths: [5, 50, 50]
    });

    table.push(...tableRecipes);
    console.log(table.toString()); // eslint-disable-line
  }

  getRecipe(searchName) {
    const index = this.names.findIndex(name => name === searchName);

    if (!index) {
      throw new Error('Recipe not found');
    }
    const { name, ingredients } = this.recipes[index];
    const tableRecipe = [
      index,
      name,
      ingredients.map(ingredient => ingredient + '\n').toString()
    ];

    const table = new Table({
      head: ['ID', 'Nombre', 'Ingredientes'],
      colWidths: [5, 50, 50]
    });

    table.push(tableRecipe);
    console.log(table.toString()); // eslint-disable-line
  }

  addRecipe({ name, ingredients }) {
    if (!(ingredients instanceof Array)) {
      throw new Error('Ingredientes must be an array');
    }

    const isValidArray = ingredients.every(
      ingredient => typeof ingredient === 'string'
    );

    if (!isValidArray) {
      throw new Error('All values in Ingredients must be an string');
    }

    const insertionIndex = search(this.names, name);

    this.recipes.splice(insertionIndex, 0, { name, ingredients });
    this.getRecipe(name);
  }

  addIngredient(id, ingredient) {
    if (typeof id !== 'number') {
      throw new Error('ID must be a number');
    }

    const { name, ingredients } = this.recipes[id];
    const newIngredients = [...ingredients, ingredient];

    this.recipes[id] = { name, ingredients: newIngredients };
    this.getRecipe(name);
  }
}

function search(source, value) {
  const { length } = source;
  let index = 0;

  while (index <= length && source[index] < value) {
    index += 1;
  }

  return index;
}

module.exports = RecipeBook;
