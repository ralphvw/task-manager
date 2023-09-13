import express from 'express';
import { db } from './db/db.js';
import routes from './routes/index.js';

//const express = require('express')

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.use('/api/v1', routes);

db.connect()
  .then(() => {
    app.listen(PORT, async () => {
      console.log(`🚀🚀 Server ready at http://localhost:${PORT}/api/v1/`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    // eslint-disable-next-line no-undef
    process.exit(1);
  });
