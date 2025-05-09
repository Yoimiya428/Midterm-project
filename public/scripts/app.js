$(document).ready(function () {
  const cart = {
    items: {}, // { itemId: { quantity, price } }
    totalQuantity: 0,
    totalPrice: 0
  };

  $('.add-to-cart-form').on('submit', function (event) {
    event.preventDefault();

    const $form = $(this);
    const itemId = $form.find('input[name="itemId"]').val();

    const $itemContainer = $form.closest('.food-item');
    const priceText = $itemContainer.find('h3').text();
    const priceMatch = priceText.match(/(\d+(\.\d+)?)/g);
    const price = parseFloat(priceMatch ? priceMatch[priceMatch.length - 1] : 0);

    // Update the carts
    if (!cart.items[itemId]) {
      cart.items[itemId] = { quantity: 0, price };
    }

    cart.items[itemId].quantity += 1;
    cart.totalQuantity += 1;
    cart.totalPrice += price;

    // Update the header
    $('#cart-quantity').text(cart.totalQuantity);
    $('#cart-total').text(cart.totalPrice.toFixed(2));
  });
});
