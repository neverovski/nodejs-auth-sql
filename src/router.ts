import type { Application, Response, NextFunction, Request } from 'express';

import { i18n } from '@lib';
import { AuthRouter } from '@modules/auth';
import { UserRouter } from '@modules/user';
import { HttpException } from '@utils';
import { ResponseHelper } from '@utils/helpers';

export default (app: Application): void => {
  app.use('/api/auth', new AuthRouter().init());
  app.use('/api/users', new UserRouter().init());

  app.use((req: Request, _res: Response, next: NextFunction) =>
    !req.route
      ? next(
          ResponseHelper.error(HttpException.NOT_FOUND, {
            message: i18n()['notFound.router'],
          }),
        )
      : next(),
  );
};
