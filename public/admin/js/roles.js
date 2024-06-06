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