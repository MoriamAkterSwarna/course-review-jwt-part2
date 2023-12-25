import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import { config } from '../../config';
import { TUser } from './user.interface';

export const UserSchema = new Schema<TUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    updatePasswordAt: {
      type: Date,
      default: null,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    passwordHistory: [
      {
        password: String,
        updatePasswordAt: Date,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

UserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.salt_rounds));
  next();
});

UserSchema.post('save', async function (doc, next) {
  const user = await User.findById(doc._id).select(
    '-password -passwordHistory',
  );
  if (user) {
    Object.assign(doc, user);
  }
  next();
});

export const User = model<TUser>('User', UserSchema);
