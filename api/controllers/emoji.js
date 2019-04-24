'use strict';

const rc = require('./../dataSource/rc');

exports.list = async function(req, res) {
  const query = req.query;

  if (query) {
    const since = req.query.since;

    if (since) {
      try {
        const response =await rc.getLatestEmoji(since);

        res.json({
          "text": response,
         })
      } catch (e) {
        res.json({
          "text": '500: i co? jesteś z siebie dumny?',
        });
      }
      return;
    }
    res.sendStatus(417);

    return;
  }
  res.sendStatus(418);
  return;
};
