import { Hono } from 'hono'
import user from './routes/user'
import writings from './routes/writings';
import words from './routes/words';
import {cors} from 'hono/cors'

const app = new Hono()

app.use(cors());
app.route('/api/v1/user', user);
app.route('/api/v1/writings', writings)
app.route('/api/v1/words', words)


export default app;
