var isFirstNameValid = (firstName) => {
    if(typeof firstName != "string") return false;
    if(firstName.length == 0) return false;
    for(c of firstName) {
        if(" ~!@#$%^&*()_+=-0987654321<,>.?/:;'{[}]|\\".includes(c)) return false;
    }
    return true;
}

var isLastNameValid = (lastName) => {
    if(typeof lastName != "string") return false;
    if(lastName.length == 0) return false;
    for(c of lastName) {
        if(" ~!@#$%^&*()_+=-0987654321<,>.?/:;'{[}]|\\".includes(c)) return false;
    }
    return true;
}

var isEmailValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

var isPhoneNumberValid = (phoneNumber) => {
    if(typeof phoneNumber != "string") return false;
    if(phoneNumber.length == 0) return false;
    for(c of phoneNumber) {
        if(!"1234567890+()-".includes(c)) return false;
    }
    return true;
}

module.exports = {
    isFirstNameValid,
    isLastNameValid,
    isEmailValid,
    isPhoneNumberValid
}