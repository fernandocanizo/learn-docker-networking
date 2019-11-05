const express = require('express');
const app = express();

const config = require('./config');

const port = 50000;

const knex = require('knex')({
  client: 'pg',
  connection: config.connection,
});

const insertTest = async (name) => {
  return await knex('test')
    .insert({ name })
    .returning('*');
};

const doit = async (req, res) => {
  try {
    const result = await insertTest(req.params['0']);
    res.json(result);
  } catch (e) {
    console.log(e);
  }
}

app.get('*', doit);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
