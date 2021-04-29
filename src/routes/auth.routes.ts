import { Router } from 'express';

import verifySignUp from '../middlewares/verifySignUp'
import controller from '../controllers/auth.controller'

const authRouter = Router();

authRouter.use((_req: any, res: any, next: any) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

authRouter.post(
  "/signup",
  [
    verifySignUp.isAnExistingRole,
    verifySignUp.validateDuplicateEmail
  ],
  controller.signUp
);

authRouter.post("/signin", controller.signIn);


export default authRouter;