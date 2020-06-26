import express, { Request, Response } from 'express';
import {
    panelHomeController,
    panelCheatsController,
    panelCreditsController,
    panelLoginController,
    panelLogoutController,
    panelForgotController,
    panelRegisterController,
    panelSettingsController
 } from '../../controllers';

export const router = express.Router({
    strict: true
});

router.get('/', (req: Request, res: Response) => {
    panelHomeController.read(req, res);
});

router.get('/cheats', (req: Request, res: Response) => {
    panelCheatsController.read(req, res);
});

router.get('/credits', (req: Request, res: Response) => {
    panelCreditsController.read(req, res);
});

router.get('/login', (req: Request, res: Response) => {
    panelLoginController.read(req, res);
});

router.get('/logout', (req: Request, res: Response) => {
    panelLogoutController.read(req, res);
});

router.get('/forgot', (req: Request, res: Response) => {
    panelForgotController.read(req, res);
});

router.get('/register', (req: Request, res: Response) => {
    panelRegisterController.read(req, res);
});

router.get('/settings', (req: Request, res: Response) => {
    panelSettingsController.read(req, res);
});