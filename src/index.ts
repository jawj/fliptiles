
import m from 'mithril';


interface OthelloAttrs {
  boardStr: string;
  turnStr: string;
}

interface Position {  // can also represent a vector movement
  rightwards: number;
  downwards: number;
}

type Board = (0 | 1 | typeof x)[];


function stringFromBoard(board: Board) {
  return board.join('').match(/.{2}/g)!.map(x => parseInt(x, 3)).join('');
}

function boardFromString(s: string) {
  // the `+ 9` adds a 1 at the front of the number; we slice this off to guarantee 2 digits
  return s.split('').flatMap(x => Number(x + 9).toString(3).slice(-2).split('').map(Number)) as Board;
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

function flippableOpponentPiecesByDirection(board: Board, position: Position, player: 0 | 1) {
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

function flipPiecesByDirections(board: Board, position: Position, pieceCounts: number[]) {
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

function playAtPieceIndex(board: Board, pieceIndex: number, player: 0 | 1) {
  const currentPiece = board[pieceIndex];

  if (currentPiece !== x) {
    alert(`Sorry, you can't go there: there's a piece there already`);
    return;
  }

  const
    position = positionFromPieceIndex(pieceIndex)!,
    flippablesByDirection = flippableOpponentPiecesByDirection(board, position, player),
    flippablesCount = flippablesByDirection.reduce((memo, n) => memo + n);

  if (flippablesCount === 0) {
    alert(`Sorry, you can't go there: you must flip at least one of your opponent's pieces every turn`);
    return;
  }

  const newBoard = [...board];
  newBoard[pieceIndex] = player;
  flipPiecesByDirections(newBoard, position, flippablesByDirection);

  const newPlayer = 1 - player as 0 | 1;
  m.route.set('/othello/:boardStr/:turnStr', { boardStr: stringFromBoard(newBoard), turnStr: newPlayer });
}

const
  directions: Position[] = [
    { rightwards: 1, downwards: 0 }, // left -> right
    { rightwards: 1, downwards: 1 }, // top-left -> bottom-right
    { rightwards: 0, downwards: 1 }, // top -> bottom
    { rightwards: -1, downwards: 1 }, // top-right -> bottom-left
    { rightwards: -1, downwards: 0 }, // right -> left
    { rightwards: -1, downwards: -1 }, // bottom-right -> top-left
    { rightwards: 0, downwards: -1 }, // bottom -> top 
    { rightwards: 1, downwards: -1 }, // bottom-left -> top-right
  ],
  size = 8,
  x = 2,  // signifies blank square: **MUST BE 2** because we use base 3 to serialize
  initialBoard: Board = [
    x, x, x, x, x, x, x, x,
    x, x, x, x, x, x, x, x,
    x, x, x, x, x, x, x, x,
    x, x, x, 1, 0, x, x, x,
    x, x, x, 0, 1, x, x, x,
    x, x, x, x, x, x, x, x,
    x, x, x, x, x, x, x, x,
    x, x, x, x, x, x, x, x,
  ],
  initialBoardStr = stringFromBoard(initialBoard),
  players = [
    { name: 'Black', colour: 'black' },
    { name: 'White', colour: 'white' },
  ];

export function Othello() {
  return {
    view: (vnode: m.Vnode<OthelloAttrs>) => {
      const
        { boardStr, turnStr } = vnode.attrs,
        board = boardFromString(boardStr),
        turnForPlayer = Number(turnStr) as 0 | 1;

      return m('.game',
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
              padding: '10px',
            }
          },
          board.map((playerIndex, pieceIndex) => m('div',
            {
              style: {
                width: '80px',
                height: '80px',
                float: 'left',
                lineHeight: '0px',
                margin: '5px',
                borderRadius: '82px',
                border: '1px solid #251',
              },
              onclick: () => playAtPieceIndex(board, pieceIndex, turnForPlayer)
            },
            m('.piece', {
              style: {
                width: '80px',
                height: '80px',
                borderRadius: '80px',
                transition: 'transform .4s linear',
                transform: playerIndex === 0 ? 'rotateY(0deg)' : playerIndex === 1 ? 'rotateY(180deg)' : 'rotateY(-90deg)',
                background: playerIndex !== x ? players[playerIndex].colour : 'transparent',
              }
            })
          ))
        )
      )
    }
  };
}

m.route(document.body, `/othello/${initialBoardStr}/0`, {
  '/othello/:boardStr/:turnStr': Othello,
});
