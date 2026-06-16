import { tool } from 'honidev'
import { z } from 'zod'

export const searchEvidence = tool({
  name: 'search_evidence',
  description: 'Search for evidence related to a proposition',
  input: z.object({
    query: z.string(),
    domain: z.string()
  }) as any,
  handler: async ({ query, domain }) => {
    return `Evidence found for ${query} in ${domain}`
  }
})

export const verifyFact = tool({
  name: 'verify_fact',
  description: 'Verify a specific fact or claim',
  input: z.object({
    claim: z.string()
  }) as any,
  handler: async ({ claim }) => {
    return `Fact check result for: ${claim}`
  }
})
