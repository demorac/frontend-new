const signupValidation=(name:string, value:string)=>{
    switch (name) {
            case "name":
                if(value.length===0)return "Name is Requried.";
                return"";
            case "email":
                    if(value.length===0)return "Email is Requried.";
                    if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))return "Email is Invalid"
                    return""; 
             case "password":
                     if(value.length===0)return "Password is Requried.";
                     if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(value))return "Password must 8-15 character with an atleast one Uppercase, Lowercase, Number and Special Character"
                     return"";           
            default:
                return "";         
    }
}
const loginValidation=(name:string, value:string)=>{
    switch (name) {
            case "email":
                    if(value.length===0)return "Email is Requried.";
                    return""; 
             case "password":
                     if(value.length===0)return "Password is Requried.";
                     return"";           
            default:
                return "";         
    }
}
export {signupValidation, loginValidation};