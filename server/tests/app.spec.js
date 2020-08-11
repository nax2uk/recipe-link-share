const request = require('supertest');
const app = require('../app');

afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
});

describe('#server', () => {
    describe('#/api/user', () => {
        describe("#PUT, #DELETE, #PATCH", () => {
            it("status:405, responds appropriately because the HTTP method is not allowed", () => {
                const invalidMethods = ["put", "delete", "patch"];
                const requests = invalidMethods.map((httpRequestMethod) => {
                    return request(app)
                    [httpRequestMethod]("/api/user")
                        .expect(405)
                        .then((resp) => {
                            expect(resp.body.msg).toBe(
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
                        expect(resp.body.msg).toBe("Email has been sent to nax2uk@gmail.com. Follow the instructions to complete your registration");

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
                        expect(resp.body.error).toBe("Email is already taken.");

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
                        expect(resp.body.error).toBe("We could not verify your email.Please try again.");

                    })
            })
        })
        describe('#GET', () => {
            it('status:200 if get user is successful', () => {
                return request(app)
                    .post('/api/login')
                    .send({
                        email: 'azlinayeo@gmail.com',
                        password: 'abcdefgh'
                    })
                    .expect(200)
                    .then(resp => {
                        const { token } = resp.body;
                        console.log(token);
                        return request(app)
                            .get('/api/user')
                            .set('Authorization', `Bearer ${token}`)
                            .expect(200)
                            .then(resp => {
                                expect(resp.body.name).toBe('azlina');
                                expect(resp.body.role).toBe('subscriber');
                            })
                    })
            });

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
                            expect(resp.body.msg).toBe(
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
                        expect(resp.body.user.email).toBe('azlinayeo@gmail.com');
                        expect(resp.body.user.name).toBe('azlina');
                        expect(resp.body.user.role).toBe('subscriber');
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
                        expect(resp.body.error).toBe("User with that email does not exist. Please register.");

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
                        expect(resp.body.error).toBe("Email and password do not match");

                    })
            })
        })

    })
    // describe('#api/auth', () => {
    //     describe('#GET', () => {
    //         it('status:200 if auth is success', () => {
    //             return request(app)
    //                 .post('/api/login')
    //                 .send({
    //                     email: 'azlinayeo@gmail.com',
    //                     password: 'abcdefgh'
    //                 })
    //                 .expect(200)
    //                 .then(resp => {
    //                     const { token } = resp.body;
    //                     console.log(token);
    //                     return request(app)
    //                         .get('/api/auth')
    //                         .set('Authorization', `Bearer ${token}`)
    //                         .expect(200)
    //                         .then(resp => {
    //                             expect(resp.body.name).toBe('azlina');
    //                             expect(resp.body.role).toBe('subscriber');
    //                         })
    //                 })
    //         });
    //     })
    // })
})

