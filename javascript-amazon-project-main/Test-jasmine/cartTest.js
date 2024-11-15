import { Idcheck, cart } from "../data/cart.js";

describe('test suite: Add to CartFunction',()=>{
    it('adds an existing product to the cart by incrementing the product quantity',()=>{
        
    })
    it('adds an new product to the cart',()=>{
        Idcheck('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
        expect(cart.length).toEqual(1)
    })
})