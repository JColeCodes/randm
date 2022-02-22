const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');

router.use('/api', apiRoutes); // Routes for /api
router.use('/', homeRoutes); // Routes for public files and pages

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;