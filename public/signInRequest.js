
signIn = (event) => {
    event.preventDefault();
    var username= $('#email').val();
    var password = $('#pwd').val();

    if(username.length<1 && password.length<1 )    {
        
    confirm("all fields are compulsory");
    }
    else {
        
    $.ajax({
        url: "http://localhost:3000/signin",
        method: "POST",
        data: {

            username: username,
            password: password
        },
        success: (result) => {

            console.log(result);

            if (result.status === 'ok') {
                localStorage.setItem("token", result.data);
                localStorage.setItem("username", username);
                    window.location.replace('/home');
        
            }
            else {
                alert("Authentication Failed");
            }
        },

    });
    }


}