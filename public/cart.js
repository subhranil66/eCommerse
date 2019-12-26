// // const msgbox = document.querySelector(".msg")

// function showmsg(bg, element, msg) {
//     element.classList.add(bg)
//     element.innerHTML = msg
//     setTimeout(() => {
//         element.classList.remove(bg)
//         element.innerHTML = ""
//     }, 2000)
// }


document.addEventListener("click", e => {
    if (e.target.classList.contains("deletecartproduct")) {
        console.log(e.target.id)
        // console.log(e.target.parentElement.parentElement.remove())
        $.ajax({
            type: "DELETE",
            url: "/deletecartproduct/" + e.target.id,
            data: {
                id: e.target.id
            },
            success: function (response) {
                // if (response.trim() == "Product Deleted") {
                //     showmsg("bg-success", msgbox, response)
                //     e.target.parentElement.parentElement.remove()
                // }
                // else if (response.trim() == "Something Went Wrong") {
                //     showmsg("bg-danger", msgbox, response)
                // }
                e.target.parentElement.parentElement.remove();
                // alert('item deleted');
                location.reload();
            }
        })
    }
    /*
    else if (e.target.classList.contains("buy")) {
        console.log(e.target.id)
        $.ajax({
            type: "POST",
            url: "/buy/" + e.target.id,
            data: {
                id: e.target.id
            },
            success: function (response) {
                // if (response.trim() == "Product Purchased Succesfully") {
                //     showmsg("bg-success", msgbox, response)
                //     e.target.parentElement.parentElement.remove()
                // } else if (response.trim() == "Something Went Wrong") {
                //     showmsg("bg-warning", msgbox, response)
                // }
                e.target.parentElement.parentElement.remove();
                alert('purchased');
            }
        })
    }*/
})

function buyProduct(pid, uid, cqty, pqty, event){
    event.preventDefault()
    console.log(cqty);
   console.log(pqty);
if(pqty<cqty){
    alert('out of stack')
}
else{
    $(document).ready(function(){
        $.ajax({
            method: 'POST',
            url: '/buy/'+ uid + '/' + pid,
            data:{
                
            },
            success: function(res){
                if( res.success == true ){
                    // alert('purchased');
                    location.reload();
                }
            }
        })
    })
}

}

document.addEventListener("click", function(e){
    if(e.target.classList.contains("deletecartproduct")){
        swal({
            title: "Weldone!",
            text: "Deleted from Cart!",
            icon: "success",
          });
    }
});

document.addEventListener("click", function(e){
    if(e.target.classList.contains("buy")){
        swal({
            title: "Weldone!",
            text: "Product has been purchased!",
            icon: "success",
          });
    }
});