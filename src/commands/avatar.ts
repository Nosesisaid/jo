import CommandCall from "../types/CommandCall";
import CommandArg from "../types/CommandArg";
import Command from "../types/Command";
import { MessageEmbed } from "discord.js";
class AvatarCommand extends Command {
  constructor() {
    super({
      aliases: ["avatar", "pfp"],
      description: "Get the avatar of a user or member",
      args: [
        new CommandArg({
          name: "user",
          type: "user",
          required: false,
          description: "The user to get the avatar of",
        }),
      ],
    });
  }

  async run(call: CommandCall) {
    let member =
      (await call.member.guild.members.fetch(call.args.user)) || call.member;
    let avatar = member.displayAvatarURL({ size: 2048, dynamic: true });

    const embed = new MessageEmbed()
      .setAuthor(member.displayName, avatar)
      .setImage(avatar)
      .setColor(member.displayHexColor)
      .setFooter(`ID: ${member.id}`)
      .setDescription(
        `[Link](${avatar}),[png](${member.displayAvatarURL({
          size: 2048,
          format: "png",
        })}), [user](${member.user.displayAvatarURL({
          size: 2048,
          dynamic: true,
        })})`
      );

    call.reply({ embeds: [embed] });
  }
}
