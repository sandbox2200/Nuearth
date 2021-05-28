let userData = {}

// Stores key and value into userData
updateForm = (name, data) => {
    userData[name] = data;
}

verifyData = () => {
    let nameLength = userData["fullName"].length;
    let contactNumber = userData["contactNumber"].length;
    let emailLength = userData["emailLength"].length;
    let messageLength = userData["messageLength"].length;

    let dataTypes = [];

    if (nameLength >= 5 && contactNumber == 10 && emailLength >= 9 && messageLength >= 15) {
        if (typeof(userData["contactNumber"]) == "string") {
            dataTypes.push(true);
        }
        else {
            alert("Please enter a proper name in the name section.")
        }


        if (typeof(userData["contactNumber"]) == "number") {
            dataTypes.push(true);
        }
        else {
            alert("Please enter a mobile number in the contact section.")
        }
    }
    else {
        alert("Sorry one or more of the text fields was not entered correctly or too little info was given. Please try again,");
    }


}

sendToDb = () => {
    // POST request sends data parsed in body to api which interacts with the MongoDB database.
    fetch('https://nuearth-api.herokuapp.com/api/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
    .then((response) => response.json())
    
    // If error occurs then it'll be recorded
    .catch((error) => {
        console.error('Error:', error);
    });
}

// Submits the eecaptcha
submitUserForm = () => {
    /* 
        After user submits the form gets response from google API and passes either a
        true or false value.
    */
    let response = grecaptcha.getResponse();
    
    if (response.length == 0) {
        document.getElementById('g-recaptcha-error').innerHTML = '<span style="color:red;">This field is required.</span>';
        return false;
    }
    
    // If the user passes the test then it'll call function senToDb
    sendToDb();
    alert("Message sent")
    return true;
}

verifyCaptcha = () => {
    document.getElementById('g-recaptcha-error').innerHTML = '';
}