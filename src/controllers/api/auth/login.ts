import { Request, Response } from 'express';
import { CrudController } from '../../CrudController';
import { getManager, AdvancedConsoleLogger } from 'typeorm';

import { UserEntity } from '../../../database/entity/user'

export class LoginController extends CrudController {
    public create(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response): void {
        const email: string = req.params['email'];
        const password: string = req.params['password'];

        const repository = getManager().getRepository(UserEntity);

        console.log(req.session);

        repository.findOne({ where: { email: email } }).then(user => {
            if (user == undefined) {
                repository.findOne({ where: { username: email } }).then(user => {
                    if (user == undefined) {
                        res.json({ success: false, message: 'username/email doesn\'t exist!' });

                        return;
                    }

                    if (password == user.password) {
                        res.json({ success: true, message: 'successfully logged in!' });

                        req.session.uid = user.id;
                        req.session.authenticated = true;

                        req.session.save((error) => {});
                    }
                    else {
                        res.json({ success: false, message: 'invalid password!' });
                    }
                });

                return;
            }

            if (password == user.password) {
                res.json({ success: true, message: 'successfully logged in!' });

                req.session.uid = user.id;
                req.session.authenticated = true;

                req.session.save((error) => {});
            }
            else {
                res.json({ success: false, message: 'invalid password!' });
            }
        });
    }

    public read(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response): void {
        throw new Error("Method not implemented.");
    }

    public update(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response): void {
        throw new Error("Method not implemented.");
    }

    public delete(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response): void {
        throw new Error("Method not implemented.");
    }
}