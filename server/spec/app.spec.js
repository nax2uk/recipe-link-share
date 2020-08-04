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

})