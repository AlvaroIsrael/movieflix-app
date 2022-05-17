import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
// import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import MoviesController from '../controllers/MoviesController';

const moviesRouter = Router();
const moviesController = new MoviesController();

// moviesRouter.use(ensureAuthenticated);

moviesRouter.post('/', celebrate({
  [Segments.BODY]: {
    id: Joi.number().required(),
    year: Joi.number().required(),
    genre: Joi.string().required(),
    director: Joi.string().required(),
    overview: Joi.string().required(),
    title: Joi.string().required(),
    posterPath: Joi.string().optional().allow(null),
    backdropPath: Joi.string().optional().allow(null),
    voteCount: Joi.number().required(),
    voteAverage: Joi.number().required(),
  },
}), moviesController.create);

moviesRouter.get('/', moviesController.index);

moviesRouter.delete('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().required(),
  },
}), moviesController.delete);

export default moviesRouter;
