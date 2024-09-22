// cart.js
export let cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    Quantity: 2
},
{
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    Quantity: 2
}];
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

//removing an item from cart
export function removeFromCart(productId) {
    const newCart=[];

    cart.forEach((cartItem)=>{
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    })


    cart=newCart
}