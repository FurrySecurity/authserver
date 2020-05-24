import express, { Request, Response } from 'express';
import { registerController } from '../../controllers';

export const router = express.Router({
    strict: true
});

router.post('/:email/:username/:password', (req: Request, res: Response) => {
    registerController.create(req, res);
});