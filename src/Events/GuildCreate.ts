import { Events, Guild } from "discord.js";
import { registerComands } from "../utils/registerComands";

export const name = Events.GuildCreate

export const once = true

export const execute = async (guild: Guild) => {
  await registerComands([guild.id])
}