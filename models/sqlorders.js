module.exports = (sequilize, DataTypes) => {
  const Orders = sequilize.define(
    "orders",
    // {

    //   user: {
    //     type: ObjectId,
    //     ref: "users",
    //     required: true,
    //   },
    // },

    {
      allProduct: {
        type: DataTypes.ARRAY(DataTypes.JSON),

        // id: { type: ObjectId, ref: "products" },
        // quantitiy: Number,
      },

      amount: {
        type: DataTypes.STRING,
      },
      transactionId: {
        type: DataTypes.INTEGER,
        default: 0,
      },
      address: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.INTEGER,
        default: 0,
      },
      phone: {
        type: DataTypes.INTEGER,
        default: 0,
      },
      status: {
        type: DataTypes.ENUM,
        default: "Not processed",
        values: [
          "Not processed",
          "Processing",
          "Shipped",
          "Delivered",
          "Cancelled",
        ],
      },
    },
    {
      freezeTableName: true,
    }
  );
  return Orders;
};
