const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    
    const embed = new Discord.MessageEmbed()
    .setAuthor('Anti IP Loggers')
    .setDescription("[Invite this bot](https://github.com/rastacabeza)\n[Support Server](https://github.com/rastacabeza)\n[Top.gg](https://github.com/rastacabeza)")
    .setColor("RANDOM")
  
    message.channel.send(embed)

}

module.exports.config = {
    name: "invite",
    aliases: []
}