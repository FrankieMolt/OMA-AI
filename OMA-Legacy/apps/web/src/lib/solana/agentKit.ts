import { SolanaAgentKit } from 'solana-agent-kit';

interface ActionParams {
  recipient?: string;
  amount?: number;
  outputMint?: string;
  inputMint?: string;
  [key: string]: unknown;
}

export class SolanaAgentService {
  private kit: SolanaAgentKit;

  constructor(privateKey: string, rpcUrl: string, openAiKey?: string) {
    // @ts-expect-error - Type mismatch with solana-agent-kit package
    this.kit = new SolanaAgentKit(privateKey as string, rpcUrl, {
      OPENAI_API_KEY: openAiKey || '',
    });
  }

  // 60+ on-chain actions available
  async executeAction(action: string, params: ActionParams) {
    switch (action) {
      case 'transfer':
        if (!params.recipient || !params.amount) throw new Error('Missing recipient or amount');
        // @ts-expect-error - library types might be incomplete
        return await this.kit.transfer(params.recipient, params.amount);
      case 'swap':
        if (!params.outputMint || !params.amount || !params.inputMint)
          throw new Error('Missing swap params');
        // @ts-expect-error - library types might be incomplete
        return await this.kit.trade(params.outputMint, params.amount, params.inputMint);
      // case 'balance':
      //   return await this.kit.getBalance();
      // Add more actions as needed
      default:
        throw new Error(`Action ${action} not supported`);
    }
  }

  getKit() {
    return this.kit;
  }
}
