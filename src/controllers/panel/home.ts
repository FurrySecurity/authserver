import { Request, Response } from 'express';
import { CrudController } from '../CrudController';

import { getManager, AdvancedConsoleLogger } from 'typeorm';

import { UserEntity } from '../../database/entity/user';
import { userRouter } from '../../routes';

export class PanelHomeController extends CrudController {
    public get(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response): void {
        if (!req.session.authenticated) {
            res.redirect('/panel/login');
            return;
        }

        const userRepository = getManager().getRepository(UserEntity);

        userRepository.findOne({ where: { id: req.session.uid } }).then(user => {
            res.render('pages/panel/home', { session: req.session, user: { username: user.username, email: user.email, credit: user.credit } });
        });
    }

    public post(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response): void {
        throw new Error("Method not implemented.");
    }
}