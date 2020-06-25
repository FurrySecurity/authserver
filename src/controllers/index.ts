import { InfoController } from './api/user/info';
import { ProfileController } from './api/user/profile';

import { LoginController } from './api/auth/login';
import { RegisterController } from './api/auth/register';
import { LogoutController } from './api/auth/logout';
import { SessionController } from './api/auth/session';

import { ShopAddPackageController } from './api/shop/addpackage';
import { ShopAddProductController } from './api/shop/addproduct';
import { ShopBuyController } from './api/shop/buy';
import { ShopGenerateController } from './api/shop/generate';
import { ShopRedeemController } from './api/shop/redeem';

import { PanelHomeController } from './panel/home'

import { PanelCheatsController } from './panel/cheats';
import { PanelCreditsController } from './panel/credits';

import { PanelLoginController } from './panel/login'
import { PanelLogoutController } from './panel/logout'
import { PanelForgotController } from './panel/forgot'
import { PanelRegisterController } from './panel/register'

const loginController = new LoginController();
const registerController = new RegisterController();
const logoutController = new LogoutController();
const sessionController = new SessionController();

const shopAddPackageController = new ShopAddPackageController();
const shopAddProductController = new ShopAddProductController();
const shopBuyController = new ShopBuyController();
const shopGenerateController = new ShopGenerateController();
const shopRedeemController = new ShopRedeemController();

const infoController = new InfoController();
const profileController = new ProfileController();

const panelHomeController = new PanelHomeController();

const panelCheatsController = new PanelCheatsController();
const panelCreditsController = new PanelCreditsController();

const panelLoginController = new PanelLoginController();
const panelLogoutController = new PanelLogoutController();
const panelForgotController = new PanelForgotController();
const panelRegisterController = new PanelRegisterController();

export {
    loginController,
    registerController,
    logoutController,
    sessionController,

    shopAddPackageController,
    shopAddProductController,
    shopBuyController,
    shopGenerateController,
    shopRedeemController,

    infoController,
    profileController,

    panelHomeController,

    panelCheatsController,
    panelCreditsController,

    panelLoginController,
    panelLogoutController,
    panelForgotController,
    panelRegisterController
};