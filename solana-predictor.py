#!/usr/bin/env python3
"""
NOSYT Solana Trading Predictor
Uses technical analysis, sentiment, and on-chain data for predictions
"""

import requests
import json
import time
from datetime import datetime, timedelta
import statistics
from typing import Dict, List, Tuple

# Configuration
WALLET_ADDRESS = 'DcPfnhNQt98oXhgA7shgXpo2pgTzJMKf6TWuaddqqpSN'
SOLANA_RPC = 'https://api.mainnet-beta.solana.com'
COINGECKO_API = 'https://api.coingecko.com/api/v3'
JUPITER_API = 'https://api.jup.ag'

# Token mappings
TOKENS = {
    'SOL': 'So11111111111111111111111111111111111111112',
    'JUP': 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN',
    'RAY': '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
    'MSOL': 'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So',
    'BONK': 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
}

COINGECKO_IDS = {
    'SOL': 'solana',
    'JUP': 'jupiter-exchange-solana',
    'RAY': 'raydium',
    'MSOL': 'msol',
    'BONK': 'bonk',
}

class SolanaRPC:
    """Solana RPC client"""

    def __init__(self, rpc_url: str = SOLANA_RPC):
        self.rpc_url = rpc_url
        self.headers = {'Content-Type': 'application/json'}

    def get_balance(self, address: str) -> float:
        """Get SOL balance for address"""
        payload = {
            "jsonrpc": "2.0",
            "id": 1,
            "method": "getBalance",
            "params": [address]
        }
        response = requests.post(self.rpc_url, json=payload, headers=self.headers)
        data = response.json()
        if 'result' in data:
            lamports = data['result']['value']
            return lamports / 1_000_000_000  # Convert to SOL
        return 0.0

    def get_token_accounts(self, address: str) -> List[Dict]:
        """Get all token accounts for address"""
        payload = {
            "jsonrpc": "2.0",
            "id": 1,
            "method": "getTokenAccountsByOwner",
            "params": [
                address,
                {"programId": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"},
                {"encoding": "jsonParsed"}
            ]
        }
        response = requests.post(self.rpc_url, json=payload, headers=self.headers)
        data = response.json()
        if 'result' in data:
            accounts = []
            for account in data['result']['value']:
                parsed = account['account']['data']['parsed']['info']
                accounts.append({
                    'mint': parsed['mint'],
                    'amount': float(parsed['tokenAmount']['uiAmountString']),
                    'decimals': parsed['tokenAmount']['decimals']
                })
            return accounts
        return []


class PriceData:
    """Fetch price data from multiple sources"""

    def __init__(self):
        self.rpc = SolanaRPC()

    def get_current_price(self, token: str) -> float:
        """Get current price from CoinGecko"""
        coingecko_id = COINGECKO_IDS.get(token)
        if not coingecko_id:
            return 0.0

        url = f"{COINGECKO_API}/simple/price"
        params = {'ids': coingecko_id, 'vs_currencies': 'usd'}

        try:
            response = requests.get(url, params=params)
            data = response.json()
            return float(data[coingecko_id]['usd'])
        except Exception as e:
            print(f"Error fetching price for {token}: {e}")
            return 0.0

    def get_wallet_value(self, address: str) -> Dict[str, Dict]:
        """Get full wallet value breakdown"""
        accounts = self.rpc.get_token_accounts(address)
        wallet_data = {}

        # Get SOL balance
        sol_balance = self.rpc.get_balance(address)
        sol_price = self.get_current_price('SOL')
        wallet_data['SOL'] = {
            'amount': sol_balance,
            'price': sol_price,
            'value': sol_balance * sol_price
        }

        # Get token values
        for account in accounts:
            mint = account['mint']
            amount = account['amount']

            # Reverse lookup token symbol
            symbol = next((k for k, v in TOKENS.items() if v == mint), mint[:8])

            if symbol in COINGECKO_IDS:
                price = self.get_current_price(symbol)
                wallet_data[symbol] = {
                    'amount': amount,
                    'price': price,
                    'value': amount * price
                }

        return wallet_data


class TechnicalIndicators:
    """Technical analysis indicators"""

    @staticmethod
    def calculate_rsi(prices: List[float], period: int = 14) -> float:
        """Calculate Relative Strength Index"""
        if len(prices) < period + 1:
            return 50.0  # Neutral

        gains = []
        losses = []

        for i in range(1, len(prices)):
            change = prices[i] - prices[i - 1]
            if change > 0:
                gains.append(change)
                losses.append(0)
            else:
                gains.append(0)
                losses.append(abs(change))

        avg_gain = statistics.mean(gains[-period:])
        avg_loss = statistics.mean(losses[-period:])

        if avg_loss == 0:
            return 100.0

        rs = avg_gain / avg_loss
        rsi = 100 - (100 / (1 + rs))

        return rsi

    @staticmethod
    def calculate_macd(prices: List[float], fast: int = 12, slow: int = 26, signal: int = 9) -> Tuple[float, float]:
        """Calculate MACD (Moving Average Convergence Divergence)"""
        if len(prices) < slow:
            return 0.0, 0.0

        # Calculate EMAs
        def ema(data: List[float], period: int) -> float:
            multiplier = 2 / (period + 1)
            ema = data[0]
            for price in data[1:]:
                ema = (price * multiplier) + (ema * (1 - multiplier))
            return ema

        ema_fast = ema(prices[-fast:], fast)
        ema_slow = ema(prices[-slow:], slow)
        macd = ema_fast - ema_slow

        # Signal line would be EMA of MACD values
        # For simplicity, we'll just return MACD
        return macd, macd * 0.5  # Simplified signal

    @staticmethod
    def calculate_bollinger_bands(prices: List[float], period: int = 20, std_dev: float = 2) -> Tuple[float, float, float]:
        """Calculate Bollinger Bands"""
        if len(prices) < period:
            middle = statistics.mean(prices)
            std = statistics.stdev(prices) if len(prices) > 1 else 0
        else:
            middle = statistics.mean(prices[-period:])
            std = statistics.stdev(prices[-period:])

        upper = middle + (std * std_dev)
        lower = middle - (std * std_dev)

        return upper, middle, lower


class TradingPredictor:
    """Main prediction engine"""

    def __init__(self):
        self.price_data = PriceData()
        self.indicators = TechnicalIndicators()
        self.price_history = {token: [] for token in TOKENS}

    def analyze_token(self, token: str, current_price: float) -> Dict:
        """Analyze token and generate trading signals"""

        # Add to price history
        self.price_history[token].append(current_price)
        if len(self.price_history[token]) > 50:
            self.price_history[token] = self.price_history[token][-50:]

        prices = self.price_history[token]

        # Calculate indicators
        rsi = self.indicators.calculate_rsi(prices)
        macd, signal = self.indicators.calculate_macd(prices)
        upper, middle, lower = self.indicators.calculate_bollinger_bands(prices)

        # Generate signals
        signals = []

        # RSI signals
        if rsi < 30:
            signals.append(('BUY', 'RSI oversold', 0.7))
        elif rsi > 70:
            signals.append(('SELL', 'RSI overbought', 0.7))

        # MACD signals
        if macd > signal and prices[-1] > prices[-2]:
            signals.append(('BUY', 'MACD bullish crossover', 0.6))
        elif macd < signal and prices[-1] < prices[-2]:
            signals.append(('SELL', 'MACD bearish crossover', 0.6))

        # Bollinger Bands signals
        if current_price < lower:
            signals.append(('BUY', 'Price below lower band', 0.5))
        elif current_price > upper:
            signals.append(('SELL', 'Price above upper band', 0.5))

        # Calculate overall sentiment
        if not signals:
            sentiment = 'HOLD'
            confidence = 0.0
        else:
            buy_weight = sum(w for s, r, w in signals if s == 'BUY')
            sell_weight = sum(w for s, r, w in signals if s == 'SELL')
            confidence = max(buy_weight, sell_weight)
            sentiment = 'BUY' if buy_weight > sell_weight else 'SELL'

        return {
            'token': token,
            'price': current_price,
            'rsi': rsi,
            'macd': macd,
            'bollinger': {'upper': upper, 'middle': middle, 'lower': lower},
            'signals': signals,
            'sentiment': sentiment,
            'confidence': confidence
        }

    def generate_report(self) -> Dict:
        """Generate comprehensive trading report"""
        print("\n" + "=" * 70)
        print(f"📊 NOSYT Trading Report - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("=" * 70)

        # Get wallet data
        wallet = self.price_data.get_wallet_value(WALLET_ADDRESS)
        total_value = sum(v['value'] for v in wallet.values())

        print(f"\n💰 Portfolio Value: ${total_value:.2f}")
        print("-" * 70)

        # Analyze each token
        predictions = {}
        for token, data in wallet.items():
            if data['amount'] > 0:
                print(f"\n{'=' * 70}")
                print(f"🔍 {token} Analysis")
                print(f"{'=' * 70}")
                print(f"Amount: {data['amount']:.6f}")
                print(f"Price: ${data['price']:.6f}")
                print(f"Value: ${data['value']:.2f}")

                # Run prediction
                prediction = self.analyze_token(token, data['price'])
                predictions[token] = prediction

                print(f"\n📈 Technical Indicators:")
                print(f"  RSI: {prediction['rsi']:.2f} ({'🔴' if prediction['rsi'] > 70 else '🟢' if prediction['rsi'] < 30 else '🟡'})")
                print(f"  MACD: {prediction['macd']:.6f}")
                print(f"  Bollinger: ${prediction['bollinger']['lower']:.6f} - ${prediction['bollinger']['upper']:.6f}")

                print(f"\n🎯 Trading Signals:")
                if prediction['signals']:
                    for signal, reason, weight in prediction['signals']:
                        emoji = '🚀' if signal == 'BUY' else '📉'
                        print(f"  {emoji} {signal}: {reason} (confidence: {weight:.2f})")
                else:
                    print(f"  ⏸️  No strong signals")

                print(f"\n💡 Recommendation: {prediction['sentiment']} (confidence: {prediction['confidence']:.2f})")

        print(f"\n{'=' * 70}")
        print("✅ Analysis Complete")
        print("=" * 70 + "\n")

        return {
            'wallet_value': total_value,
            'wallet_data': wallet,
            'predictions': predictions
        }


def main():
    """Main execution"""
    predictor = TradingPredictor()

    # Generate initial report
    report = predictor.generate_report()

    # Print summary
    print("\n📋 SUMMARY")
    print("-" * 70)
    print(f"Total Portfolio Value: ${report['wallet_value']:.2f}")

    strong_signals = [
        (t, p) for t, p in report['predictions'].items()
        if p['confidence'] > 0.6
    ]

    if strong_signals:
        print(f"\n🎯 Strong Signals ({len(strong_signals)}):")
        for token, pred in strong_signals:
            print(f"  {token}: {pred['sentiment']} ({pred['confidence']:.2f})")
    else:
        print(f"\n⏸️  No strong signals - HOLD positions")

    print("\n" + "=" * 70)


if __name__ == '__main__':
    main()
