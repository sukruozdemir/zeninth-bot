import {
  ActionRowBuilder,
  Client,
  Events,
  GatewayIntentBits,
  roleMention,
  StringSelectMenuBuilder,
} from 'discord.js';
import { AppConfigService } from './app-config.service';

export function startDiscord() {
  // Create a new client instance
  const client = new Client({
    intents: [GatewayIntentBits.Guilds],
  });

  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const guild = interaction.guild;
    const mappedRoles = guild.roles.cache.map((role) => ({
      label: role.name,
      value: role.id,
    }));

    console.log(guild.roles.cache);

    if (interaction.commandName === 'rol-sec') {
      const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId('select')
          .setPlaceholder('Rol seçin')
          .addOptions(mappedRoles),
      );

      await interaction.reply({
        components: [row],
      });
    } else if (interaction.commandName === 'selam-ver') {
      interaction.reply(`Selamlar!`);
    }
  });

  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isStringSelectMenu()) return;

    if (interaction.customId === 'select') {
      const selected = interaction.values[0];
      const role = interaction.guild.roles.cache.find((i) => i.id === selected);
      await interaction.reply({
        content: `Seçilen - ${role.name}`,
        components: [],
      });
    }
  });

  // When the client is ready, run this code (only once)
  // We use 'c' for the event parameter to keep it separate from the already defined 'client'
  client.once(Events.ClientReady, async (c) => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
    await client.application.commands.create({
      name: 'rol-sec',
      description:
        'Aktif olmayan kullanıcılarının değiştirileceği rolü seçiniz',
    });
    await client.application.commands.create({
      name: 'selam-ver',
      description: 'Serverdaki herkse selam ver!',
    });
  });

  // Log in to Discord with your client's token
  client.login(AppConfigService.config.token);
}
