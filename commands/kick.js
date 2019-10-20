module.exports = {
	name: 'kick',
	description: 'Kick a user',
	execute(message, args) {
		if (!message.guild) return;

		const user = message.mentions.users.first();
		if(user) {
			const member = message.guild.member(user);
			if (member) {
				member.kick().then(() => {
					message.reply(`Woah, you just kicked ${user.tag}`);
				}).catch(err => {
					message.reply('Can\'t do that, sorry');
					console.error(err);
				});
			}
			else {
				message.reply('This user is not in here right now.');
			}

		}
		else {
			message.reply('Please don\'t forget to tell me his nickname :/');
		}
	},
};