// const request = require('request-promise');
// const cheerio = require('cheerio');
// const winston = require('winston');

// module.exports = {
// 	name: 'register',
// 	description: 'Register citizen username',
// 	aliases: ['register', 'reg'],
// 	args: [
// 		{
// 			id: 'user',
// 			type: 'citizenId',
// 			match: 'rest',
// 		},
// 	],
// 	usage: [
// 		'register <citizen_id>',
// 		'register <citizen_name>',
// 	],
// 	execute: async (message, args) =>{
// 		if (!args.length) {
// 			return message.channel.send('Please provide a username');
// 		}

// 	},
// };