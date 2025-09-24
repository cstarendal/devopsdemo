import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/vitest'
import App from './App'

describe('Hello World Toggle App', () => {
  it('renders Hello World and toggle initial state OFF', async () => {
    render(<App />)
    expect(screen.getByText(/hello world/i)).toBeInTheDocument()
    const button = screen.getByRole('button', { name: /toggle: off/i })
    expect(button).toBeInTheDocument()
  })

  it('toggles between ON and OFF when clicked', async () => {
    const user = userEvent.setup()
    render(<App />)
    const button = screen.getByRole('button', { name: /toggle: off/i })
    await user.click(button)
    expect(screen.getByRole('button', { name: /toggle: on/i })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /toggle: on/i }))
    expect(screen.getByRole('button', { name: /toggle: off/i })).toBeInTheDocument()
  })
})


