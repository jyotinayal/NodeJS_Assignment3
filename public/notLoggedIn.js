notLoggedIn = () => {

    $.ajax({
        url: "http://localhost:3000/notLoggedIn",
        method: "POST",
        data: {
            userToken : localStorage.getItem('token'),
        },
        success: (result) => {

            if( result.error === 'Not authorized user')
                {
                    window.location.replace('/signIn');
                }
            else if(result.success) {
                
            for (append = 0; append < result.users.length; append++) {
            
                let newRow = document.createElement("TR");
                newRow.setAttribute("id", "listtr" + append);
                document.getElementById("listtable").appendChild(newRow);

                let srnoColumn = document.createElement("TD");
                let srText = document.createTextNode(append + 1);
                srnoColumn.appendChild(srText);
                document.getElementById("listtr" + append).appendChild(srnoColumn);

                let emailColumn = document.createElement("TD");
                let emailColumnText = document.createTextNode(result.users[append].username);
                emailColumn.appendChild(emailColumnText);
                document.getElementById("listtr" + append).appendChild(emailColumn);

            }
        }

        else {
            alert("Something is Wrong")
        }
          
        },

    });

}