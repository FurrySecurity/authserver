import { Request, Response } from 'express';
import { CrudController } from '../CrudController';
import { getManager, AdvancedConsoleLogger } from 'typeorm';

import { PackageEntity } from '../../database/entity/package'
import { ProductEntity } from '../../database/entity/product';

export class PanelCheatsController extends CrudController {
    public get(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response): void {
        if (!req.session.authenticated) {
            res.redirect('/panel/login');
            return;
        }

        const packageRepository = getManager().getRepository(PackageEntity);
        const productRepository = getManager().getRepository(ProductEntity);

        packageRepository.find().then(packages => {
            productRepository.find().then(products => {
                let products_map = {};

                for (let i = 0; i < products.length; ++i) {
                    products_map[products[i].id] = products[i];
                }

                let packages_information = [];

                for (let i = 0; i < packages.length; ++i) {
                    let info = packages[i];

                    if (products_map[info.product_id] == undefined) {
                        res.render('pages/500', { session: req.session });
                        return;
                    }

                    packages_information.push({
                        id: info.product_id,
                        name: info.name,
                        description: products_map[info.product_id].description,
                        price: info.price
                    });
                }
    
                res.render('pages/panel/cheats', { session: req.session, packages: packages_information, products: products });
            });
        });
    }

    public post(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response): void {
        throw new Error("Method not implemented.");
    }
}