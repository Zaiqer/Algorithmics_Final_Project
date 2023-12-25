$(document).ready(function () {
    
    let basket = JSON.parse(localStorage.getItem('basket')) || [];
    
    function updateBasket() {
        $('#basket-table-body').empty();

        if (basket.length === 0) {
            $('#basket-table-body').append('<tr><td colspan="5">Your basket is empty</td></tr>');
        } else {
            basket.forEach(function (product) {
                let row = $('<tr>' +
                    '<td class="product-info d-flex">' +
                    '<div class="product-image"><img style="width:100px; height:120px; object-fit:cover" src="' + product.image + '" alt="' + product.title + '"></div>' +
                    '<div class="product-details">' +
                    '<p class="product-title">' + product.title + '</p>' +
                    '</div>' +
                    '</td>' +
                    '<td>$' + product.price + '</td>' +
                    '<td><input style="width:80px" type="number" class="form-control quantity-input" value="' + product.quantity + '"></td>' +
                    '<td class="subtotal">$' + (product.price * product.quantity).toFixed(2) + '</td>' +
                    '<td><button class="btn btn-danger btn-sm remove-btn" data-product-id="' + product.id + '"><i class="fa-regular fa-circle-xmark"></i></button></td>' +
                    '</tr>');

                
                $('#basket-table-body').append(row);
            });
        }

        updateBasketTotal();

        
        $('.productsCount').text(basket.length);
    }

    function removeProduct(productId) {
        basket = basket.filter(function (product) {
            return product.id !== productId;
        });

        localStorage.setItem('basket', JSON.stringify(basket));

        updateBasket();
    }

    
    function updateQuantity() {
        let rowIndex = $(this).closest('tr').index();
        let newQuantity = parseInt($(this).val());
        
        newQuantity = Math.max(1, newQuantity);
        
        basket[rowIndex].quantity = newQuantity;
        
        localStorage.setItem('basket', JSON.stringify(basket));
        
        updateBasket();
    }

    function updateBasketTotal() {
        let total = basket.reduce(function (acc, product) {
            return acc + (product.price * product.quantity);
        }, 0);

        $('#basket-total').text(total.toFixed(2));
    }

    $('.shoppingBtn').click(function () {
        
        let productCard = $(this).closest('.product-card');
        let productId = productCard.data('id');
        let productTitle = productCard.find('.product-title a').text();
        let productPrice = parseFloat(productCard.find('.price').text().replace('$', ''));
        let productImage = productCard.find('.featured-image-container img').attr('src');
        let productQuantity = 1;

        let existingProduct = basket.find(function (item) {
            return item.id === productId;
        });

        if (!existingProduct) {
            basket.push({
                id: productId,
                title: productTitle,
                price: productPrice,
                quantity: productQuantity,
                image: productImage
            });

            localStorage.setItem('basket', JSON.stringify(basket));
            alert("Product was added to basket");
            updateBasket();
            
        }
    });

    $('#basket-table-body').on('click', '.remove-btn', function () {
        let productId = $(this).data('product-id');
        removeProduct(productId);
    });

    $('#basket-table-body').on('input', '.quantity-input', updateQuantity);

    updateBasket();
});
