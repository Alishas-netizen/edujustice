import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { rateLimit } from 'express-rate-limit'

const app = express()
const port = Number(process.env.PORT || 8080)
const origins = process.env.CLIENT_ORIGIN?.split(',').map((item) => item.trim()).filter(Boolean) || []

app.disable('x-powered-by')
app.use(helmet())
app.use(cors({ origin: origins.length ? origins : false, credentials: true }))
app.use(express.json({ limit: '100kb' }))
app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, limit: 120, standardHeaders: 'draft-8', legacyHeaders: false }))

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'edujustice-api', timestamp: new Date().toISOString() })
})

app.get('/api/complaints/validate/:id', (request, response) => {
  const valid = /^EDU-\d{4}-[A-Z0-9]{5}$/.test(request.params.id.toUpperCase())
  response.status(valid ? 200 : 400).json({ valid })
})

app.use((_request, response) => response.status(404).json({ error: 'Route not found' }))
app.listen(port, () => console.log(`EduJustice API listening on port ${port}`))
