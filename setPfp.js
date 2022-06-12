const Path = require('path')  
const Axios = require('axios')
const Discord = require('discord.js')
const client = new Discord.Client()
var fs = require('fs');
var setUrl = "https://bafybeiazx7p7grhaanvjdkp4acftummszcwcwanonvb2hwyldpaf6uy2tq.ipfs.dweb.link/"
var name;
var file;
var fp;
downloadImage()
client.on('ready', () => {
client.user.setAvatar("avatar.jpg")
  .then(user => {console.log(`New avatar set!`)
       process.exit()})
  .catch(console.error);
// await process.exit()
// return
})
async function downloadImage () {  
  if(setUrl){
  const url = setUrl
  const path = Path.resolve(__dirname, '', 'avatar.jpg')
  const writer = fs.createWriteStream(path)

  const response = await Axios({
    url,
    method: 'GET',
    responseType: 'stream'
  })

  response.data.pipe(writer)

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
file = fs.readFileSync("avatar.jpg")
fp = Buffer.from(file)
}
}

client.login(process.env.DISCORD_TOKEN)
