import express, { Request, Response } from 'express';
import { loginController, registerController, logoutController, sessionController } from '../../controllers';

export const router = express.Router({
    strict: true
});

router.get('/login/:email/:password', (req: Request, res: Response) => {
    loginController.create(req, res);
});

router.get('/register/:email/:username/:password', (req: Request, res: Response) => {
    registerController.create(req, res);
});

router.get('/logout', (req: Request, res: Response) => {
    logoutController.create(req, res);
});

router.get('/session', (req: Request, res: Response) => {
    sessionController.create(req, res);
});