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

client.on('interactionCreate', async interaction => {
    try{
        console.log(interaction.user)
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
            createTicket(interaction)
        }
        else if(interaction.customId==="hello")
            interaction.reply("Hello")
        else if(interaction.customId==="edit_message"){
            console.log(lastMessageSent)
            var msg = await interaction.channel.messages.fetch(lastMessageSent) 
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('butao')
                        .setLabel('butao')
                        .setStyle(ButtonStyle.Primary),
                );
            
            msg.edit({content:"editado", components: [row]})
        }
        

    }
    catch(error){
        console.log(error)
    }


});

var lastMessageSent

async function createTicket(interaction,productId){
    // Create user if not exist
    var client = await Clients.findByPk(interaction.user.id)
    if(!client)
        client = await Clients.create({clientId:interaction.user.id,username:interaction.user.username, dateCreated:Date.now()})
    console.log(client)
    // if product exists send product
    // create order
    var order = await Orders.create({clientId: client.clientId,productId: productId ?? null,dateCreated:Date.now()})

    // create channel

    var channelName = interaction.user.username + "-" + order.orderId;
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
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('edit_message')
                        .setLabel('Teste edicao')
                        .setStyle(ButtonStyle.Primary),
                );
            
            row.addComponents(
                new ButtonBuilder()
                    .setCustomId('hello')
                    .setLabel('Say Hello')
                    .setStyle(ButtonStyle.Danger),
            );

            channel.send({content:`Olá <@${interaction.user.id}> esse é o seu ticket`, components: [row] }).then(msg => lastMessageSent = msg.id)
            
    })
    .catch(err => {
        console.log(err)
        interaction.reply({ content: "Erro ao abrir o ticket.", ephemeral: true })

    });

}

// Login to Discord with your client's token
client.login(process.env.TOKEN);