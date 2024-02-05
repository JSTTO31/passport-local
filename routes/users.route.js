const router = require('express').Router()


router.get('/', (req, res, next) => {
    res.send({message: 'get users request'})
})

module.exports = router