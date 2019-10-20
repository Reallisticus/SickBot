const fs = require('fs');

const Discord = require('discord.js');
const { prefix, token } = require('./conf.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cds = new Discord.Collection();

client.on('ready', () => {
	console.log('Ready!');
});

client.on('guildMemberAdd', member => {
	const channel = member.guild.channels.find(ch => ch.name === 'general');

	if (!channel) return;
	channel.send(`Buongiorno ${member}`);
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
	|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if(command.guildOnly && message.channel.type !== 'text') {
		return message.reply('Mmmm, nah, you can use this only inside the server bud!');
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if(command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	if(!cds.has(command.name)) {
		cds.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cds.get(command.name);
	const cdsAmount = (command.cooldown || 3) * 1000;

	if(timestamps.has(message.author.id)) {
		const expirationDate = timestamps.get(message.author.id) + cdsAmount;

		if(now < expirationDate) {
			const timeLeft = (expirationDate - now) / 1000;
			return message.reply(`You gotta wait ${timeLeft.toFixed(1)} seconds befoer using that again.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cdsAmount);

	try{
		command.execute(message, args);
	}
	catch(error) {
		console.error(error);
		message.reply('Something unexpected happened, try again.');
	}
});

client.login(token);

