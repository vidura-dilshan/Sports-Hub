// cart
let cartIcon= document.querySelector('#cart-icon')
let cart= document.querySelector('.cart')
let closecart= document.querySelector('#close-cart')

const btnBuy = document.querySelector('.btn-buy');

const totalPrice = document.querySelector('.total_price');
var finalTotal = 0;



// disable the button by default
btnBuy.disabled = true;

totalPrice.addEventListener('DOMSubtreeModified', () => {

    const price = parseFloat(totalPrice.innerText.replace('Rs. ', ''));

    if (price > 0) {
        btnBuy.disabled = false;
    } else {
        btnBuy.disabled = true;
    }
    }
);


cartIcon.onclick = ()=>{
    cart.classList.add("active");
};

closecart.onclick = ()=>{
    cart.classList.remove("active");
};


if(document.readyState== 'loading'){
    document.addEventListener("DOMContentLoaded", ready);
}else{
    ready();
}

function ready(){
    var removeCartButtons = document.getElementsByClassName("cart-remove")
    console.log(removeCartButtons);
    for (var i = 0; i < removeCartButtons.length; i++){
        var button =removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }
    // Quantuty Changes
    var quantityInputs=document.getElementsByClassName("cart_quantity")
    for (var i = 0; i < quantityInputs.length; i++){
        var input=quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    // Add To Cart
    var addCart = document.getElementsByClassName("buy_btn");
    for (var i = 0; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    // Buy Button Work
    document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);
}


// Buy Button
function buyButtonClicked(){
    // Check if cart is empty
    if (document.getElementsByClassName("cart_box").length == 0){
        alert("Your cart is empty. Please add some products to the cart.");
        return;
    }
    
    var cartContent = document.getElementsByClassName("cart_content")[0];
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
}
// Remove products from cart
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}
// Quantity Changes
function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}
// Add to cart
function addCartClicked(event){
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("product_price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product_img")[0].src;
    addProductToCart(title, price, productImg);
    updateTotal();
}

function addProductToCart(title, price, productImg){
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart_box");
    var cartItems = document.getElementsByClassName("cart_content")[0];
    var cartItemsNames = document.getElementsByClassName("cart_product_titlet");

    for (var i = 0; i < cartItemsNames.length; i++){
        if (cartItemsNames[i].innerText == title){
            alert("You already added this item to the cart./n If you want to add more, change the quantity in the cart.");
            return;
    }
}

var cartBoxContent=`    
                            <img src="${productImg}" alt="" class="cart_bat">
                            <div class="detail_box">
                                <div class="cart_product_title">${title}</div>
                                <div class="cart_price">${price}</div>
                                <input type="number" value="1" class="cart_quantity">
                            </div>
                            <i class="fa fa-trash cart-remove"></i>`;

cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener('click', removeCartItem);
cartShopBox.getElementsByClassName("cart_quantity")[0].addEventListener('change', quantityChanged);
}

// Update total
function updateTotal(){
    var cartContent = document.getElementsByClassName("cart_content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart_box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart_price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart_quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("Rs. ", ""));
        var quantity = quantityElement.value;

        total = total + (price * quantity);
    }
        // if price is with cents
        total = Math.round(total * 10) / 10;
        if(total % 1 != 0){
            document.getElementsByClassName("total_price")[0].innerText = "Rs. "+total+"0";
        }else{
            document.getElementsByClassName("total_price")[0].innerText = "Rs. "+total;
        }
        finalTotal = total;
    }

function TransferDataToCheckout(){
    var username = document.getElementById("name").value;
    var contactway= document.getElementById("email-or-con").value;
    var confirmed = confirm("Name - "+username+"\nContact detail - "+contactway+
                            "\nYour total price is Rs. "+finalTotal+
                            ".\nDo you want to proceed the payment?");
    if(confirmed){
        window.location.href = "Kaviru_paymentgateway.html?finalTotal=" + finalTotal + 
                                "&username=" + username + 
                                "&contactway=" +contactway;
    }
    }
