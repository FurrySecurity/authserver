import { Request, Response } from 'express';
import { CrudController } from '../../CrudController';
import { getManager, AdvancedConsoleLogger } from 'typeorm';

import { PackageEntity } from '../../../database/entity/package'
import { ProductEntity } from '../../../database/entity/product'
import { UserEntity } from '../../../database/entity/user';

import * as moment from 'moment';

export class ShopAddProductController extends CrudController {
    public get(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response): void {
        if (!req.session.authenticated) {
            res.json({ success: false, 'message': 'forbidden' }).status(403);
            return;
        }

        const packageRepository = getManager().getRepository(PackageEntity);
        const productRepository = getManager().getRepository(ProductEntity);
        const userRepository = getManager().getRepository(UserEntity);

        res.json({ success: false, message: 'failed to add product (api not implemented!)' });
    }

    public post(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response): void {
        throw new Error("Method not implemented.");
    }
}