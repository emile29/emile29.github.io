let currentQuote, currentAuthor;

$(document).ready(function() {
    $('.new-quote').click(function() {
        $.ajax({
            url: "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?",
            type: 'get',
            dataType: 'json',
            async: false,
            success: function(data) {
                currentQuote = data.quoteText;
                currentAuthor = data.quoteAuthor;
                $('.quote-content').html(`<p>${data.quoteText}</p>`);
                $('.quote-author').html(`<p>- ${data.quoteAuthor}</p>`);
                $('.quote-source').html(`Source: <a href='${data.quoteLink}'>link</a>`);
            },
            error: function(err) {
                console.log(err);
            }
        });
    });

    $('.twitter').click(function() {
        var windowopen = window.open(`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="${currentQuote}"%20by%20${currentAuthor}`);
        $.html(windowopen);
    });

    $('.tumblr').click(function() {
        var windowopen = window.open(`https://www.tumblr.com/login?redirect_to=https%3A%2F%2Fwww.tumblr.com%2Fwidgets%2Fshare%2Ftool%3Fposttype%3Dquote%26tags%3Dquotes%252Cfreecodecamp%26caption%3Dundefined%26content%3Dundefined%26canonicalUrl%3Dhttps%253A%252F%252Fwww.tumblr.com%252Fbuttons%26shareSource%3Dtumblr_share_button`);
        $.html(windowopen);
    });
});
