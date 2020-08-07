import { Request, Response } from 'express';
import { CrudController } from '../../CrudController';
import { getManager } from 'typeorm';

import { UserEntity } from '../../../database/entity/user'

import * as moment from 'moment';
import { ProductEntity } from '../../../database/entity/product';

export class InfoController extends CrudController {
    public get(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response): void {
        const userRepository = getManager().getRepository(UserEntity);
        const productRepository = getManager().getRepository(ProductEntity);

        if (req.session == undefined || !req.session.authenticated) {
            res.json({ success: false, message: 'not authenticated!' });
            return;
        }

        userRepository.findOne({ where: { id: req.session.uid } }).then(user => {
            if (user == undefined) {
                res.json({ success: false, message: 'failed to fetch profile information!' });
            }
            else {
                if (user.subscriptions == '') {
                    user.subscriptions = '{}';
                }

                let subscriptions = JSON.parse(user.subscriptions);

                productRepository.find().then(products => {
                    for (let [key, value] of subscriptions) {
                        console.log(value);
    
                        if (value.expires == null || value.expires > moment.now()) {
                            delete subscriptions[key];
                        }
                    }

                    for (let i = 0; i < products.length; ++i) {
                        let product = products[i];
                        let info = subscriptions[product.id];

                        if (info == undefined) {
                            continue;
                        }

                        info.name = product.name;
                        info.status = product.status;
                        info.id = product.id;

                        if (info.expires == null || moment.now() > info.expires) {
                            delete subscriptions[product.id];
                        }
                    }

                    const result = Object.keys(subscriptions).map((index) => {
                        return subscriptions[index];
                    });
    
                    res.json({ success: true, message: {
                        id: user.id,
                        account_type: user.account_type,
                        email: user.email,
                        username: user.username,
                        subscriptions: result,
                        credit: user.credit
                    }});
                });
            }
        });
    }

    public post(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response): void {
        throw new Error("Method not implemented.");
    }
}