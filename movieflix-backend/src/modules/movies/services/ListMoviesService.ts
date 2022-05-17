import { inject, injectable } from 'tsyringe';
import IMoviesRepository from '@modules/movies/repositories/IMoviesRepository';
import Movie from '../infra/typeorm/schemas/Movie';
import IListRequest from '@modules/movies/dtos/IListRequest';

@injectable()
class ListMoviesService {
  constructor(
    @inject('MoviesRepository')
    private moviesRepository: IMoviesRepository,
  ) {
  }

  public async execute({ page, pageLimit }: IListRequest): Promise<Movie[]> {
    const movies = await this.moviesRepository.list({ page, pageLimit });

    return movies;
  }
}

export default ListMoviesService;
