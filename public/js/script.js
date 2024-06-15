// Show Alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
    const alertClose = showAlert.querySelector("[alert-close]");
    const time = parseInt(showAlert.getAttribute("data-time"));
    setTimeout(() => {
        showAlert.classList.add("alert-hidden");
    }, time);
if (alertClose) {
    alertClose.addEventListener("click", () => {
        showAlert.classList.add("alert-hidden");
    })
    }
}
// End Show Alert

// Page ( Phân Trang)
const buttonsPagination = document.querySelectorAll("[button-pagination]");

if(buttonsPagination) {
    let url = new URL(window.location.href)

    buttonsPagination.forEach( button => {
        button.addEventListener("click" , () => {
            const page = button.getAttribute("button-pagination");
            console.log(page);

            url.searchParams.set("page" ,page);

            window.location.href = url.href;
        });
      
    });
}

// End Page (Phân Trang)