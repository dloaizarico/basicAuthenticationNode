import { Router } from 'express';

import authJwt from '../middlewares/authJwt'
import controller from '../controllers/user.controller'

const userRouter = Router();

userRouter.use((_req: any, res: any, next: any) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

userRouter.get("/adminBoard", [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);

userRouter.get("/employeeBoard", [authJwt.verifyToken, authJwt.isEmployee], controller.employeeBoard);

userRouter.get("/customerBoard", [authJwt.verifyToken, authJwt.isCustomer], controller.customerBoard);


export default userRouter;