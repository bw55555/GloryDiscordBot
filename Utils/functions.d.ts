import { Message, Channel } from "discord.js"
export function importObject(db: string, coll: string, oid: string | number): Promise<false | JSON>
export function clean(text: string): string
export function getUser(uid: string | number): Promise<JSON | false>
export function findUsers(query: JSON): Promise<Array<JSON> | false>
export function findUsers(query: JSON, projection: JSON): Promise<Array<JSON> | false>
export function setUser(newuser: JSON): Promise<boolean>
export function deleteUser(uid: string | number): Promise<boolean>
export function getItem(iid: string | number): Promise<JSON | false>
export function getFloorMob(iid: string | number): Promise<JSON | false>
export function findItems(query: JSON): Promise<Array<JSON> | false>
export function findItems(query: JSON, projection: JSON): Promise<Array<JSON>|false>
export function setItem(newitem: JSON): Promise<boolean>
export function deleteItem(iid: string | number): Promise<boolean>
export function getObject(coll: string, oid: string | number): Promise<false | JSON>
export function findObjects(coll: string, query: JSON): Promise<false | Array<JSON>>
export function findObjects(coll: string, query: JSON, projection: JSON): Promise<false | Array<JSON>>
export function setObject(coll: string, newobj:JSON): Promise<boolean>
export function deleteObject(coll:string, oid:string): Promise<boolean>
export function setProp(coll:string, query:JSON, newvalue:JSON): Promise<boolean>
export function bulkWrite(coll:string, tasks:Array<JSON>): Promise<boolean>
export function deleteObjects(coll: string, filter: JSON): Promise<boolean>
export function sendMessage(channel: Channel, text: string): Promise<Message>
export function sendMessage(channel: Channel, text: string, override: boolean): Promise<Message>
export function replyMessage(message: Message, text: string): Promise<Message>
export function replyMessage(message: Message, text: string, override: boolean): Promise<Message>
export function sendAsEmbed(channel: Channel, name : string, text: string, title: string): Promise<Message>
export function deleteMessage(message: Message):void
export function dmUser(user: JSON, text: string): void
export function logCommand(message: Message): void
export function logCommand(message: Message, title: string): void
export function logCommand(message: Message, title: string, extratext: string): void
export function logCommand(message: Message, title: string, extratext: string, gid: string, cid: string): void
export function validate(message: Message, user: string): Promise<JSON>
export function validate(message: Message, user: string, spot: number): Promise<JSON>
export function hasSkill(user: JSON, skillid: number): boolean
export function hasSkill(user: JSON, skillid: number, enable: boolean): boolean
export function getGuildBuff(user: JSON, buffname: string): number
export function generateWeaponTemplate(owner: JSON, weapon: JSON, current: number, total: number): JSON
export function generateGuildTemplate(guild: JSON): JSON
export function generateItem(owner: JSON, itemid: number, attack: number, defense: number, rarity: number | string): JSON
export function generateItem(owner: JSON, itemid: number, attack: number, defense: number, rarity: number | string, name: string): JSON
export function generateItem(owner: JSON, itemid: number, attack: number, defense: number, rarity: number | string, name: string, modifiers: JSON): JSON
export function generateItem(owner: JSON, itemid: number, attack: number, defense: number, rarity: number | string, name: string, modifiers: JSON, isBulk: boolean): JSON
export function generateItem(owner: JSON, itemid: number, attack: number, defense: number, rarity: number | string, name: string, modifiers: JSON, isBulk: boolean, source: string): JSON
export function generateRandomItem(owner: JSON): JSON
export function generateRandomItem(owner: JSON, rarity: number): JSON
export function generateRandomItem(owner: JSON, rarity: number, isBulk: boolean): JSON
export function generateRandomItem(owner: JSON, rarity: number, isBulk: boolean, source: string): JSON
export function calcExtraStat(user: JSON, stat: string): number
export function calcLuckyBuff(user: JSON): number
export function getLogChannel(devDatavname: string): Channel
export function errorlog(err: Error, extratext:string):void
export function setCD(user: JSON, ts:number, cdsecs:number, cdname:string):void
export function calcTime(time1: number, time2: number): number
export function displayTime(time1: number, time2: number): string
export function extractTime(message: Message, timeword: string): number
export function simulateAttack(message: Message, attacker: JSON, defender: JSON): JSON
export function calcDamage(message: Message, attacker: JSON, defender: JSON, initiator: JSON): [string, number, number]
export function calcDamage(message: Message, attacker: JSON, defender: JSON, initiator: JSON, astatus: JSON, dstatus: JSON): [string, number, number]
export function calcEnchants(attacker: JSON): JSON
export function calcEnchants(attacker: JSON, defender: JSON): JSON
export function calcEnchants(attacker: JSON, defender: JSON, options: JSON): JSON
export function calcStats(message: Message, user: JSON, stat: "attack" | "defense"): [string, number]
export function calcStats(message: Message, user: JSON, stat: "attack" | "defense", options: JSON): [string, number]
export function voteItem(message: Message, user: JSON): void
export function voteItem(message: Message, user: JSON, dm: boolean):void
export function craftItems(message: Message, owner: JSON, minrarity: number, maxrarity: number, amount: number, source: "box" | "craft"): string
export function craftItem(message: Message, owner: JSON): JSON
export function craftItem(message: Message, owner: JSON, minrarity: number, maxrarity: number): JSON
export function craftItem(message: Message, owner: JSON, minrarity: number, maxrarity: number, reply: boolean): JSON
export function craftItem(message: Message, owner: JSON, minrarity: number, maxrarity: number, reply: boolean, isBulk: boolean): JSON
export function craftItem(message: Message, owner: JSON, minrarity: number, maxrarity: number, reply: boolean, isBulk: boolean, source: "box" | "craft"): JSON
export function raidInfo(message: Message, raid: JSON, extratext: string): void
export function customsummon(raid: JSON, options: JSON): void
export function locationsummon(raid: JSON): void
export function summon(raid: JSON): void
export function summon(raid: JSON, level: number): void
export function summon(raid: JSON, level: undefined, minlevel: number, maxlevel: number, name: string, image: string): void
export function summon(raid: JSON, level: undefined, minlevel: number, maxlevel: number, name: string, image: string, ability: JSON, abilitydesc: string): void
export function checkProps(message: Message, user: JSON): void
export function checkStuff(message: Message, user: JSON): void
export function postCommandCheck(message: Message, user: JSON): void
export function raidAttack(message: Message, user: JSON, raid: JSON): void
export function raidAttack(message: Message, user: JSON, raid: JSON, type: "raid" | "world" | "event"): void
export function raidAttack(message: Message, user: JSON, raid: JSON, type: "guild", guild: JSON): void
export function getRandomByDamage(raid: JSON): string
export function smeltItem(user: JSON, item: JSON): Array<number>
export function smeltItem(user: JSON, item: JSON, giveReward: boolean): Array<number>
export function smeltItem(user: JSON, item: JSON, giveReward: boolean, isBulk: boolean): Array<number>
export function itemFilter(message: Message, user: JSON, defaults: JSON): Promise<boolean | Array<JSON>>
export function getModifierText(modifierlist: JSON): string
export function checkxp(user: JSON): number
export function isCD(user: JSON, ts: number, cdtype: string): boolean
export function secondsUntilReset(ts: number): number
export function makeQuest(user: JSON, name: string, conditions: JSON[], reward: JSON): void
export function makeQuest(user: JSON, name: string, conditions: JSON[], reward: JSON, mqid: number): void
export function completeQuest(user: JSON, condition: string, extra: JSON, amount: number): void
export function addQuestCondition(condition: string,operator:string, description: string, total: number, extra: JSON, type: "c" | "a"): JSON
export function JSONoperate(json: JSON, key: string, op: "get" | "set" | "add", obj: string | number): any
export function adminQuest(message: Message, target: JSON): string
export function randint(a: number, b: number): number
export function extractOptions(message: Message, inorder: boolean, ...optionnames: string[]): JSON
export function antimacro(message: Message, user: JSON): void
export function shuffle(a: any[]): any[]
export function dailyReset(): void