allUsers = () => {

    $.ajax({
        url: "http://localhost:3000/alluser",
        method: "POST",
        data: {
            userToken : localStorage.getItem('token'),
        },
        success: (result) => {

            if(result.success) {
                
            for (append = 0; append < result.users.length; append++) {
            
                let newRow = document.createElement("TR");
                newRow.setAttribute("id", "listtr" + append);
                document.getElementById("listtable").appendChild(newRow);

                let srnoColumn = document.createElement("TD");
                let srText = document.createTextNode(append + 1);
                srnoColumn.appendChild(srText);
                document.getElementById("listtr" + append).appendChild(srnoColumn);

                let fnameColumn = document.createElement("TD");
                let fnameColumnText = document.createTextNode(result.users[append].firstname);
                fnameColumn.appendChild(fnameColumnText);
                document.getElementById("listtr" + append).appendChild(fnameColumn);

                let lnameColumn = document.createElement("TD");
                let lnameColumnText = document.createTextNode(result.users[append].lastname);
                lnameColumn.appendChild(lnameColumnText);
                document.getElementById("listtr" + append).appendChild(lnameColumn);

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