const fullName = document.getElementById("full-name");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const registerButton = document.getElementById("register-button");


registerButton.addEventListener("click", async () => {

    try {
        const response = await fetch(urlMaker("/auth/register"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fullName: fullName.value,
                username: username.value,
                email: email.value,
                password: password.value
            })
        });
    
        const data = await response.json();

        console.log(data);
    
        if(response.status == 201 && data.message == "User created") {
            location.assign("/frontend/index.html");
        }
    } catch (error) {
        console.log(error);
        alert("An error occurred");
    }

    

});
