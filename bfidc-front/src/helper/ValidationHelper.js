import cogoToast from "cogo-toast";
let EmailRegx = /\S+@\S+\.\S+/;
let MobileRegx = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;
let SpecialCharacterRegex  = /[^A-Za-z0-9]$/;
let ValidLengthRegex = /^.{5,16}$/;
let NonWhiteSpaceRegex = /^\S*$/;



class ValidationHelper {


    IsEmpty(value){
        if(value.length===0){
            return true;
        }
    }

    IsMobile(value){
        if(!MobileRegx.test(value) === true){
           return true;
        }
    }

    IsEmail(value){
        if(!EmailRegx.test(value) === true){
            return true;
        }
    }

    IsSpecialCharacter(value){
        if(!SpecialCharacterRegex.test(value) === true){
            return true; //"password should contain atleast one number and one special character");
        }
    }


    IsValidLength(value){
        if(!ValidLengthRegex.test(value) === true) {
            return true; //"Password must be 10-16 Characters Long.";
        }
    }


    IsNonWhiteSpace(value){

        if (!NonWhiteSpaceRegex.test(value)===true) {
            return true;  //"Password must not contain Whitespaces.";
        }

    }



    ErrorToast(msg) {
        cogoToast.error(msg, { position: "top-center" });
    }
    SuccessToast(msg) {
        cogoToast.success(msg, { position: "top-center" });
    }

    getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }


    PasswordShowHide(password,showIcon,hideIcon){

        if(password.type==="password"){
            password.type="text";
            showIcon.classList.remove('ShowBtnActive');
            hideIcon.classList.add('ShowBtnActive');
        }else{
            password.type="password";
            showIcon.classList.add('ShowBtnActive');
            hideIcon.classList.remove('ShowBtnActive');
        }
    }




    NewPasswordShowHide(password,confirmPassword,showIcon,hideIcon){

        if(password.type==="password"){
            password.type="text";
            confirmPassword.type="text";
            showIcon.classList.remove('ShowBtnActive');
            hideIcon.classList.add('ShowBtnActive');
        }else{
            password.type="password";
            confirmPassword.type="password";
            showIcon.classList.add('ShowBtnActive');
            hideIcon.classList.remove('ShowBtnActive');
        }
    }




}

export const {
    IsEmpty,
    IsMobile,
    IsEmail,
    ErrorToast,
    SuccessToast,
    IsSpecialCharacter,
    IsValidLength,
    IsNonWhiteSpace,
    PasswordShowHide,
    NewPasswordShowHide,
    getBase64

} = new ValidationHelper();