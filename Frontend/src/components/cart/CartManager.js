class CartManager {
  static addToCart(item, quantity) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let foundIndex = cart.findIndex((prod) => prod.productId === item.productId);

    // console.log(`Tentativo di aggiungere ${quantity} di ${item.name} (Disponibili: ${item.availableQuantity})`);

    if (foundIndex !== -1) {
      const desiredQuantity = cart[foundIndex].quantity + quantity;
      // console.log(`Quantità totale desiderata nel carrello: ${desiredQuantity}`);

      if (desiredQuantity > item.availableQuantity) {
        console.error(`Non puoi aggiungere più di ${item.availableQuantity} unità di ${item.name} al carrello.`);
        return false;
      }

      let updatedItem = { ...cart[foundIndex], quantity: desiredQuantity };
      cart[foundIndex] = updatedItem;
    } else {
      if (quantity > item.availableQuantity) {
        console.error(`Non puoi aggiungere più di ${item.availableQuantity} unità di ${item.name} al carrello.`);
        return false;
      }

      let newItem = { ...item, quantity };
      cart.push(newItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    // console.log("Prodotto aggiunto con successo.");
    return true;
  }

  static getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  static updateProductQuantity(productId, newQuantity) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = cart.map((item) => (item.productId === productId ? { ...item, quantity: newQuantity } : item));
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  }

  static removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = cart.filter((item) => item.productId !== productId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  }

  static clearCart() {
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("cartUpdated"));
  }
}

export default CartManager;
