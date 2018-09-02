import { IClient } from './IClient';
import { Info } from './Info';
import { Transaction } from './Transaction';
import { TransactionSummary } from './TransactionSummary';
import { Block } from './Block';
import { BlockSummary } from './BlockSummary';
import { AddressSummary } from './AddressSummary';
import { UnspentOutput } from './UnspentOutput';
import fetch from 'node-fetch';
import wrappedFetch from 'socks5-node-fetch';
import { LastBlockIdentity } from './LastBlockIdentity';

export class InsightClient /*implements IClient*/ {
  private url: string;
  private socksFetch?: any;

  constructor(url: string, socksHost?: string, socksPort?: string) {
    this.url = url;

    if (socksHost && socksPort) {
      this.socksFetch = wrappedFetch({
        socksHost,
        socksPort,
      });
    }
  }

  fetchRequest(url: string, options: object = {}): Promise<any> {
    if (!this.socksFetch) {
      return fetch(url, { ...options }).then(
        (res: any) => res.ok && res.json()
      );
    }

    return this.socksFetch(url, {
      ...options,
    }).then((res: Response) => res.ok && res.json());
  }

  /*postTransaction(rawTransaction: string): Promise<number> {}*/

  getInfo(): Promise<Info> {
    return this.fetchRequest(`${this.url}/status?q=getinfo`).then(
      ({ info }) => info as Info
    );
  }

  getDifficulty(): Promise<number> {
    return this.fetchRequest(`${this.url}/status?q=getDifficulty`).then(
      ({ difficulty }) => difficulty as number
    );
  }

  getBestBlockHash(): Promise<string> {
    return this.fetchRequest(`${this.url}/status?q=getBestBlockHash`).then(
      ({ bestblockhash }) => bestblockhash as string
    );
  }

  getLastBlockHash(): Promise<LastBlockIdentity> {
    return this.fetchRequest(`${this.url}/status?q=getLastBlockHash`).then(
      blockIdentity => blockIdentity as LastBlockIdentity
    );
  }

  getTransaction(id: number): Promise<Transaction> {
    return this.fetchRequest(`${this.url}/status?q=getLastBlockHash`).then(
      blockIdentity => blockIdentity as LastBlockIdentity
    );
  }

  /*getTransactionsByBlock(blockhash: string): Promise<Transaction[]> {}
  getTransactionsByAddress(address: string): Promise<Transaction[]> {}
  getTransactionsByMultipleAddresses(
    addresses: string[],
    from?: number | undefined,
    to?: number | undefined
  ): Promise<TransactionSummary> {}*/

  getBlock(hash: string): Promise<Block> {
    return this.fetchRequest(
      `${this.url}/block/${encodeURIComponent(hash)}`
    ).then(block => block as Block);
  }

  //getBlocks(date: Date, limit: number): Promise<BlockSummary> {}

  getBlockHashByIndex(index: number): Promise<string> {
    return this.fetchRequest(`${this.url}/block-index/${index}`).then(
      ({ blockhash }) => blockhash as string
    );
  }

  getBlockByIndex(index: number): Promise<Block> {
    return this.fetchRequest(`${this.url}/block-index/${index}`).then(
      ({ blockhash }) => this.getBlock(blockhash)
    );
  }

  /*getAddressDetails(
    address: string,
    showTransactions?: boolean | undefined,
    from?: number | undefined,
    to?: number | undefined
  ): Promise<AddressSummary> {}
  getBalance(address: string): Promise<number> {}
  getTotalReceived(address: string): Promise<number> {}
  getTotalSent(address: string): Promise<number> {}
  getUnconfirmedBalance(address: string): Promise<number> {}
  getUnspentOutputs(address: string): Promise<UnspentOutput[]> {}
  getUnspentOutputsFormMultipleAddresses(
    addresses: string[]
  ): Promise<UnspentOutput[]> {}
  postUnspentOutputsFormMultipleAddresses(
    addresses: string[]
  ): Promise<UnspentOutput[]> {}*/
}
