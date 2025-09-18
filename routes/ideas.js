import express from 'express';
import Idea from '../models/Ideas.js';
import mongoose from 'mongoose';

const router = express.Router();

// @route get /api/ideas
// @description get all ideas
// @access public
router.get('/ideas', async (req, res, next) => {
  try {
    const limit = parseInt(req.query._limit); // optional limit
    const query = Idea.find().sort({ createdAt: -1 });

    if (!isNaN(limit)) {
      query.limit(limit);
    }
    const ideas = await query; // ✅ run the query
    res.json(ideas);
  } catch (error) {
    next(error);
  }
});

// @route get /api/ideas/:id
// @description get a single idea by ID
// @access public
router.get('/ideas/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404);
      throw new Error('Idea not found');
    }
    const idea = await Idea.findById(id).exec();
    if (!idea) {
      res.status(404);
      throw new Error(`Idea not found`);
    }
    res.json(idea);
  } catch (error) {
    next(error);
  }
});

// @route delete /api/ideas/:id
// @description get a single idea by ID
// @access public
router.delete('/ideas/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404);
      throw new Error(`Item not found`);
    }
    const idea = await Idea.findByIdAndDelete(id);
    if (!idea) {
      res.status(404);
      throw new Error(`Item not found`);
    }
    res.json({ message: `Item ${idea} deleted` });
  } catch (error) {
    next(error);
  }
});

router.put(`/ideas/:id`, async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404);
      throw new Error(`Item not found`);
    }
    const { title, description, summary, tags } = req.body || {};
    if (!title.trim() || !description?.trim() || !summary?.trim()) {
      res.status(400);
      throw new Error(`Missing Title, Summary or Description field`);
    }
    const idea = await Idea.findByIdAndUpdate(
      id,
      {
        title,
        description,
        summary,
        tags: Array.isArray(tags) ? tags : tags.split(',').map((tag) => tag.trim()),
      },
      { new: true, runValidators: true }
    );
    if (!idea) {
      res.status(404);
      throw new Error(`Item not found`);
    }
    res.json(idea);
  } catch (error) {
    next(error);
  }
});

// @route post /api/ideas
// @description create new idea
// @access public
router.post('/ideas', async (req, res, next) => {
  try {
    const { title, description, summary, tags } = req.body || {};
    if (!title?.trim() || !description?.trim() || !summary?.trim()) {
      res.status(400);
      throw new Error(`Title, Summary and Description are required`);
    }
    const newIdea = new Idea({
      title,
      summary,
      description,
      tags:
        typeof tags === 'string'
          ? tags
              .split(',')
              .map((tag) => tag.trim())
              .filter(Boolean)
          : Array.isArray(tags)
          ? tags
          : [],
    });
    const savedIdea = await newIdea.save();
    res.status(201).json(savedIdea);
  } catch (error) {
    next(error);
  }
});

export default router;
