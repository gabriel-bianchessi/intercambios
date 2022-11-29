import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import routes from './routes'

const app = express()
app.use(cors({
  origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
  credentials: true,
  methods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"],
  exposedHeaders: ["*", "Authorization"],
  allowedHeaders: ["*", "Authorization", "Content-Type"],
}))

app.use(express.json())
app.use(routes)