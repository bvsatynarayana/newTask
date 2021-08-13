import bcrypt from 'bcrypt';

const student = (sequelize, DataTypes) => {
  const Student = sequelize.define('student', {
    LastName: {
      type: DataTypes.STRING,
    },
    FirstName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },
    phone: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    meetingTime: {
      type: DataTypes.STRING,
    },
  });

  Student.associate = models => {
    Student.hasMany(models.Message, { onDelete: 'CASCADE' });
  };
  return Student;
}

export default student;
