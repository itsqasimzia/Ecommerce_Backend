module.exports = (sequilize, DataTypes) => {
  const Categories = sequilize.define(
    "categories",
    {
      cName: {
        type: DataTypes.STRING,
        required: true,
      },
      cDescription: {
        type: DataTypes.STRING,
        required: true,
      },
      cImage: {
        type: DataTypes.STRING,
      },
      cStatus: {
        type: DataTypes.STRING,
        required: true,
      },
    },
    {
      freezeTableName: true,
    }
  );
  return Categories;
};
