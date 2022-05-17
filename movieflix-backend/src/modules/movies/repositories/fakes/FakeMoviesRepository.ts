import Movie from '@modules/movies/infra/typeorm/schemas/Movie';
import ICreateMovie from '@modules/movies/dtos/ICreateMovie';
import IMoviesRepository from '@modules/movies/repositories/IMoviesRepository';
import IListRequest from '@modules/movies/dtos/IListRequest';
import { ObjectID, } from 'typeorm';

class FakeMoviesRepository implements IMoviesRepository {
  private movies: Movie[] = [];

  public async create({
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
    const movie = new Movie();

    Object.assign(movie, {
      id: new ObjectID(id),
      tmdbId: id,
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

    this.movies.push(movie);

    return movie;
  }

  public async findByTmdbId(tmdbId: number): Promise<Movie | undefined> {
    const movie = this.movies.find(m => m.tmdbId === tmdbId);

    return Promise.resolve(movie);
  }

  public async list({ page, pageLimit }: IListRequest): Promise<Movie[]> {
    const start = (page - 1) * pageLimit;
    const end = start + pageLimit;

    return Promise.resolve(this.movies.slice(start, end));
  }

  public async findById(id: string): Promise<Movie | undefined> {
    const movie = this.movies.find(m => m.id === new ObjectID(id));

    return Promise.resolve(movie);
  }

  public async delete(id: string): Promise<void> {
    const movieIndex = this.movies.findIndex(m => m.id === new ObjectID(id));

    this.movies.splice(movieIndex, 1);
  }
}

export default FakeMoviesRepository;
