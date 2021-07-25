import { Message } from "discord.js";
import { IMessageHandler } from "./IMessageHandler";

export class MessageHandlerManager 
{
    private _manager:IMessageHandler[]

    constructor()
    {
        this._manager = new Array<IMessageHandler>()
    }

    add(handler:IMessageHandler):MessageHandlerManager 
    {
        this._manager.push(handler)
        return this
    }

    handle(message:Message):void 
    {
        this._manager.forEach((val) => {val.handle(message)})
    }


}