import express, { Request, Response } from 'express';
import {
    panelHomeController,
    panelShopController,
    panelStatusController,
    panelLoginController,
    panelLogoutController,
    panelForgotController,
    panelRegisterController,
 } from '../../controllers';

export const router = express.Router({
    strict: true
});

router.get('/', (req: Request, res: Response) => {
    panelHomeController.get(req, res);
});

router.get('/shop', (req: Request, res: Response) => {
    panelShopController.get(req, res);
});

router.get('/status', (req: Request, res: Response) => {
    panelStatusController.get(req, res);
});

router.get('/login', (req: Request, res: Response) => {
    panelLoginController.get(req, res);
});

router.get('/logout', (req: Request, res: Response) => {
    panelLogoutController.get(req, res);
});

router.get('/forgot', (req: Request, res: Response) => {
    panelForgotController.get(req, res);
});

router.get('/register', (req: Request, res: Response) => {
    panelRegisterController.get(req, res);
});