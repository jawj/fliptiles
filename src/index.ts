import m from 'mithril';

interface FliptilesAttrs {
  boardStr: string;
  lastPieceStr: string;
  turnStr: string;
  flagsCode: number;
}

interface Flags {
  gridNos: boolean;
  ai0: boolean;
  ai1: boolean;
}

interface Position {  // can also represent a vector movement
  rightwards: number;
  downwards: number;
}

type Board = (0 | 1 | typeof x)[];

const
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
  codeChars = `234567bcdfghjkmnpqrstvwxyz-`,
  codeCharHash = Object.fromEntries(codeChars.split('').map((x, i) => [x, i])),
  initialBoardStr = stringFromBoard(initialBoard),
  routeTemplate = '/:flagsCode/:boardStr/:lastPieceStr/:turnStr',
  defaultRoute = `/0/${initialBoardStr}/-/0`,  // = no cell names, initial board, no previous piece, black to start
  players = [
    { name: 'Black', colour: '#000' },
    { name: 'White', colour: '#fff' },
  ],
  directions = [-1, 0, 1].flatMap(d => (d === 0 ? [-1, 1] : [-1, 0, 1]).map(r => ({ downwards: d, rightwards: r })));

function stringFromBoard(board: Board) {
  return (board.join('') + '22').match(/.{1,3}/g)!.map(x => codeChars.charAt(parseInt(x, 3))).join('');
}

function boardFromString(s: string) {
  return s.split('').flatMap(x => (27 + codeCharHash[x]).toString(3).slice(-3).split('').map(Number)).slice(0, 64) as Board;
}

function encodeFlags(flags: Flags) {
  return (flags.gridNos ? 1 : 0) * 0b001 + (flags.ai0 ? 1 : 0) * 0b010 + (flags.ai1 ? 1 : 0) * 0b100;
}

function decodeFlags(flags: number): Flags {
  return { gridNos: !!(flags & 0b001), ai0: !!(flags & 0b010), ai1: !!(flags & 0b100) };
}

function positionFromPieceIndex(pieceIndex: number): Position | undefined {
  if (pieceIndex < 0 || pieceIndex >= 64) return;
  return { downwards: Math.floor(pieceIndex / 8), rightwards: pieceIndex % 8 };
}

function pieceIndexFromPosition(position: Position): number | undefined {
  if (position.downwards < 0 || position.downwards >= 8 || position.rightwards < 0 || position.rightwards >= 8) return;
  return position.downwards * 8 + position.rightwards;
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

    for (; ;) {
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

function boardByPlayingPieceAtIndex(board: Board, pieceIndex: number, player: 0 | 1) {
  const currentPiece = board[pieceIndex];
  if (currentPiece !== x) return;  // can't play where there's already a piece

  const
    position = positionFromPieceIndex(pieceIndex)!,
    flippablesByDirection = flippableOpponentPiecesByDirection(board, position, player),
    flippablesCount = flippablesByDirection.reduce((memo, n) => memo + n);

  if (flippablesCount === 0) return;  // can't play if nothing gets flipped

  const newBoard = [...board];
  newBoard[pieceIndex] = player;
  flipPiecesByDirections(newBoard, position, flippablesByDirection);

  return newBoard;
}

function playAtPieceIndex(board: Board, pieceIndex: number, player: 0 | 1, vnode: m.Vnode<FliptilesAttrs>) {
  const newBoard = boardByPlayingPieceAtIndex(board, pieceIndex, player);
  if (!Array.isArray(newBoard)) return false;

  m.route.set(routeTemplate, { ...vnode.attrs, boardStr: stringFromBoard(newBoard), lastPieceStr: pieceIndex, turnStr: 1 - player });
  return true;
}

function playerCanPlay(board: Board, player: 0 | 1) {
  return board.some((piece, pieceIndex) =>
    piece === x ? flippableOpponentPiecesByDirection(board, positionFromPieceIndex(pieceIndex)!, player).reduce((memo, n) => memo + n) > 0 : false);
}

function piecesByPlayer(board: Board) {
  return board.reduce((memo, piece) => { memo[piece] += 1; return memo; }, [0, 0, 0]);
}

function boardScoreForPlayer(board: Board, player: 0 | 1, cornerScore = 12, edgeScore = 4, otherScore = 1) {
  return board.reduce((memo: number, piece, i) =>
    memo + (piece !== player ? 0 :
      i === 0 || i === 7 || i === 56 || i === 63 ? cornerScore :
        i <= 7 || i >= 56 || i % 8 === 0 || i % 8 === 7 ? edgeScore : otherScore), 0);
}

function suggestMoves(board: Board, player: 0 | 1) {
  const opponent = 1 - player as 0 | 1;
  let
    bestWorstCaseScore = -Infinity,
    bestMoves: number[] = [];

  for (let i = 0; i < 64; i++) {
    const board1 = boardByPlayingPieceAtIndex(board, i, player);
    if (!Array.isArray(board1)) continue;

    // the tie-break score represents how good the board is for us straight away
    const tieBreakScore = (boardScoreForPlayer(board1, player) - boardScoreForPlayer(board1, opponent)) / 100;

    let worstCaseScore = Infinity;
    for (let j = 0; j < 64; j++) {
      const board2 = boardByPlayingPieceAtIndex(board1, j, opponent);
      if (!Array.isArray(board2)) continue;
      // subtracting opponent score isn't redundant, because of edge and corner boosts
      const score = boardScoreForPlayer(board2, player) - boardScoreForPlayer(board2, opponent) + tieBreakScore;
      if (score < worstCaseScore) worstCaseScore = score;
    }

    if (worstCaseScore === bestWorstCaseScore) bestMoves.push(i);
    else if (worstCaseScore > bestWorstCaseScore) {
      bestWorstCaseScore = worstCaseScore;
      bestMoves = [i];
    }
  }

  return bestMoves;
}

export function Fliptiles() {
  let
    errorIndex: number | undefined,
    prevBlanks: number | undefined,
    aiTimeout: ReturnType<typeof setTimeout> | undefined;

  function afterDraw(vnode: m.Vnode<FliptilesAttrs>) {
    errorIndex = undefined;  // clear error appearance on next redraw

    if (aiTimeout !== undefined) clearTimeout(aiTimeout);  // don't stack up AI moves
    aiTimeout = undefined;

    const
      { boardStr, turnStr, flagsCode } = vnode.attrs,
      turnForPlayer = Number(turnStr) as 0 | 1,
      flags = decodeFlags(flagsCode);

    if ((turnForPlayer === 0 && flags.ai0) || (turnForPlayer === 1 && flags.ai1)) {
      const
        board = boardFromString(boardStr),
        suggestedMoves = suggestMoves(board, turnForPlayer),
        suggestedMove = suggestedMoves[Math.floor(Math.random() * suggestedMoves.length)];

      if (suggestedMove !== undefined) aiTimeout = setTimeout(() => playAtPieceIndex(board, suggestedMove, turnForPlayer, vnode), 2000);
    }
  }

  return {
    oncreate: afterDraw,
    onupdate: afterDraw,
    view: (vnode: m.Vnode<FliptilesAttrs>) => {
      const
        { boardStr, turnStr, lastPieceStr, flagsCode } = vnode.attrs,
        flags = decodeFlags(flagsCode),
        board = boardFromString(boardStr),
        turnForPlayer = Number(turnStr) as 0 | 1,
        lastPieceIndex = lastPieceStr === '-' ? undefined : Number(lastPieceStr),
        lastPiecePosition = positionFromPieceIndex(lastPieceIndex ?? -1),
        piecesPerPlayer = piecesByPlayer(board),
        blanks = piecesPerPlayer[x],
        ordinaryMove = prevBlanks === undefined || blanks === prevBlanks - 1,  // for animation purposes
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
              position: 'relative',
              height: '40px',
              width: '380px',
              borderRadius: '20px',
              background: !gameOver && turnForPlayer === playerIndex && !canPlay ? '#fc0' :
                (!gameOver && playerIndex === turnForPlayer && playerIndex === 0) || (gameOver && playerIndex === winning && playerIndex === 0) ? '#000' :
                  (!gameOver && playerIndex === turnForPlayer && playerIndex === 1) || (gameOver && playerIndex === winning && playerIndex === 1) ? '#fff' : 'transparent',
              color: !gameOver && turnForPlayer === playerIndex && !canPlay ? '#000' :
                (!gameOver && playerIndex === turnForPlayer && playerIndex === 0) || (gameOver && winning === 0 && playerIndex === 0) ? '#fff' :
                  (!gameOver && playerIndex === turnForPlayer && playerIndex === 1) || (gameOver && winning && playerIndex === 1) ? '#000' : 'inherit',
              margin: '0 0 15px',
              float: 'left',
              transition: 'background-color .2s .8s, color .2s .8s',
            }
          },
          m('.piece', {
            style: {
              width: '16px', height: '16px',
              borderRadius: '16px',
              border: '1px solid #999',
              position: 'absolute',
              top: '11px',
              left: '15px',
              background: player.colour
            }
          }),
          m('.playerText',
            { style: { position: 'absolute', left: '40px', top: '6.5px', } },
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
          ),
          m('label',
            {
              style: {
                position: 'absolute',
                right: '18px',
                top: '6.5px',
              }
            },
            m('input[type=checkbox]', {
              checked: flags[playerIndex === 0 ? 'ai0' : 'ai1'],
              onchange: () => {
                const newFlagsCode = encodeFlags({
                  ...flags,
                  [`ai${playerIndex}`]: !flags[playerIndex === 0 ? 'ai0' : 'ai1'],
                });
                m.route.set(routeTemplate, { ...vnode.attrs, flagsCode: newFlagsCode });
              }
            }),
            ' AI'
          ),
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
                  transition: `box-shadow .25s .25s, background .5s`,
                  background: pieceIndex === errorIndex ? '#f60' :
                    turnForPlayer === 0 ? 'rgba(0, 0, 0, .075)' : 'rgba(255, 255, 255, .075)',
                  boxShadow: pieceIndex === lastPieceIndex ? '0 0 12px #fff' : 'none',
                  cursor: playerIndex === 2 ? 'pointer' : 'default',
                  color: '#372',
                  fontSize: '36px',
                  textAlign: 'center',
                  lineHeight: '77px',
                  fontWeight: 'bold',
                },
                onclick: () => {
                  if (aiTimeout !== undefined) return;
                  const success = playAtPieceIndex(board, pieceIndex, turnForPlayer, vnode);
                  if (!success && board[pieceIndex] === x) {
                    errorIndex = pieceIndex;
                    setTimeout(m.redraw, 750);
                  }
                }
              },
              flags.gridNos && [
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
            );
          })
        ),
        m('label',
          { style: { float: 'right' } },
          m('input[type=checkbox]', {
            checked: flags.gridNos,
            onchange: () => {
              const newFlagsCode = encodeFlags({ ...flags, gridNos: !flags.gridNos });
              m.route.set(routeTemplate, { ...vnode.attrs, flagsCode: newFlagsCode });
            }
          }),
          ' Named cells'
        ),
        m(m.route.Link, { href: `/:flagsCode/${initialBoardStr}/-/0`, params: { flagsCode }, style: { fontWeight: 'bold' } }, 'Start again'),
        m.trust(' &nbsp; '),
        m('a', { href: 'https://www.worldothello.org/about/about-othello/othello-rules/official-rules/english' }, 'How to play'),
        m.trust(' &nbsp; '),
        m('a', { href: 'https://github.com/jawj/fliptiles', style: { color: '#bbb' } }, 'Code on GitHub'),
      );
    }
  };
}

m.route(document.body, defaultRoute, { [routeTemplate]: Fliptiles });
