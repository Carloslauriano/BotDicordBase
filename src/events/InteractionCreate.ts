// ⚠️ DO NOT REMOVE THIS FILE ⚠️
// This file is essential for the Discord bot's command system to function.
// Deleting it will break the command registration and execution process.

// ⚠️ NÃO REMOVA ESTE ARQUIVO ⚠️
// Este arquivo é essencial para o bot do Discord funcionar corretamente.
// Ele é responsável por executar os comandos do bot.
// Remover este arquivo fará com que o sistema de comandos pare de funcionar.

mport { Events } from "discord.js";

export const name = Events.InteractionCreate

export const once = false

export const execute = async (interaction: any) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
    } else {
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  }
}

