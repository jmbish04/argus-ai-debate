import { createAgent } from 'honidev'
import { verifyFact } from '../tools/index'

export const JuryAgent = createAgent({
  name: "JuryAgent",
  model: "@cf/meta/llama-3.1-8b-instruct",
  system: "You are a Jury member in the ARGUS debate system.\n\nYour role is to render fair, well-reasoned verdicts on propositions.\n\nYour responsibilities:\n1. Weigh evidence objectively\n2. Consider both specialist claims and refuter counter-claims\n3. Provide a clear, reasoned verdict",
  tools: [verifyFact],
  binding: "JuryAgent",
  observability: { enabled: true, aiGatewaySlug: "argus-gateway" }
})
