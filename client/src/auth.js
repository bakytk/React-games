
/* globals localStorage */
import { OktaAuth } from '@okta/okta-auth-js'

const authClient = new OktaAuth({
	url: 'https://dev-753153.okta.com',
  issuer: 'https://dev-753153.okta.com/oauth2/default'
})

export default {

  login (email, pass, cb) {
    cb = arguments[arguments.length - 1]
    if (localStorage.token) {
      if (cb) cb(true)
      this.onChange(true)
      return
    }
    return authClient.signIn({
      username: email,
      password: pass
    }).then(response => {
	  localStorage.sessionToken = response.sessionToken
      if (response.status === 'SUCCESS') {
        return authClient.token.getWithoutPrompt({
          clientId: '0oa2dio0p3fEE7XOY4x7',
          responseType: ['id_token', 'token'],
          scopes: ['openid', 'email', 'profile'],
          sessionToken: response.sessionToken,
          redirectUri: window.location.origin + '/dashboard'
        }).then(data => {
          localStorage.token = data.tokens.accessToken.accessToken
          localStorage.idToken = data.tokens.idToken.idToken
          if (cb) cb(true)
          this.onChange(true)
        })
      }
    }).fail(err => {
      console.error(err.message)
      if (cb) cb(false)
      this.onChange(false)
    })
  },

  getToken () {
    return localStorage.token
  },

  getName () {
    const claims = this.parseJwt(window.localStorage.idToken)
    console.jwt(window.localStorage.idToken)
    return claims['name']
  },

  parseJwt (token) {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace('-', '+').replace('_', '/')
    return JSON.parse(window.atob(base64))
  },

  logout (cb) {
    delete localStorage.token
    delete localStorage.idToken
    delete localStorage.sessionToken
    if (cb) cb()
    this.onChange(false)
    return authClient.signOut()
  },

  loggedIn () {
    return !!localStorage.token
  },

  onChange () {
  }
}
