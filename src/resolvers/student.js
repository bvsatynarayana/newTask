import { combineResolvers } from 'graphql-resolvers';

import { isAdmin } from './authorization';

export default {
  Query: {
    getStudentById: (parent, { id }, { models }) => {
      return models.Student.findByPk(id);
    },

    searchStudents: (parent, {limit, skip, term}, { models }) => {
      return models.Student.findAll({
        where: {
       },
        limit,
        offset: skip,
      });
    },
  },

  Mutation: {
    createStudent: async (
      parent,
      { data },
      { models }
    ) => {
      const StudentInfo = await models.Student.create(data);

      return StudentInfo;
    },
    UpdateStudent: async (
      parent,
      { data, id },
      { models }
    ) => {
      const StudentInfo = await models.Student.update(
        data,
        { where: { id: id }, individualHooks: true, },
      );
      console.log('sttt', StudentInfo);

      return StudentInfo;
    },

    deleteStudent:
      async (parent, { id }, { models }) => {
        return await models.Student.destroy({
          where: { id }
        });
      },
  },
}
