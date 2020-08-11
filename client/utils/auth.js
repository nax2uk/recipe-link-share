import cookie from 'js-cookie';
import Router from 'next/router';

// set in cookie
export const setCookie = (key, value) => {
    if (process.browser) {  // if we are in the client-side
        cookie.set(key, value, {
            expires: 1,
        })

    }
}
// remove from cookie
export const removeCookie = (key, value) => {
    if (process.browser) {
        cookie.remove(key);
    }
}

// get from cookie such as stored token
// useful when we need to make request to server with auth token
export const getCookie = (key, req) => {
    return process.browser ? getCookieFromBrowser(key) : getCookieFromServer(key, req)

}

const getCookieFromBrowser = (key) => cookie.get(key);

const getCookieFromServer = (key, req) => {
    if (!req.headers.cookie) {
        return undefined;
    }
    let token = req.headers.cookie.split(';').find(c => c.trim().startsWith(`${key}=`));
    if (!token) return undefined;
    let tokenValue = token.split('=')[1];
    console.log('getCookieFromServer', tokenValue);
    return tokenValue;
}

// set in local storage
export const setLocalStorage = (key, value) => {
    if (process.browser) {
        localStorage.setItem(key, JSON.stringify(value));
    }
}
// remove from local storage
export const removeLocalStorage = (key) => {
    if (process.browser) {
        localStorage.removeItem(key);
    }
}
// authenticate user by passin data to cookie and local storage during
// sign in

export const authenticate = (response, next) => {
    setCookie('token', response.data.token);
    setLocalStorage('user', response.data.user);
    next();
}

// access user info from localStorage
export const isAuthenticated = () => {
    if (process.browser) {
        const hasCookie = getCookie('token');
        if (hasCookie) {
            const user = localStorage.getItem('user');
            if (user)
                return JSON.parse(user);
            else
                return false;
        }
    }
}

// signout
export const logout = () => {
    removeCookie('token');
    removeLocalStorage('user');
    Router.push('../login');
}