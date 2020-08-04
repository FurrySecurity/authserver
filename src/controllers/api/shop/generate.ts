import { Request, Response } from 'express';
import { CrudController } from '../../CrudController';
import { getManager, AdvancedConsoleLogger } from 'typeorm';

import { UserEntity } from '../../../database/entity/user'

export class ShopGenerateController extends CrudController {
    public get(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response): void {
        if (!req.session.authenticated) {
            res.json({ success: false, 'message': 'forbidden' }).status(403);
            return;
        }

        res.json({ success: true, message: 'successfully generated keys!', keys: [] });
    }

    public post(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response): void {
        throw new Error("Method not implemented.");
    }
}