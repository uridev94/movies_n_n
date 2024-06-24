const request = require('supertest');
const app = require('../app');

let directorId

const BASE_URL = '/api/v1/directors';

const director = {
    firstName:'Quentin',
    lastName: 'Tarantino',
    nationality: 'USA',
    image:'No image available',
    birthday:'1963-09-27'
};


test("POST -> 'BASE_URL' , should return statusCode 201 and res.body.firstName === director.firstName", async() =>{
    const res = await request(app)
    .post(BASE_URL)
    .send(director)

    directorId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
});


test("GET -> 'BASE_URL' should return statusCode 200 and res.body[0].firstName === director.firstName", async()=>{
    const res = await request(app)
    .get(BASE_URL)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].firstName).toBe(director.firstName)
});

test("GET_ONE -> 'BASE_URL/:id' , should return statusCode 200 and res.body.firstName === director.firstName", async()=>{
    const res = await request(app)
    .get(`${BASE_URL}/${directorId}`)


    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
    expect(res.body.lastName).toBe(director.lastName)
    expect(res.body.nationality).toBe(director.nationality)
    expect(res.body.image).toBe(director.image)
    expect(res.body.birthday).toBe(director.birthday)
    
});

test("PUT -> 'BASE_URL/:id' should return statusCode 200 and res.body.firstName === directorUpdate.firstName", async()=>{
    const directorUpdate = {
        firstName:'Quentin Jerome'
    }
    const res = await request(app)
    .put(`${BASE_URL}/${directorId}`)
    .send(directorUpdate)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(directorUpdate.firstName)
});

test("DELETE -> 'BASE_URL/:id should return statusCode 204", async()=>{
    const res = await request(app)
    .delete(`${BASE_URL}/${directorId}`)

    expect(res.statusCode).toBe(204)
});
