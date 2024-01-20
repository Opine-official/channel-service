import mongoose, { Schema, InferSchemaType } from 'mongoose';

const ChannelSchema = new Schema({
  channelId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  categories: {
    type: [String],
  },
  similar: {
    type: [String],
  },
  followerCount: {
    type: Number,
    default: 0,
  },
});

type ChannelModel = InferSchemaType<typeof ChannelSchema>;

const ChannelModel = mongoose.model('Channel', ChannelSchema);

export default ChannelModel;
