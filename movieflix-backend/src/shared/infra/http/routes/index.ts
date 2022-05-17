import { Router } from 'express';
import moviesRouter from '@modules/movies/infra/http/routes/movies.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
// import swaggerUi from 'swagger-ui-express';
// import yaml from 'yamljs';

const routes = Router();
// const swagger = yaml.load('./swagger.yaml');

routes.use('/api/v1/movies', moviesRouter);
routes.use('/api/v1/sessions', sessionsRouter);
routes.use('/api/v1/users', usersRouter);
// routes.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swagger));

export default routes;
