const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
  let token = req.headers.authorization;
    console.log(token)
  if(typeof token === 'string'){
    token = token.split(' ')[1]
  }

  if(!token) {
      return res.status(403).json({error:'Permission denied'});
  }

  /** 토큰 디코딩 */
  const checkToken = new Promise(
      (res, rej) => {
          jwt.verify(token, req.app.get('jwt-secret'), (err, decodedToken) => {
              console.log(decodedToken)
              if(err) rej(err)
              res(decodedToken)
          })
      }
  )

  /** 인증 실패 */
  const onError = (error) => {
      res.status(403).json({
          error: error.message
      })
  }

  /** 인증 절차 실행 */
  checkToken
    .then((decodedToken)=>{
      req.decodedToken = decodedToken
      req.userid = decodedToken.sub
      next()
    })
    .catch(onError)
}

module.exports = authMiddleware