import { Request, Response } from 'express';
import { CrudController } from '../CrudController';

export class PanelHomeController extends CrudController {
    public get(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response): void {
        if (!req.session.authenticated) {
            res.redirect('/panel/login');
            return;
        }

        res.render('pages/panel/home', { session: req.session });
    }

    public post(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response): void {
        throw new Error("Method not implemented.");
    }
}