import m, { redraw } from 'mithril';

interface FliptilesAttrs {
  boardStr: string;
  lastPieceStr: string;
  turnStr: string;
  gridNos: 'y' | 'n';
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
  routeTemplate = '/:gridNos/:boardStr/:lastPieceStr/:turnStr',
  defaultRoute = `/n/${initialBoardStr}/-/0`,
  players = [
    { name: 'Black', colour: '#000' },
    { name: 'White', colour: '#fff' },
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

function playAtPieceIndex(board: Board, pieceIndex: number, player: 0 | 1, vnode: m.Vnode<FliptilesAttrs>) {  // returns undefined if OK, otherwise piece index of bad play
  const currentPiece = board[pieceIndex];

  if (currentPiece !== x) return;  // can't play where there's already a piece

  const
    position = positionFromPieceIndex(pieceIndex)!,
    flippablesByDirection = flippableOpponentPiecesByDirection(board, position, player),
    flippablesCount = flippablesByDirection.reduce((memo, n) => memo + n);

  if (flippablesCount === 0) return pieceIndex;  // can't play if nothing gets flipped

  const newBoard = [...board];
  newBoard[pieceIndex] = player;
  flipPiecesByDirections(newBoard, position, flippablesByDirection);

  const opponent = 1 - player as 0 | 1;
  m.route.set(routeTemplate, { ...vnode.attrs, boardStr: stringFromBoard(newBoard), lastPieceStr: pieceIndex, turnStr: opponent });
}

function playerCanPlay(board: Board, player: 0 | 1) {
  return board.some((piece, pieceIndex) =>
    piece === x ? flippableOpponentPiecesByDirection(board, positionFromPieceIndex(pieceIndex)!, player).reduce((memo, n) => memo + n) > 0 : false);
}

function piecesByPlayer(board: Board) {
  return board.reduce((memo, piece) => { memo[piece] += 1; return memo; }, [0, 0, 0]);
}

export function Fliptiles() {
  let
    errorIndex: number | undefined,
    prevBlanks: number | undefined;

  return {
    onupdate: () => errorIndex = undefined,  // clear error appearance on next redraw
    view: (vnode: m.Vnode<FliptilesAttrs>) => {
      const
        { boardStr, turnStr, lastPieceStr, gridNos } = vnode.attrs,
        board = boardFromString(boardStr),
        turnForPlayer = Number(turnStr) as 0 | 1,
        lastPieceIndex = lastPieceStr === '-' ? undefined : Number(lastPieceStr),
        lastPiecePosition = positionFromPieceIndex(lastPieceIndex ?? -1),
        piecesPerPlayer = piecesByPlayer(board),
        blanks = piecesPerPlayer[x],
        ordinaryMove = prevBlanks === undefined || blanks === prevBlanks - 1,
        canPlay = playerCanPlay(board, turnForPlayer),
        opponent = 1 - turnForPlayer as 0 | 1,
        opponentCanPlay = !canPlay && playerCanPlay(board, opponent),
        gameOver = !canPlay && !opponentCanPlay,
        winning = piecesPerPlayer[0] > piecesPerPlayer[1] ? 0 :
          piecesPerPlayer[1] > piecesPerPlayer[0] ? 1 : undefined;

      prevBlanks = blanks;

      return m('.game',
        { style: { width: '760px', margin: '0 auto' } },
        players.map((player, playerIndex) => m('.player',
          {
            style: {
              padding: '6px 10px 8px',
              borderRadius: '40px',
              background: !gameOver && turnForPlayer === playerIndex && !canPlay ? '#fc0' :
                (!gameOver && playerIndex === turnForPlayer && playerIndex === 0) || (gameOver && playerIndex === winning && playerIndex === 0) ? '#000' :
                  (!gameOver && playerIndex === turnForPlayer && playerIndex === 1) || (gameOver && playerIndex === winning && playerIndex === 1) ? '#fff' : 'transparent',
              color: !gameOver && turnForPlayer === playerIndex && !canPlay ? '#000' :
                (!gameOver && playerIndex === turnForPlayer && playerIndex === 0) || (gameOver && winning === 0 && playerIndex === 0) ? '#fff' :
                  (!gameOver && playerIndex === turnForPlayer && playerIndex === 1) || (gameOver && winning && playerIndex === 1) ? '#000' : 'inherit',
              width: '360px',
              margin: '0 0 15px',
              float: 'left',
            }
          },
          m('.piece', {
            style: {
              display: 'inline-block',
              width: '16px', height: '16px',
              borderRadius: '16px',
              border: '1px solid #999',
              margin: '1px 10px 5px',
              position: 'relative',
              top: '6px',
              background: player.colour
            }
          }),
          player.name, ' (', piecesPerPlayer[playerIndex], ') ',
          playerIndex === turnForPlayer && canPlay && ` to play `,
          gameOver && winning === playerIndex && m('b', ' wins '),
          gameOver && winning === undefined && m('b', ' draws '),
          playerIndex === turnForPlayer && !canPlay && opponentCanPlay && [
            m('b', ` can’t play `), ' — ',
            m(m.route.Link, {
              href: routeTemplate,
              params: { ...vnode.attrs, turnStr: opponent },
            }, `Pass`)],

        )),
        m('.board',
          {
            style: {
              background: '#372',
              width: '720px', height: '720px',
              borderRadius: '55px',
              margin: '10px 0 25px',
              padding: '20px',
              clear: 'left',
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
                top: playerIndex === x ? '-20px' : '0', zIndex: 10,
                transition: pieceIndex === lastPieceIndex ? 'top .25s' :
                  `transform .5s ${.15 * (1 + distanceFromLastPlayed * (ordinaryMove ? 1 : 0))}s`
              };

            return m('div',
              {
                style: {
                  ...commonPieceSizeStyle,
                  position: 'relative',
                  float: 'left',
                  margin: '5px',
                  background: pieceIndex === errorIndex ? '#f60' :
                    turnForPlayer === 0 ? 'rgba(0, 0, 0, .075)' : 'rgba(255, 255, 255, .075)',
                  boxShadow: pieceIndex === lastPieceIndex ? '0 0 12px #fff' : 'none',
                  transition: 'box-shadow .25s .25s, background .5s',
                  cursor: playerIndex === 2 ? 'pointer' : 'default',
                  color: '#372',
                  fontSize: '36px',
                  textAlign: 'center',
                  lineHeight: '77px',
                  fontWeight: 'bold',
                },
                onclick: () => {
                  errorIndex = playAtPieceIndex(board, pieceIndex, turnForPlayer, vnode);
                  if (errorIndex !== undefined) setTimeout(m.redraw, 750);
                }
              },
              gridNos === 'y' && [
                ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'][piecePosition.rightwards],
                piecePosition.downwards + 1,
              ],
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
              }),
            )
          })
        ),
        m('label',
          { style: { float: 'right' } },
          m('input[type=checkbox]', {
            checked: gridNos === 'y',
            onchange: () =>
              m.route.set(routeTemplate, { ...vnode.attrs, gridNos: { y: 'n', n: 'y' }[gridNos] })
          }),
          ' Named cells'
        ),
        m(m.route.Link, { href: `/:gridNos/${initialBoardStr}/-/0`, params: { gridNos }, style: { fontWeight: 'bold' } }, 'Start again'),
        m.trust(' &nbsp; '),
        m('a', { href: 'https://www.worldothello.org/about/about-othello/othello-rules/official-rules/english' }, 'How to play'),
        m.trust(' &nbsp; '),
        m('a', { href: 'https://github.com/jawj/fliptiles', style: { color: '#aaa' } }, 'See the code on GitHub'),
      )
    }
  };
}

m.route(document.body, defaultRoute, { [routeTemplate]: Fliptiles });
