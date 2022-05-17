import AppError from '@shared/errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'tsyringe';
import IMoviesRepository from '@modules/movies/repositories/IMoviesRepository';
import Movie from '@modules/movies/infra/typeorm/schemas/Movie';
import ICreateMovie from '@modules/movies/dtos/ICreateMovie';

@injectable()
class CreateMovieService {
  constructor(
    @inject('MoviesRepository')
    private moviesRepository: IMoviesRepository,
  ) {
  }

  public async execute({
                         id,
                         year,
                         genre,
                         director,
                         overview,
                         title,
                         posterPath,
                         backdropPath,
                         voteCount,
                         voteAverage,
                       }: ICreateMovie): Promise<Movie> {
    const movieExists = await this.moviesRepository.findByTmdbId(id);

    if (movieExists) {
      throw new AppError('Movie already exists', StatusCodes.BAD_REQUEST);
    }

    return await this.moviesRepository.create({
      id,
      year,
      genre,
      director,
      overview,
      title,
      posterPath,
      backdropPath,
      voteCount,
      voteAverage,
    });
  }
}

export default CreateMovieService;
