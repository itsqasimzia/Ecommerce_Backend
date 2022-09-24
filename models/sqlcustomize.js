module.exports = (sequilize, DataTypes) => {
  const Customises = sequilize.define(
    "customizes",
    {
      slideImage: {
        type: DataTypes.STRING,
      },
      firstShow: {
        type: DataTypes.INTEGER,
        default: 0,
      },
    },
    {
      freezeTableName: true,
    }
  );
  return Customises;
};
