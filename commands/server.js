module.exports = {
	name: 'server',
	description: 'Display server info',
	execute(message) {
		message.channel.send(`Server name: ${message.guild.name}\nServer owner: ${message.guild.owner}\nTotal # of members: ${message.guild.memberCount}`);
	},
};