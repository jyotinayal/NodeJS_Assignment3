
signUp = (event) => {
    event.preventDefault();
    var username = $('#email').val();
    var firstname = $('#fname').val();
    var lastname = $('#lname').val();
    var password = $('#pwd').val();
   
    $.ajax({
        url: "http://localhost:3000/signup",
        method: "POST",
        data: {
            firstname: firstname,
            lastname: lastname,
            username : username,
            password: password
        },
   success:(result) => {
       if(result.status === 'ok') {
           alert("Succesfully Registered");
           window.location.replace('/signin');
       }
        else {
            alert("Please fill all the details carefully");
            window.location.replace('/signup');            
        }
   }      
    });
   
}