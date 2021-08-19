import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import DataLoader from 'dataloader';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';

import schema from './schema';
import resolvers from './resolvers';
import loaders from './loaders';
import models, { sequelize } from './models';
import config from './config';

const app = express();

app.use(cors());

const isProduction = process.env.NODE_ENV === 'production';

const getMe = async req => {
  const token = req.headers['x-token'];

  if (token) {
    try {
      return await jwt.verify(token, config.JWT_SECRET);
    } catch (e) {
      throw new AuthenticationError('Your session expired. Signin again.');
    }
  }
}

const server = new ApolloServer({
  introspection: !isProduction,
  playground: !isProduction,
  typeDefs: schema,
  resolvers,
  formatError: error => {
    // remove the internal sequelize error message
    // leave only the important valiadtion error
    const message = error.message
      .replace('SequelizeValidationError: ', '')
      .replace('Validation Error: ', '');

    return {
      ...error,
      message,
    };
  },
  context: async ({ req }) => {
    const me = await getMe(req);

    return {
      models,
      me,
      secret: config.JWT_SECRET,
      loaders: {
        user: new DataLoader(keys => loaders.user.batchUsers(keys, models))
      },
    };
  },
});

server.applyMiddleware({ app, path: '/graphql' });

export default app;
export { sequelize, models };
