const crypto = require('crypto')
const { resolve } = require('path')
const cryptoConfig = require('../configs/crypto.config')

module.exports.getSalt = () => {
  return new Promise((res, rej) => {
    crypto.randomBytes(64, (err, buf) => {
      if(!err) {
        res(buf.toString('base64'))
      } else {
        rej(err)
      }
    })
  })
};

module.exports.getKey = async(password, salt) => {
  return new Promise((res, rej) => {
    crypto.pbkdf2(
      password,
      salt,
      cryptoConfig.count,
      cryptoConfig.length,
      cryptoConfig.digest,
      (err, derivedKey) => {
        if(!err) {
          const encodedPassword = derivedKey.toString('base64')
          res(encodedPassword)
        } else {
          rej(err)
        }
      }
    )
  })
}