import { UserController } from './api/user';

import { LoginController } from './api/auth/login';
import { RegisterController } from './api/auth/register';

import { PanelHomeController } from './panel/home'

import { PanelLoginController } from './panel/login'
import { PanelRegisterController } from './panel/register'

const userController = new UserController();

const loginController = new LoginController();
const registerController = new RegisterController();

const panelHomeController = new PanelHomeController();

const panelLoginController = new PanelLoginController();
const panelRegisterController = new PanelRegisterController();

export {
    userController,

    loginController,
    registerController,

    panelHomeController,
    panelLoginController,
    panelRegisterController
};