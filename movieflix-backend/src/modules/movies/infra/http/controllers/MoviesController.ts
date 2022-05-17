import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListMoviesService from '@modules/movies/services/ListMovieService';
import CreateMovieService from '@modules/movies/services/CreateMovieService';
import { StatusCodes } from 'http-status-codes';
import DeleteMovieService from '@modules/movies/services/DeleteMovieService';

class MoviesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { page = 1, limit = 10 } = request.query;
    const listMoviesService = container.resolve(ListMoviesService);

    const movies = await listMoviesService.execute({
      page: Number(page),
      pageLimit: Number(limit),
    });

    return response.status(StatusCodes.OK).json(movies);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteMovieService = container.resolve(DeleteMovieService);

    await deleteMovieService.execute({ id });

    return response.status(StatusCodes.OK).json({ message: 'Movie deleted' });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
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
    } = request.body;

    const createMovieService = container.resolve(CreateMovieService);

    const movie = await createMovieService.execute({
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

    return response.status(StatusCodes.CREATED).json(movie);
  }
}

export default MoviesController;
