import Strings from "../assets/Strings"

export function emailValidator(email: string) : string {
    if(!email) return ''

    const emailFormat = /\S+@\S+\.\S+/
    if (!emailFormat.test(email)) return Strings.invalidUserName;

    return ''
}

export function nameValidator(name: string) : string{
    if(!name) return ''
    const nameFormat = RegExp("^([a-zA-Z]+[,.]?[ ]?|[a-zA-Z]+['-]?)+$")
    if(!nameFormat.test(name)) return Strings.invalidName;
    return ''
}

export function passWordValidator(password: string) : string{
    if(!password) return ''

    if(!RegExp('[A-Z]').test(password)) return Strings.invalidPasswordUpperCase
    if(!RegExp('[a-z]').test(password)) return Strings.invalidPasswordLowerCase
    if(!RegExp('[0-9]').test(password)) return Strings.invalidPasswordNumber
    if(password.length < 8) return Strings.invalidPasswordCount
    return ''
}

export function checkPassword(password: string, confirmPassword: string) : string{
    if(!confirmPassword) return ''
    if(password !== confirmPassword) return Strings.confirmPasswordError
     return ''
}