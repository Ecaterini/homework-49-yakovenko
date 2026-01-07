import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import UserProfile from './UserProfile'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('UserProfile', () => {
  it('shows loading indicator', () => {
    render(<UserProfile />)
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it('renders user data after successful fetch', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        name: 'Leanne Graham',
        email: 'leanne@example.com',
      }),
    })

    render(<UserProfile />)

    await waitFor(() => {
      expect(screen.getByText(/leanne graham/i)).toBeInTheDocument()
      expect(screen.getByText(/leanne@example.com/i)).toBeInTheDocument()
    })
  })

  it('shows error message on failed fetch', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({ ok: false })

    render(<UserProfile />)

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument()
    })
  })
})