class ParticipantService
{
    // creating db-objects for all 3 tables
	constructor(db)
	{
		this.participant = db.Participant;
        this.Work = db.Work;
        this.Home = db.Home;
	}

    // CRUD-CREATE. Creates a participant
	async createParticipant({ email, firstName, lastName, dob })
	{
        // All fields that are created for a participant
		return this.participant.create
		({
			email: email,
            firstName: firstName,
            lastName: lastName,
            dob: dob
		});
	}

    // CRUD-READ. Returns a list of all participants
    async getAllParticipants()
    {
        return this.participant.findAll();
    }

    // READ. Returns a list of all participants details that includes firstName, lastName and email. 'dob' is not included
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

    // Returns ONE participants details that includes firstName, lastName and dob. 'email' is not included
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

    // Returns the Work-details companyName, salary and currency that refers to ONE participant(ParticipantEmail)
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

    // Returns the Home-details country and city that refers to one specific participant(ParticipantEmail)
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

    // CRUD-DELETE. Deletes a specific participant by the selected email(PK)
    async deleteParticipant(email)
    {
        return this.participant.destroy
        ({
            where: { email: email }
        });
    }

    // CRUD-UPDATE. Updates the chosen(options) details(data) of a specific user
    async updateParticipant(data, options)
    {
        return this.participant.update(data, options);
    }
}

module.exports = ParticipantService;