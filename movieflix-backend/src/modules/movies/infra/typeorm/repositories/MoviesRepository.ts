import { getMongoRepository, MongoRepository, } from 'typeorm';

import Movie from '../schemas/Movie';
import IMoviesRepository from '@modules/movies/repositories/IMoviesRepository';
import ICreateMovie from '@modules/movies/dtos/ICreateMovie';
import IListRequest from '@modules/movies/dtos/IListRequest';
import IEditRequest from '@modules/movies/dtos/IEditRequest';

class MoviesRepository implements IMoviesRepository {
  private ormRepository: MongoRepository<Movie>;

  constructor() {
    this.ormRepository = getMongoRepository(Movie, 'mongo');
  }

  public async edit(id: string, movie: IEditRequest): Promise<Movie | undefined> {
    await this.ormRepository.update(id, movie);

    return this.ormRepository.findOne(id);
  }

  public async list({ page, pageLimit }: IListRequest): Promise<Movie[]> {
    return await this.ormRepository.find({
      skip: (page - 1) * pageLimit,
      take: pageLimit,
    });
  }

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
    const movie = this.ormRepository.create({
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

    await this.ormRepository.save(movie);

    return movie;
  }

  public async findByTmdbId(tmdbId: number): Promise<Movie | undefined> {
    return this.ormRepository.findOne({
      where: {
        tmdbId,
      },
    });
  }

  public async findById(id: string): Promise<Movie | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default MoviesRepository;
