$(document).ready(function () {
    $('.listar .category_item[category="all"]').addClass('top');

    $('.category_item').click(function () {
        var catprod = $(this).attr('category');
        console.log(catprod);

        $('.category_item').removeClass('top');
        $(this).addClass('top');

        $('.catalogo').hide();
        $('.catalogo[category="' + catprod + '"]').show();
    });

    $('.listar .category_item[category="all"]').click(function () {
        $('.catalogo').show();
        $('.icono22').show();
        $('.iconodd').show();
    });

    $('.hab').click(function () {
        $('.icono22').hide();
        $('.iconodd').show();
    });

    $('.loc').click(function () {
        $('.iconodd').hide();
        $('.icono22').show();
    })
});