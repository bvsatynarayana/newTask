import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getStudentById(id: ID!): StudentDetails
    searchStudents(limit: Int skip: Int term: String): [StudentDetails]
  }

  extend type Mutation {
    createStudent(
      data: StudentInputData
    ): StudentDetails! @authenticate

    UpdateStudent(
      data: StudentInputData, id: ID!
    ): StudentDetails! @authenticate

    deleteStudent(id: ID!): Boolean! @authenticate
  }

  input StudentInputData {
    FirstName: String
    LastName: String
    email: String
    phone: String
    address: String
    meetingTime: String
  }

  type StudentDetails {
    id: ID
    FirstName: String
      LastName: String
      email: String
      phone: String
      address: String
      meetingTime: String
  }
`;
