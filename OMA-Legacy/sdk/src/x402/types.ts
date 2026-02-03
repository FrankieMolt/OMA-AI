export interface X402Config {
  wallet?: string;
  endpoint?: string;
  defaultRecipient?: string;
}

export interface X402PaymentRequest {
  amount: number;
  recipient: string;
  description?: string;
  currency?: string;
  timeout?: number;
}

export interface X402PaymentResponse {
  transactionId: string;
  amount: number;
  recipient: string;
  currency: string;
  timestamp: string;
  signature: string;
  nonce: string;
  status: 'pending' | 'confirmed' | 'failed';
}

export interface X402VerificationRequest {
  signature: string;
  amount: number;
  recipient: string;
  timestamp: string;
  nonce: string;
}

export interface X402VerificationResponse {
  valid: boolean;
  transactionId?: string;
  error?: string;
}
