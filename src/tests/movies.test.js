require('../models')
const request = require('supertest');
const Actor = require('../models/Actor')
const app = require('../app');
const Director = require('../models/Director');
const Genre = require('../models/Genre');

const BASE_URL = '/api/v1/movies'

let actor
let genre
let director
let movieId

const movie={
    name:"Matrix",
    image:"No image available",
    synopsis:"“The Matrix” is a groundbreaking science fiction film directed by the Wachowskis and released in 1999. The film is known for its revolutionary visual effects, complex philosophical themes, and iconic action sequences. In this summary, we will delve into the plot, characters, and key themes of “The Matrix.”",
    releaseYear:"1999"
}


afterAll(async ()=>{
    await actor.destroy()
    await director.destroy()
    await genre.destroy()
})

test("POST -> 'BASE_URL' should return statusCOde 201 and res.body.name === movie.name", async()=>{
    const res = await request(app)

    .post(BASE_URL)
    .send(movie)

    movieId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
});

test("GET -> 'BASE_URL' should return statusCode 200 and res[0].body.name === movie.name", async()=>{
    const res = await request(app)

    .get(BASE_URL)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].name).toBe(movie.name)
});

test("GETONE -> 'BASE_URL' should return statusCode 200 and res.body.name === movie.name", async()=>{
    const res = await request(app)

    .get(`${BASE_URL}/${movieId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
});

test("PUT -> 'BASE_URL/:id' should return statusCode 200 and res.body.name === movieUpdate.name", async()=>{
    const movieNameUpdate ={
        name:'Interstellar'
    }

    const res = await request(app)

    .put(`${BASE_URL}/${movieId}`)
    .send(movieNameUpdate)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movieNameUpdate.name)
});


test("POST -> 'BASE_URL/:id/actors' should return statusCode 200 and res.body[0].movieActor.actorId === actorId", async()=>{

    actor = await Actor.create({
        firstName:'Jhonny',
        lastName: 'Depp',
        nationality: 'USA',
        image:'No image available',
        birthday:'1963-06-09'
    })

    const res = await request(app)

    .post(`${BASE_URL}/${movieId}/actors`)
    .send([actor.id])


    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].movieActor.actorId).toBe(actor.id)
    expect(res.body[0].movieActor.movieId).toBe(movieId)
});

test("POST -> 'BASE_URL/:id/genres' should return statusCode 200 res.body[0].moviesGenre.genreId === genreId", async()=>{
    genre = await Genre.create({
        name:'Drama'
    })

    const res = await request(app)

    .post(`${BASE_URL}/${movieId}/genres`)
    .send([genre.id])

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].movieGenre.genreId).toBe(genre.id)
    expect(res.body[0].movieGenre.movieId).toBe(movieId)
})


test("POST -> 'BASE_URL/:id/directors' should return statusCode 200 and res.body[0].movieDirector.directorId === directorId ", async()=>{

    director = await Director.create({
        firstName:'Quentin',
        lastName: 'Tarantino',
        nationality: 'USA',
        image:'No image available',
        birthday:'1963-09-27'
    })

    const res = await request(app)

    .post(`${BASE_URL}/${movieId}/directors`)
    .send([director.id])

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].movieDirector.directorId).toBe(director.id)
});

test("DELETE -> 'BASE_URL/:id' should return statusCode 204", async()=>{
    const res = await request(app)

    .delete(`${BASE_URL}/${movieId}`)

    expect(res.statusCode).toBe(204)
});

