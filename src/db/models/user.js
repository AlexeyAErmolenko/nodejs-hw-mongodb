import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for user'],
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: [true, 'Set email for user'],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.methods.toJSON = function () {
  const { password, ...rest } = this.toObject();
  return rest;
};

export default model('User', userSchema);
