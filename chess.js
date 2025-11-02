// Sakk logika
class ChessGame {
    constructor() {
        this.board = this.initBoard();
        this.selectedSquare = null;
        this.currentPlayer = 'white';
        this.validMoves = [];
    }

    initBoard() {
        // Kezdő sakk felállás
        return [
            ['♜','♞','♝','♛','♚','♝','♞','♜'],
            ['♟','♟','♟','♟','♟','♟','♟','♟'],
            ['','','','','','','',''],
            ['','','','','','','',''],
            ['','','','','','','',''],
            ['','','','','','','',''],
            ['♙','♙','♙','♙','♙','♙','♙','♙'],
            ['♖','♘','♗','♕','♔','♗','♘','♖']
        ];
    }

    getPieceColor(piece) {
        if (!piece) return null;
        const whitePieces = '♔♕♖♗♘♙';
        return whitePieces.includes(piece) ? 'white' : 'black';
    }

    getPieceType(piece) {
        const types = {
            '♔': 'king', '♚': 'king',
            '♕': 'queen', '♛': 'queen',
            '♖': 'rook', '♜': 'rook',
            '♗': 'bishop', '♝': 'bishop',
            '♘': 'knight', '♞': 'knight',
            '♙': 'pawn', '♟': 'pawn'
        };
        return types[piece] || null;
    }

    getValidMoves(row, col) {
        const piece = this.board[row][col];
        if (!piece) return [];

        const pieceType = this.getPieceType(piece);
        const moves = [];

        switch(pieceType) {
            case 'pawn':
                moves.push(...this.getPawnMoves(row, col));
                break;
            case 'rook':
                moves.push(...this.getRookMoves(row, col));
                break;
            case 'knight':
                moves.push(...this.getKnightMoves(row, col));
                break;
            case 'bishop':
                moves.push(...this.getBishopMoves(row, col));
                break;
            case 'queen':
                moves.push(...this.getQueenMoves(row, col));
                break;
            case 'king':
                moves.push(...this.getKingMoves(row, col));
                break;
        }

        return moves;
    }

    getPawnMoves(row, col) {
        const moves = [];
        const piece = this.board[row][col];
        const color = this.getPieceColor(piece);
        const direction = color === 'white' ? -1 : 1;
        const startRow = color === 'white' ? 6 : 1;

        // Előre lépés
        const newRow = row + direction;
        if (newRow >= 0 && newRow < 8 && !this.board[newRow][col]) {
            moves.push([newRow, col]);

            // Dupla lépés kezdőpozícióból
            if (row === startRow && !this.board[row + 2 * direction][col]) {
                moves.push([row + 2 * direction, col]);
            }
        }

        // Ütés átlósan
        for (const dcol of [-1, 1]) {
            const newCol = col + dcol;
            if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                const target = this.board[newRow][newCol];
                if (target && this.getPieceColor(target) !== color) {
                    moves.push([newRow, newCol]);
                }
            }
        }

        return moves;
    }

    getRookMoves(row, col) {
        return this.getLinearMoves(row, col, [[0,1], [0,-1], [1,0], [-1,0]]);
    }

    getBishopMoves(row, col) {
        return this.getLinearMoves(row, col, [[1,1], [1,-1], [-1,1], [-1,-1]]);
    }

    getQueenMoves(row, col) {
        return this.getLinearMoves(row, col, [[0,1], [0,-1], [1,0], [-1,0], [1,1], [1,-1], [-1,1], [-1,-1]]);
    }

    getLinearMoves(row, col, directions) {
        const moves = [];
        const piece = this.board[row][col];
        const color = this.getPieceColor(piece);

        for (const [drow, dcol] of directions) {
            let newRow = row + drow;
            let newCol = col + dcol;

            while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                const target = this.board[newRow][newCol];
                
                if (!target) {
                    moves.push([newRow, newCol]);
                } else {
                    if (this.getPieceColor(target) !== color) {
                        moves.push([newRow, newCol]);
                    }
                    break;
                }

                newRow += drow;
                newCol += dcol;
            }
        }

        return moves;
    }

    getKnightMoves(row, col) {
        const moves = [];
        const piece = this.board[row][col];
        const color = this.getPieceColor(piece);
        const deltas = [[2,1], [2,-1], [-2,1], [-2,-1], [1,2], [1,-2], [-1,2], [-1,-2]];

        for (const [drow, dcol] of deltas) {
            const newRow = row + drow;
            const newCol = col + dcol;

            if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                const target = this.board[newRow][newCol];
                if (!target || this.getPieceColor(target) !== color) {
                    moves.push([newRow, newCol]);
                }
            }
        }

        return moves;
    }

    getKingMoves(row, col) {
        const moves = [];
        const piece = this.board[row][col];
        const color = this.getPieceColor(piece);

        for (let drow = -1; drow <= 1; drow++) {
            for (let dcol = -1; dcol <= 1; dcol++) {
                if (drow === 0 && dcol === 0) continue;

                const newRow = row + drow;
                const newCol = col + dcol;

                if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                    const target = this.board[newRow][newCol];
                    if (!target || this.getPieceColor(target) !== color) {
                        moves.push([newRow, newCol]);
                    }
                }
            }
        }

        return moves;
    }

    movePiece(fromRow, fromCol, toRow, toCol) {
        this.board[toRow][toCol] = this.board[fromRow][fromCol];
        this.board[fromRow][fromCol] = '';
        this.currentPlayer = this.currentPlayer === 'white' ? 'black' : 'white';
    }

    reset() {
        this.board = this.initBoard();
        this.selectedSquare = null;
        this.currentPlayer = 'white';
        this.validMoves = [];
    }
}

// UI kezelés
const game = new ChessGame();
const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');

function renderBoard() {
    boardElement.innerHTML = '';
    
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement('div');
            square.className = 'square';
            square.className += (row + col) % 2 === 0 ? ' light' : ' dark';
            square.textContent = game.board[row][col];
            square.dataset.row = row;
            square.dataset.col = col;

            // Kijelölt mező
            if (game.selectedSquare && 
                game.selectedSquare[0] === row && 
                game.selectedSquare[1] === col) {
                square.classList.add('selected');
            }

            // Érvényes lépések
            if (game.validMoves.some(([r, c]) => r === row && c === col)) {
                square.classList.add('valid-move');
            }

            square.addEventListener('click', () => handleSquareClick(row, col));
            boardElement.appendChild(square);
        }
    }

    updateStatus();
}

function handleSquareClick(row, col) {
    const piece = game.board[row][col];
    const pieceColor = game.getPieceColor(piece);

    // Ha nincs kijelölve semmi és saját bábu van a mezőn
    if (!game.selectedSquare && pieceColor === game.currentPlayer) {
        game.selectedSquare = [row, col];
        game.validMoves = game.getValidMoves(row, col);
        renderBoard();
        return;
    }

    // Ha van kijelölt bábu
    if (game.selectedSquare) {
        const [fromRow, fromCol] = game.selectedSquare;
        
        // Ha érvényes lépés
        if (game.validMoves.some(([r, c]) => r === row && c === col)) {
            game.movePiece(fromRow, fromCol, row, col);
            game.selectedSquare = null;
            game.validMoves = [];
            renderBoard();
            return;
        }

        // Ha saját másik bábura kattintunk
        if (pieceColor === game.currentPlayer) {
            game.selectedSquare = [row, col];
            game.validMoves = game.getValidMoves(row, col);
            renderBoard();
            return;
        }

        // Egyébként kijelölés törlése
        game.selectedSquare = null;
        game.validMoves = [];
        renderBoard();
    }
}

function updateStatus() {
    const playerName = game.currentPlayer === 'white' ? 'Fehér' : 'Fekete';
    statusElement.innerHTML = `<div class="turn-indicator">${playerName} játékos következik</div>`;
}

resetBtn.addEventListener('click', () => {
    game.reset();
    renderBoard();
});

// Kezdeti rajzolás
renderBoard();
