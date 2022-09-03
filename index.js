// Require the necessary discord.js classes
const { Client, GatewayIntentBits } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionsBitField } = require('discord.js');



// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

require('dotenv').config()

// Database
const database = require('./db');
const Products = require('./Models/Product');
const Clients = require('./Models/Client');
const Orders = require('./Models/Order');
const { DATE } = require('sequelize');
database.sync();

client.on("ready", () =>{
    console.log("Bot working");
});

/*
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
*/

client.on('interactionCreate', async interaction => {
    try{
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName === 'menu') {
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('ticket')
                        .setLabel('Novo Ticket')
                        .setStyle(ButtonStyle.Primary),
                );
            
            row.addComponents(
                new ButtonBuilder()
                    .setCustomId('hello')
                    .setLabel('Say Hello')
                    .setStyle(ButtonStyle.Danger),
            );

            await interaction.reply({ content: 'Escolha a ação:', components: [row] });
        }

    }
    catch(err){
        console.log(err);
    }
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isButton()) return;

    try{
        if(interaction.customId==="ticket"){
            var channelName = interaction.member.user.tag+"-"+Date.now();
            let everyoneRole = interaction.guild.roles.cache.find(r => r.name === '@everyone');
            interaction.guild.channels.create({ 
                name: channelName, 
                reason: 'Novo ticket',
                permissionOverwrites: [{
                    id: everyoneRole.id,
                    deny: [PermissionsBitField.Flags.ViewChannel],

                }, {
                    id: interaction.user.id,
                    allow: [PermissionsBitField.Flags.ViewChannel],

                }
            ],
            }).then((channel) => {
                    interaction.reply({ content: "Ticket criado: <#"+ channel+">", ephemeral: true })
            })
            .catch(err => {
                console.log(err)
                interaction.reply({ content: "Erro ao abrir o ticket.", ephemeral: true })

            });

        }
        else if(interaction.customId==="hello")
            interaction.reply("Hello")
        

    }
    catch(error){
        console.log(error)
    }


});

// Login to Discord with your client's token
client.login(process.env.TOKEN);