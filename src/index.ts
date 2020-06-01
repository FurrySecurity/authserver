import 'reflect-metadata'

import express from 'express';
import session from 'express-session'

import path from 'path'

import { PORT } from './config/constants';

import { authRouter, userRouter, shopRouter, panelRouter } from './routes';

import { createConnection, Connection } from 'typeorm';

createConnection(require(path.join(__dirname, '../ormconfig.json'))).then(connection => {
    const app = express();

    app.set('view engine', 'ejs');

    app.use(express.static('static'));

    app.use(express.json());
    app.use(session({
        secret: 'secret_key_uwu',
        resave: true,
        saveUninitialized: true,

        cookie: {
            path: '/',
            httpOnly: true,
            secure: false,
            maxAge: null
        }
    }));

    app.use('/api/auth', authRouter);
    app.use('/api/user', userRouter);
    app.use('/api/shop', shopRouter);

    app.use('/panel/index', (req, res) => {
        if (!req.session.authenticated) {
            res.redirect('./login');
        }
    });

    app.use('/panel', panelRouter);

    app.get('/', (req, res) => {
        res.render('pages/index', { session: req.session });
    })
    
    /*
    app.get('/about', (req, res) => {
        res.render('pages/about');
    });

    app.get('/panel/', (req, res) => {
        res.render('pages/panel/index');
    });
    */

    app.use((res, req) => {
        req.json({ success: false, message: 'file not found on this server!: ' + res.path });
    });

    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
}).catch(error => {
    console.error(error);
});