<h1>Hi 👋</h1>
<h1>Discord-Measages System Using MongoDB</h1>
<hr>
</hr>
Discord-Message<br>
- A lightweight and easy to use,  
framework for discord bots, uses MongoDB.<br>

# How To Install It In Your Project:?

<br>
</br>

```cli
npm i discord-msg
```
<br>
<br>

# Setting Up
First things first, we include the module into the project.
<br>
</br>

```js
const Message = require("discord-msg");
```
<br>
Then you need to provide a valid MongoDB database url and client

```js
Message.Setup(client, 'DataBase Url')
```
<br>
</br>

# Methods
<br>

```js
onMessage({
message,
guildID: GuildID,
userID: UserID
})
```
<hr></hr>

```js
AddMessage({
guildID: GuildID,
userID: UserID,
Value: Num
})
```
<hr></hr>

```js
SubtractMessage({
guildID: GuildID,
userID: UserID,
Value: Num
})
```
<hr></hr>

```js
Fetch({
guildID: GuildID,
userID: UserID,

}).then(count => <Measage>.channel.send(count))
```
<hr>
</hr>

```js
Leaderboard({
guildID: GuildID,
UsersFetch,
}).then(Leader => <Measage>.channel.send(Leader))
```

<hr></hr>

# Source Code: 

<br>

```js
const Discord = require('discord.js')
const client = new Discord.Client()
const Message = require('discord-msg')
const prefix = "+"
Setup(client, 'MongoDB DataBase Url')
client.on('message', async message => {
if(message.content.startsWith(prefix + "top")){
if(message.author.bot || !message.guild) return 
await Message.Leaderboard({
guildID: message.guild.id,
UsersFetch: 2
}).then(Leader => {

message.channel.send(new Discord.MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setDescription(Leader).setTimestamp().setFooter(`Leaderboard For: ${message.guild.name}`).setColor('RANDOM'))
})
}
})

client.on('message', async message => {
if(message.author.bot || !message.guild) return 
await Message.onMessage({
message,
userID: message.author.id,
guildID: message.guild.id,
})
})

client.on('message', async message => {
if(message.content.startsWith(prefix + "fetch")){
if(message.author.bot || !message.guild) return 
let u = message.mentions.users.first()
if(!u) return
await Message.Fetch({
userID: u.id,
guildID: message.guild.id
}).then(count => {
message.channel.send(count)
}).catch(err => console.log(err))

}
})
client.on('message', async message => {
if(message.content.startsWith(prefix + "add")){
if(message.author.bot || !message.guild) return 
if(message.author.id == 'Your ID'){

let u = message.mentions.users.first()
if(!u) return
let args = message.content.split(' ').slice(2).join(' ')
if(!args) return 
if(args.includes('-')) return message.channel.send('Nice Try Bro')
await Message.AddMessage({
userID: u.id,
guildID: message.guild.id,
value: parseInt(args)
})
message.channel.send('done')
}
}
})

client.on('message', async message => {
if(message.content.startsWith(prefix + "subtract")){
if(message.author.bot || !message.guild) return 
if(message.author.id == 'Your ID'){
let u = message.mentions.users.first()
    
let args = message.content.split(' ').slice(2).join(' ')
if(!args) return 
await Message.SubtractMessage({
userID: u.id,
guildID: message.guild.id,
count: args
})
message.channel.send('done')
}
}
})
```
<br>
# In The End ✌️ 
Any Bug Or Suggestion:<br>
Discord: #B A D B O Y #1502<br>
Good Luck With discord-msg
