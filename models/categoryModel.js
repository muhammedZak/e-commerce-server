import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      trim: true,
      minLength: 2,
      maxLength: 100,
      index: true,
    },

    slug: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
    },

    description: {
      type: String,
      maxLength: 500,
    },

    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      default: null,
      index: true,
    },

    level: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

const Category = mongoose.model('Category', categorySchema);

export default Category;
