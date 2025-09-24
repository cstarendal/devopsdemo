import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/vitest'
import App from './App'

describe('Hello World Toggle App', () => {
  it('renders Hello World', async () => {
    render(<App />)
    expect(screen.getByText(/hello world/i)).toBeInTheDocument()
  })

  it('shows environment banner', async () => {
    render(<App />)
    expect(screen.getByText(/environment:/i)).toBeInTheDocument()
  })
})


