import { gql } from 'apollo-server-express';

import userSchema from './user';
import messageSchema from './message';
import message from './message';
import studentSchema from './student';

const linkSchema = gql`
  scalar Date
  scalar JSON
  scalar Long

  directive @authenticate on QUERY | MUTATION | FIELD_DEFINITION
  directive @deprecated(
    reason: String = "No longer supported"
  ) on FIELD_DEFINITION | ARGUMENT_DEFINITION | INPUT_FIELD_DEFINITION | ENUM_VALUE | QUERY | MUTATION

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

export default [
  linkSchema,
  userSchema,
  messageSchema,
  studentSchema
]

