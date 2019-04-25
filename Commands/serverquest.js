var functions=require("../Utils/functions.js")

module.exports=function(message) {

    //questData.questInfo.questList[2].completed = 5;
    let notindex = questData.questInfo.current;
    let text = "oops";
    try {
    text = questData.questInfo.questList[notindex].objective;
    if(notindex == 0) {
	text = text + " The server is currently at $" + Math.floor(questData.questInfo.questList[notindex].completed/1000000) + "," + (Math.floor(questData.questInfo.questList[notindex].completed/1000)%1000) + "," + (questData.questInfo.questList[notindex].completed%1000000) + "."
    }
    if(notindex == 1) {
    	text = text + " The server is currently at " + questData.questInfo.questList[notindex].completed + " kills.";
    }
    if(notindex == 2) {
	text = text + " The server is currently at " + questData.questInfo.questList[notindex].completed + " sacrifices.";
    }
    if(notindex == 3) {
	text = text + " The server is currently at " + questData.questInfo.questList[notindex].completed + " daily box openings.";
    }
    if(notindex == 4) {
	text = text + " The server has been unsuccessful in writing bad poetry.";
    }
    if(notindex == 5) {
        text = text + "The server is currently at 46 followers.";
    }
    }
    catch (err) {}
    functions.sendMessage(message.channel, text)

    if (questData.questInfo.questList[notindex].completed >= questData.questInfo.questList[notindex].total)
    {
        questData.questInfo.current++;
        questData.questInfo.questList[notindex].completed = 0;
        functions.sendMessage(message.channel, "Congratulations on your help completing a server-wide quest! Everyone earned 2 boxes for their efforts. Check !serverquest again to see the next challenge!");
        let x = 0;
        for (x in userData)
        {
            functions.consumGive(id, "box", 2);
        }
    }  
          
}

/*

questData.questInfo = {current : 0, questList : [{objective : "Contribute to the global economy! As a server, earn a total of $25,000,000 by working or going on raids!", total: 25000000, completed: 0}, 
        {objective: "Attack some bosses! Kill the any boss 500 times total in the server; it does not have to be the same user every time!", total: 500, completed: 0},
        {objective : "It's time for sacrifice! Kill user Razoreign 10 times to appease the gods of incompetence -- again, this is a server-wide total; the same user does not have to kill Razoreign 10 times! (Although that's fine, too)", total: 10, completed: 0},
        {objective : "Who doesn't like boxes? As a server, open a total of 1000 daily boxes!", total: 1000, completed: 0},
        {objective : "Write some bad poetry! Enter your submissions in the awful poetry channel and we will decide if your poem passes the atrocity test!", total: 1, completed: 0},
        {objective : "Glory is now on Instagram! As a server, get Glory to a total of 25 followers!", total: 50, completed: 24}
    ]}; 
*/