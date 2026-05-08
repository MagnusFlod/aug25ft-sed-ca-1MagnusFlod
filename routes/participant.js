var express = require('express');
var router = express.Router();
const db = require('../models');
const isAuth = require('../middleware/middleware');
const ParticipantService = require('../services/ParticipantService');
const { where } = require('sequelize');
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

    // All responses comes in json-format. 'res.json' will be repeated in all endpoints
    res.json({ participant: participantPerson, work: workData, home: homeData });
});


// CRUD READ. Endpoint for http://localhost:3000/participant in Postman during development-face
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


// READ. Endpoint for http://localhost:3000/participant/work/examplemail@example.com during dev-face
router.get('/work/:email', isAuth, async function(req, res)
{
    // Accessing email
    const email = req.params.email;

    // Get's companyName, salary and currency for the specific participant
    const work = await participantService.getWorkDetails(email);

    res.json(work);
});


// Delete-endpoint for http://localhost:3000/participant/home/examplemail@example.com during dev-face
router.get('/home/:email', isAuth, async function(req, res)
{
    const email = req.params.email;

    // Get's country and city for the specific participant
    const home = await participantService.getHomeDetails(email);

    res.json(home);
});


// Endpoint for http://localhost:3000/participant/examplemail@example.com during dev-face
router.delete('/:email', isAuth, async function(req, res)
{
    // The Participant is deleted by the selected PK which is the participants email
    const email = req.params.email;

    // Deletes all data for that specific participant. That includes Participant-data, Work-data and Home-data
    // I selected 'onDelete: 'CASCADE' in models/Work.js and Home.js to ensure related data are also deleted when a participant is deleted
    const deleted = await participantService.deleteParticipant(email);

    res.json({ "message": 'Participant is deleted' });
});


// Final endpoint. UPDATE for http://localhost:3000/participant/examplemail@example.com during dev-face
router.put('/:email', isAuth, async function(req, res)
{

    // Aqcuiring all tables from the body
    const { participant, work, home } = req.body;

    // Aqcuiring all columns in all 3 tables
    // Not updating email. Because email is the PK! A unique value that gives integrity for the data
    const { firstName, lastName, dob } = participant;
    const { companyName, salary, currency } = work;
    const { country, city } = home;

    // Updating fields in participant-table, either firstName, lastName or dob for the specific participant
    const updatedParticipant = await participantService.updateParticipant
    (
        {
        // Updating email could also cause trouble for the related Work and Home-data since they rely on FK which is the email(PK)
            firstName,
            lastName,
            dob
        },
        {
            // Ref, the specific participant
            where: { email: req.params.email }
        }
    );

    // Updating fields in Work-table, either companyName, salary or currency for the specific participant
    const updatedWorkData = await db.Work.update
    (
        {
            companyName,
            salary,
            currency
        },
        {
            // Ref, the FK to the specific participant
            where: { ParticipantEmail: req.params.email }
        }
    );

    // Updating fields in Home-table, either country or city for the specific participant
    const updatedHomeData = await db.Home.update
    (
        {
            country,
            city
        },
        {
            // Ref, the FK
            where: { ParticipantEmail: req.params.email }
        }
    );

    res.json({ participant: updatedParticipant, work: updatedWorkData, home: updatedHomeData });
});

module.exports = router;