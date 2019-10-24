/* eslint-disable quotes */
const rp = require('request-promise');
const Discord = require('discord.js');
const $ = require('cheerio');
const fetch = require('node-fetch');
const querystring = require('querystring');

module.exports = {
	name: 'buffs',
	description: 'Get citizen buffs',
	usage: '[Citizen name]',
	execute: async (message, args, SERVERS = 'alpha') => {
		if (!args.length) {
			return message.channel.send('Please provide a username');
		}

		const query = querystring.stringify({ name: args.join(' ') });
		const testurl = `https://${SERVERS}.e-sim.org/apiCitizenByName.html?${query}`;

		const data = await fetch(testurl).then(response => response.text());

		const formatData = JSON.parse(data);
		const citizenUrl = `https://${SERVERS}.e-sim.org/profile.html?id=${formatData.id}`;
		const imageArr = [];

		rp(citizenUrl)
			.then(function(html) {
				let roids, tank, bunker, sewer, pd, camo;
				$('div .profile-row img', html).each(function(a, b) {
					const image = $(this).attr('src');
					if(image && image.match('cdn.e-sim.org//img/specialItems/')) {
						imageArr.push(image);
					}
				});
				const regex = '//cdn';
				const resultArr = imageArr.map(function(x) {
					return x.replace(regex, 'http://cdn');
				});

				const roidsBuff = `http://cdn.e-sim.org//img/specialItems/steroids_positive.png`;
				roids = resultArr.includes(roidsBuff);
				console.log(roids);

				console.log(resultArr);
				// message.channel.send(`Steroids: ${roids}\nTank: ${tank}\nBunker: ${bunker}\nSewer guide: ${sewer}`);
			});
	},

};