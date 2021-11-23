import { FindOneOptions } from 'typeorm';

export type OptionCtx<T> = Pick<
  FindOneOptions<T>,
  'where' | 'order' | 'relations'
>;

export interface IHttpException {
  code: string;
  message: string;
  status: number;
}

export type JWTPayload = {
  email: string;
  role: string;
  sub: number;
  userId: number;
};

export enum TokenType {
  BEARER = 'Bearer',
}

export enum HttpExceptionType {
  OK = 'OK',
  PASSWORD_RESET_SENT_EMAIL = 'PASSWORD_RESET_SENT_EMAIL',
  PASSWORD_RESET_SUCCESSFULLY = 'PASSWORD_RESET_SUCCESSFULLY',
  USER_CREATED = 'USER_CREATED',
  USER_UPDATE = 'USER_UPDATE',
  BAD_REQUEST = 'BAD_REQUEST',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  TOKEN_MALFORMED = 'TOKEN_MALFORMED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  EMAIL_ALREADY_TAKEN = 'EMAIL_ALREADY_TAKEN',
  UNPROCESSABLE_ENTITY = 'UNPROCESSABLE_ENTITY',
  ROUTE_NOT_FOUND = 'ROUTE_NOT_FOUND',
  SERVER_ERROR = 'SERVER_ERROR',
}

export enum HttpStatus {
  OK = 200,
  Created = 201,
  NoContent = 204,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,
  UnprocessableEntity = 422,
  InternalServerError = 500,
}
