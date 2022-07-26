module.exports = (sequelize, DataTypes) => {
  return sequelize.define('generation', {
    generationId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    statementData: DataTypes.JSON,
    generated: DataTypes.DATE,
    filename: DataTypes.STRING
  },
  {
    tableName: 'generations',
    freezeTableName: true,
    timestamps: false
  })
}
