document.addEventListener("click", function(e){
    if(e.target.classList.contains("userview")){
        swal({
            title: "LogIn First!",
            text: "or SignUp",
            icon: "success",
          });
    }
});

document.addEventListener("click", function(e){
    if(e.target.classList.contains("viewcart")){
        swal({
            title: "LogIn First!",
            text: "or SignUp",
            icon: "success",
          });
    }
});