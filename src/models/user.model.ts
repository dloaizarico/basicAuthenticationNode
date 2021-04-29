import mongoose from 'mongoose'

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    phoneNumber: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);

export default User;