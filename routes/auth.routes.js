const {Router} = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const config = require('config')

const router = Router()

router.post(
  '/register',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 6 символов').isLength({min: 6})
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные'
        })
      }

      const {email, password} = req.body

      const candidate = await User.findOne({email})

      if (candidate) {
        return res.status(400).json({message: 'Такой пользователь уже существует'})
      }

      const hashPassword = await bcrypt.hash(password, 5)

      const user = new User({email, password: hashPassword})

      await user.save()

      res.status(201).json({message: 'Пользователь создан'})

    } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так. Попробуйте снова'})
    }
  })

router.post(
  '/login',
  [
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные'
        })
      }

      const {email, password} = req.body

      const user = await User.findOne({email})

      if (!user) {
        return res.status(400).json({message: 'Пользователь не найден'})
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({message: 'Неверные данные'})
      }

      const token = jwt.sign(
        {userId: user.id},
        config.get('jwtSecretKey'),
        {expiresIn: '1h'}
      )

      res.json({token, userId: user.id})
    } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так. Попробуйте снова'})
    }
  }
)

module.exports = router