// Change status
const buttonsChangeStatus = document.querySelectorAll("[button-change-status]");

if(buttonsChangeStatus.length > 0 ) {
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path");

    buttonsChangeStatus.forEach( button => {
        button.addEventListener("click" , () => {
            
            const statusCurrent = button.getAttribute("data-status");
            const id = button.getAttribute("data-id");
            
            // console.log(id)  
            let statusChange =  statusCurrent == "active" ? "inactive" : "active"
            // console.log(statusChange)

            let action = path + `/${statusChange}/${id}?_method=PATCH` 
            console.log(action)  
            
            formChangeStatus.action = action ;
            formChangeStatus.submit(); // để thay nút gửi 
        })
    })
}


// End change status