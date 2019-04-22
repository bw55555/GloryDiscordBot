let functions = require('./functions.js')
module.exports=function(message) {
	let sender = message.author;
	let sendername = message.author.username;
	let id = message.author.id;
	let msg = message.content.toUpperCase();
	if (message.author.bot) return;
	//Autoresponders
	if (msg === 'DOSEI') {
		functions.sendMessage(message.channel,'Dosei is the best Dosei.');
	}
	if (msg === 'NIX') {
		functions.sendMessage(message.channel,"Nixolium Ignitius Xel at your service!");
	}
	if (id == "506181973887287327" && msg === 'SORRY') {
		functions.sendMessage(message.channel,'Apology Defenestrated!');
	}
	if (msg === '>.>' && id != "536622022709608468") {
		functions.sendMessage(message.channel,'<.<');
	}
	if (msg === '<.<' && id != "536622022709608468") {
		functions.sendMessage(message.channel,'>.>');
	}
	/*if (msg === '\\O/' && id != "536622022709608468") {
		functions.sendMessage(message.channel,'/o\\');
	}
	if (msg === '/O\\' && id != "536622022709608468") {
		functions.sendMessage(message.channel,'\\o/');
	}*/
	if (msg === '._.' && id != "536622022709608468") {
		functions.sendMessage(message.channel,'.-.');
	}
	if (msg === '.-.' && id != "536622022709608468") {
		functions.sendMessage(message.channel,'._.');
	}
	if (msg === ':/' && id != "536622022709608468") {
		functions.sendMessage(message.channel,':\\');
	}
	if (msg === ':\\' && id != "536622022709608468") {
		functions.sendMessage(message.channel,':/');
	}
	if (msg === 'BW55555' && id != "536622022709608468") {
		functions.sendMessage(message.channel,'The guy doing pretty much everything behind the bot.');
	}
	if (msg === 'WHO AM I') {
		functions.sendMessage(message.channel,'You are: ' + sendername);
	}
}