class SessionHelper{
    setToken(token){
        localStorage.setItem("token",token)
    }
    getToken(){
        return localStorage.getItem("token")
    }
    setUserDetails(UserDetails){
        localStorage.setItem("UserDetails",JSON.stringify(UserDetails))
    }
    getUserDetails(){
        return JSON.parse(localStorage.getItem("UserDetails"))
    }
    setEmail(Email){
        localStorage.setItem("Email",Email)
    }
    getEmail(){
        return localStorage.getItem("Email")
    }
    setOTP(OTP){
        localStorage.setItem("OTP",OTP)
    }
    getOTP(){
        return localStorage.getItem("OTP")
    }


    setRegEmail(MyEmail){
        localStorage.setItem("regEmail", MyEmail);
    }

    getRegEmail(){
        return localStorage.getItem("regEmail");
    }


    setFirstName(fName){
        localStorage.setItem("FirstName", fName);
    }

    getFirstName(){
        return localStorage.getItem("FirstName");
    }



    setLastName(lName){
        localStorage.setItem("LastName", lName);
    }

    getLastName(){
        return localStorage.getItem("LastName");
    }



    setMobile(mobile){
        localStorage.setItem("Mobile", mobile);
    }

    getMobile(){
        return localStorage.getItem("Mobile");
    }


    setPassword(password){
        localStorage.setItem("Password", password);
    }

    getPassword(){
        return localStorage.getItem("Password");
    }


    setPhoto(photo){
        localStorage.setItem("Photo", photo);
    }

    getPhoto(){
        return localStorage.getItem("Photo");
    }



    removeSessions=()=>{
        localStorage.clear();
        window.location.href="/"
    }




}
export const {setEmail,getEmail,setOTP,getOTP,setToken,getToken,setUserDetails,getUserDetails,setRegEmail, getRegEmail, setFirstName, getFirstName, setLastName, getLastName, setMobile, getMobile, setPassword, getPassword, setPhoto, getPhoto, removeSessions}=new SessionHelper();