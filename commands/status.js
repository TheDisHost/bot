const { Command, CommandType } = require('gcommands');
const isReachable = require('is-reachable')
const Discord = require('discord.js')
const axios = require('axios')
const token = process.env.apiKey

new Command({
	name: 'status',
	description: 'Refresh a status of servers',
	type: [CommandType.SLASH, CommandType.MESSAGE],
    
	 run: async (ctx) => {
        if (ctx.member.roles.cache.has('933774609642315816')) {
            const onlinemsg = new Discord.MessageEmbed
            onlinemsg.setTitle('💿 Server Status')
            onlinemsg.setColor('#546BE6')
            axios.get('https://panel.dishost.xyz/api/application/nodes/1', { headers: {"Authorization" : `Bearer ${token}`}}).then((node) => {
                console.log(node.data.attributes.memory)
                onlinemsg.setDescription(`**De-1**\nRam: **${node.attributes.memory}**/**${node.attributes.memory}**\nDisk: **${node.attributes.disk}**/**${node.attributes.disk}**`)
            })
            if (await isReachable('panel.dishost.xyz') === true) {
               onlinemsg.addFields(
                   {name: '📀 DE-1', value: '**🟢 Online**', inline: true}
                   )
                   if (await isReachable('client.dishost.xyz') === true) {
                    onlinemsg.addFields(
                        {name: '📀 Dashboard', value: '**🟢 Online**', inline: true}
                        )
                } else {
                    onlinemsg.addFields(
                        {name: '📀 Dashboard', value: '**🔴 Offline**', inline: true}
                        )
                }
            } else if (await isReachable('panel.dishost.xyz') === false) {
                onlinemsg.addFields(
                    {name: '📀 DE-1', value: '**🔴 Offline**', inline: true}
                    )
                    if (await isReachable('client.dishost.xyz') === true) {
                        onlinemsg.addFields(
                            {name: '📀 Dashboard', value: '**🟢 Online**', inline: true}
                            )
                    } else {
                        onlinemsg.addFields(
                            {name: '📀 Dashboard', value: '**🔴 Offline**', inline: true}
                            )
                    }
            }
            ctx.channel.send({ embeds: [onlinemsg]}).then(async (msg) => {
                setInterval(async function(){
                    const statusmsg2 = new Discord.MessageEmbed
                    statusmsg2.setTitle('💿 Server Status')
                    statusmsg2.setColor('#546BE6')
                    axios.get('https://panel.dishost.xyz/api/application/nodes/1', { headers: {"Authorization" : `Bearer ${token}`}}).then((node) => {
                        statusmsg2.setDescription(`**De-1**\nRam: **${node.attributes.memory}**/**${node.attributes.memory}**\nDisk: **${node.attributes.disk}**/**${node.attributes.disk}**`)
                    })
                    if (await isReachable('client.dishost.xyz') === true) {
                        statusmsg2.addFields(
                            {name: '📀 DE-1', value: '**🟢 Online**', inline: true}
                            )
                            if (await isReachable('130.61.98.184:8000') === true) {
                                statusmsg2.addFields(
                                    {name: '📀 Dashboard', value: '**🟢 Online**', inline: true}
                                    )
                            } else {
                                statusmsg2.addFields(
                                    {name: '📀 Dashboard', value: '**🔴 Offline**', inline: true}
                                    )
                            }
                        msg.edit({embeds: [statusmsg2]})
                    } else if (await isReachable('client.dishost.xyz') === false) {
                        statusmsg2.addFields(
                            {name: '📀 DE-1', value: '**🔴 Offline**', inline: true}
                            )
                        if (await isReachable('130.61.98.184:8000') === true) {
                            statusmsg2.addFields(
                                {name: '📀 Dashboard', value: '**🟢 Online**', inline: true}
                                )
                        } else {
                            statusmsg2.addFields(
                                {name: '📀 Dashboard', value: '**🔴 Offline**', inline: true}
                                )
                        }
                        msg.edit({embeds: [statusmsg2]})
                    }
                }, 5000);
            })
        } else {
            ctx.reply({ content: 'No permission!', ephemeral: true})
        }
	}
});