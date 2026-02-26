import mongoose from 'mongoose';

const variantSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    attributes: {
      size: {
        type: String,
        required: true,
        index: true,
      },

      color: {
        type: String,
        required: true,
        index: true,
      },
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    discountPrice: {
      type: Number,
      min: 0,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
      index: true,
    },

    images: [
      {
        type: String,
        required: true,
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { _id: true },
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    description: {
      type: String,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
      index: true,
    },

    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
      index: true,
    },

    brand: {
      type: String,
      index: true,
    },

    variants: {
      type: [variantSchema],
      validate: {
        validator: (v) => v.length > 0,
        message: 'Product must have at least one variant',
      },
    },

    totalStock: {
      type: Number,
      default: 0,
      index: true,
    },

    ratingsAverage: {
      type: Number,
      default: 0,
    },

    ratingsCount: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true },
);

productSchema.pre('save', function (next) {
  this.totalStock = this.variants.reduce(
    (acc, variant) => acc + variant.stock,
    0,
  );
  next();
});

productSchema.index({ category: 1, subCategory: 1 });

productSchema.index({ name: 'text', description: 'text' });

const Product = mongoose.model('Product', productSchema);

export default Product;
