const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
	return new Promise((resolve, reject) => {
	readlineInterface.question(questionText, resolve);
});
}

start();

async function start(){
	let firstname = await ask("What is your first name?");
	let lastname = await ask("What is your last name?");

	console.log("Hello " + firstname + " " + lastname + "!");
	
	let namelength = firstname.length + lastname.length;
	console.log("Your name is " + namelength + " characters long.");
	process.exit();
}