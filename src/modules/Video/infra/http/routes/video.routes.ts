import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';
import upload from '../../../../../config/upload';
import VideoController from '../controllers/VideoController';

const videoRouter = Router();
const videoController = new VideoController();
const multerConfig = multer(upload.multer);

videoRouter.get('/', videoController.index);

videoRouter.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().required(),
        },
    }),
    videoController.show,
);

videoRouter.post(
    '/', 
    multerConfig.single('file'), 
    celebrate({
        [Segments.BODY]: {
            title: Joi.string().required(),
            description: Joi.string().required(),
        },
    }),
    videoController.create,
);

videoRouter.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().required(),
        },
    }),
    videoController.delete,
);

export default videoRouter;