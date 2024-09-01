import { Events } from "discord.js";
import { registerComands } from "../utils/registerComands";

export const name = Events.ClientReady

export const once = true

export const execute = async (client:any) => {
  const Guilds = client.guilds.cache.map((guild:any) => guild.id);
  await registerComands(Guilds)
  
  console.log(`Ready! Logged in as ${client.user.tag}`);
}