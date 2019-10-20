module.exports = {
	name: 'args-info',
	description: 'Information about the provided arguments.',
	args: true,
	execute(message, args) {
		if (args[0] === 'foo') {
			return message.channel.send('bar');
		}
		// eslint-disable-next-line no-undef
		message.channel.send(`First argument: ${args[0]}`);
		message.channel.send(`all argument: ${args}`);


	},
};