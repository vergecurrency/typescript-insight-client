import { InsightClient } from './InsightClient';
import { Info } from './Info';

test('create insight client with socks proxy', () => {
  new InsightClient('https://blockexplorer.com/api', '127.0.0.1', '9050');
});

test('create insight client without socks proxy', () => {
  new InsightClient('https://blockexplorer.com/api');
});

test('get info from the bitcoin network', () => {
  expect.assertions(1);
  const client = new InsightClient('https://blockexplorer.com/api');
  return client.getInfo().then((info: Info) => {
    expect(info.testnet).toBe(false);
  });
});

test('get difficulity from the bitcoin network', () => {
  expect.assertions(1);
  const client = new InsightClient('https://blockexplorer.com/api');
  return client.getDifficulty().then((diff: number) => {
    expect(diff).toBeGreaterThan(0);
  });
});

test('get the best hash block from the bitcoin network', () => {
  expect.assertions(1);
  const client = new InsightClient('https://blockexplorer.com/api');
  return client.getBestBlockHash().then((hash: string) => {
    expect(typeof hash).toBe('string');
  });
});
