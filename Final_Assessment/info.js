function showErrors(messages) {
    document.querySelector('#errors').innerHTML = messages;
}

function clearErrors() {
    document.querySelector('#errors').innerHTML = " ";
}

function validatePassword(password1, password2) {

    let errors = [];

    let numFlag = false;
    let upperFlag = false;

    for(let i = 0; i < password1.length ; i++) {
        if(!isNaN(password1[i])) {
            if(i == 0) {
                let message = "Password must start with an alphabet."
                errors.push(message);
            }

            numFlag = true;
        }

        if(password1.charCodeAt(i) >= 65 && password1.charCodeAt(i) <= 90) 
            upperFlag = true;

    }

    if(!numFlag) {
        let message = "Password must contain at least one digit.";
        errors.push(message);
    }

    if(!upperFlag) {
        let message = "Password must contain at least one capital letter.";
        errors.push(message);
    }

    if(password1 != password2) {
        let message = "Passwords must match.";
        errors.push(message);
    }

    return errors;
}

function radioBtnValidator() {    
    var radio_num = document.signup.education_status.length;
    var oneChecked = false;

    for (var i = 0; i < radio_num; i++) {
        if (document.signup.education_status[i].checked == true) { 
            oneChecked = true;
        } 
    } 

    if (!oneChecked) {
        let messages = "No education status has been selected.";
        return [messages]; // List of one message
    }
} 

function validateUsername (userName) {

    let errors = [];

    // let userName = document.querySelector('username').value; 
    let ascii_value = userName.charCodeAt(0);

    if(!((ascii_value >= 65 && ascii_value <= 90) || (ascii_value >= 97 && ascii_value <= 122))) {
        let message = "Username must start with an alphabet.";
        errors.push(message);
    }

    if(userName.length < 6) {
        let message = "Username must contain at least 6 character.";
        errors.push(message);
    }
    // return (((ascii_value >= 65 && ascii_value <= 90) || (ascii_value >= 97 && ascii_value <= 122)) && usernameLength);

    return errors;
}


function educationLevelValidator(index){
    if(index == 0) {
        let message = "You must select an education level.";
        return [message];
    }
}

function finalValidator() {
    let errors_to_display = [];

    // Username
    let userName = document.querySelector('#username').value;
    // if return is not undefined means there is a error message returned 
    let userValidate = validateUsername(userName);
    if(userValidate != undefined && userValidate != undefined && userValidate.length > 0) {
        //SHOW THE MESSAGE
        errors_to_display = errors_to_display.concat(userValidate);
    }

    // Password
    let password1 = document.querySelector('#password1').value;
    let password2 = document.querySelector('#password2').value;

    let passwordValidate = validatePassword(password1, password2);

    if(passwordValidate != undefined && passwordValidate.length > 0) {

        errors_to_display = errors_to_display.concat(passwordValidate);
    }

    // Education Status
    let validateRadio = radioBtnValidator();

    if(validateRadio != undefined && validateRadio.length > 0) {
        errors_to_display = errors_to_display.concat(validateRadio);
    }

    // Education Level
    let levelIndex = document.signup.education_level.selectedIndex;

    validateEduLevel = educationLevelValidator(levelIndex);
    if(validateEduLevel != undefined &&  validateEduLevel.length > 0) {
        errors_to_display = errors_to_display.concat(validateEduLevel);
    }


    // Displaying
    let htmlErrorElement = "<ul>";
    if(errors_to_display.length > 0) {


        for(let i = 0; i < errors_to_display.length; i++) {
            if(i >= 5){
                break;
            }
            
            htmlErrorElement += "<li>" + errors_to_display[i] + "</li>";


        }


        htmlErrorElement += "</ul>"

        showErrors(htmlErrorElement);
        return false;
    }


    alert("Success!");
    return true;
}
