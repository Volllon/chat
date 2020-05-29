import mongoose, {Schema, Document} from 'mongoose';
import bcrypt from 'bcryptjs';

const saltWork = 10;

export interface IUser extends Document {
  firstName?: string,
  lastName?: string,
  email: string;
  password: string;
  role: boolean;
  token?: string;
  functionalToken?: string;
}

const UserSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: Number,
    required: true
  },
  token: {
    type: String
  },
  functionalToken: {
    type: String
  }
});

UserSchema.pre('save', function (next) {
  const user = this;

  bcrypt.genSalt(saltWork, (err, salt) => {
    if (err) return next(err);
    
    // hash the password using our new salt
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

const UserModel = mongoose.model<IUser>('users', UserSchema);

export default UserModel;
