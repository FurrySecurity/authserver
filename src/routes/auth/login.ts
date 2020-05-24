import express, { Request, Response } from 'express';
import { loginController } from '../../controllers';

export const router = express.Router({
    strict: true
});

router.post('/:email/:password', (req: Request, res: Response) => {
    loginController.create(req, res);
});