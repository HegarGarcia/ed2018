const Table = require('cli-table');
const Stack = require('../stacks');
const speed = 500;

function hanoi(diskAmount = 1) {
  if (diskAmount > 7) {
    throw new Error('Tamaño máximo es 7');
  }

  const disks = createDisks(diskAmount);
  const callStack = new Stack({ unlimited: true });
  hanoiAlgorithm(diskAmount, 0, 2, 1, callStack);
  setTimeout(
    () => animateHanoi(disks, diskAmount, callStack.stack.reverse()),
    speed
  );
}

function hanoiAlgorithm(diskAmount, from, to, via, callStack) {
  if (diskAmount === 0) {
    return;
  }

  hanoiAlgorithm(diskAmount - 1, from, via, to, callStack);
  callStack.push([from, to]);
  hanoiAlgorithm(diskAmount - 1, via, to, from, callStack);
}

function createDisks(diskAmount) {
  const fromTower = [];
  diskAmount *= 2;

  for (let diskLength = diskAmount; diskLength > 0; diskLength -= 1) {
    const paddingStart = (18 - diskLength) / 2 + diskLength;

    fromTower[diskAmount - diskLength] = '*'
      .repeat(diskLength)
      .padStart(paddingStart)
      .padEnd(18);
  }

  return [fromTower.filter((_, i) => i % 2 === 0), [], []];
}

function animateHanoi(disks, diskAmount, callStack) {
  console.clear(); // eslint-disable-line
  const table = new Table({
    colWidths: [20, 20, 20]
  });
  const printingDisks = transpose(disks, diskAmount);
  table.push(...printingDisks);
  console.log(table.toString()); // eslint-disable-line

  if (callStack.length === 0) {
    console.log('Finished!'); // eslint-disable-line
    return;
  }

  const [from, to] = callStack.pop();
  const movingDisk = disks[from].pop();
  disks[to].push(movingDisk);

  setTimeout(() => animateHanoi(disks, diskAmount, callStack), speed);
}

function transpose(matrix, maxCol) {
  const lengths = matrix.map(tower => tower.length);
  const highestLength = Math.max(...lengths);
  const highestTower = lengths.findIndex(length => length === highestLength);
  const tempMatrix = matrix[highestTower].map((_, i) =>
    matrix.map(row => row[i] || '')
  );

  while (tempMatrix.length !== maxCol) {
    tempMatrix.push(['', '', '']);
  }

  return tempMatrix.reverse();
}

module.exports = hanoi;
