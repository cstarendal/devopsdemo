import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import userEvent from '@testing-library/user-event'
import App from './App'
import { __setEnvOverride } from './flags'

describe('Hello World Toggle App', () => {
  it('renders Hello World', async () => {
    render(<App />)
    expect(screen.getByText(/hello world/i)).toBeInTheDocument()
  })

  it('shows environment banner', async () => {
    render(<App />)
    expect(screen.getByText(/environment:/i)).toBeInTheDocument()
  })

  it('Staging shows heart by default (feature always ON)', async () => {
    __setEnvOverride('Staging')
    localStorage.clear()
    render(<App />)
    expect(screen.getByLabelText('heart')).toBeInTheDocument()
  })

  it('Production shows heart after enabling all features', async () => {
    __setEnvOverride('Production')
    localStorage.removeItem('feature:newFeature')
    localStorage.removeItem('feature:smiley')
    localStorage.removeItem('feature:heart')
    localStorage.removeItem('feature:greenSmiley')
    render(<App />)
    expect(screen.queryByLabelText('heart')).not.toBeInTheDocument()
    const btn = screen.getByRole('button', { name: /enable all new features/i })
    const user = userEvent.setup()
    await user.click(btn)
    expect(screen.getByLabelText('heart')).toBeInTheDocument()
  })

  it('Staging renders the smiley present by default', async () => {
    __setEnvOverride('Staging')
    localStorage.clear()
    render(<App />)
    const smiley = screen.getByLabelText('smiley')
    expect(smiley).toBeInTheDocument()
    const strip = screen.getByTestId('features-strip')
    expect(strip).toHaveStyle({ height: '160px' })
  })

  it('Production renders smiley only after enabling all features', async () => {
    __setEnvOverride('Production')
    localStorage.removeItem('feature:newFeature')
    localStorage.removeItem('feature:smiley')
    localStorage.removeItem('feature:heart')
    localStorage.removeItem('feature:greenSmiley')
    render(<App />)
    const pre = screen.queryByLabelText('smiley')
    const btn = screen.getByRole('button', { name: /enable all new features/i })
    const user = userEvent.setup()
    await user.click(btn)
    const post = screen.getByLabelText('smiley')
    expect(post).toBeInTheDocument()
  })

  it('Staging shows a feature-flagged toggle button next to heart and it toggles', async () => {
    __setEnvOverride('Staging')
    localStorage.clear()
    render(<App />)
    const btn = screen.getByRole('button', { name: /toggle: off/i })
    expect(btn).toBeInTheDocument()
    const user = userEvent.setup()
    await user.click(btn)
    expect(screen.getByRole('button', { name: /toggle: on/i })).toBeInTheDocument()
  })

  it('Production shows the toggle button only after enabling all features', async () => {
    __setEnvOverride('Production')
    localStorage.clear()
    render(<App />)
    expect(screen.queryByRole('button', { name: /toggle:/i })).not.toBeInTheDocument()
    const enabler = screen.getByRole('button', { name: /enable all new features/i })
    const user = userEvent.setup()
    await user.click(enabler)
    expect(screen.getByRole('button', { name: /toggle: off/i })).toBeInTheDocument()
  })
})


