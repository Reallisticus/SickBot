module.exports = {
	name: 'avatar',
	description: 'Get user avatar',
	aliases: ['icon', 'pfp'],
	cooldown: 10,
	// eslint-disable-next-line no-unused-vars
	execute(client, message, args) {
		if(args[0]) {
			// eslint-disable-next-line no-undef
			const user = getUserFromMention(args[0]);

			if (!user) {
				return message.reply(`${message.author.username}, you have provided me with a wrong nickname, please try again!`);
			}
			return message.channel.send(`${user.username}'s avatar:\n${user.avatarURL}`);
		}
		return message.channel.send(`${message.author.username}, your avatar:\n${message.author.avatarURL}`);

		function getUserFromMention(mention) {
			const matches = mention.match(/^<@!?(\d+)>$/);

			if (!matches) return;

			const id = matches[1];

			return client.users.get(id);

		}
	},
};