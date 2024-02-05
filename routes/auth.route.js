const router = require('express').Router()
const { default: mongoose } = require('mongoose')
const passport = require('passport')
const hashPasswordUtil = require('../utils/hashPassword.util')
const guestMiddleware = require('../middlewares/guest.middleware')
const authMiddleware = require('../middlewares/auth.middleware')
const User = require('mongoose').model('User')

router.post('/login', guestMiddleware, passport.authenticate('local', {
    failureRedirect: '/login-error',
    successRedirect: '/'
}))

router.get('/login-error', guestMiddleware, (req, res) => {
    res.send('<h1>Login error</h1>')
})

router.get('/login', guestMiddleware, (req, res) => {
    res.send('<h1>Login Page</h1>')
})


router.post('/register', guestMiddleware, async (req, res, next) => {
    try {
        const {name, email, password} = req.body
        const hashedPassword = await hashPasswordUtil(password)
        
        const user = await User.create({
            _id: new mongoose.Types.ObjectId(),
            name,
            email,
            password: hashedPassword
        })

        req.login(user, (err) => {
            if(err) next(err)
            res.redirect('/')
        })

        
    } catch (error) {
        console.log(error);
        if(!error){
            res.sendStatus(500)
        }else{
            res.status(422).send(error)
        }
    }
}, )

router.post('/logout', authMiddleware, (req, res) => {
    req.logout((err, done) => {
        if(err) done(err)
        res.redirect('/login')
    })
})


module.exports = router