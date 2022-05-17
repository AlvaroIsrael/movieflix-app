import FakeMoviesRepository from '../repositories/fakes/FakeMoviesRepository';
import ListMoviesService from '../services/ListMoviesService';

let fakeMoviesRepository: FakeMoviesRepository;
let listMoviesService: ListMoviesService;

describe('ListMoviesService', () => {
  beforeEach(() => {
    fakeMoviesRepository = new FakeMoviesRepository();

    listMoviesService = new ListMoviesService(fakeMoviesRepository);
  });

  it('should return an empty movie list if no movies are registered yet.', async () => {
    const movies = await listMoviesService.execute({
      page: 1,
      pageLimit: 10,
    });
    expect(movies).toStrictEqual([]);
  });

  it('should be able to list one existing movie.', async () => {
    await fakeMoviesRepository.create({
      id: 109445,
      backdropPath: '/fydUcbkqLyESCFa9U5XKqi8dIVj.jpg',
      genre: 'Animation',
      title: 'Frozen',
      director: 'Jennifer Lee',
      overview: 'Young princess Anna of Arendelle dreams about finding true love at her sister Elsa.',
      posterPath: '/kgwjIb2JDHRhNk13lmSxiClFjVk.jpg',
      year: '2013',
      voteAverage: 7.3,
      voteCount: 14222
    });

    await fakeMoviesRepository.create(
      {
        id: 675353,
        backdropPath: '/egoyMDLqCxzjnSrWOz50uLlJWmD.jpg',
        genre: 'Action',
        title: 'Sonic the Hedgehog 2',
        director: 'Jeff Fowler',
        overview: 'After settling in Green Hills, Sonic is eager to prove he has what it takes to be a true hero. His test comes when Dr. Robotnik returns, this time with a new partner, Knuckles, in search for an emerald that has the power to destroy civilizations. Sonic teams up with his own sidekick, Tails, and together they embark on a globe-trotting journey to find the emerald before it falls into the wrong hands.',
        posterPath: '/6DrHO1jr3qVrViUO6s6kFiAGM7.jpg',
        year: '2022',
        voteAverage: 7.7,
        voteCount: 1388,
      });

    const movies = await listMoviesService.execute({
      page: 1,
      pageLimit: 10,
    });

    expect(movies.length).toBe(2);
  });
});
