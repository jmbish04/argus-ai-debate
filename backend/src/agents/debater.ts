import { createAgent } from 'honidev'
import { searchEvidence, verifyFact } from '../tools/index'

export const ModeratorAgent = createAgent({
  name: "ModeratorAgent",
  model: "@cf/meta/llama-3.1-8b-instruct",
  system: "You are a Debate Moderator in the ARGUS system.\n\nYour responsibilities:\n1. Create structured agendas for evaluating propositions\n2. Identify key aspects that require evidence\n3. Evaluate debate progress and determine when to conclude",
  binding: "ModeratorAgent",
  // @ts-ignore
  observability: { enabled: true, aiGatewaySlug: "argus-gateway" }
})

export const SpecialistAgent = createAgent({
  name: "SpecialistAgent",
  model: "@cf/meta/llama-3.1-8b-instruct",
  system: "You are a Domain Specialist in the ARGUS debate system.\n\nYour responsibilities:\n1. Gather evidence relevant to the proposition\n2. Evaluate sources objectively\n3. Formulate clear claims based on evidence",
  tools: [searchEvidence, verifyFact],
  binding: "SpecialistAgent",
  // @ts-ignore
  observability: { enabled: true, aiGatewaySlug: "argus-gateway" }
})

export const RefuterAgent = createAgent({
  name: "RefuterAgent",
  model: "@cf/meta/llama-3.1-8b-instruct",
  system: "You are a Refuter in the ARGUS debate system.\n\nYour role is to ensure rigorous evaluation by finding weaknesses and counter-evidence.\n\nYour responsibilities:\n1. Challenge claims made by Specialists\n2. Provide counter-evidence where applicable\n3. Identify logical fallacies or weak evidence",
  tools: [searchEvidence, verifyFact],
  binding: "RefuterAgent",
  // @ts-ignore
  observability: { enabled: true, aiGatewaySlug: "argus-gateway" }
})
