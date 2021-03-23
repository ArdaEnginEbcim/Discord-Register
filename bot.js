const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');////////fynx
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const weather = require('weather-js')
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');////////fynx
const request = require('request');
const snekfetch = require('snekfetch');
const queue = new Map();
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
////////fynx

const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + "YOUTUBE LORD CREATİVE");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {////////fynx
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);/////////fynx
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });////////fynx
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });/////////lordcreative
            resolve();
        } catch (e) {
            reject(e);
        }////////fynx
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};/////////lordcreative




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {////////fynx
            reject(e);
        }/////////lordcreative
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};/////////lordcreative
//YAPAMIYAN OLURSA LORD CREATİVE'E SORABİLİRSİNİZ VEYA FYNX DİSCORDUNDAN YARDIM ALABİLİRSİNİZ

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   l0RDconsole.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// }); //DEVİLHOUSE//

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);////////fynx

//---------------------------------KOMUTLAR---------------------------------\\


client.on('guildMemberAdd', member => {
  let guild = member.guild;
  const channel = member.guild.channels.find('name', 'KAYIT KANAL İSMİ');
  if (!channel) return;
  const embed = new Discord.RichEmbed()
  .setColor('RED')
        .setAuthor(`Fynx| Kayıt Sistemi`)
            .addField(`Fynx Sınır Kapısına Hoş Geldin`,`**Hoşgeldin** ${member} **Seninle \`${member.guild.memberCount}\` Kişiyiz**`)
         .addField(`Kayıt Olmak İçin`,`**İsmini ve Yaşını Yaz │ Kayıt Ekibimiz  İlgilenecektir**`)
  channel.sendEmbed(embed); 
});

/////////lordcreative
//YAPAMIYAN OLURSA LORD CREATİVE'E SORABİLİRSİNİZ VEYA FYNX DİSCORDUNDAN YARDIM ALABİLİRSİNİZ