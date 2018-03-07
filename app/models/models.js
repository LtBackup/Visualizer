module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [5]
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [5]
        }
      }
    });
}