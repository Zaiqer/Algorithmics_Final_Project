$(document).ready(function () {
    const productsContainer = $('.shop-right-side .container-fluid .row');
    const products = $('.product-container');

    $('#sortAscBtn').on('click', function () {
        const sortedProducts = products.sort((a, b) => {
            const priceA = parseFloat($(a).data('price'));
            const priceB = parseFloat($(b).data('price'));
            return priceA - priceB;
        });

        productsContainer.empty().append(sortedProducts);

        console.log('Products sorted in ascending order by price');
    });

    $('#sortDescBtn').on('click', function () {
        // Sort products in descending order by price
        const sortedProducts = products.sort((a, b) => {
            const priceA = parseFloat($(a).data('price'));
            const priceB = parseFloat($(b).data('price'));
            return priceB - priceA;
        });

        productsContainer.empty().append(sortedProducts);


        console.log('Products sorted in descending order by price');
    });
});
