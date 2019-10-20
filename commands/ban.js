module.exports = {
	name: 'ban',
	description: 'Ban a user',
	execute(message, args) {
		const user = message.mentions.members.first();
		const reason = args.slice(1).join(' ');
		user.ban(reason).then(() => {
			return message.reply(`May ${user.tag}'s soul rest in peace.`);
		}).catch(err => {
			message.reply('I am shocked, can\'t ban this person woah');
			console.error(err);
		});
	},
};