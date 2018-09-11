module.exports = function (sequelize, DataTypes) {
  var Expenses = sequelize.define("Expenses", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    source: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn("NOW"),
      notNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn("NOW"),
      notNull: true
    }
  });

  Expenses.associate = function (models) {
    Expenses.hasMany(models.Expenses, {
      onDelete: "cascade"
    });
  };

  return Expenses;
};