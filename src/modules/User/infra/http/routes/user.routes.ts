import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import isAuthenticated from '../../../../../shared/infra/http/middlewares/isAuthenticated';
import UserController from '../controllers/UserController';

const userRouter = Router();
const userController = new UserController();

userRouter.get('/', isAuthenticated, userController.index);

userRouter.get(
    '/:id', 
    isAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().required(),
        }
    }),
    userController.show,
);

userRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
        },
    }),
    userController.create,
);

userRouter.delete(
    '/:id', 
    isAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().required(),
        }
    }),
    userController.delete,
);

export default userRouter;