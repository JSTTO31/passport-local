const mongoose = require('mongoose')
const mongoDBURL = process.env.DATABASE_URL

mongoose.connect(mongoDBURL)

mongoose.connection.on('connected', () => {
    console.log('Database connected!')
})

module.exports.connection = mongoose.connection
