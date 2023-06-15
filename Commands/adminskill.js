
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (admins.indexOf(id) == -1) { return user }
    if (words.length < 4) {
        functions.sendMessage(message.channel, "Syntax: !adminskill user [...skills]");
        return user;
    }
    return Promise.all([functions.validate(message, user)]).then(ret => {
        let target = ret[0];
        if (target == false) { return user; }
        for (let i = 2; i < words.length; i++) {
            let skillid = parseInt(words[i])
            if (skillid < 0 || skillid >= skillData.length) { continue; }
            target.skills[skillid] = skillid;
        }
        functions.setUser(target);
        return user
    })
}