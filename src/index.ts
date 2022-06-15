
import m from 'mithril';


interface OthelloAttrs {
  boardStr: string;
  lastPieceStr: string;
  turnStr: string;
}

interface Position {  // can also represent a vector movement
  rightwards: number;
  downwards: number;
}

type Board = (0 | 1 | typeof x)[];


const
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
  codeChars = '234567bcdfghjkmnpqrstvwxyz-',
  initialBoardStr = stringFromBoard(initialBoard),
  routeTemplate = '/othello/:boardStr/:lastPieceStr/:turnStr',
  defaultRoute = `/othello/${initialBoardStr}/-/0`,
  players = [
    { name: 'Black', colour: 'black' },
    { name: 'White', colour: 'white' },
  ],
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


function stringFromBoard(board: Board) {
  return (board.join('') + '22').match(/.{1,3}/g)!.map(x => codeChars.charAt(parseInt(x, 3))).join('');
}

function boardFromString(s: string) {
  return s.split('').flatMap(x => (27 + codeChars.indexOf(x)).toString(3).slice(-3).split('').map(Number)).slice(0, 64) as Board;
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

  if (currentPiece !== x) return;

  const
    position = positionFromPieceIndex(pieceIndex)!,
    flippablesByDirection = flippableOpponentPiecesByDirection(board, position, player),
    flippablesCount = flippablesByDirection.reduce((memo, n) => memo + n);

  if (flippablesCount === 0) return pieceIndex;

  const newBoard = [...board];
  newBoard[pieceIndex] = player;
  flipPiecesByDirections(newBoard, position, flippablesByDirection);

  const newPlayer = 1 - player as 0 | 1;
  m.route.set(routeTemplate, { boardStr: stringFromBoard(newBoard), lastPieceStr: pieceIndex, turnStr: newPlayer });
}

export function Othello() {
  let errorIndex: number | undefined;

  return {
    view: (vnode: m.Vnode<OthelloAttrs>) => {
      const
        { boardStr, turnStr, lastPieceStr } = vnode.attrs,
        board = boardFromString(boardStr),
        turnForPlayer = Number(turnStr) as 0 | 1,
        lastPieceIndex = lastPieceStr === '-' ? undefined : Number(lastPieceStr),
        lastPiecePosition = positionFromPieceIndex(lastPieceIndex ?? -1),
        piecesPerPlayer = board.reduce((memo, piece) => { memo[piece] += 1; return memo; }, [0, 0, 0]);

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
              width: '16px', height: '16px',
              borderRadius: '16px',
              border: '1px solid #251',
              margin: '1px 10px 5px',
              position: 'relative',
              top: '6px',
              background: players[playerIndex].colour,
            }
          }),
          player.name, ' — ', piecesPerPlayer[playerIndex]
        )),
        m('.board',
          {
            style: {
              background: '#372',
              width: '720px', height: '720px',
              borderRadius: '40px',
              margin: '10px 0',
              padding: '20px',
            }
          },
          board.map((playerIndex, pieceIndex) => {
            const
              commonPieceSizeStyle = { width: '80px', height: '80px', borderRadius: '80px' },
              piecePosition = positionFromPieceIndex(pieceIndex)!,
              distanceFromLastPlayed = lastPiecePosition === undefined ? 1 : Math.sqrt(
                Math.pow(piecePosition.rightwards - lastPiecePosition.rightwards, 2) +
                Math.pow(piecePosition.downwards - lastPiecePosition.downwards, 2)
              ),
              commonPieceStyle = {
                ...commonPieceSizeStyle, position: 'absolute', backfaceVisibility: 'hidden',
                top: playerIndex === x ? '-20px' : '0',
                transition: pieceIndex === lastPieceIndex ? 'top .25s' : `transform ${.25 * distanceFromLastPlayed}s`
              };

            return m('div',
              {
                style: {
                  ...commonPieceSizeStyle,
                  position: 'relative',
                  float: 'left',
                  margin: '5px',
                  background: pieceIndex === errorIndex ? 'rgba(255, 0, 0, .5)' :
                    turnForPlayer === 0 ? 'rgba(0, 0, 0, .05)' : 'rgba(255, 255, 255, .05)',
                  boxShadow: pieceIndex === lastPieceIndex ? '0 0 12px #ff0' : 'none',
                  transition: 'box-shadow .25s .25s, background .5s',
                },
                onclick: () => errorIndex = playAtPieceIndex(board, pieceIndex, turnForPlayer)
              },
              m('.piece0', {
                style: {
                  ...commonPieceStyle,
                  transform: playerIndex === 0 ? 'rotateY(0deg)' : playerIndex === 1 ? 'rotateY(180deg)' : 'rotateY(90deg)',
                  background: playerIndex !== x ? players[0].colour : 'transparent',
                }
              }),
              m('.piece1', {
                style: {
                  ...commonPieceStyle,
                  transform: playerIndex === 0 ? 'rotateY(180deg)' : playerIndex === 1 ? 'rotateY(0deg)' : 'rotateY(90deg)',
                  background: playerIndex !== x ? players[1].colour : 'transparent',
                }
              })
            )
          })
        ),
        m(m.route.Link, { selector: 'button', href: defaultRoute }, 'Start again')
      )
    }
  };
}

m.route(document.body, defaultRoute, { [routeTemplate]: Othello });
