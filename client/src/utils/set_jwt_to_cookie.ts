import Cookies from 'js-cookie'

function setJwtToCookie(userId : string, token : string, expiresIn : number) {
    Cookies.set('userId', userId, {expires : expiresIn})
    Cookies.set('token', token, {expires : expiresIn})
}

export default setJwtToCookie