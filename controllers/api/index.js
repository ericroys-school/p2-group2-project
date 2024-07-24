import { Router } from 'express';
const router = Router();

router.get('/', async (req, res) => {
res.render('landingPage');
});

router.get('/login', async (req, res) => {
res.render('login');
});
router.get('/signup', async (req, res) => {
res.render('signup');
});
router.get('/area', async (req, res) => {
res.render('area');
});
router.get('/profile', async (req, res) => {
res.render('profile');
});
router.get('/search', async (req, res) => {
res.render('search');
});
router.get('/climb', async (req, res) => {
res.render('climb');
});

export { router as apiRoutes }
