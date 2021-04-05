const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {

  const number = args.join(' ')

        if(!message.member.hasPermission("MANAGE_MESSAGES")) {
            const no = new Discord.MessageEmbed()
            .setDescription(`:x: You dont have any permissions to execute this command!`)
            .setColor(`RED`)
            message.channel.send(no)

        } else {
           if (!message.guild.me.hasPermission("ADMINISTRATOR")) {
              message.guild.owner.send("I don't have Administrator Permission in **" + message.guild.name + "** !");
           } else {
                if(!number) {
                    const naw = new Discord.MessageEmbed()
                    .setDescription(`:x: Please enter a number!`)
                    .setColor(`RED`)
                    message.channel.send(naw)
                } else {
                if(isNaN(number)) {

                        const notanumber = new Discord.MessageEmbed()
                        
                        .setDescription(`:x: This is not a valid number!`)
                        .setColor(`RED`)

                        message.channel.send(notanumber)
                } else {
                    if(number > 100) {

                        const ripchatlmao = new Discord.MessageEmbed()
                        .setDescription(`:x: Please enter a number from 1 - 100!`)
                        .setColor(`RED`)

                        message.channel.send(ripchatlmao)
                    } else {
                        if(number < 1) {
                          const megobruhnow = new Discord.MessageEmbed()
                          .setDescription(`:x: Please enter a number higher than 0!`)
                          .setColor(`RED`)

                          message.channel.send(megobruhnow)
                        } else {
                          const awaits = await message.channel.bulkDelete(number)

                          const done = new Discord.MessageEmbed()
                          .setTitle('Success!')
                          .setDescription(`Deleted ${awaits.size} messages in from this channel!`)
                          .setColor(`RED`)

                          message.channel.send(done).then(sent => sent.delete({ timeout: 5000 }))
                        }
                    }
            }         
        }
    }
    }

}

module.exports.config = {
    name: "clear",
    aliases: []
}

//{ name: `Inline field title`, value: `Some value here`, inline: true },