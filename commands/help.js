const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {

  if (!message.guild.me.hasPermission("ADMINISTRATOR")) return message.guild.owner.send("I don't have Administrator Permission in **" + message.guild.name + "** !");
    
  const prefix = require('../models/prefix');

  const data = await prefix.findOne({
    GuildID: message.guild.id
  });
  
  if(data) {

    const prefijo = data.Prefix;

    const embed = new Discord.MessageEmbed()
    .setAuthor('Anti IP Loggers')
    .setDescription('This bot delete all the IP loggers links in your server.\n\n Here you can check all the commands of the bot:')
    .addField(`${prefijo}help`, '*Show this menu...*')
    .addField(`${prefijo}invite`, '*You can check all the places where you can invite the bot*')
    .addField(`${prefijo}phish`, '*The bot sends you a list with all the pishing sites*')
    .addField(`${prefijo}setprefix`, '*Change the prefix for this server*')
    .addField(`${prefijo}clear`, '*This delete the amount of message that you want*')
    .setColor("RANDOM");
  
  message.channel.send(embed)

  } else if(!data) {

    const embed = new Discord.MessageEmbed()
    .setAuthor('Anti IP Loggers')
    .setDescription('This bot delete all the IP loggers links in your server.\n\n Here you can check all the commands of the bot:')
    .addField(`-help`, '*Show this menu...*')
    .addField(`-invite`, '*You can check all the places where you can invite the bot*')
    .addField(`-phish`, '*The bot sends you a list with all the pishing sites*')
    .addField(`-setprefix`, '*Change the prefix for this server*')
    .addField(`-clear`, '*This delete the amount of message that you want*')
    .setColor("RANDOM");
  
  message.channel.send(embed)

  }

  
}

module.exports.config = {
    name: "help",
    aliases: []
}

//.addField(`${prefijo}algo`, '*Algo*')