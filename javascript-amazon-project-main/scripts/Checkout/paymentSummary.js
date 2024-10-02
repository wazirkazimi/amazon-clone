//Generating the payment summary block
import { cart , updateQuantity} from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { deliveryOption, getDeliveryoption } from "../../data/deliveryOption.js";
import { formatCurrency } from "../../utils/money.js";
export function renderPaymentsummary() {
    let productPriceCents=0
    let shippingPriceCents=0
    cart.forEach((cartItem) => {
        // console.log(cartItem.productId)
        const product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents*cartItem.Quantity

        // console.log( productPriceCents )
        const deliveryOption=getDeliveryoption(cartItem.deliveryOptionId)
        shippingPriceCents = shippingPriceCents+deliveryOption.priceinCents
        
        
    });
    // console.log(productPriceCents)
    // console.log(shippingPriceCents)
    const totalbeforeTaxCents = productPriceCents+shippingPriceCents
    console.log(totalbeforeTaxCents)
    const taxCents= totalbeforeTaxCents*0.1
    const totalAfterTaxCent= totalbeforeTaxCents + taxCents
    
    const paymentSummaryHTML = `
    <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row js-payment-summary-row">
            <div>Items (${updateQuantity()}):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>
          
          <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
          </div>
          
          <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">$${formatCurrency(totalbeforeTaxCents)}</div>
          </div>
          
          <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>
          
          <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money">$${formatCurrency(totalAfterTaxCent)}</div>
          </div>
          
          <button class="place-order-button button-primary">
          Place your order
          </button>
          
          `
          document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML
        //   console.log(paymentSummaryHTML)
        }