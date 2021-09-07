import AutoBind from 'auto-bind';
import { Request, Response } from 'express';

import { ControllerCore } from '@core/index';

import { IUserService } from './interface';
import { User } from './user.type';

/**
 * @openapi
 * tags:
 *   name: User
 *   description: user
 */
export default class UserController extends ControllerCore {
  constructor(private readonly service: IUserService) {
    super();

    this.init();
    AutoBind(this);
  }

  async create(req: Request<any, any, User>, res: Response) {
    const data = await this.service.create(req.body);

    return res.json(data);
  }
}