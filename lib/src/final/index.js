const inquirer = require('inquirer');
const Table = require('cli-table');

class RecipeBook {
  constructor() {
    this.recipes = [];
    this.names = [];
    this.start();
  }

  async start() {
    let response;
    do {
      const { menu } = await inquirer.prompt({
        type: 'list',
        name: 'menu',
        message: 'Elije una opción:',
        choices: [
          { name: 'Ver recetas', value: 'showAll' },
          { name: 'Ver receta', value: 'getRecipe' },
          { name: 'Agregar receta', value: 'addRecipe' },
          { name: 'Añadir ingrediente', value: 'addIngredient' },
          { name: 'Eliminar ingrediente', value: 'deleteIngredient' },
          { name: 'Eliminar receta', value: 'deleteRecipe' },
          { name: 'Salir', value: true }
        ]
      });
      console.clear();
      response = menu;
      switch (menu) {
        case 'showAll': {
          if (this.names.length === 0) {
            console.log('No hay recetas');
            break;
          }
          this.showAll();
          break;
        }
        case 'getRecipe': {
          if (this.names.length === 0) {
            console.log('No hay recetas');
            break;
          }
          await this.getRecipe();
          break;
        }
        case 'addRecipe': {
          await this.addRecipe();
          break;
        }
        case 'addIngredient': {
          await this.addIngredient();
          break;
        }
        case 'deleteIngredient': {
          await this.deleteIngredient();
          break;
        }
        case 'deleteRecipe': {
          await this.deleteRecipe();
          break;
        }
      }
    } while (response !== true);
  }

  showAll() {
    const tableRecipes = this.recipes.map(({ name, ingredients }, i) => [
      i,
      name,
      ingredients.toString()
    ]);

    const table = new Table({
      head: ['ID', 'Nombre', 'Ingredientes'],
      colWidths: [5, 50, 50]
    });

    table.push(...tableRecipes);
    console.log(table.toString()); // eslint-disable-line
  }

  async getRecipe() {
    const { recipe } = await inquirer.prompt({
      type: 'list',
      name: 'recipe',
      message: 'Selecciona una receta',
      paginated: true,
      choices: this.names
    });

    const index = this.names.findIndex(name => name === recipe);

    if (!index && index !== 0) {
      console.log('Receta no encontrada');
      return;
    }

    const { name, ingredients } = this.recipes[index];
    const tableRecipe = [index, name, ingredients.toString()];

    const table = new Table({
      head: ['ID', 'Nombre', 'Ingredientes'],
      colWidths: [5, 50, 50]
    });

    table.push(tableRecipe);
    console.log(table.toString()); // eslint-disable-line
  }

  async addRecipe() {
    const { name } = await inquirer.prompt({
      type: 'input',
      name: 'name',
      message: 'Nombre de la receta:'
    });

    if (name === '') {
      return;
    }

    const ingredients = [];
    let exit = false;

    do {
      const { ingredient, code } = await inquirer.prompt([
        {
          type: 'input',
          name: 'ingredient',
          message: 'Ingrediente:'
        },
        {
          type: 'confirm',
          name: 'code',
          message: '¿Desea agregar más ingredientes?'
        }
      ]);

      if (ingredient === '') {
        break;
      }

      exit = code;
      ingredients.push(ingredient);
    } while (exit);
    const insertionIndex = search(this.names, name);

    this.recipes.splice(insertionIndex, 0, { name, ingredients });
    this.names.splice(insertionIndex, 0, name);
  }

  async addIngredient() {
    const choices = this.names.map(toChoices);
    const { id, ingredient } = await inquirer.prompt([
      {
        type: 'list',
        paginated: true,
        name: 'id',
        message: '¿A cuál receta quieres agregar ingredientes?',
        choices
      },
      {
        type: 'input',
        name: 'ingredient',
        message: 'Ingrediente a agregar:'
      }
    ]);

    const { name, ingredients } = this.recipes[id];
    const newIngredients = [...ingredients, ingredient];

    this.recipes[id] = { name, ingredients: newIngredients };
  }

  async deleteIngredient() {
    const recipeChoices = this.names.map(toChoices);
    const { id } = await inquirer.prompt({
      type: 'list',
      paginated: true,
      name: 'id',
      message: '¿A cuál receta quieres quitar ingredientes?',
      choices: recipeChoices
    });

    const recipe = this.recipes[id];
    const ingredientsChoices = recipe.ingredients.map(toChoices);
    const { ingredient } = await inquirer.prompt({
      type: 'list',
      paginated: true,
      name: 'ingredient',
      message: 'Ingrediente a eliminar',
      choices: ingredientsChoices
    });

    recipe.ingredients.splice(ingredient, 1);
    this.recipes[id] = recipe;
  }

  async deleteRecipe() {
    const recipeChoices = this.names.map(toChoices);
    const { id } = await inquirer.prompt({
      type: 'list',
      paginated: true,
      name: 'id',
      message: '¿A cuál receta quieres eliminar?',
      choices: recipeChoices
    });

    this.recipes.splice(id, 1);
    this.names.splice(id, 1);
  }
}

function search(source, value) {
  value = value.toLowerCase();

  if (source.length === 0) {
    return 0;
  }

  const { length } = source;
  let index = 0;

  while (index < length && source[index].toLowerCase() < value) {
    index += 1;
  }

  return index;
}

function toChoices(name, index) {
  return {
    name,
    value: index
  };
}

new RecipeBook();
