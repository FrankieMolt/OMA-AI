export const metadata = {
  title: 'FAQ | OMA-AI',
  description: 'Frequently asked questions about OMA-AI and x402 payments.',
}

const faqs = [
  {
    question: "What is x402?",
    answer: "x402 is a payment protocol that uses HTTP 402 Payment Required responses combined with cryptocurrency payments. It allows APIs to charge per-request without subscriptions."
  },
  {
    question: "How much does Frankie API cost?",
    answer: "Frankie API uses pay-per-request pricing: /health is free, /price is $0.01, /signal is $0.50, and /premium is $1.00. You only pay for what you use."
  },
  {
    question: "What cryptocurrencies are supported?",
    answer: "Currently USDC on Base network (chainId: 8453). Support for additional chains coming soon."
  },
  {
    question: "Do I need an API key?",
    answer: "No. x402 uses your wallet address for authentication. Just include the payment proof in the X-Payment header."
  },
  {
    question: "What happens if payment fails?",
    answer: "You receive a 402 response with payment requirements. After successful payment, retry the request with the transaction hash."
  }
]

export default function FAQPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-white mb-8">Frequently Asked Questions</h1>
      
      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-white mb-2">{faq.question}</h2>
            <p className="text-zinc-400">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
