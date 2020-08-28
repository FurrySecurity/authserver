import { Request, Response } from 'express';
import { CrudController } from '../CrudController';
import { getManager, AdvancedConsoleLogger } from 'typeorm';

import { UserEntity } from '../../database/entity/user';
import { ProductEntity } from '../../database/entity/product';

const config = require('../../../config.json');

export class PanelStatusController extends CrudController {
    public get(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response): void {
        if (!req.session.authenticated) {
            res.redirect('/panel/index');
            return;
        }

        const userRepository = getManager().getRepository(UserEntity);
        const productRepository = getManager().getRepository(ProductEntity);

        let products_information = [];

        productRepository.find().then(products => {
            for (let i = 0; i < products.length; ++i) {
                let product = products[i];

                products_information.push({
                    name: product.name,
                    status: product.status,
                    developer: product.developer,
                });
            }
            
            userRepository.findOne({ where: { id: req.session.uid } }).then(user => {
                res.render('pages/panel/status', { session: req.session, products: products_information, user: { username: user.username, email: user.email, credit: user.credit } });
            });
        });
    }

    public post(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response): void {
        throw new Error("Method not implemented.");
    }
}