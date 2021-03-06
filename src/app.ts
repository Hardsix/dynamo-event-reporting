import express from 'express';
import bodyParser from 'body-parser';
import { router } from './router';
import { populateDb } from './db/populate';

const app = express();

app.use(bodyParser.json({ type: 'application/json' }));
app.use('/', router);

const port = process.env.NODE_PORT || 3000;
populateDb().then(() => app.listen(port, () => console.log(`Server running on port ${port}`)));
