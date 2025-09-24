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

  it('Staging renders the smiley in green by default', async () => {
    __setEnvOverride('Staging')
    localStorage.clear()
    render(<App />)
    const smiley = screen.getByLabelText('smiley')
    expect(smiley).toBeInTheDocument()
    // style attribute contains color: rgb(16, 185, 129) for #10b981 or the hex itself
    expect(smiley).toHaveStyle({ color: '#10b981' })
    const strip = screen.getByTestId('features-strip')
    expect(strip).toHaveStyle({ height: '160px' })
  })

  it('Production renders green smiley only after enabling all features', async () => {
    __setEnvOverride('Production')
    localStorage.removeItem('feature:newFeature')
    localStorage.removeItem('feature:smiley')
    localStorage.removeItem('feature:heart')
    localStorage.removeItem('feature:greenSmiley')
    render(<App />)
    const pre = screen.queryByLabelText('smiley')
    if (pre) expect(pre).not.toHaveStyle({ color: '#10b981' })
    const btn = screen.getByRole('button', { name: /enable all new features/i })
    const user = userEvent.setup()
    await user.click(btn)
    const post = screen.getByLabelText('smiley')
    expect(post).toHaveStyle({ color: '#10b981' })
  })
})


