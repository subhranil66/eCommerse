// var updateProduct = document.getElementById('updateProduct');

// updateProduct.addEventListener("click", function(){
//     window.open('http://127.0.0.1:8000/viewProduct', '_self');
// });

// document.addEventListener("click", function(e){
//     if(e.target.classList.contains("updateProduct")){
//         alert(e.target.id)
//         $.ajax({
//             // type: "POST",
//             // url: "/updateProduct/" + e.target.id,
//             data: {
//                 id: e.target.id
//             },
//             success: function(res){
//                 // window.open('http://127.0.0.1:8000/viewProduct', '_self')
//                 // e.target.parentElement.append();
//                 // console.log(res);
//             }
//         });
//     }
// });

/*
function postItem() {
    $.ajax({
        type: "PUT",
        url: "/updateProduct/" + e.target.id,
        timeout: 2000,
        data: { id: e.target.id },
        success: function(data) {
            //show content
            alert('Success!')
        },
        error: function(jqXHR, textStatus, err) {
            //show error message
            alert('text status '+textStatus+', err '+err)
        }
    });
}//postItem()

$('#updateProduct').on('click', function() {
    postItem();

});
*/

document.addEventListener("click", function(e){
    if(e.target.classList.contains("updateProduct")){
        swal({
            title: "Weldone!",
            text: "Product has been updated!",
            icon: "success",
          });
    }
});