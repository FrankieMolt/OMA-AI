import { NextRequest, NextResponse } from 'next/server';
import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  notFoundErrorResponse,
  internalErrorResponse,
  generateRequestId,
} from '@/lib/api-response';
import { logger } from '@/lib/logger';

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ agentId: string }> }
) {
  const requestId = generateRequestId();

  try {
    const { agentId } = await params;

    const agentData: Record<string, unknown> = {
      '1': {
        name: 'Research Agent Pro',
        description: 'Hire the Research Agent Pro to perform autonomous research',
        icon: 'https://oma.ai/icons/research.png',
        label: 'Hire Research Agent',
        title: 'Hire Research Agent',
        disabled: false,
      },
      '2': {
        name: 'Data Extraction MCP',
        description: 'Use the Data Extraction MCP to parse documents',
        icon: 'https://oma.ai/icons/data.png',
        label: 'Extract Data',
        title: 'Extract Data',
        disabled: false,
      },
      '3': {
        name: 'GPT-4 Turbo Access',
        description: 'Access GPT-4 Turbo through the OMA gateway',
        icon: 'https://oma.ai/icons/ai.png',
        label: 'Use GPT-4 Turbo',
        title: 'Use GPT-4 Turbo',
        disabled: false,
      },
    };

    const agent = agentData[agentId] as
      | {
          icon: string;
          label: string;
          title: string;
          description: string;
          disabled: boolean;
        }
      | undefined;

    if (!agent) {
      logger.warn('Agent not found', { agentId, requestId });
      return notFoundErrorResponse('Agent', requestId);
    }

    const action = {
      icon: agent.icon,
      label: agent.label,
      title: agent.title,
      description: agent.description,
      disabled: agent.disabled,
      links: {
        actions: [
          {
            label: agent.label,
            href: `/api/actions/${agentId}`,
          },
        ],
      },
    };

    return successResponse(action);
  } catch (error) {
    logger.error('Actions GET error', { error, requestId });
    return internalErrorResponse('Failed to fetch agent action', requestId);
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ agentId: string }> }
) {
  const requestId = generateRequestId();

  try {
    const { agentId } = await params;
    const body = await request.json();
    const { account } = body;

    if (!account) {
      logger.warn('Account required for agent action', { agentId, requestId });
      return validationErrorResponse('Account is required', undefined, requestId);
    }

    const agentData: Record<string, { name: string; price: number; currency: string }> = {
      '1': {
        name: 'Research Agent Pro',
        price: 0.01,
        currency: 'SOL',
      },
      '2': {
        name: 'Data Extraction MCP',
        price: 0.005,
        currency: 'SOL',
      },
      '3': {
        name: 'GPT-4 Turbo Access',
        price: 0.0001,
        currency: 'SOL',
      },
    };

    const agent = agentData[agentId];

    if (!agent) {
      logger.warn('Agent not found', { agentId, requestId });
      return notFoundErrorResponse('Agent', requestId);
    }

    const connection = new Connection(
      process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.devnet.solana.com'
    );
    const sender = new PublicKey(account);
    const treasuryWallet = process.env.OMA_TREASURY_WALLET;
    if (!treasuryWallet) {
      logger.error('OMA_TREASURY_WALLET not configured', { requestId });
      return errorResponse(
        'Server configuration error',
        500,
        'INTERNAL_SERVER_ERROR',
        undefined,
        requestId
      );
    }
    const recipient = new PublicKey(treasuryWallet);

    const transaction = new Transaction();

    transaction.add(
      SystemProgram.transfer({
        fromPubkey: sender,
        toPubkey: recipient,
        lamports: agent.price * LAMPORTS_PER_SOL,
      })
    );

    transaction.feePayer = sender;
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;

    const serializedTransaction = transaction
      .serialize({ requireAllSignatures: false })
      .toString('base64');

    logger.info('Agent action transaction created', { agentId, agentName: agent.name, requestId });
    return successResponse({
      transaction: serializedTransaction,
      message: `Hired ${agent.name} for ${agent.price} ${agent.currency}`,
    });
  } catch (error) {
    logger.error('Agent action error', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      requestId,
    });
    return internalErrorResponse('Failed to create agent action transaction', requestId);
  }
}
