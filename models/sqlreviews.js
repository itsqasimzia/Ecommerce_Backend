module.exports = (sequilize, DataTypes) => {
  const Reviews = sequilize.define(
    "reviews",
    {
      review: {
        type: DataTypes.STRING,
      },
      rating: {
        type: DataTypes.INTEGER,
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
