import { GraphQLDateTime } from 'graphql-iso-date'

import userResolvers from './user';
import messageResolvers from './message';
import studentResolvers from './student';

const customScalarResolver = {
  Date: GraphQLDateTime,
};

export default [
  customScalarResolver,
  userResolvers,
  messageResolvers,
  studentResolvers
];
