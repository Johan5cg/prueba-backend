import mongoose, { Schema } from 'mongoose';

const productSchema:Schema = new Schema ({
    name: { type: String, require: true, lowercase: true },
    category: { type: String, require: true, lowercase: true }
}, { collection: 'products' })

export default mongoose.model('Product', productSchema)