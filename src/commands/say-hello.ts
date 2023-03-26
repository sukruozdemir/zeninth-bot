import { SlashCommandBuilder } from 'discord.js';

const sayHello = {
  data: new SlashCommandBuilder()
    .setName('selam-ver')
    .setDescription('Serverdaki herkese selam ver'),
  async execute(interaction) {
    await interaction.reply('Selam!');
  },
};

export default sayHello;
