import ICreateMovie from '@modules/movies/dtos/ICreateMovie';
import IListRequest from '@modules/movies/dtos/IListRequest';
import Movie from '@modules/movies/infra/typeorm/schemas/Movie';
import IEditRequest from '@modules/movies/dtos/IEditRequest';

interface IMoviesRepository {
  create(data: ICreateMovie): Promise<Movie>;

  findByTmdbId(tmdbId: number): Promise<Movie | undefined>;

  list({ page, pageLimit }: IListRequest): Promise<Movie[]>;

  findById(id: string): Promise<Movie | undefined>;

  delete(id: string): Promise<void>;

  edit(id: string, data: IEditRequest): Promise<Movie | undefined>;
}

export default IMoviesRepository;
