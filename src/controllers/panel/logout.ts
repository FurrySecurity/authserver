import { Request, Response } from 'express';
import { CrudController } from '../CrudController';

export class PanelLogoutController extends CrudController {
    public get(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response): void {
        if (req.session == undefined || !req.session.authenticated) {
            res.redirect('/panel/');
            return;
        }

        req.session.destroy((error) => {
            res.redirect('/panel/');
        });
    }

    public post(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response): void {
        throw new Error("Method not implemented.");
    }
}