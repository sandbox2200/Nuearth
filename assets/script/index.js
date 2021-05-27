let userData = {}

updateForm = (name, data) => {
    userData[name] = data;
}

sendToDb = () => {
    // POST request with body equal on data in JSON format
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