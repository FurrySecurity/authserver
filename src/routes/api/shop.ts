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
    shopListController.get(req, res);
});

router.get('/addpackage/:name/:product_id/:price/:buyable/:expires', (req: Request, res: Response) => {
    shopAddPackageController.get(req, res);
});

router.get('/addproduct/:name/:subscription', (req: Request, res: Response) => {
    shopAddProductController.get(req, res);
});

router.get('/redeem/:key', (req: Request, res: Response) => {
    shopRedeemController.get(req, res);
});

router.get('/buy/:id', (req: Request, res: Response) => {
    shopBuyController.get(req, res);
});

router.get('/generate/:id/:count', (req: Request, res: Response) => {
    shopGenerateController.get(req, res);
});