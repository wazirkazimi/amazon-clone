 export const deliveryOption=[{
    id:'1',
    deliveryDay: 7,
    priceinCents: 0
},{
    id:'2',
    deliveryDay: 3,
    priceinCents: 499
},{
    id:'3',
    deliveryDay: 1,
    priceinCents: 999
},]

export function getDeliveryoption(deliveryOptionId) {
    let deliveryOptions
    deliveryOption.forEach((Option) => {
        if (Option.id === deliveryOptionId){
            deliveryOptions=Option;
        }
    });

     return deliveryOptions || deliveryOptions[0]
        
}