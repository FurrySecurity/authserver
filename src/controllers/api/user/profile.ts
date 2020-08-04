import { Request, Response } from 'express';
import { CrudController } from '../../CrudController';
import { getManager } from 'typeorm';

import { UserEntity } from '../../../database/entity/user'

export class ProfileController extends CrudController {
    public get(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response): void {
        const repository = getManager().getRepository(UserEntity);

        repository.findOne({ where: { username: req.params['username'] } }).then(user => {
            if (user == undefined) {
                res.json({ success: false, message: 'user does not exist!' });
            }
            else {
                res.json({ success: true, message: 'profile exists!' });
            }
        });
    }

    public post(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response): void {
        throw new Error("Method not implemented.");
    }
}