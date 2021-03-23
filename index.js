const { Client, MessageEmbed } = require('discord.js');
const config = require('./config');
const commands = require('./help');
var fs = require('fs');

let bot = new Client({
  fetchAllMembers: true, // Remove this if the bot is in large guilds.
  presence: {
    status: 'online',
    activity: {
      name: `${config.prefix}help`,
      type: 'LISTENING'
    }
  }
});

bot.on('ready', () => console.log(`Logged in as ${bot.user.tag}.`));

bot.on('message', async message => {
  // Check for command
  if (message.content.startsWith(config.prefix)) {
    let args = message.content.slice(config.prefix.length).split(' ');
    let command = args.shift().toLowerCase();

    switch (command) {

      case 'ping':
        let msg = await message.reply('Pinging...');
        await msg.edit(`PONG! Message round-trip took ${Date.now() - msg.createdTimestamp}ms.`)
        break;
      case 'invite':
      message.channel.send("https://discord.com/api/oauth2/authorize?client_id=823021725557325834&permissions=0&scope=bot")
      break
      case 'say':
      case 'repeat':
        if (args.length > 0)
          message.channel.send(args.join(' '));
        else
          message.reply('You did not send a message to repeat, cancelling command.')
        break
       case 'stocks':
        if (args[0]==="help"){
          message.channel.send("How I work....\nFirst, use s!create company to register a company. I will give you $5,000 to start with. You can then use s!job accept or s!job create to make a job. This can be used to gain money. You can also use s!stocks buy or s!stocks sell to buy and sell stocks for money. How buying stocks works is that you are by default given 100 shares with your company. You can sell these to people who want to buy them. You can also sell shares that you own from other companies to other people/companies.")
        }
        
        else if(args[0]==="create"){
          
          fs.writeFile('stocks/companies/'+ args[1] + '.txt', args[1] + '\nFunds:  5,000 dollars', function (err) {
          if (err) throw err;
          console.log('Saved!');
                try {
          var dat = fs.readFileSync('stocks/companies/' + args[1] + '.txt', 'utf8')
            console.log("File read.")
          } catch (err) {
           message.channel.send(err)
          }
          message.channel.send("Company Saved as " + dat)
        
          });
    }
     else if(args[0]==="view"){
         
                try {
          var dat = fs.readFileSync('stocks/companies/' + args[1] + '.txt', 'utf8')
            console.log("File read.")
          } catch (err) {
           message.channel.send(err)
          }
          message.channel.send("Company Information:\n" + dat)
        
        
    }
   
        else
          message.reply('Hmmmmm. I cannot find what you are looking for...')
        break
      case 'butwhyyyyyyyyyyyyyyyyyyyyyyyyyyy':
      message.channel.send("because i said so")
      break

      /* Unless you know what you're doing, don't change this command. */
      case 'help':
        let embed =  new MessageEmbed()
          .setTitle('HELP MENU')
          .setColor('GREEN')
          .setFooter(`Requested by: ${message.member ? message.member.displayName : message.author.username}`, message.author.displayAvatarURL())
          .setThumbnail(bot.user.displayAvatarURL());
        if (!args[0])
          embed
            .setDescription(Object.keys(commands).map(command => `\`${command.padEnd(Object.keys(commands).reduce((a, b) => b.length > a.length ? b : a, '').length)}\` :: ${commands[command].description}`).join('\n'));
        else {
          if (Object.keys(commands).includes(args[0].toLowerCase()) || Object.keys(commands).map(c => commands[c].aliases || []).flat().includes(args[0].toLowerCase())) {
            let command = Object.keys(commands).includes(args[0].toLowerCase())? args[0].toLowerCase() : Object.keys(commands).find(c => commands[c].aliases && commands[c].aliases.includes(args[0].toLowerCase()));
            embed
              .setTitle(`COMMAND - ${command}`)

            if (commands[command].aliases)
              embed.addField('Command aliases', `\`${commands[command].aliases.join('`, `')}\``);
            embed
              .addField('DESCRIPTION', commands[command].description)
              .addField('FORMAT', `\`\`\`${config.prefix}${commands[command].format}\`\`\``);
          } else {
            embed
              .setColor('RED')
              .setDescription('This command does not exist. Please use the help command without specifying any commands to list them all.');
          }
        }
        message.channel.send(embed);
        break;
    }
  }
});

require('./server')();
bot.login(config.token);