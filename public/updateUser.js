var userObject ;
getUser = () => {
    document.getElementById('userName').innerHTML = localStorage.getItem("username");
}

updateUser = () => {
    
    var userName = document.getElementById("userName").innerHTML;
           
            var firstName = document.getElementById("firstName").value;
            var lastName = document.getElementById("lastName").value;
            var token = localStorage.getItem("token");
            $.ajax({
                url: "http://localhost:3000/updateuser",
                method: "PUT",
                data: {
                    userName: userName,
                    firstName: firstName,
                    lastName: lastName
                },
                success: function (result) {
                    if(result.success) {
                        alert("Successfully Updated");
                        window.location.replace('/alluser');
                    }
                    else {
                        alert("Error occured");
                    }
                }
            })
 
}