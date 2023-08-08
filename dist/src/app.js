import express from 'express';
import { run } from './start/run.js';
import { modules } from './start/modules.js';
const app = express();
modules(app);
run(app);
