module.exports = {
	name: 'prune',
	description: 'Delete a specified number of messages',
	guildOnly: true,
	// eslint-disable-next-line no-unused-vars
	execute(message, args) {
		const amount = parseInt(args[0] + 1);

		if(isNaN(amount)) {
			return message.reply('Whoa cowboy, is that a real number over there?');
		}
		else if (amount <= 1 || amount > 100) {
			return message.reply('Ugh, I am limited to only accept numbers between 1 and 99...');
		}
		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send('Welp, that was a weird bug');
		});
	},
};