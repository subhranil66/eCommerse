var viewProduct = document.getElementById('viewProduct');

viewProduct.addEventListener("click", function(){
    window.open('http://127.0.0.1:8000/viewProduct', '_self');
});


document.addEventListener("click", function(e){
    if(e.target.classList.contains("addProduct")){
        swal({
            title: "Weldone!",
            text: "Product has been added!",
            icon: "success",
          });
    }
});
