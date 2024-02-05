const LocalStrategy = require('passport-local').Strategy
const User = require('mongoose').model('User')
const bcrypt = require('bcrypt')
const passport = require('passport')



/**
 * Passport Local Strategy Configuration Function
 * 
 * @param {*} passport 
 */

module.exports = function(){
    passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'},async (username, password, done) => {
        try {
            const user = await User.findOne({email: username})
            if(!user) return done(null, false)
            const match = await bcrypt.compare(password, user.password)
            if(!match) return done(null, false)
            return done(null, user)
        } catch (error) {
            done(error, false)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (userId, done) => {
        try {
            const user = await User.findById(userId)
            if(!user) return done(null, false)
            return done(null, user)
        } catch (error) {
            done(error, false)
        }
    })
}