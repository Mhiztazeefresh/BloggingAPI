// Get list of published blogs
app.get('/blogs', async (req, res) => {
    try {
      const blogs = await Blog.find({ state: 'published' }).populate('author');
      res.json(blogs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Get published blog by ID
  app.get('/blogs/:id', async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id).populate('author');
      if (!blog || blog.state !== 'published') {
        return res.status(404).json({ message: 'Blog not found' });
      }
      blog.read_count++;
      await blog.save();
      res.json(blog);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Create a blog
  app.post('/blogs', async (req, res) => {
    try {
      const blog = await Blog.create(req.body);
      res.status(201).json(blog);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Update blog state to published
  app.put('/blogs/:id/publish', async (req, res) => {
    try {
      const blog = await Blog.findByIdAndUpdate(req.params.id, { state: 'published' }, { new: true });
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      res.json(blog);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Update blog
  app.put('/blogs/:id', async (req, res) => {
    try {
      const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      res.json(blog);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Delete blog
  app.delete('/blogs/:id', async (req, res) => {
    try {
     
  