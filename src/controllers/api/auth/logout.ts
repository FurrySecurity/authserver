import { Request, Response } from 'express';
import { CrudController } from '../../CrudController';

export class LogoutController extends CrudController {
    public create(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response): void {
        req.session.destroy((error) => {
            if (error) {
                res.json({ success: false, message: 'failed to destroy session!' });
            }
            else {
                res.json({ success: true, message: 'successfully logged out!' });
            }
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