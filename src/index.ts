import 'reflect-metadata'

import express from 'express';
import path from 'path'

import { PORT } from './config/constants';

import { userRouter, loginRouter, registerRouter } from './routes';

import { createConnection, Connection } from 'typeorm';

createConnection(require(path.join(__dirname, '../ormconfig.json'))).then(connection => {
    const app = express();

    app.set('view engine', 'ejs');

    app.use(express.json());

    app.use('/api/user', userRouter);

    app.use('/api/auth/login', loginRouter);
    app.use('/api/auth/register', registerRouter);

    app.get('/', (req, res) => {
        res.render('pages/index');
    })

    app.get('/about', (req, res) => {
        res.render('pages/about');
    });

    app.get('/panel/', (req, res) => {
        res.render('pages/panel/index');
    });

    app.use((res, req) => {
        req.json({ success: false, message: 'file not found on this server!' });
    });

    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
}).catch(error => {
    console.error(error);
});