#!/usr/bin/env python3
import solders
import base58
import json

# Generate Solana wallet
keypair = solders.keypair.Keypair()

# Standard formats
public_key = str(keypair.pubkey())
secret_key_bytes = bytes(keypair.secret())  # 32 bytes
secret_key_base58 = base58.b58encode(secret_key_bytes).decode('utf-8')  # Standard format

wallet = {
    'public_key': public_key,
    'private_key_base58': secret_key_base58,  # Standard Solana format
    'private_key_bytes': list(secret_key_bytes),  # Alternative format
    'network': 'solana-mainnet-beta'
}

with open('FRANKIE_solana_wallet.json', 'w') as f:
    json.dump(wallet, f, indent=2)

print(f"FRANKIE Solana Wallet Created:")
print(f"Public Key: {public_key}")
print(f"Private Key (base58): {secret_key_base58}")
print(f"Secret Key Length: {len(secret_key_bytes)} bytes")
