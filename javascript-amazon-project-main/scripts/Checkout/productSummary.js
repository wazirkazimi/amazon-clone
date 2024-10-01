import { cart, removeFromCart, checkQauntity, updateQuantity ,  updateDeliveryOption} from '../../data/cart.js';
import { products } from '../../data/products.js';
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOption } from '../../data/deliveryOption.js';


export function renderOrdersummary() {
    
        let cartSummaryHTML = '';

        cart.forEach((cartItem) => {
        const productId = cartItem.productId;
        let matchingProduct = products.find(product => product.id === productId);

        // If no matching product is found, log the issue and skip rendering this cart item
        if (!matchingProduct) {
        console.error(`Product with id ${productId} not found in products.`);
        return;  // Skip this item if product is not found
        }

        // Renamed the local variable to avoid conflicts with the imported deliveryOption
        const deliveryOptionId = cartItem.deliveryOptionId;
        let matchedDeliveryOption = null;  // Initialize variable to avoid accidental undefined usage

        // Find the matching delivery option based on the cart item's deliveryOptionId
        deliveryOption.forEach((option) => {
        if (option.id === deliveryOptionId) {
            matchedDeliveryOption = option;
        }
        });

        // Ensure the matchedDeliveryOption is found before trying to use it
        if (matchedDeliveryOption) {
        const today = dayjs();
        const deliveryDate = today.add(matchedDeliveryOption.deliveryDay, 'day').format('dddd, MMMM D');
        console.log(`Delivery Date: ${deliveryDate}`);

        cartSummaryHTML += `
            <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
                <div class="delivery-date">
                    Delivery date: ${deliveryDate}
                </div>

                <div class="cart-item-details-grid">
                    <img class="product-image" src="${matchingProduct.image}">

                    <div class="cart-item-details">
                        <div class="product-name">
                            ${matchingProduct.name}
                        </div>
                        <div class="product-price">
                            ${(matchingProduct.priceCents / 100).toFixed(2)}
                        </div>
                        <div class="product-quantity">
                            <span>
                                Quantity: <span class="quantity-label">${cartItem.Quantity}</span>
                            </span>
                            <span class="update-quantity-link link-primary">
                                Update
                            </span>
                            <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${matchingProduct.id}">
                                Delete
                            </span>
                        </div>
                    </div>

                    <div class="delivery-options">
                        <div class="delivery-options-title">
                            Choose a delivery option:
                        </div>
                        ${deliveryOptionHTML(matchingProduct.id, cartItem)} 
                    </div>
                </div>
            </div>
        `;
        } else {
        console.error(`Delivery option with ID ${deliveryOptionId} not found.`);
        }
        });

        // Generating the HTML for the delivery options
        function deliveryOptionHTML(productId, cartItem) {
        let deliveryOptionsHTML = '';
        deliveryOption.forEach((option) => {
        const today = dayjs();
        const deliveryDate = today.add(option.deliveryDay, 'day').format('dddd, MMMM D');
        const priceString = option.priceinCents === 0 ? 'Free' : `$${(option.priceinCents / 100).toFixed(2)}`;

        // Corrected variable: use 'option.id' instead of 'deliveryOptionId'
        const isChecked = option.id === cartItem.deliveryOptionId;
        deliveryOptionsHTML += `
        <div class="delivery-option js-delivery-option" data-product-id="${productId}" data-delivery-option-id="${option.id}">
            <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input" name="delivery-option-${productId}">
            <div>
                <div class="delivery-option-date">
                    ${deliveryDate}
                </div>
                <div class="delivery-option-price">
                    ${priceString} - Shipping
                </div>
            </div>
        </div>`;
        });
        return deliveryOptionsHTML;
        }


        document.querySelector('.order-summary').innerHTML = cartSummaryHTML;

        updateQuantity();
        document.querySelectorAll('.js-delete-quantity-link').forEach((link) => {
        link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);
        document.querySelector(`.js-cart-item-container-${productId}`).remove();
        updateQuantity();
        });
        });

        document.querySelectorAll('.js-delivery-option').forEach((element)=>{
        element.addEventListener('click',()=>{
        const {productId , deliveryOptionId}= element.dataset
        updateDeliveryOption(productId, deliveryOptionId)
        // window.location.reload();
        renderOrdersummary()
        })
        })
}
// renderOrdersummary()