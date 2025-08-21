import { model, Schema } from 'mongoose';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Set phoneNumber for contact'],
    },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      required: [true, 'Set contactType for contact'],
      enum: ['work', 'home', 'personal'],
      default: 'personal',
    },
  },
  { versionKey: false, timestamps: true },
);
export default model('Contact', contactSchema);
