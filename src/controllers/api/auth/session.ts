import { Request, Response } from 'express';
import { CrudController } from '../../CrudController';

export class SessionController extends CrudController {
    public create(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response): void {
        if (req.session == null) {
            res.json({ success: false, authenticated: false });
            req.session.save((error) => {});
            return;
        }

        res.json({ success: true, authenticated: req.session.authenticated ? true : false });
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