import { UserController } from './api/user';

import { LoginController } from './api/auth/login';
import { RegisterController } from './api/auth/register';

import { ShopBuyController } from './api/shop/buy';
import { ShopGenerateController } from './api/shop/generate';
import { ShopRedeemController } from './api/shop/redeem';

import { PanelHomeController } from './panel/home'

import { PanelLoginController } from './panel/login'
import { PanelRegisterController } from './panel/register'

const userController = new UserController();

const loginController = new LoginController();
const registerController = new RegisterController();

const shopBuyController = new ShopBuyController();
const shopGenerateController = new ShopGenerateController();
const shopRedeemController = new ShopRedeemController();

const panelHomeController = new PanelHomeController();

const panelLoginController = new PanelLoginController();
const panelRegisterController = new PanelRegisterController();

export {
    userController,

    loginController,
    registerController,

    shopBuyController,
    shopGenerateController,
    shopRedeemController,

    panelHomeController,
    panelLoginController,
    panelRegisterController
};