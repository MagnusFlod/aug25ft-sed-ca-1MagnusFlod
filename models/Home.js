// Home-table
module.exports = (sequelize, Sequelize) =>
{
    const Home = sequelize.define
    (
        // Only 2 columns here
        'Home',
        {
            country:
            {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            city:
            {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: false
        }
    );

    Home.associate = function(models)
    {
        Home.belongsTo(models.Participant,
        {
            foreignKey: "ParticipantEmail",
            // Automatically delete Home-data when the related Participant is deleted
            onDelete: 'CASCADE'
        });
    };

    return Home;
}