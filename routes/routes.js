const router = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Order = require('../models/order')
const bcrypt = require('bcryptjs')
const cookieParser = require("cookie-parser")

const { Types } = require('mongoose')
router.use(cookieParser());

router.post('/register', async (req, res) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: hashedPassword,
    })

    const result = await user.save()
    const {password, ...data} = await result.toJSON()

    res.send(data)
})

router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(404).send({
            message: "User not found"
        })
    }
    if (!await bcrypt.compare(req.body.password, user.password)) {
        return res.status(404).send({
            message: "Invalid credentials"
        })
    }

    const token = jwt.sign({ _id: user._id }, 'secret')

    res.cookie('jwt',token,{
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    })
    delete user.password
    res.send({
        message: "success",
        user:user
    })
})

//install cookie-parser package for this

router.get('/user', async (req, res) => {
    try {
        const cookie = req.cookies['jwt']

        const claims = jwt.verify(cookie, 'secret')
        if (!claims) {
            return res.status(401).send({
                message: "Unauthenticated"
            })
        }

        const user = await User.findOne({ _id: claims._id })

        const { password, ...data } = await user.toJSON()

        res.send(data)
    } catch (e) {
           return res.status(401).send({
                message: "Unauthenticated"
            })
    }
})

router.post('/logout', (req, res) => {
    res.cookie('jwt', '', { maxAge: 0 })
    res.send({
        message:"succesfully logout"
    })
})

router.post('/order',async (req, res) => {
   
    const Order = new order({
        userid: req.body.userid,
        userref: "users",
        Lawyerid: req.body.Lawyerid,
        Lawyername: req.body.Lawyername,
        Lawyeremail: req.body.Lawyeremail,
        LawyerAdress: req.body.LawyerAdress,
        Lawyermobile: req.body.Lawyermobile,
        date: req.body.date,
        time: req.body.time,
        descripton: req.body.descripton,
        
    })

    const result = await Order.save()
    res.send(result)
})
router.post('/getmyorder',async (req, res) => {
   
    let payload = {
        userid: Types.ObjectId(req.body.userid)
        
    }
    console.log(payload)
    const order = await Order.find(payload)
    console.log(order)
    res.send(order)
})

module.exports = router;