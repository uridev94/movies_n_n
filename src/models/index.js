const Actor = require('./Actor');
const Movie = require('./Movie');
const Director = require('./Director');
const Genre = require('./Genre');

Movie.belongsToMany(Actor, { through: 'movieActor'})
Actor.belongsToMany(Movie, { through: 'movieActor'})

Movie.belongsToMany(Director, { through: 'movieDirector'})
Director.belongsToMany(Movie, { through: 'movieDirector'})

Movie.belongsToMany(Genre, { through: 'movieGenre'})
Genre.belongsToMany(Movie, { through: 'movieGenre'})