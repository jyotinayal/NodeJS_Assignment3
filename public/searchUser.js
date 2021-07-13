$(document).ready(function () {
    $("#profilecard").hide();

    searchUser = () => {

        $.ajax({
            url: "http://localhost:3000/searchUser",
            method: "POST",
            data: {
                username: document.getElementById('email').value,
                userToken: localStorage.getItem('token')
            },
            success: (result) => {
                if( result.error === 'Not authorized user')
                {
                    window.location.replace('/signIn');
                }
                else if (result === null) {
                    alert("User Not Found");
                }

                else {
                    $('#profilecard').slideToggle();
                    document.getElementById('fname').innerHTML = result.firstname + " " + result.lastname;
                    document.getElementById('emailtext').innerHTML = result.username;


                }
            },

        });

    }






});

