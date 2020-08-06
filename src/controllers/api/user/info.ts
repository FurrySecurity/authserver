import { Request, Response } from 'express';
import { CrudController } from '../../CrudController';
import { getManager } from 'typeorm';

import { UserEntity } from '../../../database/entity/user'

import * as moment from 'moment';

export class InfoController extends CrudController {
    public get(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response): void {
        const repository = getManager().getRepository(UserEntity);

        if (req.session == undefined || !req.session.authenticated) {
            res.json({ success: false, message: 'not authenticated!' });
            return;
        }

        repository.findOne({ where: { id: req.session.uid } }).then(user => {
            if (user == undefined) {
                res.json({ success: false, message: 'failed to fetch profile information!' });
            }
            else {
                if (user.subscriptions == '') {
                    user.subscriptions = '{}';
                }

                let subscriptions = JSON.parse(user.subscriptions);

                console.dir(subscriptions);

                for (let [key, value] of subscriptions) {
                    console.log(value);

                    if (value.expires == null || value.expires > moment.now()) {
                        delete subscriptions[key];
                    }
                }

                res.json({ success: true, message: {
                    id: user.id,
                    account_type: user.account_type,
                    email: user.email,
                    username: user.username,
                    subscriptions: subscriptions,
                    credit: user.credit
                }});
            }
        });
    }

    public post(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response): void {
        throw new Error("Method not implemented.");
    }
}