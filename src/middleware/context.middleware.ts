import { Request, Response, NextFunction, RequestHandler } from 'express';

import { MiddlewareCore } from '@core';
import { UserAgentHelper, IPHelper } from '@utils/helpers';

class ContextMiddleware extends MiddlewareCore {
  handler(): RequestHandler {
    return (req: Request, _res: Response, next: NextFunction) => {
      const userAgent = req.headers['user-agent'] || '';

      req.ctx = Object.freeze({
        ...req.ctx,
        ip: IPHelper.getIP(req),
        userAgent,
        os: UserAgentHelper.getOS(userAgent),
        browser: UserAgentHelper.getBrowser(userAgent),
      });

      next();
    };
  }
}

export default new ContextMiddleware();
