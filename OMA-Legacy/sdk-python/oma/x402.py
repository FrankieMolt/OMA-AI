from typing import Optional, Dict, Any
import json
import base64
import time


class X402Client:
    def __init__(
        self,
        wallet: Optional[str] = None,
        endpoint: str = "https://api.oma.ai",
        default_recipient: str = "oma-marketplace.sol"
    ):
        self.wallet = wallet
        self.endpoint = endpoint
        self.default_recipient = default_recipient

    async def pay(
        self,
        amount: float,
        recipient: Optional[str] = None,
        description: Optional[str] = None,
        currency: str = "USDC"
    ) -> Dict[str, Any]:
        recipient = recipient or self.default_recipient

        if not self.wallet:
            raise ValueError("Wallet private key is required for payments")

        transaction_id = self._generate_transaction_id()
        nonce = self._generate_nonce()
        timestamp = time.strftime("%Y-%m-%dT%H:%M:%S.000Z", time.gmtime())

        payment = {
            "transactionId": transaction_id,
            "amount": amount,
            "recipient": recipient,
            "currency": currency,
            "timestamp": timestamp,
            "signature": self._create_payment_signature({
                "transactionId": transaction_id,
                "amount": amount,
                "recipient": recipient,
                "timestamp": timestamp,
                "nonce": nonce
            }),
            "nonce": nonce,
            "status": "pending"
        }

        return payment

    async def verify(
        self,
        signature: str,
        amount: float,
        recipient: str,
        timestamp: str,
        nonce: str
    ) -> Dict[str, Any]:
        import aiohttp

        payload = {
            "signature": signature,
            "amount": amount,
            "recipient": recipient,
            "timestamp": timestamp,
            "nonce": nonce
        }

        async with aiohttp.ClientSession() as session:
            async with session.post(
                f"{self.endpoint}/api/payments/verify",
                json=payload
            ) as response:
                if not response.ok:
                    return {"valid": False, "error": response.text}
                data = await response.json()
                return {
                    "valid": data.get('data', {}).get('valid', False),
                    "transactionId": data.get('data', {}).get('transactionId')
                }

    async def get_balance(self, address: str) -> float:
        import aiohttp

        async with aiohttp.ClientSession() as session:
            async with session.get(
                f"{self.endpoint}/api/wallet/balance?address={address}"
            ) as response:
                if not response.ok:
                    raise Exception(f"Failed to get balance: {response.text}")
                data = await response.json()
                return data.get('data', {}).get('balance', 0.0)

    def _generate_transaction_id(self) -> str:
        import uuid
        return str(uuid.uuid4())

    def _generate_nonce(self) -> str:
        return f"{int(time.time() * 1000)}-{int(time.time() * 1000000) % 1000000}"

    def _create_payment_signature(self, payment: Dict[str, Any]) -> str:
        message = json.dumps(payment, sort_keys=True)
        return base64.b64encode(message.encode()).decode()

    def set_default_recipient(self, recipient: str) -> None:
        self.default_recipient = recipient

    def set_endpoint(self, endpoint: str) -> None:
        self.endpoint = endpoint
