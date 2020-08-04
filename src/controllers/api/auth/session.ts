import { Request, Response } from 'express';
import { CrudController } from '../../CrudController';

export class SessionController extends CrudController {
    public get(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response): void {
        if (req.session == null) {
            res.json({ success: false, authenticated: false });
            req.session.save((error) => {});
            return;
        }

        res.json({ success: true, authenticated: req.session.authenticated ? true : false });
    }

    public post(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response): void {
        throw new Error("Method not implemented.");
    }
}