import { Request, Response } from 'express';
import { CrudController } from '../CrudController';

const config = require('../../../config.json');

export class PanelRegisterController extends CrudController {
    public create(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response): void {
        throw new Error("Method not implemented.");
    }

    public read(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response): void {
        if (req.session.authenticated) {
            res.redirect('/panel/index');
            return;
        }

        res.render('pages/panel/register', { session: req.session, invites: config.invites });
    }

    public update(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response): void {
        throw new Error("Method not implemented.");
    }

    public delete(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response): void {
        throw new Error("Method not implemented.");
    }
}