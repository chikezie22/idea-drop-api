import express from 'express';
const router = express.Router();

// @route get /api/ideas
// @description get all ideas
// @access public
router.get('/ideas', (req, res) => {
  const ideas = [
    {
      id: 1,
      tite: 'Idea 1',
      description: 'This is idea 1',
    },
    {
      id: 2,
      tite: 'Idea 2',
      description: 'This is idea 2',
    },
    {
      id: 3,
      tite: 'Idea 3',
      description: 'This is idea 3',
    },
  ];
  res.json(ideas);
});

// @route post /api/ideas
// @description create new idea
// @access public
router.post('/ideas', (req, res) => {
  console.log(req.body);
  const data = req.body;
  if (!data) return res.status(400).json({ error: 'no data entered' });
  res.send('Processed');
});

export default router;
