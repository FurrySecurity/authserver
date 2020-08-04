import { Request, Response } from 'express';
import { CrudController } from '../../CrudController';
import { getManager } from 'typeorm';

import { UserEntity } from '../../../database/entity/user'

const config = require('../../../../config.json');

export class RegisterController extends CrudController {
    public get(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response): void {
        const email: string = req.params['email'];

        const userRepository = getManager().getRepository(UserEntity);

        userRepository.findOne({ where: { email: email } }).then(user => {
            if (user == undefined) {
                const username = req.params['username'];
                const password = req.params['password'];

                userRepository.findOne({ where: { username: username } }).then(user => {
                    if (user == undefined) {
                        let new_user = userRepository.create();

                        new_user.email = email;
                        new_user.username = username;
                        new_user.password = password;

                        userRepository.save(new_user);

                        res.json({ success: true, message: 'registered!' });

                        return;
                    }

                    res.json({ success: false, message: 'username already exists!' });
                });

                return;
            }

            res.json({ success: false, message: 'email already exists!' });
        });
    }

    public post(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response): void {
        throw new Error("Method not implemented.");
    }
}