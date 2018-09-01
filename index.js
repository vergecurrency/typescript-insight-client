const { InsightClient } = require('./dist/InsightClient');

const client = new InsightClient(
  'https://blockexplorer.com/api',
  'socks://127.0.0.1:9050'
);

client
  .getInfo()
  .then(res => {})
  .catch(console.error);
