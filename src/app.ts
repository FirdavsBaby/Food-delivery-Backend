import express, { Application } from 'express'
import { run } from './start/run.js'
import { modules } from './start/modules.js'

const app:Application = express()


modules(app)
run(app)