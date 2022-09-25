require("dotenv").config();
const axios = require('axios')
const { Client, Intents, Collection } = require("discord.js");
const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MEMBERS
	]
});
var activityVar=0


setTimeout(function(){process.exit()},86400000)
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
/*                      if(activityVar%2==0){
client.user.setActivity(`${activityName} ${symbol}`, { type: "WATCHING" })
}
*/
 //   if(activityVar%2!=0){
      client.user.setActivity(`NAME FLOOR`, { type: "WATCHING" })
//}
      client.guilds.cache.forEach(g => {//Every guild
      //console.log(g.id)
       g.me.setNickname(nicknameVar)
})
      console.log('Updated price to', currentPrice)
}
                else
                        console.log('Could not load player count data for', process.env.COIN_ID)

        }).catch(err => console.log('Error at api.magiceden.com data:', err))
  activityVar++
}

client.on('ready', () => {
    console.log('Logged in as', client.user.tag)
    getPrices()
    setInterval(getPrices, Math.max(1, process.env.MC_PING_FREQUENCY || 1) * 60 * 1000)
                })

client.login(process.env.token);
