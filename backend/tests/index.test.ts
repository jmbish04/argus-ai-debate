import { describe, it, expect } from 'vitest'
import app from '../src/index'

describe('ARGUS AI Debate System', () => {
  it('should return a greeting message on GET /', async () => {
    const res = await app.request('/')
    expect(res.status).toBe(200)
    expect(await res.text()).toBe('ARGUS AI Debate System')
  })
})
