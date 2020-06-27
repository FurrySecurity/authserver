import express, { Request, Response } from 'express';
import {
    shopListController,
    shopAddPackageController,
    shopAddProductController,
    shopBuyController,
    shopGenerateController,
    shopRedeemController
} from '../../controllers';

export const router = express.Router({
    strict: true
});

router.get('/list', (req: Request, res: Response) => {
    shopListController.create(req, res);
});

router.get('/addpackage/:name/:product_id/:price/:buyable/:expires', (req: Request, res: Response) => {
    shopAddPackageController.create(req, res);
});

router.get('/addproduct/:name/:subscription', (req: Request, res: Response) => {
    shopAddProductController.create(req, res);
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