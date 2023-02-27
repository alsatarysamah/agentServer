const ordersModel = (sequelize, DataTypes) => sequelize.define('orders', {
 
    orderItem: {  type: DataTypes.ARRAY(DataTypes.JSONB)},
    shippingAddress: { type: DataTypes.STRING },
    paymentMethod : { type: DataTypes.STRING },
    itemsPrice: { type: DataTypes.DOUBLE },
    totalPrice: { type: DataTypes.DOUBLE },
  },{ timestamps: false });
  
    
  
    module.exports = ordersModel;

    