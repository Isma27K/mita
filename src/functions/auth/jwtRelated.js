


// check if the jwt token is expired (expire = true || not expire = false)
export function isJwtExpired(token) {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        // Get current time in seconds since epoch
        // console.log(payload.exp < currentTime);
        // console.log(payload.exp)
        // console.log(currentTime);
        return payload.exp < currentTime;
    } catch (e) {
        console.error('Invalid token', e);
        return true;
        // If token is invalid, consider it expired
    }
}