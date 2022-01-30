const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin,process.stdout);

interface TicTacToeInterface {
	board: string[][];
	drawBoard?: Function;
	validateMove?: Function;
	saveMove?: Function;
	checkWinner?: Function;
	checkDraw?: Function;
	playGame?: Function;
}

class TicTacToeGame implements TicTacToeInterface {
	board: string[][];

	constructor() {
		this.board = [];
		for(let x=0; x< 3;x++){
			this.board[x] = [];
			for(let y = 0;y < 3 ;y++){
				this.board [x][y] = null;
			}
		}
	}

	drawBoard(){
		let output = '';
		for(let x=0;x<3;x++){  // n row
			for(let y=0;y<3;y++){ //n col
				if(y !== 0){
					output += "|"; //O(1) // 8 byte
				}
				
				if(this.board[x][y] === null){
					output += "_"; //O(1) // 8 byte
				}
				else{  
					output += this.board[x][y]; //O(1) //8byte
				}
			}
			output += "\n"; //O(1) take n times //8 byte
		}
		console.log(output);
	}
	// T = O(1) + n2xO(1) + n2xO(1) + nxO(1)
	//   = c5 + n2xc7 + n2xc8 + nxc9
	//   = O(n2)

	// memory require for variable - output, |, _
	// board = 3 x 8 byte + 3 x 8 byte  = 48 bytes
	// output = 2 x 8 bytes = 16 bytes
	// aux    = 8 bytes
	// total  = 72 bytes 
	// for n row, n column = n x 8 bytes+ n x 8 bytes
	// M = O(n)
	validateMove(x:number,y:number):boolean {
		return this.board[x][y] === null; //O(1) //8 bytes
	} 
	//T = O(1)
	// M = O(1)

	SaveMove(player:string,x:number,y:number){
		if(this.validateMove(x,y)){
		this.board[x][y] = player; //O(1) // 8bytes
		}
		else{
		console.log("Wrong Move!");
		}
	}
	//T = O(1)
	//M = O(1)


	checkWinner() {
		function Win(board){
			let winner = '';
			for( let i=0;i < board.length;i++)// n
			{
				const arr = board[i]; // O(1) // 8 byte
				if(!arr.includes(null)){
				const set = new Set(arr); // O(1) //8 byte
				if(set.size == 1){	
					winner =  arr[0]; //O(1) //8 byte
				}
				
			}  
			}
			return winner;
		}
		//T = nxc1 + c2 + c3
		//    = nxc4
		//	  = O(n)
		//M = board (n * 8 bytes) + i (8 byte) + set (8 byte) + winner (8 byte)
		//M = O(n)

		//check row
		let winner: string;
		winner =  Win(this.board); //O(n) //8 bytes
		

		//check column
		if(winner === ''){
			const boardColumn = (arr,n) => arr.map( x  => x[n]); //O(1) // 8 bytes
			const columnArr = [];//8 bytes
			for(let i=0; i < 3 ; i++){// n times
				columnArr.push(boardColumn (this.board,[i])); //O(1)
			}
			winner = Win(columnArr); //O(n) //8 bytes
		}
		// T = c1 + nxc2 + O(n)
		//   = nxc3 + O(n)
		//   = O(n)
		
		//check diagonal
		if(winner === ''){
			const diagonal = [
				[this.board[0][0],this.board[1][1],this.board[2][2]], 
				[this.board[0][2],this.board[1][1], this.board[2][0]]
			];// O(1) // 8 bytes
			winner = Win(diagonal); // O(n) //8 bytes
		}
		//T = c1+O(n)
		return winner;
	}
	// T= O(n)
	// M = O(n)

	// time complexity
	// memory complexity
	//of every function
	checkDraw(){
		let draw = true; // 8 bytes
		for(let i = 0; i < 3; i++){ //n2
			const boarditm = this.board[i]; // 8 bytes
			for(let j = 0; j < 3 ; j++){
				if(boarditm[j] === null ){
					draw = false; //O(1) // 8 bytes
				}
			}
		}
		return draw;
	}
	// T = O(n2)
	// M = draw (8bytes) + boarditm (8bytes)+ i (8bytes) = O(1)

	playGame(){
		readlineInterface.question(`What\'s your move player: ${player}?`,(move) => {
			let x: number; //O(1) // 8 bytes
			let y: number; //O(1) // 8 bytes
			const reg = new RegExp(/[1-9]/) ; //O(1) // 8 bytes
			if(reg.test(move) === false){
				console.log("Please enter a valid move..")
				this.playGame();
			}
			else{
				switch(parseInt(move)){
					case 1: 
						x = 0;
						y = 0;
						break;
					case 2: 
						x = 0;
						y = 1;
						break;	
					case 3: 
						x = 0;
						y = 2;
						break;
					case 4: 
						x = 1;
						y = 0;
						break;
					case 5: 
						x = 1;
						y = 1;
						break;
					case 6: 
						x = 1;
						y = 2;
						break;
					case 7: 
						x = 2;
						y = 0;
						break;
					case 8: 
						x = 2;
						y = 1;
						break;
					case 9: 
						x = 2;
						y = 2;
						break;
				}// O(1)
				this.SaveMove(player,x,y); //O(1) // 8 bytes
				this.drawBoard();//O(n2) //M =  O(n)
		
				//check winner
				const winner = this.checkWinner(); //O(n) // O(n)
				if(winner === ''){
					//check if to continue
					const continueGame = brdd.checkDraw(); //O(n2) //O(1)
					if(continueGame === false){
						player = player === 'X' ? 'O': 'X'; //O(1) // 8 bytes
						this.playGame(); 
						
					}
					else{
						console.log('Game end in draw!');
					}
			
				}else{
					console.log( `${winner} Win!`);
				}
				console.log('\n');

			}
		});
	}
}
// T = O(n2)
// M = x (8 bytes) + y (8 bytes) + reg (8 bytes) + savemove(O(1)) + drawboard(O(n)) + winner (O(n)) + continueGame (O(1)) + player (8 bytes) 
// M = O(n)

const brdd = new TicTacToeGame();
brdd.drawBoard();
let player = 'X';
brdd.playGame();

