$(document).ready(function () {
    $("#profilecard").hide();

    searchUser = () => {

        $.ajax({
            url: "http://localhost:3000/searchUser",
            method: "POST",
            data: {
                username: document.getElementById('email').value
            },
            success: (result) => {
                if (result === null) {
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

