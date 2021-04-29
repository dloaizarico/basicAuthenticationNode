import jwt from "jsonwebtoken";
import config from "../config/auth.config.js";
import db from"../models"


const User = db.user;
const Role = db.role;

const verifyToken = (req:any, res:any, next:any) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "The token is required to process any transaction" });
  }

  jwt.verify(token, config.secret, (err:any, decoded:any) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = (req:any, res:any, next:any) => {
  User.findById(req.userId).exec((err:any, user:any) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err:any, roles:any) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "administrator") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "The username does not have the correct role assgined in the app" });
        return;
      }
    );
  });
};

const isEmployee = (req:any, res:any, next:any) => {
  User.findById(req.userId).exec((err:any, user:any) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err:any, roles:any) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "employee") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "The username does not have the correct role assgined in the app" });
        return;
      }
    );
  });
};

const isCustomer = (req:any, res:any, next:any) => {
    User.findById(req.userId).exec((err:any, user:any) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      Role.find(
        {
          _id: { $in: user.roles }
        },
        (err:any, roles:any) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
  
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "customer") {
              next();
              return;
            }
          }
  
          res.status(403).send({ message: "The username does not have the correct role assgined in the app" });
          return;
        }
      );
    });
  };

const authJwt = {
  verifyToken,
  isAdmin,
  isEmployee,
  isCustomer
};

export default authJwt;