import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: [true, 'Set name for user'] },
    email: {
      type: String,
      required: [true, 'Set email for user'],
      unique: true,
    },
    password: { type: String, required: [true, 'Set password for user'] },
  },
  { timestamps: true, versionKey: false },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export default model('User', userSchema);
