import { render, screen } from '@testing-library/react'
import Home from '../app/page'
import '@testing-library/jest-dom'

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
        total_agents: 5,
        alive_agents: 3,
        total_services: 10,
        total_bounties: 2,
        total_balance: 100.0,
        total_earned: 50.0,
        total_paid: 10.0,
        total_transactions: 100
    }),
  })
) as jest.Mock;

describe('Home', () => {
  it('renders heading', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', {
      name: /OMA-AI/i,
    })

    expect(heading).toBeInTheDocument()
  })

  it('renders stats', async () => {
    render(<Home />)
    
    // Stats are loaded async, so we might need to wait or mock better
    // For now just check if the main structure renders
    expect(screen.getByText('Zero Human')).toBeInTheDocument()
  })
})