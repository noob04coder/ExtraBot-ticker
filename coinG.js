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
	axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${process.env.PREFERRED_CURRENCY}&ids=${process.env.COIN_ID}`).then(res => {
		// If we got a valid response
		if(res.data && res.data[0].current_price && res.data[0].price_change_percentage_24h) {
			let currentPrice = res.data[0].current_price || 0 // Default to zero
			let priceChange = res.data[0].price_change_percentage_24h || 0 // Default to zero
		  let symbol = res.data[0].symbol || '?';
      if(priceChange.toFixed(2)<0){
      activityName = `${priceChange.toFixed(2)}% ⬇ | 24HR`
      }
      else if(priceChange.toFixed(2)>0){
      activityName = `${priceChange.toFixed(2)}% ⬆ | 24HR`
      }
      else {activityName = `${priceChange.toFixed(2)}% | 24HR ==`}
      let nicknameVar =`${process.env.CURRENCY_SYMBOL}${(currentPrice).toLocaleString().replace(/,/g,process.env.THOUSAND_SEPARATOR)} | ${symbol.toUpperCase()}`
                      if(activityVar%2!=0){
client.user.setActivity(activityName, { type: "WATCHING" })
}

    if(activityVar%2==0){
      client.user.setActivity(nicknameVar, { type: "WATCHING" })
}
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
