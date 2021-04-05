const Discord = require('discord.js');
const bot = new Discord.Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
const {
    loadCommands
} = require('./utils/loadCommands');
const mongoose = require('mongoose');
//Make sure to require this model in your message event or index.js if you use message event on there. in this case im going to require it here
const prefix = require('./models/prefix');

mongoose.connect('YourMongoDBURLHere', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
bot.login("YourTokenHere");

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

loadCommands(bot);

bot.on("ready", () => {
    console.log(`${bot.user.tag} is online.`);
    bot.user.setActivity('-help For Help', { type: "WATCHING" });

    bot.user.setPresence({
        status: 'dnd',
        activity: {
            name: "-help or mention me | Remember that I need the ADMINISTRATOR permissions.",
            type: "WATCHING"
        }
    });
});

bot.on('message', async (message) => {
    if (message.author.bot) return;

    //Getting the data from the model
    const data = await prefix.findOne({
        GuildID: message.guild.id
    });

    const messageArray = message.content.split(' ');
    const cmd = messageArray[0];
    const args = messageArray.slice(1);

    //If there was a data, use the database prefix BUT if there is no data, use the default prefix which you have to set!
    if(data) {
        const prefix = data.Prefix;

        if (!message.content.startsWith(prefix)) return;
        const commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));
        commandfile.run(bot, message, args);
    } else if (!data) {
        //set the default prefix here
        const prefix = "-";
        
        if (!message.content.startsWith(prefix)) return;
        const commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));
        commandfile.run(bot, message, args);
    }
});

bot.on("message", async (message) => {
    const data = await prefix.findOne({
        GuildID: message.guild.id
    });

    if(data) {

        const prefijo = data.Prefix

        if (message.mentions.has(bot.user.id)) return message.channel.send(`The prefix in this server is **${prefijo}**`);

    } else if (!data) {

        if (message.mentions.has(bot.user.id)) return message.channel.send(`The prefix in this server is **-**`);

    }
    
});

bot.on("message", message => {
  if (!message.guild.me.hasPermission("ADMINISTRATOR")) return message.guild.owner.send("I don't have Administrator Permission in **" + message.guild.name + "** !");

  const BannedWords = [`lovebird.guru`, `trulove.guru`, `dateing.club`, `otherhalf.life`, `shrekis.life`, `headshot.monster`, `gaming-at-my.best`, `progaming.monster`, `yourmy.monster`, `screenshare.host`, `imageshare.best`, `screenshot.best`, `gamingfun.me`, `catsnthing.com`, `mypic.iu`, `catsnthings.fun`, `curiouscat.club`, `joinmy.site`, `fortnitechat.site`, `fortnight.space`, `freegiftcards.co`, `stopify.co`, `leancoding.co`, `grabify.link`, `iplogger.org`, `2no.co`, `iplogger.com`, `iplogger.ru`, `yip.su`, `iplogger.co`, `iplogger.info`, `ipgrabber.ru`, `ipgraber.ru`, `iplis.ru`, `02ip.ru`, `ezstat.ru`, `guest.link`]

  if (BannedWords.some(word => message.toString().toLowerCase().includes(word))) {message.delete().catch(e => console.error("Couldn't delete message.")); message.reply(`**Please don't send IP Grabbers/Loggers**`)};
});

bot.on('guildCreate', guild => {
    const embed = new Discord.MessageEmbed()
    .setDescription("Type `-help` to start in *" + guild.name + "* .\n")
    .setFooter("Our Oficial Discord Support Server:")
    .setColor("RED")

    guild.owner.send("Thanks for adding me to your server")
    guild.owner.send(embed)
    guild.owner.send("Made By <@696022986356031498>!")
    
});