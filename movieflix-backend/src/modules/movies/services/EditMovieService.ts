import AppError from '@shared/errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'tsyringe';
import IMoviesRepository from '@modules/movies/repositories/IMoviesRepository';
import Movie from '@modules/movies/infra/typeorm/schemas/Movie';
import IEditRequest from '@modules/movies/dtos/IEditRequest';

@injectable()
class EditMovieService {
  constructor(
    @inject('MoviesRepository')
    private moviesRepository: IMoviesRepository,
  ) {
  }

  public async execute(_id: string, {
    tmdbId,
    year,
    genre,
    director,
    overview,
    title,
    posterPath,
    backdropPath,
    voteCount,
    voteAverage,
  }: IEditRequest): Promise<Movie> {
    const movieExists = await this.moviesRepository.findByTmdbId(tmdbId);

    if (!movieExists) {
      throw new AppError('Movie does not exist', StatusCodes.NOT_FOUND);
    }

    let movie;
    try {
      movie = await this.moviesRepository.edit(_id, {
        tmdbId,
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
    } catch (error) {
      throw new AppError('Error editing movie', StatusCodes.INTERNAL_SERVER_ERROR);
    }

    if (!movie) {
      throw new AppError('Movie not found', StatusCodes.NOT_FOUND);
    }

    return movie;
  }
}

export default EditMovieService;
