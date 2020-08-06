import { Request, Response } from 'express';
import { CrudController } from '../../CrudController';
import { getManager } from 'typeorm';

import { UserEntity } from '../../../database/entity/user'
import { LicenseEntity } from '../../../database/entity/license';
import { InviteEntity } from '../../../database/entity/invite';

const config = require('../../../../config.json');

function RegisterAccount(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response, invite: InviteEntity) {
    const userRepository = getManager().getRepository(UserEntity);

    const email: string = req.params['email'];

    userRepository.findOne({ where: { email: email } }).then(user => {
        if (user == undefined) {
            const username = req.params['username'];
            const password = req.params['password'];

            userRepository.findOne({ where: { username: username } }).then(user => {
                if (user == undefined) {
                    let new_user = userRepository.create();

                    new_user.email = email;
                    new_user.username = username;
                    new_user.password = password;

                    userRepository.save(new_user);

                    res.json({ success: true, message: 'registered!' });

                    if (invite != null) {
                        invite.redeemed = true;

                        const inviteRepository = getManager().getRepository(InviteEntity);

                        inviteRepository.save(invite);
                    }

                    return;
                }

                res.json({ success: false, message: 'username already exists!' });
            });

            return;
        }

        res.json({ success: false, message: 'email already exists!' });
    });
}

export class RegisterController extends CrudController {
    public get(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response): void {
        const inviteRepository = getManager().getRepository(InviteEntity);
        
        if (config.invites) {
            inviteRepository.findOne({ where: { key: req.params.invite } }).then(invite => {
                if (invite == null) {
                    res.json({ success: false, message: 'invite is invalid!' });
                    return;
                }

                if (invite.redeemed) {
                    res.json({ success: false, message: 'invite is already in use!' });
                    return;
                }

                RegisterAccount(req, res, invite);

                inviteRepository.save(invite);
            });
        }
        else {
            RegisterAccount(req, res, null);
        }
    }

    public post(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response): void {
        throw new Error("Method not implemented.");
    }
}