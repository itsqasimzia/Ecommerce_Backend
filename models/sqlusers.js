module.exports = (sequilize, DataTypes) => {
  const User = sequilize.define(
    "users",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,

        validate: {
          is: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
        },
      },
      password: {
        type: DataTypes.STRING,
        required: true,
      },
      userRole: {
        type: DataTypes.INTEGER,
        required: true,
      },
      phoneNumber: {
        type: DataTypes.INTEGER,
      },
      userImage: {
        type: DataTypes.STRING,
      },
      verified: {
        type: DataTypes.STRING,
      },
      secretKey: {
        type: DataTypes.INTEGER,
      },
      history: {
        type: DataTypes.STRING,
        get: function () {
          return JSON.parse(this.getDataValue("history"));
        },
        set: function (val) {
          return this.setDataValue("history", JSON.stringify(val));
        },
      },
    },
    {
      freezeTableName: true,
    }
  );
  return User;
};
