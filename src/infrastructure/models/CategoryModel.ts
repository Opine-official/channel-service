import mongoose, { Schema, InferSchemaType, Types } from 'mongoose';

const CategorySchema = new Schema({
  categoryId: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  description: { type: String },
  channels: {
    type: [Types.ObjectId],
    ref: 'Channel',
  },
});

type CategoryModel = InferSchemaType<typeof CategorySchema>;

const CategoryModel = mongoose.model('Category', CategorySchema);

export default CategoryModel;
