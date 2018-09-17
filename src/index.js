const repl = require('repl');
const Matrix = require('./arreglo_bidimensional');

const replServer = repl.start({
  prompt: '$ ',
});

replServer.context.Matrix = Matrix;
