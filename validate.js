function cookieParser(cookie){
    const cookiePrams = cookie.split(';').map((e)=> e.trim().split('='))
    return Object.fromEntries(cookiePrams);
}
function isValid(text) {
    if (text.length<0) {
        return false
    }

    if(!(cookieParser(document.cookie)["svg_captcha_text"])){
        alert("svg_captcha_text cookie not found")
        return false
    }

    return cookieParser(document.cookie)["svg_captcha_text"] === md5(text)
}