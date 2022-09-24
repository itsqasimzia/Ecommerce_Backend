module.exports = (sequilize, DataTypes) => {
  const Reviews = sequilize.define(
    "reviews",
    {
      review: {
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.DATE,
        default: Date.now(),
      },
    },
    {
      freezeTableName: true,
    }
  );
  return Reviews;
};
