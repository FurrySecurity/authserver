import express, { Request, Response } from 'express';
import { infoController } from '../../controllers';
import { profileController } from '../../controllers';

export const router = express.Router({
    strict: true
});

router.get('/profile/:username', (req: Request, res: Response) => {
    infoController.create(req, res);
});

router.get('/info/:uid', (req: Request, res: Response) => {
    infoController.create(req, res);
});