import { SchemaDirectiveVisitor } from 'apollo-server';
import jwt from 'jsonwebtoken';
import { defaultFieldResolver } from 'graphql';
import { AuthenticationError, NotFoundError } from '../helpers/errors';
import { getToken, errorHandler } from '../helpers/utilities';

class AuthenticateDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = async function (...args) {
      const [, , ctx] = args;
      const query = ctx.req.query ? ctx.req.query.query : new Date().toISOString();

      console.time(`authenticate_total_${query}`);

      const accessToken = getToken(ctx.req);

      if (!accessToken) throw new NotFoundError('token not found');

      console.time('authenticate_verify_token_find');

      const [err, userObj] = await errorHandler(jwt.verify, null, accessToken, config.jwt.secret);

      console.timeEnd('authenticate_verify_token_find');

      if (err) {
        if (err.name === 'TokenExpiredError') throw new AuthenticationError('access token expired');
        throw new AuthenticationError('access token expired');
      }

      if (!userObj) throw new NotFoundError('user not found');

      ctx.user = userObj;

      console.timeEnd(`authenticate_total_${query}`);

      return resolve.apply(this, args);
    };
  }
}

export default AuthenticateDirective;
