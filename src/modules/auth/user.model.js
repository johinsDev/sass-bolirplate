import mongoose, { Schema } from 'mongoose';
import * as bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../constants';

const UserSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    userName: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    active: {
      type: Boolean,
      default: false
    },
    activationToken: {
      type: String
    }
  },
  { timestamps: true },
);

UserSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await this._hashPassword(this.password);
    return next();
  }
  return next();
});

UserSchema.methods = {
  async _hashPassword(password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  },
  async authenticateUser(password) {
    return await bcrypt.compare(password, this.password);
  },
  toAuthJSON() {
    return {
      _id: this._id,
      token: `JWT ${this.createToken()}`
    };
  },
  createToken() {
    return jwt.sign(
      {
        _id: this._id,
      },
      JWT_SECRET,
    );
  },
  toJSON() {
    return {
      id: this._id,
      email: this.email,
      userName: this.userName
    };
  },
};

UserSchema.index({ email: 1, userName: 1 });

export default mongoose.model('User', UserSchema);