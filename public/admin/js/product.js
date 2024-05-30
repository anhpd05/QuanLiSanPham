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


// Checkbox multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
// console.log(checkboxMulti);
if(checkboxMulti) {

    const inputCheckAll = document.querySelector("input[name='checkall']");
    const inputsID = document.querySelectorAll("input[name='id']");
    // console.log(inputCheckAll);
    // console.log(inputsID);  

    inputCheckAll.addEventListener("click" , () => {
        const check = inputCheckAll.checked;
        // console.log(check);
        if(check){
            inputsID.forEach((item) => {
                item.checked = true;
            })
        }else {
            inputsID.forEach((item) => {
                item.checked = false;
            })
        }

    })

    inputsID.forEach((input) => {
        input.addEventListener("click" , () => {
            const countcheck = (document.querySelectorAll("input[name='id']:checked")).length
            // console.log(countcheck);

            if(countcheck == inputsID.length){
                inputCheckAll.checked = true;
            }else {
                inputCheckAll.checked = false;
            }

        })
    })
}
// End Checkbox multi


// Form Change Multi

const fromChangeMulti = document.querySelector("[form-change-multi]");
if (fromChangeMulti) {
    fromChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault();
        // const checkboxMuli = document.querySelector("[checkbox-multi]");
        const inputsChecked = document.querySelectorAll("input[name='id']:checked");

    if (inputsChecked.length > 0) {
        let ids = [];
        const inputsId = fromChangeMulti.querySelector("input[name='ids']");
        inputsChecked.forEach(input => {
            const id = input.value;
            ids.push(id);
        })
        inputsId.value = ids.join(", ");

        fromChangeMulti.submit();
    } else {
        alert("Vui lòng chọn 1 bản ghi!");
    }
  })
}

// EndForm Change Multis