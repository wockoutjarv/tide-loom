const Loom = (() => {
  const pedals = [[0,1,3],[1,2,4],[0,2,5]];
  const start = () => [0,0,0,0,0,0];
  function pull(board, pedal) {
    return board.map((v,i) => (v + Number(pedals[pedal].includes(i))) % 3);
  }
  function target(level) {
    let board = start();
    let code = level % 26 + 1;
    for (let pedal=0; pedal<3; pedal++) {
      for (let i=0; i<code%3; i++) board = pull(board,pedal);
      code = Math.floor(code/3);
    }
    return board;
  }
  return {start, pull, target};
})();
if (typeof module !== 'undefined') module.exports = Loom;
