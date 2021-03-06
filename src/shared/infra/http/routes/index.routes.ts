import { Router } from 'express';
import sessionRouter from '../../../../modules/User/infra/http/routes/session.routes';
import userRouter from '../../../../modules/User/infra/http/routes/user.routes';
import searchVideoRouter from '../../../../modules/Video/infra/http/routes/search_video.routes';
import videoRouter from '../../../../modules/Video/infra/http/routes/video.routes';

const router = Router();

router.use('/user', userRouter);
router.use('/session', sessionRouter);

router.use('/video', videoRouter);
router.use('/video/search', searchVideoRouter);

export default router;