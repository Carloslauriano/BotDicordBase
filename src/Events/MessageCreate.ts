import { Events, Message } from "discord.js";

export const name = Events.MessageCreate

export const execute = async (message:Message) => {
  
  if (message.type == 0 ) console.log(message);

  return true
}