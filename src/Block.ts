export class Block {
  public hash?: string;
  public size?: number;
  public height?: number;
  public version?: number;
  public merkleroot?: string;
  public tx?: string[];
  public time?: number;
  public nonce?: number;
  public bits?: string;
  public difficulty?: number;
  public chainwork?: string;
  public confirmations?: number;
  public previousblockhash?: string;
  public nextblockhash?: string;
  public reward?: number;
  public isMainChain?: boolean;
  public poolInfo?: any;
}
