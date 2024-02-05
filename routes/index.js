const router = require('express').Router()
const usersRoute = require('./users.route')
const authRoute = require('./auth.route')
const passport = require('passport')

router.use('/users', usersRoute)
router.use('/', authRoute)
router.get('/', (req, res) => {
    res.send(`<h1>Home</h1>`)
})


module.exports = router