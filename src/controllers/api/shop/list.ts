import { Request, Response } from 'express';
import { CrudController } from '../../CrudController';
import { getManager, AdvancedConsoleLogger } from 'typeorm';

import { PackageEntity } from '../../../database/entity/package'
import { ProductEntity } from '../../../database/entity/product'

export class ShopListController extends CrudController {
    public create(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response): void {
        if (!req.session.authenticated) {
            res.json({ success: false, 'message': 'forbidden' }).status(403);
            return;
        }

        const packageRepository = getManager().getRepository(PackageEntity);
        const productRepository = getManager().getRepository(ProductEntity);

        packageRepository.find().then(packages => {
            productRepository.find().then(products => {
                res.json({ success: true, message: {
                    packages: packages,
                    products: products
                } });
            });
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