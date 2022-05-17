import AppError from '@shared/errors/AppError';

import FakeMoviesRepository from '../repositories/fakes/FakeMoviesRepository';
import ListMovieService from '../services/ListMovieService';

let fakeMoviesRepository: FakeMoviesRepository;
let listMovieService: ListMovieService;

describe('ListMovieService', () => {
  beforeEach(() => {
    fakeMoviesRepository = new FakeMoviesRepository();

    listMovieService = new ListMovieService(fakeMoviesRepository);
  });

  it('should return error 404 if the movie is not found.', async () => {
    await expect(
      listMovieService.execute({
        id: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to list one existing movie.', async () => {
    const movie = await fakeMoviesRepository.create({
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

    const profile = await listMovieService.execute({
      id: movie.id.toString(),
    });

    expect(profile.title).toBe('Frozen');
    expect(profile.director).toBe('Jennifer Lee');
  });
});
