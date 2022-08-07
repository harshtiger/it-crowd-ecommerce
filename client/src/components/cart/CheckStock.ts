
export function CheckStock ( productsCart : any , products :any  ) {
  
    let noStockProducts = [];
    for (let i = 0; i < productsCart.length; i++) {
        for (let j = 0; j < products.length; j++) {
            if (productsCart[i].productId === products[j].id) {
                if ( productsCart[i].quantity > products[j].stock ){
                    noStockProducts.push(productsCart[i].productName)
                }
            }
        }
    }
    return noStockProducts ; 
}