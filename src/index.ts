import 'dotenv/config'

import { Client, Collection, GatewayIntentBits, Partials } from 'discord.js'
import * as path from 'node:path'
import * as fs from 'node:fs'

async function main() {

  const discordClient = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.GuildMessageTyping,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.DirectMessageReactions,
      GatewayIntentBits.DirectMessageTyping
    ],
    partials: [
      Partials.User,
      Partials.Channel,
      Partials.GuildMember,
      Partials.Message,
      Partials.Reaction,
      Partials.GuildScheduledEvent,
      Partials.ThreadMember,
    ]
  })
  discordClient.commands = new Collection();

  const foldersPath = path.join(__dirname, 'commands');
  const commandFolders = fs.readdirSync(foldersPath);

  for (const file of commandFolders) {
    const fullFilePath = path.join(foldersPath, file); 
    const command = require(fullFilePath)

    if ('data' in command && 'execute' in command) {
      discordClient.commands.set(command.data.name, command);
    } else {
      console.log(`[WARNING] The command at ${fullFilePath} is missing a required "data" or "execute" property.`);
    }
  }

  const eventsPath = path.join(__dirname, 'events');
  const eventFiles = fs.readdirSync(eventsPath);

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath)
    if (event.once) {
      discordClient.once(event.name, (...args) => event.execute(...args));
    } else {
      discordClient.on(event.name, (...args) => event.execute(...args));
    }
  }

  await discordClient.login(process.env.BOT_TOKEN)
}

try {
  main()
} catch (error) {
  console.error(error);

}