import db from "../models";


const ROLES = db.ROLES;
const User = db.user;

const validateDuplicateEmail = (req:any, res:any, next:any) => {
    User.findOne({
      email: req.body.email
    }).exec((err:any, user:any) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "The email is already in use. Please Sign In" });
        return;
      }

      next();
    });
};

const isAnExistingRole = (req:any, res:any, next:any) => {
  console.log("received" + req.body)
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `The role: ${req.body.roles[i]} does not exist!`
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  validateDuplicateEmail,
  isAnExistingRole
};

export default verifySignUp;