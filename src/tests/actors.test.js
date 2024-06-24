const request = require('supertest');
const app = require('../app');

let actorId

const BASE_URL = '/api/v1/actors';

const actor = {
    firstName:'Jhonny',
    lastName: 'Depp',
    nationality: 'USA',
    image:'No image available',
    birthday:'1963-06-09'
};


test("POST -> 'BASE_URL' , should return statusCode 201 and res.body.firstName === actor.firstName", async() =>{
    const res = await request(app)
    .post(BASE_URL)
    .send(actor)

    actorId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
});


test("GET -> 'BASE_URL' should return statusCode 200 and res.body[0].firstName === actor.firstName", async()=>{
    const res = await request(app)
    .get(BASE_URL)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].firstName).toBe(actor.firstName)
});

test("GET_ONE -> 'BASE_URL/:id' , should return statusCode 200 and res.body.firstName === actor.firstName and other object's items", async()=>{
    const res = await request(app)
    .get(`${BASE_URL}/${actorId}`)


    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
    expect(res.body.lastName).toBe(actor.lastName)
    expect(res.body.nationality).toBe(actor.nationality)
    expect(res.body.image).toBe(actor.image)
    expect(res.body.birthday).toBe(actor.birthday)
    
});

test("PUT -> 'BASE_URL/:id' should return statusCode 200 and res.body.firstName === actorUpdate.firstName", async()=>{
    const actorUpdate = {
        firstName:'Jhonnie'
    }
    const res = await request(app)
    .put(`${BASE_URL}/${actorId}`)
    .send(actorUpdate)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actorUpdate.firstName)
});

test("DELETE -> 'BASE_URL/:id should return statusCode 204", async()=>{
    const res = await request(app)
    .delete(`${BASE_URL}/${actorId}`)

    expect(res.statusCode).toBe(204)
});
