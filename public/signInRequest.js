
signIn = (event) => {

    event.preventDefault();
    var username= $('#email').val();
    var password = $('#pwd').val();
    $.ajax({
        url: "http://localhost:3000/signin",
        method: "POST",
        data: {
            username: username,
            password: password
        },
        success: (result) => {
            if (result.status === 'ok') {
                localStorage.setItem("token", result.data);
                window.location.replace('/home');
               
            }
            else if(result.error === 'Fill All Details'){
                alert("All Fields Are Compulsory");
            }
            else {
                alert("Authentication Failed");
            }
        },
    });
}