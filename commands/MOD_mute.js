module.exports = {
  name: 'mute',
  aliases: ['quiet'],
  description: 'Mutes a user.',
  usage: '<user> <reason>',
  cooldown: 0,
  mod:true,
  nodelay:true,
	execute(message, args, client) {
    const Discord = require('discord.js');
    
    const fs = require('fs');
    const {MuteRoleID} = require('../config.json');
    try {
      if (message.author.id == message.mentions.members.first().id){respond('',`Are you REALLY gonna try and mute **YOURSELF**`, message.channel);return;}
      const {ModeratorRoleID} = require('../config.json');
      const checkmemberforroles = message.mentions.members.first()
      if (checkmemberforroles.roles.cache.some(role => role.id === `${ModeratorRoleID}`)){respond('',`You can't perform that action on this user.`, message.channel);return;;return;}
      let reasonraw = args.filter(arg => !Discord.MessageMentions.USERS_PATTERN.test(arg));
      const reason = reasonraw.join(' ')
     const taggeduser = message.mentions.members.first().id
     const guild = message.guild
     const role = guild.roles.cache.find(role => role.id === `${MuteRoleID}`);
     const mentionedmember = '<@'+message.mentions.users.first().id+'>'
      const member = message.mentions.members.first();
     member.roles.add([role]);
     respond('🔇 Muted',`You were muted due to:\n ${reason}`, member)
     respond('🔇 Muted',mentionedmember+' was muted.', message.channel);
      fs.appendFileSync('./logs/' + taggeduser + '-warnings.log', 'Mute\nReason: ' + reason +'\n\n');
      fs.appendFileSync('./logs/' + taggeduser + '-modwarnings.log', 'Mute issued by '+ message.author.tag +'\nReason: ' + reason +'\n\n');
      muteaction(member, message.author.tag, reason)
    }catch(error) {
      respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
      errorlog(error)
      // Your code broke (Leave untouched in most cases)
      console.error('an error has occured', error);
      }
  }}