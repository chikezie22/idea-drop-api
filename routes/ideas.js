import express from 'express';
import Idea from '../models/Ideas.js';
import mongoose from 'mongoose';
import {
  createIdea,
  deleteById,
  fetchById,
  fetchIdeas,
  updateById,
} from '../controllers/idea-controller.js';

const router = express.Router();

// @route get /api/ideas
// @description get all ideas
// @access public
router.get('/ideas', fetchIdeas);

// @route get /api/ideas/:id
// @description get a single idea by ID
// @access public
router.get('/ideas/:id', fetchById);

// @route delete /api/ideas/:id
// @description get a single idea by ID
// @access public
router.delete('/ideas/:id', deleteById);

router.put(`/ideas/:id`, updateById);

// @route post /api/ideas
// @description create new idea
// @access public
router.post('/ideas', createIdea);

export default router;
