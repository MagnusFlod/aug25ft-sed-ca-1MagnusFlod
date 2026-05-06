// The table structure for Participant-table
module.exports = (sequelize, Sequelize) =>
{
    const Participant = sequelize.define
    (
        // 4 columns of the Participant-table
        'Participant',
        {
            email:
            {
                type: Sequelize.DataTypes.STRING,
                // Setting the PK for the email-column
                primaryKey: true,
                allowNull: false,
            },
            firstName:
            {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            lastName:
            {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            dob:
            {
                type: Sequelize.DataTypes.DATEONLY,
                allowNull: false,
            }
        },
        {
            timestamps: false
        }
    );

    // Participants-table has the PK that points to both Work and Home-tables
    // The Participant-table therefore needs to be populated first, otherwise the FK of the latter refers to a non-existent PK
    Participant.associate = function(models)
    {
        Participant.hasOne(models.Work);
        Participant.hasOne(models.Home);
    };

    return Participant;
}