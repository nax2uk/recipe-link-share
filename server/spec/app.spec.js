const chai = require('chai');
const { expect } = chai;
const request = require('supertest');
const app = require('../app');

describe('#server', () => {
    describe('#/api/register', () => {
        describe("#GET #PUT, #DELETE, #PATCH", () => {
            it("status:405, responds appropriately because the HTTP method is not allowed", () => {
                const invalidMethods = ["put", "delete", "get", "patch"];
                const requests = invalidMethods.map((httpRequestMethod) => {
                    return request(app)
                    [httpRequestMethod]("/api/user")
                        .expect(405)
                        .then((resp) => {
                            expect(resp.body.msg).to.equal(
                                `Method Not Allowed: for HTTP ${httpRequestMethod.toUpperCase()} at /api/user`
                            );
                        });
                });
                return Promise.all(requests);
            });
        });

        describe('#POST', () => {

            it('status:202, responds with success message verificationlink email sent', () => {
                return request(app)
                    .post('/api/user')
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
                    .post('/api/user')
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
                    .post('/api/user')
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
    describe('#/api/login', () => {
        describe("#GET #PUT, #DELETE, #PATCH", () => {
            it("status:405, responds appropriately because the HTTP method is not allowed", () => {
                const invalidMethods = ["put", "delete", "get", "patch"];
                const requests = invalidMethods.map((httpRequestMethod) => {
                    return request(app)
                    [httpRequestMethod]("/api/login")
                        .expect(405)
                        .then((resp) => {
                            expect(resp.body.msg).to.equal(
                                `Method Not Allowed: for HTTP ${httpRequestMethod.toUpperCase()} at /api/login`
                            );
                        });
                });
                return Promise.all(requests);
            });
        });

        describe('#POST', () => {

            it('status:200, response with name, role and email', () => {
                return request(app)
                    .post('/api/login')
                    .send({
                        email: 'azlinayeo@gmail.com',
                        password: 'abcdefgh'
                    })
                    .expect(200)
                    .then(resp => {
                        expect(resp.body.user.email).to.equal('azlinayeo@gmail.com');
                        expect(resp.body.user.name).to.equal('azlina');
                        expect(resp.body.user.role).to.equal('subscriber');
                    })
            })
            it('status:400, responds with error message if email does not exist in database', () => {
                return request(app)
                    .post('/api/login')
                    .send({
                        email: 'abcdef@gmail.com',
                        password: 'abcdefgh'
                    })
                    .expect(400)
                    .then(resp => {
                        expect(resp.body.error).to.equal("User with that email does not exist. Please register.");

                    })
            })
            it('status:400, responds with error message if email and password does not match', () => {
                return request(app)
                    .post('/api/login')
                    .send({
                        email: 'azlinayeo@gmail.com',
                        password: 'abcdefg'
                    })
                    .expect(400)
                    .then(resp => {
                        expect(resp.body.error).to.equal("Email and password do not match");

                    })
            })
        })

    })
})

