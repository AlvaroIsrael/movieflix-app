import { inject, injectable } from 'tsyringe';
import IMoviesRepository from '@modules/movies/repositories/IMoviesRepository';
import Movie from '../infra/typeorm/schemas/Movie';
import IListOneRequest from '@modules/movies/dtos/IListOneRequest';
import AppError from '@shared/errors/AppError';
import { StatusCodes } from 'http-status-codes';

@injectable()
class ListMovieService {
  constructor(
    @inject('MoviesRepository')
    private moviesRepository: IMoviesRepository,
  ) {
  }

  public async execute({ id }: IListOneRequest): Promise<Movie> {
    const movie = await this.moviesRepository.findById(id);

    if (!movie) {
      throw new AppError('Movie not found', StatusCodes.NOT_FOUND);
    }

    return movie;
  }

}

export default ListMovieService;
