// Table-structure for work-table in the database
module.exports = (sequelize, Sequelize) =>
{
    const Work = sequelize.define
    (
        // 3 columns
        'Work',
        {
            companyName:
            {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            salary:
            {
                // Type INTEGER for salary because salary usually comes in numbers
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
            },
            currency:
            {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            }
        },
        {
            timestamps: false
        }
    );

    // Work-table belongs to Participant-table and has a FK that refers to the PK of the participants-table
    Work.associate = function(models)
    {
        Work.belongsTo(models.Participant,
        {
            foreignKey:
            {
                name: "ParticipantEmail",
                allowNull: false,
            },
            // Automatically delete Work-data when the related Participant is deleted
            onDelete: 'CASCADE'
        });
    };

    return Work;
}