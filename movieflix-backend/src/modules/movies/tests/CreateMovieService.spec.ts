import AppError from '@shared/errors/AppError';

import FakeMoviesRepository from '../repositories/fakes/FakeMoviesRepository';
import CreateMovieService from '../services/CreateMovieService';
import ListMoviesService from '@modules/movies/services/ListMoviesService';
import { StatusCodes } from 'http-status-codes';

let fakeMoviesRepository: FakeMoviesRepository;
let createMovieService: CreateMovieService;
let listMoviesService: ListMoviesService;

describe('CreateMovieService', () => {
  beforeEach(() => {
    fakeMoviesRepository = new FakeMoviesRepository();

    createMovieService = new CreateMovieService(fakeMoviesRepository);
    listMoviesService = new ListMoviesService(fakeMoviesRepository);
  });

  it('should return error 400 if the movie already exists in database.', async () => {
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

    try {
      await createMovieService.execute({
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
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      if (error instanceof AppError) {
        expect(error.statusCode).toBe(StatusCodes.BAD_REQUEST);
      }
    }
  });

  it('should be able to save a new movie into database.', async () => {
    await createMovieService.execute({
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


    const movies = await listMoviesService.execute({
      page: 1,
      pageLimit: 10,
    });

    expect(movies.length).toBe(1);
  });
});
