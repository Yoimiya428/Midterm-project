/* $(document).ready(function() {
  $('.delete-button').on('click', function(event) {
    event.preventDefault();

    const itemId = $(this).data('item-id');

    if (confirm('Are you sure you want to delete this item?')) {
      fetch(`/admin/menu/${itemId}`, {
        method: 'DELETE'
      })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => {
            throw new Error(err.message);
          });
        }
        return response.json();
      })
      .then(data => {
        console.log(data.message);
        // to Remove the item from the DOM
        const itemElement = document.querySelector(`.food-item[data-item-id="${itemId}"]`);
        if (itemElement) {
          itemElement.remove();
        }
      })
      .catch(error => {
        alert('Failed to delete item: ' + error.message);
        console.error('Error:', error);
      });
    }
  });
});
 */


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

    // Update the cart
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
