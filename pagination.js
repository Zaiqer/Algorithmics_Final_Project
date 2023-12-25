$(document).ready(function () {
    const productsContainer = $('.shop-right-side .container-fluid .row');
    const products = $('.product-container');
    const itemsPerPage = 12;
    let currentPage = 1;

    function showPage(pageNumber) {
        const startIndex = (pageNumber - 1) * itemsPerPage;
        const endIndex = pageNumber * itemsPerPage;

        products.each(function (index) {
            if (index >= startIndex && index < endIndex) {
                $(this).css('display', 'block');
            } else {
                $(this).css('display', 'none');
            }
        });
    }

    function updatePaginationButtons() {
        const totalPages = Math.ceil(products.length / itemsPerPage);
        console.log(`Page ${currentPage} of ${totalPages}`);
    }

    function handlePageClick(pageNumber) {
        currentPage = pageNumber;
        showPage(currentPage);
        updatePaginationButtons();
    }

    // Initialize the first page
    showPage(currentPage);
    updatePaginationButtons();

    // Example: Add event listeners to your pagination controls
    const nextPageBtn = $('#nextPageBtn');
    const prevPageBtn = $('#prevPageBtn');

    nextPageBtn.on('click', function () {
        if (currentPage < Math.ceil(products.length / itemsPerPage)) {
            handlePageClick(currentPage + 1);
        }
    });

    prevPageBtn.on('click', function () {
        if (currentPage > 1) {
            handlePageClick(currentPage - 1);
        }
    });
});