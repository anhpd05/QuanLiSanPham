// console.log("ok2")
const buttonsStatus = document.querySelectorAll("[button-status]");

if(buttonsStatus.length > 0) {
    let url = new URL(window.location.href);
    // console.log(url);
    buttonsStatus.forEach(button => {
        button.addEventListener("click" , () => {
            const status = button.getAttribute("button-status") 
            // console.log(status);//in ra là :  acive ,inactive 
            
            if(status) {
                url.searchParams.set("status" , status)
            }else{
                url.searchParams.delete("status")
            }
            // console.log(url.href); // ktra xem có url para đc thay đổi chưa 
            window.location.href = url.href // chuyển hướng trang sang active,ina 
        })
    })
}