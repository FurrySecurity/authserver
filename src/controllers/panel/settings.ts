import { Request, Response } from 'express';
import { CrudController } from '../CrudController';

export class PanelSettingsController extends CrudController {
    public get(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response): void {
        if (!req.session.authenticated) {
            res.redirect('/panel/index');
            return;
        }

        res.render('pages/panel/settings', { session: req.session });
    }

    public post(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response): void {
        throw new Error("Method not implemented.");
    }
}