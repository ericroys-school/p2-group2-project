import { Router } from 'express';
import { difficultyRouter } from './difficulty/difficulty.js';
import { userRouter } from './user/user.js';
import { locationRouter } from './location/location.js';
import { areaRouter } from './area/area.js';
import { climbRouter } from './climb/climb.js';
const router = Router();
router.use('/difficulty', difficultyRouter)
router.use('/user', userRouter)
router.use('/location', locationRouter)
router.use('/area', areaRouter)
router.use('/climb', climbRouter)

// router.get('/', async (req, res) => {
// res.render('landingPage');
// });

// router.get('/login', async (req, res) => {
// res.render('login');
// });
// router.get('/signup', async (req, res) => {
// res.render('signup');
// });
// router.get('/area', async (req, res) => {
// res.render('area');
// });
// router.get('/profile', async (req, res) => {
// res.render('profile');
// });
// router.get('/search', async (req, res) => {
// res.render('search');
// });
// router.get('/climb', async (req, res) => {
// res.render('climb');
// });

 export { router as apiRoutes }
