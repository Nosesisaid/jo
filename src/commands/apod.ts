import axios from "axios";
import {  MessageEmbed } from "discord.js";
import Command from "../types/Command";
import CommandArg from "../types/CommandArg";
import CommandCall from "../types/CommandCall";
import { formatDateMDY as formatDate } from "../types/misc";
class ApodCommmand extends Command {
    constructor(){
        super({
            aliases: ["apod"],
            description: "Get the Astronomy Picture of the Day",
            args: [new CommandArg({name:"date", required: false, description: "Date of the picture", type: "string"})]
        })
    }

    async run(call: CommandCall) {
        
        let dateString: string |undefined = undefined
        if (call.args.date) {const date: Date | undefined = new Date(call.args.date)
        if (date.toString() == "Invalid Date") return call.reply({content:"Invaild date."})
        dateString = formatDate(date)
        }
        const key = process.env.NASA_API_KEY ? process.env.NASA_API_KEY : "DEMO_KEY";
        const {data} = dateString ? await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${key}&date=${dateString}`) : await axios.get("https://api.nasa.gov/planetary/apod?api_key=" + key);
        
        const embed = new MessageEmbed()
        .setAuthor("Astronomy Picture of the Day")
        .setColor("#0099ff")
        .setTitle(data.title)
        .setImage(data.url)
        .setFooter(data.date+" | "+data.copyright)

        return call.reply({embeds: [embed]});
    }
}
export default ApodCommmand