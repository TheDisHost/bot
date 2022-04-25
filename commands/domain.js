const { Command, CommandType, Argument, ArgumentType, MessageActionRow, MessageButton } = require('gcommands');
const Discord = require('discord.js')

new Command({
	name: 'domain',
	description: 'Add domain to your server',
	type: [CommandType.SLASH, CommandType.MESSAGE],
    arguments: [
        new Argument({
            name: 'email',
            description: 'Your email address',
            type: ArgumentType.STRING,
            required: true,
        }),
        new Argument({
            name: 'domain',
            description: 'Your domain (etc. dishost.xyz)',
            type: ArgumentType.STRING,
            required: true,
        }),
        new Argument({
            name: 'servername',
            description: 'Your server name',
            type: ArgumentType.STRING,
            required: true,
        }),
        new Argument({
            name: 'serverport',
            description: 'Your serverport',
            type: ArgumentType.STRING,
            required: true,
        }),
    ],
	 run: async (ctx) => {
        const email = ctx.arguments.getString('email')
        const domain = ctx.arguments.getString('domain')
        const servername = ctx.arguments.getString('servername')
        const serverport = ctx.arguments.getString('serverport')
        await ctx.guild.channels.create(domain, {
            type: "text",
            permissionOverwrites: [
                {
                    id: ctx.guild.roles.everyone,
                    deny: ['VIEW_CHANNEL']
                },
                {
                    id: ctx.member,
                    allow: ['VIEW_CHANNEL']
                },
                {
                    id: ctx.guild.roles.cache.find(role => role.id === '952531031897018419'),
                    allow: ['VIEW_CHANNEL']
                }
            ]
        }).then((domainchannel) => {
            const info = new Discord.MessageEmbed()
            .setColor('#546BE6')
            .setTitle('Please set new DNS record type A that points to ```138.3.240.53```')
            const info2 = new Discord.MessageEmbed()
            .setColor('#546BE6')
            .setTitle('Info')
            .setDescription(`**User Email:** ${email}\n\n**Domain:** ${domain}\n\n**Server Name:** ${servername}\n\n**Server Port:** ${serverport}`)
            domainchannel.send({content: `<@${ctx.user.id}> | Support: <@&952531031897018419> <@&933774609642315816>`, embeds: [info, info2]})
            const reply = new Discord.MessageEmbed()
            .setColor('#546BE6')
            .setDescription(`Support will contact you in ${domainchannel}`)
            ctx.reply({ embeds: [reply], ephemeral: true})
        })
     }})

