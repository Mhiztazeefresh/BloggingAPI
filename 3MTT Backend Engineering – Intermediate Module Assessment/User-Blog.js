const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  password: { type: String, required: true },
});

const blogSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  state: { type: String, enum: ['draft', 'published'], default: 'draft' },
  read_count: { type: Number, default: 0 },
  reading_time: { type: Number },
  tags: [{ type: String }],
  body: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const User = model('User', userSchema);
const Blog = model('Blog', blogSchema);
