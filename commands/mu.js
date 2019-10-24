const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	name: 'mu',
	description: 'Get information about an e-sim account.',
	usage: '[Citizen Name] [Server]',
	cooldown: 5,
	execute: async (message, args, SERVERS = 'alpha') => {
		if (!args.length) {
			return message.channel.send('Please provide a username');
		}

		const testurl = `https://${SERVERS}.e-sim.org/apiMilitaryUnitMembers.html?id=${args[0]}`;

		const data = await fetch(testurl).then(response => response.text());

		const formatData = JSON.parse(data);

		const rawurl = `https://${SERVERS}.e-sim.org/apiMilitaryUnitById.html?id=${args[0]}`;
		const muData = await fetch(rawurl).then(response => response.text());
		const muDataParse = JSON.parse(muData);


		const embed = new Discord.RichEmbed();

		for (const ids in formatData) {


			const companyUrl = `https://${SERVERS}.e-sim.org/company?id=${formatData[ids].companyId}`;
			// eslint-disable-next-line no-inner-declarations
			embed.addField(formatData[ids].login,
				`*Damage today:* ${parseInt(formatData[ids].damageToday).toLocaleString()}\nCompany ID: [${formatData[ids].companyId}](${companyUrl})\n*ES:* ${formatData[ids].economySkill}`, true);
		}

		const getDailyDmg = formatData.reduce((acc, individual) => acc + (individual.damageToday || 0), 0);

		embed.setTitle(muDataParse.name);
		embed.setTimestamp();
		embed.setFooter(`MU Daily Damage: ${parseInt(getDailyDmg).toLocaleString()}`);
		return message.channel.send(embed);
	},
};