module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    if (devs.indexOf(id) == -1) { return }
    if (devData.enable) { return functions.replyMessage(message, "You cannot do this while the bot is enabled!")}
    functions.MessageAwait(message.channel, id, "Are you sure you want to start maintenance?\nIf you are sure, type `confirm`", "confirm", async function (response, extraArgs) {
        let message = extraArgs[0];
        
        await functions.setProp("userData", {}, {
            $set: {
                "location": "city",
                "maintenance": ":arrow_up:  **MAJOR GLORY UPDATES**  :arrow_up:\n\n:earth_americas:   **No More Channels!**\n- Raids are no longer bound to channels. \n- Do `!travel <loc>` to journey to distant lands. Proceed to battle mythical creatures with `!ratk`. \n- Join comrades by adding the *raid ID* after the location name. Do `!location` for the raid ID.  (example: `!travel <loc> <raidID>`)\n- Do `!travel list` and start your expedition! More areas will be discovered and added to the list in the future as we continue to venture into the unknown. \n\n:watch:   **Cool Downs**\n- A cool down for vote has been added (utility). \n- Travel will have a cool down of 30 seconds. \n\n:crossed_swords:   **Raid Adjustments**\n- Fixed *Asmodeus* and *Medusa*. \n- Added status Effects: \n     :small_orange_diamond: **Silence** `(No raids yet)`: no enchantments will work. This includes guild buffs, weapon enchantments, everything. \n    :small_orange_diamond: **Stun** `(No raids yet)`: You cannot attack.\n    :small_orange_diamond: **Petrify** `(Medusa Raid)`: Applies both silence and stun. (What can you do if you're turned to stone anyway?)\n    :small_orange_diamond: **Vulnerable** `(No raids yet)`: Stacks on your character. If you have *x stacks of vulnerable*, you have *2x% less BASE defense*.\n    :small_orange_diamond: **Weakness** `(No raids yet)`: Stacks on your character. If you have *x stacks of weakness*, you have *2x% less BASE attack*. \n    :small_orange_diamond: **Bleed** `(Asmodeus Raid)`: Stacks on your character. If you have *x stacks of bleed*, you have *x stacks of both vulnerable and weakness*. If you have *50 stacks of bleed*, you die.\n\n:tada: :gift:  **FEELING LUCKY!? **  :gift: :tada:\n\nIt's our glorious dev's birthday on the **11th of November**. To celebrate, everyone will have `2x lucky` from **Nov 11 UTC 0:00** to **Nov 11 UTC 23:59**.\n\nLet's continue to seek **GLORY** together."
            }, 
            $unset: {
                "bolster": "",
                "burn": ""
            }
        })
        await functions.deleteObjects("mobData", {})
        await functions.setProp("serverData", {}, {
            $unset: {
                "treant": "",
                "kraken": "",
                "deity": "",
                "dragon": "",
                "hell": ""
            }
        })
        functions.replyMessage(message, "Maintenance was completed!")
    }, [message])
}