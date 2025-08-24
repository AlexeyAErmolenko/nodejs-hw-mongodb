import { model, Schema } from 'mongoose';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, 'Set phone number for contact'],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      required: [true, 'Set contact type for contact'],
      enum: ['work', 'home', 'personal'],
      default: 'personal',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export default model('Contact', contactSchema);
