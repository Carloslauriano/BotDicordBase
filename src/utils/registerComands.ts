import { REST, Routes } from "discord.js";
import * as path from 'node:path'
import * as fs from 'node:fs'

export async function registerComands(guilds: string[]) {
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

}