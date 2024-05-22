import { render } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import Page from '../app/page'

vi.mock('@clerk/nextjs/server', () => {
  const mockedFunctions = {
    currentUser: () =>
      new Promise((resolve) => resolve({ user: { id: '123' } })),
  }

  return mockedFunctions
})

test(`Home`, async () => {
  const screen = render(await Page())
  screen.debug()
  expect(screen.getByText('Journal AI')).toBeTruthy()
})
