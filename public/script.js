function showSnackbar(message, isError) {
    const snackbar = document.getElementById('snackbar');
    snackbar.textContent = message;
    snackbar.className = "show";
    if (isError) {
        snackbar.classList.add('error');
    }
    else {
        snackbar.classList.add('success');
    }
    setTimeout(() => { snackbar.className = ""; }, 3000);
}

$(document).ready(function() {
    // פונקציה לעדכון הסכום הכולל
    function updateTotalAmount() {
        let total = 0;
        $('.item-price').each(function() {
            total += parseFloat($(this).text());
        });
        $('#totalAmount').text(total.toFixed(2));
    }

    // הוספת כמות
    $('.increase-quantity').on('click', function() {
        let productItem = $(this).closest('.product-item');
        let quantitySpan = $(this).siblings('.quantity');
        let quantity = parseInt(quantitySpan.text()) + 1;
        quantitySpan.text(quantity);
        updateItemPrice(productItem, quantity);

        // קריאת AJAX לעדכון כמות
        updateCartItem(productItem.data('product-id'), quantity);
    });

    // הפחתת כמות
    $('.decrease-quantity').on('click', function() {
        let productItem = $(this).closest('.product-item');
        let quantitySpan = $(this).siblings('.quantity');
        let quantity = Math.max(1, parseInt(quantitySpan.text()) - 1);
        quantitySpan.text(quantity);
        updateItemPrice(productItem, quantity);

        // קריאת AJAX לעדכון כמות
        updateCartItem(productItem.data('product-id'), quantity);
    });

    // עדכון מחיר פריט
    function updateItemPrice(productItem, quantity) {
        let pricePerItem = parseFloat(productItem.find('.item-price').attr('data-price-per-item'));
        let newPrice = pricePerItem * quantity;
        productItem.find('.item-price').text(newPrice.toFixed(2));
        updateTotalAmount();
    }

    // הסרת פריט
    $('.remove-item').on('click', function() {
        let productItem = $(this).closest('.product-item');
        let productId = productItem.data('product-id');
        productItem.remove();
        updateTotalAmount();

        // קריאת AJAX להסרת פריט
        removeCartItem(productId);

    });

    // ניקוי העגלה
    $('#clearCartBtn').on('click', function(event) {
        event.preventDefault();
        if (!confirm('Are you sure you want to clear the cart?')) {
            return;
        }
        $.ajax({
            url: '/cart/clear',
            method: 'POST',
            success: function(response) {
                    location.reload();
                $('.product-grid').empty();
                $('#totalAmount').text('0.00');
            },
            error: function(error) {
                console.error('Error clearing cart:', error);
            }
        });
    });

    // אתחול מחיר ליחידה
    $('.product-item').each(function() {
        let price = parseFloat($(this).find('.item-price').text());
        let quantity = parseInt($(this).find('.quantity').text());
        let pricePerItem = price / quantity;
        $(this).find('.item-price').attr('data-price-per-item', pricePerItem.toFixed(2));
    });

    // פונקציה לעדכון פריט בעגלה
    function updateCartItem(productId, quantity) {
        $.ajax({
            url: '/cart/update',
            method: 'POST',
            data: { productId: productId, quantity: quantity },
            success: function(response) {
                console.log('Cart item updated');
            },
            error: function(error) {
                console.error('Error updating cart item:', error);
            }
        });
    }

    // פונקציה להסרת פריט בעגלה
    function removeCartItem(productId) {
        $.ajax({
            url: '/cart/remove',
            method: 'POST',
            data: { productId: productId },
            success: function(response) {
                console.log('Cart item removed');
                location.reload();
            },
            error: function(error) {
                console.error('Error removing cart item:', error);
            }
        });
    }
});
