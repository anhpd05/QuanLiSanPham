// Button Status

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
            window.location.href = url.href // chuyển hướng trang sang active,ina 
        })
    })
}
// End Status

// 16.1.4 : Phần tìm kiếm 
// Search
const formSearch = document.querySelector("#form-search");
if(formSearch){
    let url = new URL (window.location.href);
    formSearch.addEventListener("submit" , (a) => {
        a.preventDefault();
        console.log(a.target.elements.keyword.value);
        const keyword = a.target.elements.keyword.value ;
        if(keyword) {
            url.searchParams.set("keyword" , keyword)
        }else{
            url.searchParams.delete("keyword")
        }
        window.location.href = url.href
    
    })
}
// End Search


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