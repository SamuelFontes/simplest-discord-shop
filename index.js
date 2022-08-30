const Discord = require("discord.js"); // This was made using the 12.5.3 version because it was easier to set up
const client = new Discord.Client();
require('dotenv').config()

// Database
const database = require('./db');
const Products = require('./Models/Product');
const Clients = require('./Models/Client');
const Orders = require('./Models/Order');
database.sync();

client.on("ready", () =>{
    console.log("Bot working");
});

client.on("message", msg =>{
    // yandere dev style
    if(msg.content === "Hello"){
        msg.reply("World");
    } else if(msg.content === "list products"){
        Products.findAll().then( products => msg.reply(JSON.stringify(products)))
    } else if(msg.content === "show me what you got"){
        msg.reply(JSON.stringify(msg.member));
        msg.reply(JSON.stringify(msg.author));
        msg.reply(JSON.stringify(msg));
        msg.reply("oi")
    } else if(msg.content.includes("create product|")){

        Products.create({
            name: msg.content.split("|")[1],
            price: parseFloat(msg.content.split("|")[2]),
            description: msg.content.split("|")[3],
        }).then(res => msg.reply(JSON.stringify(res)))

    }
});

client.login(process.env.TOKEN);