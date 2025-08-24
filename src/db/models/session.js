import { model, Schema } from 'mongoose';

const sessionSchema = new Schema(
  {
    userId: { type: String, required: [true, 'Set userId for session'] },
    accessToken: {
      type: String,
      required: [true, 'Set accessToken for session'],
    },
    refreshToken: {
      type: String,
      required: [true, 'Set refreshToken for session'],
    },
    accessTokenValidUntil: {
      type: Date,
      required: [true, 'Set accessTokenValidUntil for session'],
    },
    refreshTokenValidUntil: {
      type: Date,
      required: [true, 'Set refreshTokenValidUntil for session'],
    },
  },
  { timestamps: true, versionKey: false },
);

export default model('Session', sessionSchema);
