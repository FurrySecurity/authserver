import express, { Request, Response } from 'express';
import { loginController, registerController } from '../../controllers';

export const router = express.Router({
    strict: true
});

router.get('/login/:email/:password', (req: Request, res: Response) => {
    loginController.read(req, res);
});

router.get('/register/:email/:username/:password', (req: Request, res: Response) => {
    registerController.read(req, res);
});