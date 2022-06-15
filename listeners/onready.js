const { Listener } = require('gcommands');
const axios = require('axios')
const Discord = require('discord.js')
const token = process.env.apiKey

// Create a new listener listening to the "ready" event
new Listener({
	// Set the name for the listener
	name: 'ready',
	// Set the event to listen to
	event: 'ready',
	// The function thats called when the event occurs
	run: async (client) => { 
        const theguild = client.guilds.cache.find(guild => guild.id === '933744509228048485')
        const thechannel = theguild.channels.cache.find(channel => channel.id === '933775700287180831')
        thechannel.messages.fetch('947784895923634187').then(async (msg) => {
            setInterval(async function(){
                axios.get('https://panel.dishost.xyz/api/application/nodes/1', { headers: {"Authorization" : `Bearer ${token}`}}).then(async (node) => {
                axios.get('https://panel.dishost.xyz/api/application/nodes/3', { headers: {"Authorization" : `Bearer ${token}`}}).then(async (node2) => {
                const isReachable = require('is-reachable')
                const statusmsg = new Discord.MessageEmbed
                statusmsg.setTitle('💿 Server Status')
                statusmsg.setColor('#546BE6')
                    const ram =  `Ram: ${Math.floor(node.data.attributes.allocated_resources.memory / 1000 * 100) / 100} GB / ${Math.floor(node.data.attributes.memory / 1000)} GB`
                    const disk = `Disk: ${Math.floor(node.data.attributes.allocated_resources.disk / 1000 * 100) / 100} GB / ${Math.floor(node.data.attributes.disk / 1000)} GB`
                    const ram2 =  `Ram: ${Math.floor(node2.data.attributes.allocated_resources.memory / 1000 * 100) / 100} GB / ${Math.floor(node2.data.attributes.memory / 1000)} GB`
                    const disk2 = `Disk: ${Math.floor(node2.data.attributes.allocated_resources.disk / 1000 * 100) / 100} GB / ${Math.floor(node2.data.attributes.disk / 1000)} GB`
                    console.log(node.data.attributes.relationships)
                    statusmsg.setDescription(`**DE-1 Usage Stats**:\n${ram}\n${disk}\n\n**DE-2 Usage Stats**:\n${ram2}\n${disk2}\n\nhttps://status.dishost.xyz`)
                    statusmsg.setFooter('Status is updated every minute!')
                    msg.edit({embeds: [statusmsg]})
                })
                })
            }, 60000);
        }) 
	}
});
