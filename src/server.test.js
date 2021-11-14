const app = require('./server');
const mongoose = require('mongoose');
const supertest = require('supertest');
const config = require('config');
const Person = require('./models/person.model');
const logger = require("../config/logger");

const dbConfig = config.get('database');

describe('REST API integration test', () => {
    const insertData = [
        {
            firstName: 'Jou8n 1',
            lastName: 'Test',
            email: 'emil1'
        },
        {
            firstName: 'Jou8n 2',
            lastName: 'Test',
            email: 'emil2'
        },{
            firstName: 'Jou83',
            lastName: 'Test',
            email: 'emil3'
        }
    ];

    beforeEach(done => {
        const {username, password, host} = dbConfig;
        mongoose.connect(
            `mongodb+srv://${username}:${password}@${host}`,
            {useNewUrlParser: true,
                useUnifiedTopology: true}
        ).then(() => {
            logger.info('MongoDB connection has been established successful');
            done();
            })
            .catch(err => {
                logger.error(err);
                process.exit();
            });
    });

    afterEach(done => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(() => done())
        });
    });

    test('GET /person', () => {
        return Person.insertMany(insertData)
            .then(() => supertest(app).get('/person').expect(200))
            .then(response => {
                expect(Array.isArray(response.body)).toBeTruthy();
                expect(response.body.length).toEqual(insertData.length);

                response.body.forEach((person, index) => {
                    expect(person.firstName).toBe(insertData[index].firstName);
                    expect(person.lastName).toBe(insertData[index].lastName);
                    expect(person.email).toBe(insertData[index].email);
                });
            });
    });

    test('GET /person:id', () => {
        let firstPostId;
        return Person.insertMany(insertData)
            .then(people => {
                firstPostId = people[0]._id;
                return supertest(app).get(`/person/${firstPostId}`).expect(200);
            })
            .then(response => {
                const person = response.body;
                    expect(person.firstName).toBe(insertData[0].firstName);
                    expect(person.lastName).toBe(insertData[0].lastName);
                    expect(person.email).toBe(insertData[0].email);
            });
    });
});