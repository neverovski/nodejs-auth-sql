import { expect } from 'chai';
import { nanoid } from 'nanoid';

import { JwtConfig } from '@config';
import JWTService from '@providers/jwt/jwt.service';

type JWT = {
  email: string;
  exp: number;
  iat: number;
  jwtid: string;
  userId: number;
};

const jwtService = new JWTService();

describe('verifyAsync Function Test', () => {
  let token = '';
  const payloadBody = {
    jwtid: nanoid(),
    userId: 10,
    email: 'dmitryneverovski@gmail.com',
  };

  before(() => {
    token = jwtService.sign(payloadBody, JwtConfig.secretAccessToken, {
      expiresIn: JwtConfig.expiresInAccessToken,
    });
  });

  it('Should return', async () => {
    const data = await jwtService.verifyAsync<JWT>(
      token,
      JwtConfig.secretAccessToken,
    );

    expect(data)
      .to.be.an('object')
      .have.all.keys('userId', 'email', 'jwtid', 'iat', 'exp');

    expect(data.email).to.be.a('string').be.eq(payloadBody.email);
    expect(data.jwtid).to.be.a('string').be.eq(payloadBody.jwtid);
    expect(data.userId).to.be.a('number').be.eq(payloadBody.userId);
  });
});
