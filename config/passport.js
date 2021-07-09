const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

module.exports = app => {
  // 初始化 passport
  app.use(passport.initialize())
  app.use(passport.session())

  // 套用passport認證策略模組
  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, { message: '這個 Email 還沒註冊!' })
        }
        if (user.password !== password) {
          return done(null, false, { message: 'Email 或 密碼輸入錯誤!' })
        }
        return done(null, user)
      })
      .catch(err => done(err, false))
  }))

  // 序列化與反序列化
  passport.serializeUser(function (user, done) {
    done(null, user.id)
  })
  passport.deserializeUser(function (id, done) {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}