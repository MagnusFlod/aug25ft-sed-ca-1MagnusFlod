const { where } = require("sequelize");

class ParticipantService
{
	constructor(db)
	{
		this.participant = db.Participant;
        this.Work = db.Work;
        this.Home = db.Home;
	}

	async createParticipant({ email, firstName, lastName, dob })
	{
		return this.participant.create
		({
			email: email,
            firstName: firstName,
            lastName: lastName,
            dob: dob
		});
	}

    async getAllParticipants()
    {
        return this.participant.findAll();
    }

    async getParticipantDetails()
    {
        return this.participant.findAll
        ({
            attributes:
            [
                'firstName',
                'lastName',
                'email'
            ]
        });
    }

    async getParticipantDetail(email)
    {
        return this.participant.findOne
        ({
            where: { email: email },
            attributes:
            [
                'firstName',
                'lastName',
                'dob'
            ]
        });
    }

    async getWorkDetails(ParticipantEmail)
    {
        return this.Work.findOne
        ({
            where: { ParticipantEmail: ParticipantEmail },
            attributes:
            [
                'companyName',
                'salary',
                'currency'
            ]
        });
    }

    async getHomeDetails(ParticipantEmail)
    {
        return this.Home.findOne
        ({
            where: { ParticipantEmail: ParticipantEmail },
            attributes:
            [
                'country',
                'city'
            ]
        });
    }

    async deleteParticipant(email)
    {
        return this.participant.destroy
        ({
            where: { email: email }
        });
    }

    async updateParticipant(data, options)
    {
        return this.participant.update(data, options);
    }
}
module.exports = ParticipantService;