// Get the parameters from the URL
var params = new URLSearchParams(window.location.search);

var finalTotal = params.get("finalTotal");
var username = params.get("username");
var contactway = params.get("contactway");


document.getElementById("username").innerText = username;
document.getElementById("contactway").innerText = contactway;
document.getElementById("finalTotal").innerText = finalTotal;

function checkbutton(){
    var ccname = document.getElementById("cname").value;
    ccname=ccname.toLowerCase();;
    var tempname=username.toLowerCase();
    if (ccname == tempname){
            TransferDataToRecipt();
        }else{
            alert("Card holder name should be same as the name you entered in the previous page");
            return; 
        }  
}

function TransferDataToRecipt(){
    var contactNo= document.getElementById("phone").value;
    var email = document.getElementById("email").value;
    var address = document.getElementById("adr").value;
    
    var confirmed = confirm("Do you want to proceed the payment?");
    if(confirmed){
        window.location.href = "Kaviru_receipt.html?finalTotal=" + finalTotal +
                                "&username="+username+
                                "&contactNo="+contactNo+
                                "&email="+email+
                                "&address="+address;
    }else{
        alert("Payment cancelled");
        window.location.href = "html_files/Kaviru_mainPage.html"
    }
}