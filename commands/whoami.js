const Discord = require('discord.js');

module.exports = {
	name: 'whoami',
	description: 'Display info about yourself.',
	execute(message) {
		const whoamiEmbed = new Discord.RichEmbed()
			.setColor('#0099ff')
			.setTitle('You are:')
			.setURL('https://e-sim.org')
			.setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL}`, 'https://e-sim.org')
			.setDescription('bla bla testing this shit')
			.setThumbnail(`${message.author.displayAvatarURL}`)
			.addField('Damage:', 'TODO', true)
			.addField('Birthday: ', 'TODO', true)
			.addField('Citizenship: ', 'TODO', true)
			.addField('MU: ', 'TODO', true)
			.setTimestamp()
			.setFooter('Something', 'https://i.imgur.com/wSTFkRM.png');


		return message.channel.send(whoamiEmbed);
	},
};