const Discord = require("discord.js"); // This was made using the 12.5.3 version because it was easier to set up
const client = new Discord.Client();
require('dotenv').config()

client.on("ready", () =>{
    console.log("Bot working");
});

client.on("message", msg =>{
    if(msg.content === "Hello"){
        msg.reply("World");
    }
});

client.login(process.env.TOKEN);