function addCart(pid, uid, pqty, event){
    event.preventDefault()
    var qty = Number(document.getElementById('requiredQty' + pid).value)
   
    if(qty>0 && qty<=pqty && pqty>0){
    $(document).ready(function(){
        $.ajax({
            method: 'POST',
            url: '/cart/'+ uid + '/' + pid,
            data:{
                qty: qty,
            },
            success: function(res){
                if( res.success == true ){
                    // alert('added');
                    
                }
            }
        })
    })
}
else if(qty<1) {
    alert("Should be minimum 1");
}
else{
    alert("Out of stack");
}
}

document.addEventListener("click", function(e){
    if(e.target.classList.contains("userView")){
        swal({
            title: "Weldone!",
            text: "Added to Cart!",
            icon: "success",
          });
    }
});