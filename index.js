const repl = require('repl');
const Arreglo = require('./src/arrays/arreglos_desordenado');
const ArregloOrdenado = require('./src/arrays/arreglo_ordenado');
const { Matrix } = require('./src/matrix');
const Cosecha = require('./src/cosecha');
const Grades = require('./src/calificaciones');
const Costs = require('./src/production_costs');
const Stack = require('./src/stacks');
const { toPostfix } = require('./src/math');

const replServer = repl.start({
  prompt: '$ '
});

replServer.context.Matrix = Matrix;
replServer.context.Arreglo = Arreglo;
replServer.context.ArregloOrdenado = ArregloOrdenado;
replServer.context.Cosecha = Cosecha;
replServer.context.Grades = Grades;
replServer.context.Costs = Costs;
replServer.context.Stack = Stack;
replServer.context.toPostfix = toPostfix;
