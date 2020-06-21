import { Request, Response } from 'express';
import { CrudController } from '../../CrudController';
import { getManager } from 'typeorm';

import { UserEntity } from '../../../database/entity/user'

export class InfoController extends CrudController {
    public create(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response): void {
        const repository = getManager().getRepository(UserEntity);

        //if (req.session.uid == undefined) {
        //    res.json({ success: false, message: 'not authenticated!' });
        //    return;
        //}

        repository.findOne({ where: { id: 1 } }).then(user => {
            if (user == undefined) {
                res.json({ success: false, message: 'failed to fetch profile information!' });
            }
            else {
                res.json({ success: true, message: {
                    id: user.id,
                    account_type: user.account_type,
                    email: user.email,
                    username: user.username,
                    subscriptions: user.subscriptions,
                    credit: user.credit
                }});
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