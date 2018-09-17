const repl = require('repl');
const Arreglo = require('./arreglos_desordenado');
const ArregloOrdenado = require('./arreglo_ordenado');
const Matrix = require('./arreglo_bidimensional');

const replServer = repl.start({
  prompt: '$ ',
});

replServer.context.Matrix = Matrix;
replServer.context.Arreglo = Arreglo;
replServer.context.ArregloOrdenado = ArregloOrdenado;
