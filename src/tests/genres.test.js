const request = require('supertest');

let genreId

const app = require('../app');


const BASE_URL = '/api/v1/genres';

const genre = {
    name:'Drama'
};


test("POST -> 'URL' should return status code 200 and res.body.name === genre.name ", async()=>{
    const res = await request(app)
    .post(BASE_URL)
    .send(genre)

    genreId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name)
});




test("GET => / should return statusCode 200, to be defined, array.length == 1 and and res.body[0].name === genre.name", async()=> {
    const res = await request(app)
        .get(BASE_URL)
    
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body[0].name).toBe(genre.name)
    expect(res.body).toHaveLength(1)
});


test("GET -> 'URL/:id', should return statusCode 200 and res.body.name === genre.name", async()=>{
    const res = await request(app)
    .get(`${BASE_URL}/${genreId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name)
});

test("PUT -> 'URL/:id, should return statusCode 200  and res.body.name === genreUpdate.name", async () =>{

    const genreUpdate = {
        name: 'Action'
    }

    const res = await request(app)

    .put(`${BASE_URL}/${genreId}`)
    .send(genreUpdate)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genreUpdate.name)
});

test("DELETE -> 'URL/:id', should return statusCode 204", async () =>{
    const res = await request(app)
    .delete(`${BASE_URL}/${genreId}`)

    expect(res.statusCode).toBe(204)
});