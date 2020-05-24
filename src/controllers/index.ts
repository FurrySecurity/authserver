import { UserController } from './user';

import { LoginController } from './auth/login';
import { RegisterController } from './auth/register';

const userController = new UserController();

const loginController = new LoginController();
const registerController = new RegisterController();

export {
    userController,

    loginController,
    registerController
};