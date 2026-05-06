// Sequelize-table for the Admin-credentials
module.exports = (sequelize, Sequelize) =>
{
    const Admin =sequelize.define
    (
        'Admin',
        {
            name:
            {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            password:
            {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            }
        },
        {
            timestamps: false
        }
    );

    return Admin;
}