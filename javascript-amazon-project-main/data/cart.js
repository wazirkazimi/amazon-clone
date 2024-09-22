// cart.js
export const cart = [];
//To check for the repeated item in the cart and increament accordingly
export function Idcheck(productId) {
  let matchingItem;
        cart.forEach((item) => {
            if (productId === item.productId) {
                matchingItem = item;
            }
        })
        if (matchingItem) {
            matchingItem.Quantity++
        } else {
            cart.push({
                productId: productId,
                Quantity: 1
            })
        }
}

//Calculate the qauntity of the cart and update the text
export function checkQauntity() {
  let cartQuantity = 0
        cart.forEach((item) => {
            cartQuantity += item.Quantity;
        })
        document.querySelector('#js-cart-quantity').innerText = cartQuantity
        // console.log(cartQuantity)
        // console.log(cart)
}
//Add the animation whenever user add the product to the Cart
export function addTocartAnimation(button) {
  const productContainer = button.closest('.product-container');
        const addedToCartDiv = productContainer.querySelector('.added-to-cart');
        addedToCartDiv.style.opacity = '1';
        setTimeout(() => {
          addedToCartDiv.style.opacity = '0';
      }, 2000);
}