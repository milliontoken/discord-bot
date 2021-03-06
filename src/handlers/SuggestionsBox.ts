import { Message } from "discord.js";
import { IMessageHandler } from "./IMessageHandler";

export class SuggestionsBox implements IMessageHandler {
    
    private channel_id = '867302015892717568'


    handle(message: Message): void 
    {

        try
        {
            if (message.channel.id == this.channel_id) 
            {
                message.react('✅')
                message.react('❌')
            }
        }
        catch (err) {console.log('Error in SuggestionsBox: ' + err)}
    }
}