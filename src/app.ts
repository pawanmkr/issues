import express from 'express';
import chalk from 'chalk';
import router from './routes/index.js';
import pool from './config/database.js';
import body_parser from 'body-parser';
import create_tables from './controller/create_tables.js';

const app = express();
const PORT = process.env.PORT || 3000;

if (pool) { 
    console.log("db connected");
    create_tables();
};


app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());

app.use("/api", router);

app.listen(PORT, () => {
    console.log(chalk.bgGreen.black(`Server live at https://localhost:${PORT} ...`));
});

export default app;