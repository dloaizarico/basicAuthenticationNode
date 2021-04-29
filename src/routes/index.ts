import { Router } from 'express';
import userRouter from './user.routes';
import authRouter from './auth.routes'

const routes = Router();

routes.use('/authorization', authRouter);
routes.use('/user', userRouter);

export default routes;