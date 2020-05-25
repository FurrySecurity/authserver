import express, { Request, Response } from 'express';
import { panelHomeController, panelLoginController, panelRegisterController } from '../../controllers';

export const router = express.Router({
    strict: true
});

router.get('/', (req: Request, res: Response) => {
    panelHomeController.read(req, res);
});

router.get('/login', (req: Request, res: Response) => {
    panelLoginController.read(req, res);
});

router.get('/register', (req: Request, res: Response) => {
    panelRegisterController.read(req, res);
});