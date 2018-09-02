const { InsightClient } = require('./dist/InsightClient');

const client = new InsightClient(
  'https://blockexplorer.com/api'
  //'127.0.0.1',
  //'9050'
);

client
  .getInfo()
  .then(res => {
    console.log(res);
  })
  .catch(console.error);
