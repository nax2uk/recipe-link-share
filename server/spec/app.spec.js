const chai = require('chai');
const { expect } = chai;
const request = require('supertest');
const app = require('../server');

describe('#server', () => {
    describe('#/api/register', () => {
        //
        describe('#POST', () => {
            it('status:202, responds with success message verificationlink email sent', () => {
                return request(app)
                    .post('/api/register')
                    .send({
                        name: 'azlina',
                        email: 'nax2uk@gmail.com',
                        password: 'abcdefgh'
                    })
                    .expect(202)
                    .then(resp => {
                        expect(resp.body.msg).to.equal("Email has been sent to nax2uk@gmail.com. Follow the instructions to complete your registration");

                    })
            })
            it('status:400, responds with error message if email exists in database', () => {
                return request(app)
                    .post('/api/register')
                    .send({
                        name: 'azlina',
                        email: 'azlinayeo@gmail.com',
                        password: 'abcdefgh'
                    })
                    .expect(400)
                    .then(resp => {
                        expect(resp.body.error).to.equal("Email is already taken.");

                    })
            })
            it('status:400, responds with error message if invalid email add given', () => {
                return request(app)
                    .post('/api/register')
                    .send({
                        name: 'ryan',
                        email: 'ryan@gmail.com',
                        password: 'abcdefgh'
                    })
                    .expect(400)
                    .then(resp => {
                        expect(resp.body.error).to.equal("We could not verify your email.Please try again.");

                    })
            })
        })

    })

})