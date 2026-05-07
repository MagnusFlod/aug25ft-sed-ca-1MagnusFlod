var express = require('express');
var router = express.Router();
const db = require('../models');
const isAuth = require('../middleware/middleware');
const ParticipantService = require('../services/ParticipantService');
const participantService = new ParticipantService(db);

// CRUD-CREATE. Posting the data of a participant that includes data in participant-table, work-table and home-table
router.post('/add', isAuth, async function(req, res)
{
    // Aqcuiring the body of all 3 tables
    const { participant, work, home } = req.body;

    // Aqcuiring all the fields from all 3 tables
    const { email, firstName, lastName, dob } = participant;
    const { companyName, salary, currency } = work;
    const { country, city } = home;

    // Creating/posting the data into the participant-table. This table is populated first, because it hold's the PK
    const participantPerson = await participantService.createParticipant
    ({
        email: email,
        firstName: firstName,
        lastName: lastName,
        dob: dob
    });

    // Making a variable for the FK which is the PK of participant-table
    const foreignKey = participantPerson.email;

    // Creating/Posting the data into the Work-table. Including the FK
    const workData = await db.Work.create
    ({
        ParticipantEmail: foreignKey,
        companyName: companyName,
        salary: salary,
        currency: currency
    });

    // Creating/Posting the data into the Home-table. It has the same FK as the Work-table
    const homeData = await db.Home.create
    ({
        ParticipantEmail: foreignKey,
        country: country,
        city: city
    });

    // The responce comes in json-format
    res.json({ participant: participantPerson, work: workData, home: homeData });
});

// CRUD READ. Endpoint for http://localhost:3000/participant during development-face
router.get('/', isAuth, async function(req, res)
{
    // Get's a list of all participants from the database
    const participants = await participantService.getAllParticipants();

    // The response comes in json-format
    res.json(participants);
});

// CRUD READ. Endpoint for http://localhost:3000/participant/details during development-face
router.get('/details', isAuth, async function(req, res)
{
    // Get's details of all participants including firtstName, lastName and email
    const participants = await participantService.getParticipantDetails();

    res.json(participants);
});

// READ. Endpoint for http://localhost:3000/participant/details/examplemail@example.com during development-face
router.get('/details/:email', isAuth, async function(req, res)
{
    // Accessing the email-parameter for the specific participant
    const email = req.params.email;

    // Get's firstName, lastName and dob for the specific participant
    const participant = await participantService.getParticipantDetail(email);

    res.json(participant);
});

router.get('/work/:email', isAuth, async function(req, res)
{
    const email = req.params.email;

    const work = await participantService.getWorkDetails(email);

    res.json(work);
});

router.get('/home/:email', isAuth, async function(req, res)
{
    const email = req.params.email;

    const home = await participantService.getHomeDetails(email);

    res.json(home);
});

router.delete('/:email', isAuth, async function(req, res)
{
    const email = req.params.email;

    const deleted = await participantService.deleteParticipant(email);

    res.json({ "message": 'Participant is deleted'});
});

module.exports = router;