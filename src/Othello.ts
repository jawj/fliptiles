import m from 'mithril';

interface Position {
  rightwards: number;
  downwards: number;
}
interface Movement extends Position { }

const
  x = 2,  // signifies blank square
  size = 8,
  directions: Position[] = [
    { rightwards: 1, downwards: 0 }, // left -> right
    { rightwards: 1, downwards: 1 }, // top-left -> bottom-right
    { rightwards: 0, downwards: 1 }, // top -> bottom
    { rightwards: -1, downwards: 1 }, // top-right -> bottom-left
    { rightwards: -1, downwards: 0 }, // right -> left
    { rightwards: -1, downwards: -1 }, // bottom-right -> top-left
    { rightwards: 0, downwards: -1 }, // bottom -> top 
    { rightwards: 1, downwards: -1 }, // bottom-left -> top-right
  ];

export function Othello() {
  let
    players = [
      { name: 'Lena', colour: 'black' },
      { name: 'George', colour: 'white' },
    ],
    turnForPlayer: 0 | 1,
    board: (0 | 1 | typeof x)[];

  function reset() {
    console.log(board);
    turnForPlayer = 0;
    board = [
      x, x, x, x, x, x, x, x,
      x, x, x, x, x, x, x, x,
      x, x, x, x, x, x, x, x,
      x, x, x, 1, 0, x, x, x,
      x, x, x, 0, 1, x, x, x,
      x, x, x, x, x, x, x, x,
      x, x, x, x, x, x, x, x,
      x, x, x, x, x, x, x, x,
    ];
  }

  function positionFromPieceIndex(pieceIndex: number): Position | undefined {
    if (pieceIndex < 0 || pieceIndex >= size * size) return;
    return { downwards: Math.floor(pieceIndex / size), rightwards: pieceIndex % size };
  }
  function pieceIndexFromPosition(position: Position): number | undefined {
    if (position.downwards < 0 || position.downwards >> size || position.rightwards < 0 || position.rightwards >= size) return;
    return position.downwards * size + position.rightwards;
  }

  function addPosition(p1: Position, p2: Position) {
    p1.rightwards += p2.rightwards;
    p1.downwards += p2.downwards;
  }

  function flippableOpponentPiecesByDirection(position: Position, player: 0 | 1) {
    const opponent = 1 - player;

    return directions.map(direction => {
      let opponentPieces = 0;
      const currentPosition = { ...position };

      while (true) {
        addPosition(currentPosition, direction);
        const currentIndex = pieceIndexFromPosition(currentPosition)!;
        if (board[currentIndex] === opponent) opponentPieces += 1;
        else if (board[currentIndex] === player) return opponentPieces;
        else return 0;
      }
    });
  }

  function flipPiecesByDirections(position: Position, pieceCounts: number[]) {
    for (let i = 0; i < directions.length; i++) {
      const
        direction = directions[i],
        currentPosition = { ...position };

      for (let j = 0; j < pieceCounts[i]; j++) {
        addPosition(currentPosition, direction);
        const pieceIndex = pieceIndexFromPosition(currentPosition)!;
        board[pieceIndex] = 1 - board[pieceIndex] as 0 | 1;
      }
    }
  }

  function playAtPieceIndex(pieceIndex: number) {
    const currentPiece = board[pieceIndex];

    if (currentPiece !== x) {
      alert(`Sorry, you can't go there: there's a piece there already`);
      return;
    }

    const
      position = positionFromPieceIndex(pieceIndex)!,
      flippablesByDirection = flippableOpponentPiecesByDirection(position, turnForPlayer),
      flippablesCount = flippablesByDirection.reduce((memo, n) => memo + n);

    if (flippablesCount === 0) {
      alert(`Sorry, you can't go there: you must flip at least one of your opponent's pieces every turn`);
      return;
    }

    board[pieceIndex] = turnForPlayer;
    flipPiecesByDirections(position, flippablesByDirection);

    turnForPlayer = 1 - turnForPlayer as 0 | 1;
  }

  return {
    oninit: reset,
    view: (vnode: m.Vnode) => m('.game',
      players.map((player, playerIndex) => m('.player',
        {
          style: {
            padding: '5px',
            borderRadius: '10px',
            background: playerIndex === turnForPlayer ? 'yellow' : 'transparent',
            width: '350px',
          }
        },
        m('.piece', {
          style: {
            display: 'inline-block',
            width: '16px',
            height: '16px',
            borderRadius: '16px',
            border: '1px solid #251',
            margin: '1px 10px 5px',
            position: 'relative',
            top: '6px',
            background: players[playerIndex].colour,
          }
        }),
        player.name
      )),
      m('.board',
        {
          style: {
            background: '#372',
            width: '736px',
            height: '736px',
            borderRadius: '40px',
            margin: '10px 0',
          }
        },
        board.map((playerIndex, pieceIndex) =>
          m('.piece', {
            style: {
              float: 'left',
              lineHeight: '0px',
              margin: '5px',
              width: '80px',
              height: '80px',
              borderRadius: '80px',
              border: '1px solid #251',
              background: playerIndex !== x ? players[playerIndex].colour : 'transparent',
            },
            onclick: () => playAtPieceIndex(pieceIndex)
          })
        ))
    )
  };
}
