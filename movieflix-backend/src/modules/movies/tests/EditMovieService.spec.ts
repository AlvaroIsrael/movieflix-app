import FakeMoviesRepository from '../repositories/fakes/FakeMoviesRepository';
import ListMoviesService from '../services/ListMoviesService';
import EditMovieService from '@modules/movies/services/EditMovieService';
import AppError from '@shared/errors/AppError';
import { StatusCodes } from 'http-status-codes';

let fakeMoviesRepository: FakeMoviesRepository;
let editMovieService: EditMovieService;

describe('EditMovieService', () => {
  beforeEach(() => {
    fakeMoviesRepository = new FakeMoviesRepository();

    editMovieService = new EditMovieService(fakeMoviesRepository);
  });

  it('should return error 404 if the movie does not exist.', async () => {
    try {
      await editMovieService.execute('non-existing-id', {
        tmdbId: 675353,
        backdropPath: '/egoyMDLqCxzjnSrWOz50uLlJWmD.jpg',
        genre: 'Fiction',
        director: 'Jeff Fowler',
        title: 'Sonic the Hedgehog 2',
        overview: 'After settling in Green Hills, Sonic is eager to prove he has what it takes to be a true hero. His test comes when Dr. Robotnik returns, this time with a new partner, Knuckles, in search for an emerald that has the power to destroy civilizations. Sonic teams up with his own sidekick, Tails, and together they embark on a globe-trotting journey to find the emerald before it falls into the wrong hands.',
        posterPath: '/6DrHO1jr3qVrViUO6s6kFiAGM7.jpg',
        year: '2022',
        voteAverage: 7.7,
        voteCount: 1388
      });
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      if (error instanceof AppError) {
        expect(error.statusCode).toBe(StatusCodes.NOT_FOUND);
      }
    }
  });

  it('should be able to edit an existing movie.', async () => {
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

    const editedMovie = await editMovieService.execute(movie.id.toString(), {
      tmdbId: 109445,
      backdropPath: '/fydUcbkqLyESCFa9U5XKqi8dIVj.jpg',
      genre: 'Animation',
      title: 'Frozen 2',
      director: 'Jennifer Lee',
      overview: 'Young princess Anna of Arendelle dreams about finding true love at her sister Elsa.',
      posterPath: '/kgwjIb2JDHRhNk13lmSxiClFjVk.jpg',
      year: '2013',
      voteAverage: 7.3,
      voteCount: 14222
    });

    expect(editedMovie.title).toBe('Frozen 2');
  });
});
