const Discord = require('discord.js');
const fetch = require('node-fetch');
const querystring = require('querystring');
const jsdom = require('jsdom');

module.exports = {
	name: 'citizen',
	description: 'Get information about an e-sim account.',
	usage: '[Citizen Name] [Server]',
	cooldown: 5,
	execute: async (message, args, SERVERS = 'alpha') => {
		if (!args.length) {
			return message.channel.send('Please provide a username');
		}

		const query = querystring.stringify({ name: args.join(' ') });
		const testurl = `https://${SERVERS}.e-sim.org/apiCitizenByName.html?${query}`;

		const data = await fetch(testurl).then(response => response.text());

		const formatData = JSON.parse(data);
		const citizenUrl = `https://${SERVERS}.e-sim.org/profile.html?id=${formatData.id}`;

		const militaryUnit = formatData.militaryUnitId;
		const rawurl = `https://${SERVERS}.e-sim.org/apiMilitaryUnitById.html?id=${militaryUnit}`;
		const muData = await fetch(rawurl).then(response => response.text());
		const muDataParse = JSON.parse(muData);

		const regionId = formatData.currentLocationRegionId;
		const regionUrl = `https://${SERVERS}.e-sim.org/apiRegions.html`;
		const regionData = await fetch(regionUrl).then(response => response.text());
		const regionDataParse = JSON.parse(regionData);
		const specRegionUrl = `https://${SERVERS}.e-sim.org/region.html?id=${regionId}`;

		const tableFormat = regionDataParse.reduce((acc, region) => (acc[region.id] = region, acc), {});

		const countryId = tableFormat[regionId].homeCountry;
		const countryUrl = `https://${SERVERS}.e-sim.org/apiCountries.html`;
		const countryData = await fetch(countryUrl).then(response => response.text());
		const countryDataParse = JSON.parse(countryData);
		const countryTableFormat = countryDataParse.reduce((acc, country) => (acc[country.id] = country, acc), {});

		// const dom = new jsdom('', {
		// 	url: citizenUrl,
		// 	referrer: citizenUrl,
		// 	contentType: 'text/html',
		// 	includeNodeLocations: true,
		// 	storageQuote: 1000000000,
		// });

		// const document = dom.window.document;
		// const bodyElement = document.body;
		// const querySelector = document.querySelector('#profileTable > tbody > tr > td:nth-child(1) > div:nth-child(1) > div:nth-child(8)');
		// const nextSiblingSelector = document.querySelector('#profileTable > tbody > tr > td:nth-child(1) > div:nth-child(1) > div:nth-child(8)').nextSibling.nextSibling;

		// const steroPositive;
		// const steroNegative;
		// const tankPositive, tankNegative;
		// const spaPositive, spaNegative;
		// const vacPositive, vacNegative;
		// const bunkerPositive, bunkerNegative;
		// const sewerPositive, sewerNegative;
		// const painDealer1h, painDealer10h;
		// const camoFirst, camoSecond, camThird;

		// if (querySelector.nextSibling.nextSibling == nextSiblingSelector) {
		// 	const nthSelector = document.querySelector('#profileTable > tbody > tr > td:nth-child(1) > div:nth-child(1) > div:nth-child(9)').childNodes;
		// 	if(nthSelector[1].innerText == "Buffs"){
		// 		const buffSelector = nthSelector[3].currentSrc;
		// 		switch(steroPositive)
		// 	}

		// }


		const embed = new Discord.RichEmbed()
			.setColor('#8b0000')
			.setTitle(`${formatData.login}`)
			.setURL(`${citizenUrl}`)
			.setThumbnail(`${message.author.displayAvatarURL}`)
			.addField('*Citizenship:*', formatData.citizenship, true)
			.addField('*Premium:*', `${formatData.premiumDays} days remaining.`, true)
			.addField('*Damage:*', `${parseInt(formatData.totalDamage).toLocaleString()} dmg.`, true)
			.addField('*Rank:*', formatData.rank, true)
			.addField('*LevelL*', formatData.level, true)
			.addField('*Economy Skill:*', Math.round(formatData.economySkill * 100) / 100, true)
			.addBlankField()
			.addField('*Daily damage:*', `${parseInt(formatData.damageToday).toLocaleString()} dmg`, true)
			.addField('*Current status:*', formatData.status, true)
			.addField('*Military Unit:*', `[${muDataParse.name}](${rawurl})`, true)
			.addField('*Current region:*', `[${tableFormat[regionId].name}](${specRegionUrl}) / ${countryTableFormat[countryId].name}`, true)
			.addBlankField()
			.setTimestamp();

		return message.channel.send(embed);
	},
};