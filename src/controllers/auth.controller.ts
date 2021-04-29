import config from "../config/auth.config"
import db from "../models"

import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const User = db.user;
const Role = db.role;

const signUp = (req: any, res: any) => {
  const user = new User({
    email: req.body.email,
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save((err: any, user: any) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err: any, roles: any) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map((role: { _id: any; }) => role._id);
          user.save((err: any) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "The user was registered successfully" });
          });
        }
      );
    }
  });
};

const signIn = (req: any, res: any) => {
  User.findOne({
    email: req.body.email
  })
    .populate("roles", "-__v")
    .exec((err: any, user: any) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "This is not a registered email. Please Sign Up" });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Either the email or password is invalid"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        email: user.email,
        roles: authorities,
        accessToken: token
      });
    });
};


const authController = {
  signIn, signUp
}

export default authController