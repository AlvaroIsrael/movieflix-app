import { inject, injectable } from 'tsyringe';
import IMoviesRepository from '@modules/movies/repositories/IMoviesRepository';
import IDeleteRequest from '@modules/movies/dtos/IDeleteRequest';
import AppError from '@shared/errors/AppError';
import { StatusCodes } from 'http-status-codes';

@injectable()
class DeleteMovieService {
  constructor(
    @inject('MoviesRepository')
    private moviesRepository: IMoviesRepository,
  ) {
  }

  public async execute({ id }: IDeleteRequest): Promise<void> {
    const movie = await this.moviesRepository.findById(id);

    if (!movie) {
      throw new AppError('Movie not found', StatusCodes.NOT_FOUND);
    }

    await this.moviesRepository.delete(id);
  }
}

export default DeleteMovieService;
