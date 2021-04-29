import authJwt from "./authJwt"
import  verifySignUp from "./verifySignUp"

const middleware = {
  authJwt,
  verifySignUp
};

export default middleware