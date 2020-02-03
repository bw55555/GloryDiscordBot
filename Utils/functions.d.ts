import { Message, Channel } from "discord.js"
export function clean(text: string): string
export function getUser(uid: string | number): Promise<JSON | false>
export function findUsers(query: JSON): Promise<Array<JSON> | false>
export function findUsers(query: JSON, projection: JSON): Promise<Array<JSON> | false>
export function setUser(newuser: JSON): Promise<boolean>
export function deleteUser(uid: string | number): Promise<boolean>
export function getItem(iid: string | number): Promise<JSON | false>
export function findItems(query: JSON): Promise<Array<JSON> | false>
export function findItems(query: JSON, projection: JSON): Promise<Array<JSON>|false>
export function setItem(newitem: JSON): Promise<boolean>
export function deleteItem(iid: string | number): Promise<boolean>
export function getObject(coll: string, oid: string | number): Promise<false | JSON>
export function findObjects(coll: string, query: JSON): Promise<false | Array<JSON>>
export function findObjects(coll: string, query: JSON, projection: JSON): Promise<false | Array<JSON>>
export function setObject(coll: string, newobj:JSON): Promise<boolean>
export function deleteObject(coll:string, oid:JSON): Promise<boolean>
export function setProp(coll:string, query:JSON, newvalue:JSON): Promise<boolean>
export function bulkWrite(coll:string, tasks:Array<JSON>): Promise<boolean>
export function deleteObjects(coll: string, filter: JSON): Promise<boolean>
export function sendMessage(channel: Channel, text: string): void
export function sendMessage(channel: Channel, text: string, override: boolean): void
export function replyMessage(message: Message, text: string): void
export function replyMessage(message: Message, text: string, override:boolean): void
export function deleteMessage(message: Message):void
export function dmUser(user: string, text: string):void
export function logCommand(message: Message, extratext: string): void
export function validate(message: Message, user: string): Promise<JSON>
export function validate(message: Message, user: string, spot: number): Promise<JSON>
export function hasSkill(user: JSON, skillid: number): boolean
export function hasSkill(user: JSON, skillid: number, enable: boolean):boolean
export function generateWeaponTemplate(owner: JSON, weapon: JSON, current: number, total: number): JSON
export function generateGuildTemplate(guild: JSON): JSON
export function generateItem(owner: JSON, itemid: number, attack: number, defense: number, rarity: number | string): JSON
export function generateItem(owner: JSON, itemid: number, attack: number, defense: number, rarity: number | string, name: string): JSON
export function generateItem(owner: JSON, itemid: number, attack: number, defense: number, rarity: number | string, name: string, modifiers: JSON): JSON
export function generateItem(owner: JSON, itemid: number, attack: number, defense: number, rarity: number | string, name: string, modifiers: JSON, isBulk: boolean): JSON
export function generateRandomItem(owner: JSON): JSON
export function generateRandomItem(owner: JSON, rarity: number): JSON
export function generateRandomItem(owner: JSON, rarity: number, isBulk: boolean): JSON
export function calcExtraStat(user: JSON, stat: string): number
export function calcLuckyBuff(user: JSON):number
export function errorlog(text:string):void
export function setCD(user: JSON, ts:number, cdsecs:number, cdname:string):void
export function calcTime(time1: number, time2: number): number
export function displayTime(time1: number, time2: number): string
export function extractTime(message: Message, timeword: string): number
export function calcDamage(message: Message, attacker: JSON, defender: JSON, initiator: JSON): number
export function calcStats(message: Message, user: JSON, stat: "attack" | "defense"): number
export function calcStats(message: Message, user: JSON, stat: "attack" | "defense", skillenable: boolean): number
export function calcStats(message: Message, user: JSON, stat: "attack" | "defense", skillenable: boolean, confused: boolean): number
export function voteItem(message: Message, user: JSON): void
export function voteItem(message: Message, user: JSON, dm: boolean):void
export function craftItems(message: Message, owner: JSON, minrarity: number, maxrarity: number, amount: number): string
export function craftItem(message: Message, owner: JSON): JSON
export function craftItem(message: Message, owner: JSON, minrarity: number, maxrarity: number): JSON
export function craftItem(message: Message, owner: JSON, minrarity: number, maxrarity: number, reply: boolean): JSON
export function craftItem(message: Message, owner: JSON, minrarity: number, maxrarity: number, reply: boolean, isBulk: boolean): JSON
export function raidInfo(message: Message, raid: JSON): void
export function summon(raid: JSON): void
export function summon(raid: JSON, level: number): void
export function summon(raid: JSON, level: undefined, minlevel: number, maxlevel: number, name: string, image: string): void
export function summon(raid: JSON, level: undefined, minlevel: number, maxlevel: number, name: string, image: string, ability: string): void
export function checkProps(message: Message, user: JSON): void
export function checkStuff(message: Message, user: JSON): void
export function checkBurn(message: Message, user: JSON): void
export function raidAttack(message: Message, user: JSON, raid: JSON): void
export function raidAttack(message: Message, user: JSON, raid: JSON, type: "raid" | "world" | "event"): void
export function raidAttack(message: Message, user: JSON, raid: JSON, type: "guild", guild: JSON): void
export function smeltItem(user: JSON, item: JSON): Array<number>
export function smeltItem(user: JSON, item: JSON, giveReward: boolean): Array<number>
export function smeltItem(user: JSON, item: JSON, giveReward: boolean, isBulk: boolean): Array<number>
export function itemFilter(message: Message, user: JSON, defaults: JSON): Promise<boolean | Array<JSON>>
export function getModifierText(modifierlist: JSON): string
export function checkxp(user: JSON): number