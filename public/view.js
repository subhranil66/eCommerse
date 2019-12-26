// var editProduct = document.querySelector('.btn btn-primary');
// var val =document.getElementById('editProduct').value;
// var editProduct = document.querySelector('#editProduct');

// editProduct.addEventListener("click", function(){
//     window.open('http://127.0.0.1:8000/editProduct', '_self');
// });

// var addProduct = document.getElementById('addProduct');

// addProduct.addEventListener("click", function(){
//     window.open('http://127.0.0.1:8000', '_self');
// });

// var userView = document.getElementById('userView');

// userView.addEventListener("click", function(){
//     // window.open('null','http://127.0.0.1:8000/userView', '_self');
// });

document.addEventListener("click", function(e){
    if(e.target.classList.contains("editProduct")){
        $.ajax({
            type: "GET",
            url: "/editProduct/" + e.target.id,
            data: {
                id: e.target.id
            },
            success: function(res){
                window.open('http://127.0.0.1:8000/editProduct/' + e.target.id , '_self')
                // e.target.parentElement.append();
                // console.log(res);
            }
        });
    }
});

// document.addEventListener("click", function(e){
//     if(e.target.classList.contains("editProduct")){
//         $.ajax({
//             type: "GET",
//             url: "/editProduct/" + e.target.id,
//             data: {
//                 id: e.target.id
//             },
//             success: function(res){
//                 e.target.parentElement.find();
//                 // var result = $('<div />').append(data).find('#showresults').html();
//                 // $('#showresults').html(result);
//                 console.log(res);
//             }
//         });
//     }
// });

document.addEventListener("click", function(e){
    if(e.target.classList.contains("deleteProduct")){
        $.ajax({
            type: "POST",
            url: "/deleteProduct/" + e.target.id,
            data: {
                id : e.target.id
            },
            success: function(res){
                e.target.parentElement.remove();
                console.log(res);
            }
        });
    }
});


document.addEventListener("click", function(e){
    if(e.target.classList.contains("deleteProduct")){
        swal({
            title: "Weldone!",
            text: "Product has been deleted!",
            icon: "success",
          });
    }
});