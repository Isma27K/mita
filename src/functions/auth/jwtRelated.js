export function isJwtExpired(token) {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        // Get current time in seconds since epoch
        return payload.exp < currentTime;
    } catch (e) {
        console.error('Invalid token', e);
        return true;
        // If token is invalid, consider it expired
    }
}