const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = 3000;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'bancotarde',
    password: 'BemVindo!',
    port: 5432,
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/veiculos', async (req, res) => {
    const { marca, modelo, ano } = req.body;
    const queryText = 'INSERT INTO veiculos (marca, modelo, ano) VALUES ($1, $2, $3) RETURNING *';
    const values = [marca, modelo, ano];

    try {
        const result = await pool.query(queryText, values);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Erro ao cadastrar veículo:', err);
        res.status(500).send('Erro interno ao processar a solicitação');
    }
});

app.get('/veiculos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM veiculos');
        res.json(result.rows);
    } catch (err) {
        res.status(400).send(err);
    }
});

app.put('/veiculos/:id', async (req, res) => {
    const { id } = req.params;
    const { marca, modelo, ano } = req.body;
    const queryText = 'UPDATE veiculos SET marca = $1, modelo = $2, ano = $3 WHERE id = $4 RETURNING *';
    const values = [marca, modelo, ano, id];

    try {
        const result = await pool.query(queryText, values);
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Erro ao atualizar veículo:', err);
        res.status(500).send('Erro interno ao processar a solicitação');
    }
});

app.delete('/veiculos/:id', async (req, res) => {
    const { id } = req.params;
    const queryText = 'DELETE FROM veiculos WHERE id = $1 RETURNING *';

    try {
        const result = await pool.query(queryText, [id]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Erro ao excluir veículo:', err);
        res.status(500).send('Erro interno ao processar a solicitação');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
