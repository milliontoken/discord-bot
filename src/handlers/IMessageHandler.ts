import { Message } from "discord.js";

export interface IMessageHandler 
{
    handle(message:Message):void
} 