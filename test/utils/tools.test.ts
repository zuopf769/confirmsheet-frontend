import { describe, it, expect } from 'vitest'
import { notNull } from '../../src/utils/tools'

describe('notNull', () => {
  it('is not null', () => {
    expect(notNull('123')).to.equal(true)
  })
  it('is null', () => {
    expect(notNull(null)).to.equal(false)
  })
})
