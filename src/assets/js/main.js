$(window).load(function() {
    $('html').fadeIn();
});

$(document).ready(function(){
    var selz = "https://selz.com/embed/itemdata?itemurl=http://selz.co/1rvbgi3&callback=?";
    $.getJSON(selz, {
        format: "json"
    })
    .done(function(data) {

        // Defined variables
        var imageUrl = data.ImageUrlLarge,
            itemTitle = data.Title,
            itemDesc = data.Description,
            salePrice = data.Price,
            regularPrice = data.RegularPrice,
            quantity = data.QuantityLeft,
            itemAvailable = data.Resources.Available,
            buyText = data.Resources.LinkText,

            // Remove currency symbol
            regPrice = Number((regularPrice).replace(/[^0-9\.]+/g,"")),
            salesPrice = Number((salePrice).replace(/[^0-9\.]+/g,"")),

            // Count discount
            discount = Math.round( ((regPrice - salesPrice) / regPrice) * 100);

        // Display value in html
        $("<img>").attr("src", imageUrl).appendTo("figure");
        $(".item-title").html(itemTitle);
        $(".item-desc").html(itemDesc);
        $(".item-price--sale").html(salePrice);
        $(".item-price--before").html("<em>" + regularPrice + "</em> " + "(Save " + discount + "%)");
        $(".quantity").html(quantity + " " + itemAvailable);
        $('.btn-buy').html(buyText).on('click', function() {
          quantity -= 1;
          $('.quantity').html(quantity + " " + itemAvailable);
       });
    });
});