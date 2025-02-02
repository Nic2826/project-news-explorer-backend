// routes/users.js
const router = require('express').Router();
const auth = require('../middlewares/auth');
const { getCurrentUser, signup, signin } = require('../controllers/users');

router.use(auth); // Protege todas las rutas de usuarios

router.get('users/me', getCurrentUser);
router.post('/signup', signup);
router.post('/signin', signin);

module.exports = router;
