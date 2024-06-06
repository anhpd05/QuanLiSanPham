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

// Delete item
const buttonDeleteItem = document.querySelectorAll("[button-delete]");
const formDeleteItem = document.querySelector("#form-delete-item");
if (buttonDeleteItem.length > 0) {
  var path = formDeleteItem.getAttribute("data-path")
  buttonDeleteItem.forEach(button => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Bạn chắc chắn muốn xoá chứ?");

      if (isConfirm) {
        const id = button.getAttribute("data-id");
        const action = `${path}/${id}?_method=DELETE`;
        formDeleteItem.action = action;

        formDeleteItem.submit();
        console.log(formDeleteItem.action );
      }
    })
  })
}
// End Delete item

// PreView Images
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage) {
    const uploadImageInput =  document.querySelector("[upload-image-input]");
    const uploadImagePreview =  document.querySelector("[upload-image-preview]");
    uploadImageInput.addEventListener("change", e => {
        console.log(e);
        const file = e.target.files[0];
        if(file) {
            uploadImagePreview.src = URL.createObjectURL(file)
        }
        const imageClose = document.querySelector(".image-close")
        console.log(imageClose)
        imageClose.addEventListener("click" , () => {
            uploadImagePreview.src ="";
            uploadImageInput.value="";
            // console.log(uploadImagePreview.src)

        })
    });
}
// End PreView Images


// Sort ( Sắp xếp theo tiêu chí)
const sort = document.querySelector("[sort]");
if(sort){
    let url = new URL(window.location.href);

    const clearButton = document.querySelector("[sort-clear]")
    const sortSelect = sort.querySelector("[sort-select]");
    sortSelect.addEventListener("change" , (e) => {
        
        const value = e.target.value.split("-");
        let [sortKey, sortValue] = value;
        // console.log(sortKey);
        url.searchParams.set("sortKey",sortKey);
        url.searchParams.set("sortValue",sortValue);

        window.location.href = url.href;

    })

    // Xoá Sắp xếp 
    clearButton.addEventListener("click" , () => {
        let url = new URL(window.location.href);
        url.searchParams.delete("sortKey");
        url.searchParams.delete("sortValue");
    // End Xóa sắp xếp 

        window.location.href = url.href;
    })

    const sortKey = url.searchParams.get("sortKey");
    const sortValue = url.searchParams.get("sortValue");
    if(sortKey && sortValue) {
        const stringSort = `${sortKey}-${sortValue}`;
        const optionSelect = sortSelect.querySelector(`option[value='${stringSort}']`);
        optionSelect.selected = true;
    }
}
// End Sort