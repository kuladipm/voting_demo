module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "users",
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
        validate: {
          isEmail: true,
        },
      },
      mobileNo: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      vote: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role:{
        type:  DataTypes.ENUM('User','Admin'),
        defaultValue: "User",
      },
      created_by: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      updated_by: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "users",
      timestamps: false,
    }
  );
  return User;
};
