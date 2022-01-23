const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin,process.stdout);

function ask(question){
	return new Promise((resolve,reject) => {
		readlineInterface.question(question,resolve);
	});
}


const arr1 = ['1', '2','3'],
 arr2 = ['4', '5','6'],
 arr3 = ['7', '8','9'],
 arr4 = ['1', '4','7'],
 arr5 = ['3', '6','9'],
 arr6 = ['1', '5','9'],
 arr7 = ['3', '5','7']



 let checker = (arr,target) => (target).every(v => arr.includes(v));


start();


async function start(){
	
	let availableNo = ['1','2','3','4','5','6','7','8','9'];
	let players = ["X","O"];
	let lastPlayer = players[0];
	let XPlayer = [];
	let OPlayer = []


    
	while (availableNo.length > 0) {

	let select = await ask("Pick your number " + lastPlayer + " from " + availableNo);
	 console.log(select);
		//remove from availableNo list
		let i = 0;
		for(let currentNo of availableNo){
		
		if(currentNo === select){
			availableNo.splice(i,1)
			
			if(lastPlayer == players[0]){
				XPlayer.push(select);

				if(XPlayer.length >= 3 ){
					//console.log(checker(XPlayer,arr1)) ;

					let Win = (checker(XPlayer,arr1) || checker(XPlayer,arr2)  || checker(XPlayer,arr3) || checker(XPlayer,arr4) 
					|| checker(XPlayer,arr5) || checker(XPlayer,arr6) || checker(XPlayer,arr7));

					if(Win){
						console.log(lastPlayer + " Win!")
						process.exit()
					}
					
					
				}
			}
			else{
				OPlayer.push(select);
				if(OPlayer.length >= 3 ){
					let Win = (checker(OPlayer,arr1) || checker(OPlayer,arr2)  || checker(OPlayer,arr3) || checker(OPlayer,arr4) 
					|| checker(OPlayer,arr5) || checker(OPlayer,arr6) || checker(OPlayer,arr7)) ;

					if(Win){
						console.log(lastPlayer + " Win!")
						process.exit()
					}
				}
			}
		}
		i++;
	}
	if(lastPlayer == players[0]){
		lastPlayer = players[1]
	}
	else{
		lastPlayer = players[0]
	}
	}
};




	
