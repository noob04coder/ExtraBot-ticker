require('dotenv').config() // Load .env file
const axios = require('axios')
const Discord = require('discord.js')
const client = new Discord.Client()
const moment = require("moment");
require("moment-duration-format");
var activityVar=0

function get_time() {
const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
  return duration;
}

function getPrices() {
	// API for price data.
	axios.get(`https://api-mainnet.magiceden.dev/v2/collections/${process.env.COIN_ID}/`).then(res => {
		// If we got a valid response
		if(res.data.symbol && res.data.floorPrice) {
			let currentPrice = res.data.floorPrice/(10**9) || 0 // Default to zero
			let priceChange = res.data.volumeAll/(10**9) || 0
      let symbol = 'SOL';
      let activityName = `${priceChange.toFixed(2)} ${symbol.toUpperCase()}`
      let nicknameVar =`${(currentPrice).toLocaleString().replace(/,/g,process.env.THOUSAND_SEPARATOR)} ${symbol.toUpperCase()}`
			if(activityVar%2==0){
      client.user.setPresence({
				game: {
					// Example: "Watching -5,52% | BTC"
          
					name: activityName,
					type: 3 // Use activity type 3 which is "Watching"}
				}
			})}
      if(activityVar%2!=0){
      client.user.setPresence({
				game: {
					// Example: "Watching -5,52% | BTC"
          
					name: nicknameVar,
					type: 3 // Use activity type 3 which is "Watching"}
				}
			})}

			// client.guilds.find(guild => guild.id === process.env.SERVER_ID).me.setNickname(`${(currentPrice).toLocaleString().replace(/,/g,process.env.THOUSAND_SEPARATOR)}${process.env.CURRENCY_SYMBOL}`)
      client.guilds.find(guild =>{
        console.log(guild.id)
        guild.me.setNickname(nicknameVar)})
			console.log('Updated price to', currentPrice)
		}
		else
			console.log('Could not load player count data for', process.env.COIN_ID)

	}).catch(err => console.log('Error at api.magiceden.com data:', err))
  activityVar++
}

// Runs when client connects to Discord.
client.on('ready', () => {
	console.log('Logged in as', client.user.tag)
	getPrices() // Ping server once on startup
	// Ping the server and set the new status message every x minutes. (Minimum of 1 minute)
  client.user.setUsername(process.env.SYMBOL[0].toUpperCase() +process.env.SYMBOL.substring(1).toLowerCase() +" Ticker")
	setInterval(getPrices, Math.max(1, process.env.MC_PING_FREQUENCY || 1) * 60 * 1000)
})
client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "!up") {
    message.channel.send(get_time());
  }
});


// Login to Discord
client.login(process.env.DISCORD_TOKEN)
