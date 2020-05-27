import express, { Request, Response } from 'express';
import { shopBuyController, shopGenerateController, shopRedeemController } from '../../controllers';

export const router = express.Router({
    strict: true
});

router.post('/redeem/:id', (req: Request, res: Response) => {
    shopRedeemController.create(req, res);
});

router.post('/buy/:id', (req: Request, res: Response) => {
    shopBuyController.create(req, res);
});

router.get('/generate/:id/:count', (req: Request, res: Response) => {
    shopGenerateController.create(req, res);
});