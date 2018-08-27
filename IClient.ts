import { Block } from './Block';
import { Transaction } from './Transaction';
import { BlockSummary } from './BlockSummary';
import { AddressSummary } from './AddressSummary';
import { UnspentOutput } from './UnspentOutput';
import { TransactionSummary } from './TransactionSummary';
import { Info } from './Info';

/*API HTTP Endpoints*/
export interface ICLient {
  getBlock: (hash: number) => Block;
  getBlocks: (date: Date, limit: number) => BlockSummary;
  getBlockHashByIndex: (index: number) => number;
  getBlockByIndex: (index: number) => Block;
  // getRawBlock() - not needed, dunno

  getTransaction: (id: number) => Transaction;
  getTransactionsByBlock: (blockhash: string) => Transaction[];
  getTransactionsByAddress: (address: string) => Transaction[];
  getTransactionsByMultipleAddresses: (
    addresses: string[],
    from?: number,
    to?: number
  ) => TransactionSummary;
  // postTransactionsByMultipleAddresses - not really needed just more filter options
  // getRawTransaction - not needed

  getAddressDetails: (
    address: string,
    showTransactions?: boolean, // it's 1 or 0
    from?: number, // number of transactions
    to?: number
  ) => AddressSummary;

  // everything will return values in satoshis
  getBalance: (address: string) => number;
  getTotalReceived: (address: string) => number;
  getTotalSent: (address: string) => number;
  getUnconfirmedBalance: (address: string) => number;
  getUnspentOutputs: (address: string) => Array<UnspentOutput>;
  getUnspentOutputsFormMultipleAddresses: (
    addresses: string[]
  ) => Array<UnspentOutput>;
  postUnspentOutputsFormMultipleAddresses: (
    addresses: string[]
  ) => Array<UnspentOutput>;

  /**
   * Broadcasts transaction and returns the transaction id
   */
  postTransaction: (rawTransaction: number) => number;

  /**
   * All infos in one
   */
  getInfo: () => Info;

  getDifficulty: () => number;
  getBestBlockHash: () => number;
  getLastBlockHash: () => number;
}
