const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
const isEmailValid = async (email) => {
    if (!email)
        return false;

    if(email.length>254)
        return false;

    var valid = emailRegex.test(email);
    if(!valid)
        return false;

    // Further checking of some things regex can't handle
    var parts = email.split("@");
    if(parts[0].length>64)
        return false;

    var domainParts = parts[1].split(".");
    if(domainParts.some(function(part) { return part.length>63; }))
        return false;

    return true;
}

let passwordGenerator = async () => {
    let once = false;
    let newPassword = Math.random().toString(36).substr(2, 10).split('').map((char) => {
        if (!Number(char) && !once) {
            once = true;
            return char.toUpperCase();
        }
        return char;
    }).join('');
    return newPassword
}

module.exports = {
    passwordGenerator,
    isEmailValid,
}