const { prefix } = require('../conf.json');

module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	// eslint-disable-next-line no-unused-vars
	aliases: ['commands'],
	usage: '[Command name]',
	cooldown: 3,
	execute(message, args) {
		const data = [];
		const { commands } = message.client;

		if(!args.length) {
			data.push('Currently I can do the following:');
			data.push(commands.map(command => command.name).join(', '));
			data.push(`\nIf you want to know how to use a specific command, you can send me ${prefix}help [command name]`);

			return message.author.send(data, { split: true })
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.reply('Check your PMs, I got a surprise for you.');
				})
				.catch(error => {
					console.error(`Something prevented me from sending help to ${message.author.tag}.\n`, error);
					message.reply('That\'s weird, I am unable to send you a PM, perhaps you have your PMs disabled?');
				});
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if(!command) {
			return message.reply('Beep, wrong, unexisting command.');
		}

		data.push(`**Name:** ${command.name}`);
		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Description:** ${command.description}`);
		if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

		data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

		message.channel.send(data, { split: true });
	},
};