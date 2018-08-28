import { Block } from './Block';
import { Transaction } from './Transaction';
import { BlockSummary } from './BlockSummary';
import { AddressSummary } from './AddressSummary';
import { UnspentOutput } from './UnspentOutput';
import { TransactionSummary } from './TransactionSummary';
import { Info } from './Info';

/*API HTTP Endpoints*/
export interface IClient
  extends ITransactionMethods,
    IBlockMethods,
    IAccountMethods {
  /**
   * Broadcasts transaction and returns the transaction id
   */
  postTransaction: (rawTransaction: number) => Promise<number>;

  /**
   * All infos in one
   */
  getInfo: () => Promise<Info>;
  getDifficulty: () => Promise<number>;
  getBestBlockHash: () => Promise<number>;
  getLastBlockHash: () => Promise<number>;
}

export interface ITransactionMethods {
  getTransaction: (id: number) => Promise<Transaction>;
  getTransactionsByBlock: (blockhash: string) => Promise<Transaction[]>;
  getTransactionsByAddress: (address: string) => Promise<Transaction[]>;
  getTransactionsByMultipleAddresses: (
    addresses: string[],
    from?: number,
    to?: number
  ) => Promise<TransactionSummary>;
}

export interface IBlockMethods {
  getBlock: (hash: number) => Promise<Block>;
  getBlocks: (date: Date, limit: number) => Promise<BlockSummary>;
  getBlockHashByIndex: (index: number) => Promise<number>;
  getBlockByIndex: (index: number) => Promise<Block>;
}

export interface IAccountMethods {
  getAddressDetails: (
    address: string,
    showTransactions?: boolean, // it's 1 or 0
    from?: number, // number of transactions
    to?: number
  ) => Promise<AddressSummary>;

  // everything will return values in satoshis
  getBalance: (address: string) => Promise<number>;
  getTotalReceived: (address: string) => Promise<number>;
  getTotalSent: (address: string) => Promise<number>;
  getUnconfirmedBalance: (address: string) => Promise<number>;

  getUnspentOutputs: (address: string) => Promise<Array<UnspentOutput>>;
  getUnspentOutputsFormMultipleAddresses: (
    addresses: string[]
  ) => Promise<Array<UnspentOutput>>;
  postUnspentOutputsFormMultipleAddresses: (
    addresses: string[]
  ) => Promise<Array<UnspentOutput>>;
}
