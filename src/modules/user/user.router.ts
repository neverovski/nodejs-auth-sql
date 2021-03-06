import { Router } from 'express';
import { container } from 'tsyringe';

import { RouterCore } from '@core';
import {
  AsyncMiddleware,
  ValidateMiddleware,
  AuthMiddleware,
} from '@middleware';

import UserController from './user.controller';
import {
  CreateUserSchema,
  UpdateUserSchema,
  ChangePasswordSchema,
} from './user.schema';

export default class UserRouter extends RouterCore {
  private readonly controller: UserController;

  constructor() {
    super(Router());

    this.controller = container.resolve(UserController);
  }

  init(): Router {
    this.router.post(
      '/',
      ValidateMiddleware.handler(CreateUserSchema),
      AsyncMiddleware(this.controller.create.bind(this.controller)),
    );

    this.router.get(
      '/current',
      AuthMiddleware.handler(),
      AsyncMiddleware(this.controller.getCurrentUser.bind(this.controller)),
    );

    this.router.put(
      '/current',
      AuthMiddleware.handler(),
      ValidateMiddleware.handler(UpdateUserSchema),
      AsyncMiddleware(this.controller.updateCurrentUser.bind(this.controller)),
    );

    this.router.post(
      '/current/change-password',
      AuthMiddleware.handler(),
      ValidateMiddleware.handler(ChangePasswordSchema),
      AsyncMiddleware(
        this.controller.changePasswordCurrentUser.bind(this.controller),
      ),
    );

    return this.router;
  }
}
