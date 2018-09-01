import { IClient } from './IClient';
import { Info } from './Info';
import { Transaction } from './Transaction';
import { TransactionSummary } from './TransactionSummary';
import { Block } from './Block';
import { BlockSummary } from './BlockSummary';
import { AddressSummary } from './AddressSummary';
import { UnspentOutput } from './UnspentOutput';
import fetch from 'node-fetch';
import SocksProxyAgent from 'socks-proxy-agent';

export class InsightClient /*implements IClient*/ {
  private url: string;
  private proxy?: string;

  constructor(url: string, socksProxyUrl?: string) {
    this.url = url;
    this.proxy = socksProxyUrl;
  }

  fetchRequest(url: string, options: object = {}): Promise<any> {
    if (this.proxy) {
      return fetch(url, { ...options }).then(res => res.json());
    }

    return fetch(url, {
      ...options,
      agent: new SocksProxyAgent(this.proxy),
    }).then(res => res.json());
  }

  /*postTransaction(rawTransaction: number): Promise<number> {

  }*/
  getInfo(): Promise<Info> {
    return this.fetchRequest(`${this.url}/status?q=getinfo`);
  }
  /*getDifficulty: () => Promise<number>;
  getBestBlockHash: () => Promise<number>;
  getLastBlockHash: () => Promise<number>;
  getTransaction: (id: number) => Promise<Transaction>;
  getTransactionsByBlock: (blockhash: string) => Promise<Transaction[]>;
  getTransactionsByAddress: (address: string) => Promise<Transaction[]>;
  getTransactionsByMultipleAddresses: (
    addresses: string[],
    from?: number | undefined,
    to?: number | undefined
  ) => Promise<TransactionSummary>;
  getBlock: (hash: number) => Promise<Block>;
  getBlocks: (date: Date, limit: number) => Promise<BlockSummary>;
  getBlockHashByIndex: (index: number) => Promise<number>;
  getBlockByIndex: (index: number) => Promise<Block>;
  getAddressDetails: (
    address: string,
    showTransactions?: boolean | undefined,
    from?: number | undefined,
    to?: number | undefined
  ) => Promise<AddressSummary>;
  getBalance: (address: string) => Promise<number>;
  getTotalReceived: (address: string) => Promise<number>;
  getTotalSent: (address: string) => Promise<number>;
  getUnconfirmedBalance: (address: string) => Promise<number>;
  getUnspentOutputs: (address: string) => Promise<UnspentOutput[]>;
  getUnspentOutputsFormMultipleAddresses: (
    addresses: string[]
  ) => Promise<UnspentOutput[]>;
  postUnspentOutputsFormMultipleAddresses: (
    addresses: string[]
  ) => Promise<UnspentOutput[]>;*/
}
