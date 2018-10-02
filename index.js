const repl = require('repl');
const Arreglo = require('./lib/arrays/arreglos_desordenado');
const ArregloOrdenado = require('./lib/arrays/arreglo_ordenado');
const { Matrix } = require('./lib/matrix');
const Cosecha = require('./lib/cosecha');
const Grades = require('./lib/calificaciones');
const Costs = require('./lib/production_costs');
const Stack = require('./lib/stacks');
const math = require('./lib/math');

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
replServer.context.math = math;
