import ICreateMovie from '@modules/movies/dtos/ICreateMovie';
import IListRequest from '@modules/movies/dtos/IListRequest';
import Movie from '@modules/movies/infra/typeorm/schemas/Movie';

interface IMoviesRepository {
  create(data: ICreateMovie): Promise<Movie>;

  findByTmdbId(tmdbId: number): Promise<Movie | undefined>;

  list({ page, pageLimit }: IListRequest): Promise<Movie[]>;

  findById(id: string): Promise<Movie | undefined>;

  delete(id: string): Promise<void>;
}

export default IMoviesRepository;
