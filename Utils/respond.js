let functions = require('./functions.js')
module.exports=function(message) {
	let sender = message.author;
	let sendername = message.author.username;
	let id = message.author.id;
	let msg = message.content.toUpperCase();
	if (message.author.bot) return;
	//Autoresponders
	if (msg === 'DOSEI') {
		functions.sendMessage(message.channel,'Slower than absolute zero.');
        }
        if (msg === 'RAZOREIGN') {
		functions.sendMessage(message.channel,'Incompetence at its finest.');
        }
        if (msg === '3628800') {
		functions.sendMessage(message.channel,'Competence at its worst.');
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
		functions.sendMessage(message.channel,'A cat, but you already knew that.');
	}
	if (msg === 'WHO AM I') {
		functions.sendMessage(message.channel,'You are: ' + sendername);
	}
}