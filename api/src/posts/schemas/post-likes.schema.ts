import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { User } from '../../users/user.schema';
import { Post } from './post.schema';

@Schema({ timestamps: true })
export class PostLikes extends Document {
  @Prop({
    required: true,
    index: true,
    type: SchemaTypes.Number,
    ref: 'Post',
  })
  post: Post;

  @Prop({
    required: true,
    index: true,
    type: SchemaTypes.ObjectId,
    ref: 'User',
  })
  user: User;

  @Prop({ required: true, type: Number, enum: [-1, 1] })
  value: -1 | 1;

  createdAt: Date;
  updatedAt: Date;
}

export const PostLikesSchema = SchemaFactory.createForClass(PostLikes);
