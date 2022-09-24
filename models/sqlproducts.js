module.exports = (sequilize, DataTypes) => {
  const Products = sequilize.define(
    "products",
    {
      pName: {
        type: DataTypes.STRING,
        required: true,
      },
      pDescription: {
        type: DataTypes.STRING,
        required: true,
      },
      pPrice: {
        type: DataTypes.INTEGER,
        required: true,
      },
      pSold: {
        type: DataTypes.INTEGER,
      },
      pQuantity: {
        type: DataTypes.INTEGER,
        default: 0,
      },

      pImages: {
        type: DataTypes.STRING,
        get: function () {
          return JSON.parse(this.getDataValue("pImages"));
        },
        set: function (val) {
          return this.setDataValue("pImages", JSON.stringify(val));
        },
      },

      pOffer: {
        type: DataTypes.STRING,
      },
      //   pRatingsReviews: [
      //     {
      //       review: String,
      //       user: { type: ObjectId, ref: "users" },
      //       rating: String,
      //       createdAt: {
      //         type: Date,
      //         default: Date.now(),
      //       },
      //     },
      //   ],
      pStatus: {
        type: DataTypes.STRING,
        required: true,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        required: true,
      },
    },

    {
      freezeTableName: true,
    }
  );
  return Products;
};
