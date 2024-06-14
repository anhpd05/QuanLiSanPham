// Cập nhật lại số lượng giỏ hàng 
const inputsQuantity = document.querySelectorAll("input[name='quantity']")
if(inputsQuantity.length > 0 ) {
    inputsQuantity.forEach( input => {
        input.addEventListener("change" , (e) => {
            console.log(e.target.value);
            const quantity = parseInt(e.target.value) ;
            const productId = input.getAttribute("product-id");

            if(quantity > 0) {
                window.location.href = `/cart/update/${productId}/${quantity}`;
            }
            
        })
    })
}

// Hết Cập nhật lại số lượng giỏ hàng 