const mongoose = require('mongoose')
let msg = require('../models/message.js')
const Discord = require('discord.js')
const client = new Discord.Client()
  async function Setup(client, url){
    if(!client) return
    if (!url) return 
    return mongoose.connect(url, {
      useNewUrlParser: true,
    });
  }
async function onMessage({userID, guildID, message}){
let data = await msg.findOne({userID: userID, guildID: guildID})
if(!data || data == null){
let s =  new msg({ userID: userID, guildID: guildID,count: 1 }).save()

} else {
data.count = parseInt(data.count) + parseInt(1)
await data.save()

}
}
async function AddMessage({userID, guildID, value}){
let data = await msg.findOne({userID: userID, guildID: guildID})
if(!data || data == null){
new msg({ userID: userID, guildID: guildID,count: parseInt(value) }).save()
}
data.count += parseInt(value)
await data.save().catch(e => console.log(e));
}



async function SubtractMessage({userID, guildID, message, count}){
let data = await msg.findOne({userID: userID, guildID: guildID})
if(!data || data == null){
return;

} else {
data.count -= count
await data.save().catch(e => console.log(e));
}

}
async function Fetch({userID, guildID}){
return new Promise(async (resolve, reject) => {
let data = await msg.findOne({userID: userID, guildID: guildID})
if(!data || data == null){
return data = 0

} else {
resolve(data.count)
}

})
}


async function Leaderboard({guildID, UsersFetch}){
return new Promise(async (resolve, reject) => {
    let data = await msg.find({guildID: guildID}) 

 let news = data.sort((a,b) => b.count-a.count)
let array =[]
for(let i=0; i < UsersFetch; i++){
if(news[i] === undefined ) continue;
array.push(news[i])
}
    let test = array.map((c,i) => `${++i} - <@!${c.userID}> - ${c.count}`)

    let final = test.join("\n")
resolve(final)
    
})
}

async function SubtractAllMessage({ guildID}){
let data = await msg.deleteMany({guildID: guildID})
if(data.length < 1){
return 

} else {

console.log(data)

}

}



module.exports = {
Setup,
onMessage,
AddMessage,
SubtractMessage,
Fetch,
Leaderboard,
SubtractAllMessage
}
