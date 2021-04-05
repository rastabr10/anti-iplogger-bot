const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {

    if (!message.guild.me.hasPermission("ADMINISTRATOR")) return message.guild.owner.send("I don't have Administrator Permission in **" + message.guild.name + "** !");

    const embed = new Discord.MessageEmbed()
    .setAuthor('Anti IP Loggers')
    .setDescription("If you want to check a list with all the phishing websites reported up to now [click here](https://openphish.com/feed.txt)")
    .setColor("RED")
    message.author.send(embed)
    message.reply("Check your DM")

}

module.exports.config = {
    name: "phish",
    aliases: []
}