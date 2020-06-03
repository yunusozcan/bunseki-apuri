'use strict';
module.exports = (sequelize, DataTypes) => {
  const measurement = sequelize.define('Measurement', {
    type: DataTypes.STRING,
    value: {
      type:   DataTypes.ENUM,
      values: ['dom', 'fcp', 'ttfb', "window"]
    },
    timestamp: DataTypes.DATE
  },
  {
    indexes: [
      {
        fields: ['type', 'SiteId'],
      },
    ],
  });
  measurement.associate = function(models) {
    models.Measurement.belongsTo(models.Site, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return measurement;
};
