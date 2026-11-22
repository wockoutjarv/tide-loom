const Loom = (() => {
  const pedals = [[0,1,3],[1,2,4],[0,2,5]];
  const start = () => [0,0,0,0,0,0];
  function pull(board, pedal) {
    return board.map((v,i) => (v + Number(pedals[pedal].includes(i))) % 3);
  }
  // Ternary digits are the A, B and C pull counts. Groups increase by total pulls.
  const codes = [
    1, 3, 9,
    2, 4, 6, 10, 12, 18,
    5, 7, 11, 13, 15, 19, 21,
    8, 14, 16, 20, 22, 24,
    17, 23, 25,
    26
  ];
  const connections = () => pedals;
  function target(level) {
    let board = start();
    let code = codes[level % 26];
    for (let pedal=0; pedal<3; pedal++) {
      for (let i=0; i<code%3; i++) board = pull(board,pedal);
      code = Math.floor(code/3);
    }
    return board;
  }
  return {start, pull, target, connections};
})();
if (typeof module !== 'undefined') module.exports = Loom;
