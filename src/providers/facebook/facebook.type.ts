/* eslint-disable camelcase */
export type FacebookProfile = {
  email?: string;
  first_name?: string;
  id: string;
  last_name?: string;
};

export enum FacebookInject {
  FACEBOOK_SERVICE = 'FacebookService',
}
