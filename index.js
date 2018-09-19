const repl = require('repl');
const Arreglo = require('./src/arreglos_desordenado');
const ArregloOrdenado = require('./src/arreglo_ordenado');
const Matrix = require('./src/arreglo_bidimensional');
const Cosecha = require('./src/cosecha');

const replServer = repl.start({
  prompt: '$ ',
});

replServer.context.Matrix = Matrix;
replServer.context.Arreglo = Arreglo;
replServer.context.ArregloOrdenado = ArregloOrdenado;
replServer.context.Cosecha = Cosecha;