import express, { Request, Response } from 'express';
import { shopAddPackageController, shopAddProductController, shopBuyController, shopGenerateController, shopRedeemController } from '../../controllers';

export const router = express.Router({
    strict: true
});

router.get('/addpackage/:name/:product_id/:price/:buyable/:expires', (req: Request, res: Response) => {
    shopRedeemController.create(req, res);
});

router.get('/addproduct/:name/:subscription', (req: Request, res: Response) => {
    shopRedeemController.create(req, res);
});

router.get('/redeem/:id', (req: Request, res: Response) => {
    shopRedeemController.create(req, res);
});

router.get('/buy/:id', (req: Request, res: Response) => {
    shopBuyController.create(req, res);
});

router.get('/generate/:id/:count', (req: Request, res: Response) => {
    shopGenerateController.create(req, res);
});