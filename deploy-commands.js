require('dotenv').config()
const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');

const commands = [
	new SlashCommandBuilder().setName('menu').setDescription('show menu'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.APPLICATION_ID, process.env.SERVER_ID), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
