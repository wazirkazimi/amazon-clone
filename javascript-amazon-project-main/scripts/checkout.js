import { renderOrdersummary } from "./Checkout/productSummary.js";
import { renderPaymentsummary } from "./Checkout/paymentSummary.js";
import { updateQuantity } from "./../data/cart.js";

document.querySelector('.js-total-cart-quantity').innerHTML=`Checkout (<a class="return-to-home-link "
    href="amazon.html">${updateQuantity()} items</a>)`
renderOrdersummary() 
renderPaymentsummary() 