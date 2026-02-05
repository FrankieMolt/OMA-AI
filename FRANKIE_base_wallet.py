#!/usr/bin/env python3
from eth_account import Account
import json

# Generate Base (EVM) wallet for FRANKIE
account = Account.create()

wallet = {
    'address': account.address,
    'private_key': account.key.hex(),  # Standard hex format with 0x
    'private_key_no_prefix': account.key.hex()[2:],  # Without 0x prefix
    'network': 'base-mainnet',
    'rpc_url': 'https://mainnet.base.org'
}

with open('FRANKIE_base_wallet.json', 'w') as f:
    json.dump(wallet, f, indent=2)

print(f"FRANKIE Base Wallet Created:")
print(f"Address: {account.address}")
print(f"Private Key: {account.key.hex()}")
