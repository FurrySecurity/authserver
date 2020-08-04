import { Request, Response } from 'express';
import { CrudController } from '../CrudController';

export class PanelLoginController extends CrudController {
    public get(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response): void {
        if (req.session.authenticated) {
            res.redirect('/panel/index');
            return;
        }

        res.render('pages/panel/login', { session: req.session });
    }

    public post(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response): void {
        throw new Error("Method not implemented.");
    }
}