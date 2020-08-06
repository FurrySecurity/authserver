import { Request, Response } from 'express';
import { CrudController } from '../../CrudController';
import { getManager, AdvancedConsoleLogger } from 'typeorm';

import { UserEntity } from '../../../database/entity/user'
import { CouponEntity } from '../../../database/entity/coupon'

export class ShopRedeemController extends CrudController {
    public get(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response): void {
        if (!req.session.authenticated) {
            res.json({ success: false, 'message': 'forbidden' }).status(403);
            return;
        }

        const userRepository = getManager().getRepository(UserEntity);
        const couponRepository = getManager().getRepository(CouponEntity);
    
        couponRepository.findOne({ where: { key: req.params['key'] } }).then(coupon => {
            if (coupon == null) {
                res.json({ success: false, message: 'coupon does not exist!' });
                return;
            }

            if (coupon.redeemed) {
                res.json({ success: false, message: 'coupon has already been redeemed!' });
                return;
            }

            userRepository.findOne({ where: { id: req.session.uid } }).then(user => {
                user.credit += coupon.credits;

                coupon.redeemed = true;
                coupon.redeemer_id = req.session.uid;

                userRepository.save(user);
                couponRepository.save(coupon);

                res.json({ success: false, message: 'succesfully redeemed ' + coupon.credits + ' credits!' });
                return;
            });
        });
    }

    public post(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response): void {
        throw new Error("Method not implemented.");
    }
}