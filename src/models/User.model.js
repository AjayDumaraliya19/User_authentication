import mongoose from "mongoose";
// import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      index: true,
      required: [true, "User is requirded..!"],
    },
    phone: {
      type: Number,
      integer: true,
      unique: true,
      minlength: 10,
      maxlength: 10,
      required: [true, "Phone number is required..!"],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Email is required..!"],
    },
    password: {
      type: String,
      minlength: 6,
      maxLength: 128,
      required: [true, "Password is required"],
      select: false, /** to hide the password field in return data */
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = bcrypt.hash(this.password, 10);
  next();
});

// userSchema.methods.generateAccesstoken = function () {
//   return jwt.sign(
//     {
//       _id: this._id,
//       email: this.email,
//       userName: this.userName,
//     },
//     process.env.ACCESS_TOKEN_SECRET,
//     {
//       expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
//     }
//   );
// };

// userSchema.methods.generateRefreshToken = function () {
//   return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
//     expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
//   });
// };

export const User = mongoose.model("User", userSchema);
