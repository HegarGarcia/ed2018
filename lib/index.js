const repl = require('repl');
const Arreglo = require('./src/arrays/arreglos_desordenado');
const ArregloOrdenado = require('./src/arrays/arreglo_ordenado');
const { Matrix } = require('./src/matrix');
const Cosecha = require('./src/cosecha');
const Grades = require('./src/calificaciones');
const Costs = require('./src/production_costs');
const Stack = require('./src/stacks');
const math = require('./src/math');
const queue = require('./src/queue');
const recursiveness = require('./src/recursiveness');
const directory = require('./src/record/examples');
const record = require('./src/record');

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
replServer.context.Queue = queue;
replServer.context.Recursive = recursiveness;
replServer.context.Directory = directory;
replServer.context.Record = record;
