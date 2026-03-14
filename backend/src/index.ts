import { Hono } from 'hono'
import { routeToAgent } from 'honidev'
import { ModeratorAgent, SpecialistAgent, RefuterAgent } from './agents/debater'
import { JuryAgent } from './agents/judge'

const app = new Hono<{ Bindings: Env }>()

app.get('/', (c) => c.text('ARGUS AI Debate System'))

app.post('/debate', async (c) => {
  const { proposition, rounds = 2 } = await c.req.json()
  const threadId = crypto.randomUUID()
  const envMap = c.env as unknown as Record<string, DurableObjectNamespace>

  const aiGatewayToken = await c.env.AI_GATEWAY_TOKEN?.get() ?? '';

  let debateLog = []

  // Step 1: Moderator creates agenda
  const modRes = await routeToAgent(envMap, { binding: 'ModeratorAgent', threadId }, `Create an agenda for: ${proposition}`)
  debateLog.push({ role: 'moderator', content: modRes.response })

  for (let i = 0; i < rounds; i++) {
    // Step 2: Specialist gathers evidence
    const specRes = await routeToAgent(envMap, { binding: 'SpecialistAgent', threadId }, `Find evidence for: ${proposition}`)
    debateLog.push({ role: 'specialist', content: specRes.response })

    // Step 3: Refuter challenges
    const refRes = await routeToAgent(envMap, { binding: 'RefuterAgent', threadId }, `Challenge this evidence: ${specRes.response}`)
    debateLog.push({ role: 'refuter', content: refRes.response })
  }

  // Step 4: Jury renders verdict
  const summary = debateLog.map(l => `${l.role.toUpperCase()}: ${l.content}`).join('\n\n')
  const juryRes = await routeToAgent(envMap, { binding: 'JuryAgent', threadId }, `Render a verdict based on this debate:\n\n${summary}`)
  debateLog.push({ role: 'jury', content: juryRes.response })

  return c.json({
    status: 'Debate finished',
    proposition,
    verdict: juryRes.response,
    log: debateLog,
    gatewayTokenConfigured: !!aiGatewayToken
  })
})

export default app

export class ModeratorAgentClass extends ModeratorAgent.DurableObject {}
export class SpecialistAgentClass extends SpecialistAgent.DurableObject {}
export class RefuterAgentClass extends RefuterAgent.DurableObject {}
export class JuryAgentClass extends JuryAgent.DurableObject {}
