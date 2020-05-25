import express, { Request, Response } from 'express';
import { userController } from '../../controllers';

export const router = express.Router({
    strict: true
});

router.get('/user/:username', (req: Request, res: Response) => {
    userController.read(req, res);
});