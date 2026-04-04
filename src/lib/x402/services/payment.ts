/**
 * Build x402 payment payload
 */
export function buildX402Payload(params: {
  signature: string;
  from: string;
  to: string;
  value: string;
  validAfter: number;
  validBefore: number;
  nonce: string;
  assetContract: string;
  payTo: string;
  chainId: number;
  token: string;
  amountBigInt: bigint;
}) {
  const { signature, from, to, value, validAfter, validBefore, nonce, assetContract, payTo, chainId, token, amountBigInt } = params;

  return {
    signature,
    authorization: {
      from,
      to: payTo.toLowerCase(),
      value,
      validAfter: validAfter.toString(),
      validBefore: validBefore.toString(),
      nonce,
    },
    expires_in: 300,
    x402Payload: {
      x402Version: 2,
      accepted: {
        scheme: 'exact',
        network: `eip155:${chainId}`,
        amount: amountBigInt.toString(),
        asset: assetContract,
        payTo: payTo.toLowerCase(),
        maxTimeoutSeconds: 300,
        extra: { name: token, version: '2' },
      },
      payload: {
        signature,
        authorization: {
          from,
          to: payTo.toLowerCase(),
          value,
          validAfter: validAfter.toString(),
          validBefore: validBefore.toString(),
          nonce,
        },
      },
    },
  };
}
