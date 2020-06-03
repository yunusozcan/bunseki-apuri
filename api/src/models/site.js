'use strict';
module.exports = (sequelize, DataTypes) => {
  const Site = sequelize.define('Site', {
    webAdress: DataTypes.STRING,
    uuId: DataTypes.STRING
  }, {});
  Site.associate = function(models) {
    models.Site.hasMany(models.Measurement);
  };
  return Site;
};
