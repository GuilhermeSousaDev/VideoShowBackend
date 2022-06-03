import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import SearchVideoController from '../controllers/SearchVideoController';

const searchVideoRouter = Router();
const searchVideoController = new SearchVideoController();

searchVideoRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            title: Joi.string().required(),
        },
    }),
    searchVideoController.index,
);

export default searchVideoRouter;