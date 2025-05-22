import { REST, Routes } from "discord.js";
import * as path from 'node:path'
import * as fs from 'node:fs'

/**
 * Registers Discord bot commands either globally or for specific guilds.
 *
 * This function reads command modules from the `commands` directory, validates their structure,
 * and registers them using the Discord REST API. If a list of guild IDs is provided, the commands
 * are registered for each specified guild (for development or testing). If no guilds are specified,
 * the commands are registered globally.
 *
 * @param guilds - Optional array of guild (server) IDs to register commands for. If omitted, commands are registered globally.
 * @returns A promise that resolves when all commands have been registered.
 *
 * @remarks
 * - Requires `BOT_TOKEN` and `BOT_ID` environment variables to be set.
 * - Command modules must export both `data` (with a `toJSON()` method) and `execute` properties.
 * - Logs warnings for invalid command modules and errors encountered during registration.
 */
export async function registerComands(guilds?: string[]) {
  const rest = new REST().setToken(process.env.BOT_TOKEN!);

  const foldersPath = path.join(__dirname, '..', 'commands');
  const commandFolders = fs.readdirSync(foldersPath);
  const commands: any[] = [];

  for (const file of commandFolders) {
    const fullFilePath = path.join(foldersPath, file);
    const command = require(fullFilePath)
    if ('data' in command && 'execute' in command) {
      commands.push(command.data.toJSON())
    } else {
      console.log(`[WARNING] The command at ${fullFilePath} is missing a required "data" or "execute" property.`);
    }
  }

  if (guilds) {
    for (let index = 0; index < guilds.length; index++) {
      const guildId = guilds[index];

      try {
        await rest.put(
          Routes.applicationGuildCommands(process.env.BOT_ID!, guildId),
          { body: commands },
        );
      } catch (error) {
        console.error(error);
      }
    }
  } else {
    try {
      await rest.put(
        Routes.applicationCommands(process.env.BOT_ID!),
        { body: commands },
      );
      console.log(`Successfully registered application commands globally. ${commands.length} commands.`);
    } catch (error) {
      console.error(error);
    }
  }
}
