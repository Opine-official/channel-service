import mongoose, { Schema, InferSchemaType } from 'mongoose';

const ChannelSchema = new Schema({
  channelId: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  description: { type: String },
  categories: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  },
  subscriberCount: {
    type: Number,
    default: 0,
    required: true,
  },
});

type ChannelModel = InferSchemaType<typeof ChannelSchema>;

const ChannelModel = mongoose.model('Channel', ChannelSchema);

export default ChannelModel;
