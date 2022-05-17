import AppError from '@shared/errors/AppError';

import FakeMoviesRepository from '../repositories/fakes/FakeMoviesRepository';
import DeleteMovieService from '../services/DeleteMovieService';
import ListMovieService from '@modules/movies/services/ListMovieService';

let fakeMoviesRepository: FakeMoviesRepository;
let deleteMovieService: DeleteMovieService;
let listMovieService: ListMovieService;

describe('DeleteMovieService', () => {
  beforeEach(() => {
    fakeMoviesRepository = new FakeMoviesRepository();

    deleteMovieService = new DeleteMovieService(fakeMoviesRepository);
    listMovieService = new ListMovieService(fakeMoviesRepository);
  });

  it('should return error 404 if the movie is not found.', async () => {
    await expect(
      deleteMovieService.execute({
        id: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete one existing movie.', async () => {
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

    await deleteMovieService.execute({
      id: movie.id.toString(),
    });

    await expect(
      listMovieService.execute({
        id: movie.id.toString(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
