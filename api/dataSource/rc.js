const fetch = require('node-fetch');
const moment = require('moment');

const USER_ID = process.env.USER_ID;
const TOKEN = process.env.TOKEN;
const RC_PATH = process.env.RC_PATH;

exports.getLatestEmoji = async since => {
  const amount = since.match(/\d+/g)[0];
  const unit =  since.match(/[a-zA-Z]+/g)[0];

  if (!amount || !unit) {
    throw new Error('WRONG!');
  }

  try {
    const data = await fetch(
      `${RC_PATH}/api/v1/emoji-custom`,
      {
        headers: {
          "X-User-Id": USER_ID,
          "X-Auth-Token": TOKEN
        },
        mode: 'cors',
      });
    const emojis = (await data.json()).emojis;
    const sinceTimestamp = moment().subtract(amount, unit).valueOf();

    return emojis
      .filter(emoji => moment(emoji._updatedAt).valueOf() > sinceTimestamp)
      .sort((a, b) => moment(a._updatedAt).valueOf() - moment(b._updatedAt).valueOf())
      .map(emoji => `:${emoji.name}:`)
      .reduce((a,b) => `${a} ${b}`, '');
  } catch (e) {
    console.log(e);
  }
};
