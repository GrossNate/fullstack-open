import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send('fetching patients');
});

router.post('/', (_req, res) => {
  res.send('saving patient');
});

export default router;