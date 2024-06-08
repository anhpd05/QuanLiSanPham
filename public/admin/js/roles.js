// const { json } = require("body-parser");

// Deleted button
const buttonDeleteRole = document.querySelectorAll("button[button-delete]");
const formDeleteRole = document.querySelector("#form-delete-role");
if (buttonDeleteRole.length > 0) {
  buttonDeleteRole.forEach(button => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Bạn chắc chắn muốn xoá chứ?");
      if (isConfirm) {
        const id = button.getAttribute("data-id");
        const path = formDeleteRole.getAttribute("data-path");
        const action = `${path}/${id}?_method=DELETE`;

        formDeleteRole.action = action;
        formDeleteRole.submit();
      }
    })
  })
}
// End deleted button

// Permission
const tablePermission = document.querySelector("[table-permission]");

if(tablePermission){
  const buttonSubmit = document.querySelector("[button-submit]");

  buttonSubmit.addEventListener("click" , () => {
    let permission = [] ;
    const rows = document.querySelectorAll("[data-name]");
    // console.log(rows);

    rows.forEach( row => {

      const name = row.getAttribute("data-name");
      const inputs = row.querySelectorAll("input");
      // console.log(name);
      // console.log(inputs);
      // console.log("-------------");

      if(name == "id"){
        inputs.forEach( input => {
          const id = input.value;
        console.log(id);
        permission.push({
          id : id ,
          permission : []
        })
        })
        
      }else {
        inputs.forEach( (input,index) => {
          const checked = input.checked;
          // console.log(name);
          // console.log(checked);
          // console.log(index);
          // console.log("-------");
          if(checked) {
            permission[index].permission.push(name);
          }

        })
      }


    })
    console.log(permission);
    if(permission.length > 0) {
      const formChangePermissions = document.querySelector("#form-change-permissions");
      const input = formChangePermissions.querySelector("input[name='permissions']");
      input.value = JSON.stringify(permission);
      formChangePermissions.submit();
    }
  })
}

// End Permission 

//Permission Data Default
const dataRecords = document.querySelector("[data-records]");
if(dataRecords) {
  const records = JSON.parse(dataRecords.getAttribute("data-records"));
  records.forEach( ( records , index) => {
    const permissions = records.permissions ;
    console.log(index);
    // console.log(permissions);
    permissions.forEach(permission => {
      const row = document.querySelector(`[data-name=${permission}]`);
      const input = row.querySelectorAll("input")[index];

      input.checked = true;
      console.log(permissions);
      console.log(row);
      console.log(input);
      // console.log(index);
      console.log("--------");
    })
  })
  // console.log(records)
 
}

// End Permission Data  Default