import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListMoviesService from '@modules/movies/services/ListMoviesService';
import ListMovieService from '@modules/movies/services/ListMovieService';
import CreateMovieService from '@modules/movies/services/CreateMovieService';
import { StatusCodes } from 'http-status-codes';
import DeleteMovieService from '@modules/movies/services/DeleteMovieService';
import EditMovieService from '@modules/movies/services/EditMovieService';

class MoviesController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id: _id } = request.params;
    const {
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
    } = request.body;

    const editMovieService = container.resolve(EditMovieService);

    const movie = await editMovieService.execute(_id, {
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

    return response.status(StatusCodes.OK).json(movie);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const listMovieService = container.resolve(ListMovieService);

    const movie = await listMovieService.execute({ id });

    return response.status(StatusCodes.OK).json(movie);
  }


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
