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
                        password: '123456'
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
    describe('#api/user/forgot-password', () => {
        describe("#GET, #POST, #DELETE, #PATCH", () => {
            it("status:405, responds appropriately because the HTTP method is not allowed", () => {
                const invalidMethods = ["delete", "patch", "get", "post"];
                const requests = invalidMethods.map((httpRequestMethod) => {
                    return request(app)
                    [httpRequestMethod]("/api/user/forgot-password")
                        .expect(405)
                        .then((resp) => {
                            expect(resp.body.msg).toBe(
                                `Method Not Allowed: for HTTP ${httpRequestMethod.toUpperCase()} at /api/user/forgot-password`
                            );
                        });
                });
                return Promise.all(requests);
            });
        });
        describe('#PUT', () => {
            it('status:400, request for reset password when user email does not exist in database', () => {
                return request(app)
                    .put('/api/user/forgot-password')
                    .send({
                        email: 'ryan@gmail.com',
                    })
                    .expect(400)
                    .then(resp => {
                        expect(resp.body.error).toBe('User with that email does not exist.')

                    })
            })
            /**** COMMENTED OUT TO PREVENT NUMEROUS RESET PASSWORD EMAIL */
            /*         it('status:200, received when input valid email', () => {
                         return request(app)
                             .put('/api/user/forgot-password')
                             .send({
                                 email: 'azlinayeo@gmail.com',
                             })
                             .expect(200)
                             .then(resp => {
                                 expect(resp.body.msg).toBe(`Email has been sent to azlinayeo@gmail.com. Click on the link to reset your password.`)
         
                             })
                     })
                     */
        })
    })

    describe('#api/user/reset-password', () => {
        describe("#GET, #POST, #DELETE, #PATCH", () => {
            it("status:405, responds appropriately because the HTTP method is not allowed", () => {
                const invalidMethods = ["delete", "patch", "get", "post"];
                const requests = invalidMethods.map((httpRequestMethod) => {
                    return request(app)
                    [httpRequestMethod]("/api/user/reset-password")
                        .expect(405)
                        .then((resp) => {
                            expect(resp.body.msg).toBe(
                                `Method Not Allowed: for HTTP ${httpRequestMethod.toUpperCase()} at /api/user/reset-password`
                            );
                        });
                });
                return Promise.all(requests);
            });
        });
        describe('#PUT', () => {
            it('status:400, token has expired', () => {
                return request(app)
                    .put('/api/user/reset-password')
                    .send({
                        resetPasswordLink: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYXpsaW5hIiwiaWF0IjoxNTk3MjMwNTQyLCJleHAiOjE1OTcyMzE0NDJ9.pqK1YTInfBkcJbW1jubJi8RjiEwOGzXYkXdBiE2RyNQ',
                        newPassword: 'abcdef',
                    })
                    .expect(400)
                    .then(resp => {
                        expect(resp.body.error).toBe('Expired Link. Try again.')

                    })
            })
            /*** WILL PASS ONLY WHEN GIVEN VALID TOKEN WITHIN 15 MIN OF BEING GIVEN THE TOKEN****/
            /*       it('status:200, received when input valid email', () => {
                       return request(app)
                           .put('/api/user/reset-password')
                           .send({
                               resetPasswordLink: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYXpsaW5hIiwiaWF0IjoxNTk3MjMyNzI2LCJleHAiOjE1OTcyMzM2MjZ9.eAWWw-fwCsCJC-H0_vXiJApT0T4HZaHAYCU-Gqjukhk',
                               newPassword: '123456',
                           })
                           .expect(200)
                           .then(resp => {
                               expect(resp.body.msg).toBe('Password reset is a success. Please log in with your new password.')
       
                           })
                   })
                   */
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
                        password: '123456'
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

    describe('#api/category', () => {
        describe("#PUT, #DELETE, #PATCH", () => {
            it("status:405, responds appropriately because the HTTP method is not allowed", () => {
                const invalidMethods = ["put", "delete", "patch"];
                const requests = invalidMethods.map((httpRequestMethod) => {
                    return request(app)
                    [httpRequestMethod]("/api/category")
                        .expect(405)
                        .then((resp) => {
                            expect(resp.body.msg).toBe(
                                `Method Not Allowed: for HTTP ${httpRequestMethod.toUpperCase()} at /api/category`
                            );
                        });
                });
                return Promise.all(requests);
            });
        });
        describe("#POST", () => {
            it('status:201 create a category', () => {
                return request(app)
                    .post('/api/login')
                    .send({
                        email: 'nax2uk@gmail.com',
                        password: '123456'
                    })
                    .expect(200)
                    .then(response => {
                        const { token } = response.body;
                        console.log(token);
                        return request(app)
                            .post('/api/category')
                            .set('Authorization', `Bearer ${token}`)
                            .send({
                                name: "Noodle Dishes",
                                content: "Stir Fried or Soup Based"

                            })
                            .expect(201)
                            .then((resp) => {
                                expect(resp.body.name).toBe('Noodle Dishes');
                                expect(resp.body.slug).toBe('noodle-dishes');
                            })

                    })
            })
        })
        describe("#GET", () => {
            it("status 200, get all categories", () => {
                return request(app)
                    .post('/api/login')
                    .send({
                        email: 'nax2uk@gmail.com',
                        password: '123456'
                    })
                    .expect(200)
                    .then(response => {
                        const { token } = response.body;
                        console.log(token);
                        return request(app)
                            .get('/api/category')
                            .set('Authorization', `Bearer ${token}`)
                            .expect(200)
                            .then((resp) => {
                                console.log(resp);
                            })

                    })
            })
        })
    });

    describe.only('#api/link', () => {
        describe("#PUT, #DELETE, #PATCH", () => {
            it("status:405, responds appropriately because the HTTP method is not allowed", () => {
                const invalidMethods = ["put", "delete", "patch"];
                const requests = invalidMethods.map((httpRequestMethod) => {
                    return request(app)
                    [httpRequestMethod]("/api/link")
                        .expect(405)
                        .then((resp) => {
                            expect(resp.body.msg).toBe(
                                `Method Not Allowed: for HTTP ${httpRequestMethod.toUpperCase()} at /api/link`
                            );
                        });
                });
                return Promise.all(requests);
            });
        });
        describe("POST", () => {
            it('status: 201 when linked succesfully added', () => {
                return request(app)
                    .post('/api/login')
                    .send({
                        email: "azlinayeo@gmail.com",
                        password: "123456"
                    })
                    .then(resp => {
                        const { token } = resp.body;
                        return request(app)
                            .post('/api/link')
                            .set('Authorization', `Bearer ${token}`)
                            .send({
                                title: "Chewy Chocolate Chip Cookies",
                                url: "https://sallysbakingaddiction.com/chewy-chocolate-chip-cookies/#tasty-recipes-70437",
                                categories: "5f3bf5d77d7ee9b5a76840b3",
                                type: "Web Page"
                            })
                            .expect(201)
                            .then(response => {
                                console.log(response.body);

                                expect(response.body).toMatchObject({
                                    title: 'Chewy Chocolate Chip Cookies',
                                    categories: ['5f3bf5d77d7ee9b5a76840b3'],
                                    type: 'Web Page',
                                    clicks: 0,
                                    url: 'https://sallysbakingaddiction.com/chewy-chocolate-chip-cookies/#tasty-recipes-70437',
                                    slug: 'https://sallysbakingaddiction.com/chewy-chocolate-chip-cookies/#tasty-recipes-70437',
                                    postedBy: '5f29b766b7b225d7c290e3a6',
                                })

                            })
                    })
            })
        })
    })
})


