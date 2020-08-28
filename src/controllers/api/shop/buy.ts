import { Request, Response } from 'express';
import { CrudController } from '../../CrudController';
import { getManager, AdvancedConsoleLogger } from 'typeorm';

import { PackageEntity } from '../../../database/entity/package'
import { ProductEntity } from '../../../database/entity/product'
import { UserEntity } from '../../../database/entity/user';

import * as moment from 'moment';

export class ShopBuyController extends CrudController {
    public get(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response): void {
        if (!req.session.authenticated) {
            res.json({ success: false, 'message': 'forbidden' }).status(403);
            return;
        }

        const packageRepository = getManager().getRepository(PackageEntity);
        const productRepository = getManager().getRepository(ProductEntity);
        const userRepository = getManager().getRepository(UserEntity);

        packageRepository.findOne({ where: { id: req.params['id'] } }).then(product => {
            if (product == undefined) {
                res.json({ success: false, message: 'package doesn\'t exist!' });
                return;
            }

            userRepository.findOne({ where: { id: req.session.uid } }).then(user => {
                if (user == undefined) {
                    res.json({ success: false, message: 'error reading user information!' });
                    return;
                }
                
                if (!product.buyable) {
                    res.json({ success: false, message: 'package cannot be purchased!' });
                    return;
                }

                if (user.credit < product.price) {
                    res.json({ success: false, message: 'not enough balance to complete purchase!' });
                    return;
                }

                user.credit -= product.price;

                let expires = product.expires;

                productRepository.findOne({ where: { id: product.product_id } }).then(product => {
                    if (product == undefined) {
                        res.json({ success: false, message: 'invalid package product id!' });
                        return;
                    }

                    if (product.subscription) {
                        let subscriptions = {};

                        if (user.subscriptions != '') {
                            subscriptions = JSON.parse(user.subscriptions);
                        }
        
                        let subscription = subscriptions[product.id];
        
                        if (subscription == undefined) {
                            subscription = {
                                expires: moment.unix(moment.now()).add(expires, 'days').unix()
                            }
                        }
                        else {
                            let new_expires = subscription.expires > moment.now()
                                ? moment.unix(subscription.expires).add(expires, 'days').unix()
                                : moment.unix(moment.now()).add(expires, 'days').unix()
        
                            subscription = {
                                expires: new_expires
                            }
                        }
        
                        subscriptions[product.id] = subscription;
        
                        user.subscriptions = JSON.stringify(subscriptions);
                    }
    
                    userRepository.save(user);
    
                    res.json({ success: true, balance: user.credit, message: 'completed purchase successfully!' });
                });
            });
        });
    }

    public post(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response): void {
        throw new Error("Method not implemented.");
    }
}