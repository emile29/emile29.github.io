function getQuote(){
    $.ajax({
        url: "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?",
        type: 'get',
        dataType: 'jsonp',
        async: false,
        success: function(data){
            $('#quote-content').html("<p>"+data.quoteText+"</p>");
            $('#quote-author').html("<p>- "+data.quoteAuthor+"</p>");
            $('#quote-source').html('Source: '+"<a href='"+data.quoteLink+"'>link</a>");
        }
    })
}

function twitter(){
    var windowopen = window.open('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=%22undefined%22%20undefined');
    $.html(windowopen);
}

function tumblr(){
    var windowopen = window.open('https://www.tumblr.com/login?redirect_to=https%3A%2F%2Fwww.tumblr.com%2Fwidgets%2Fshare%2Ftool%3Fposttype%3Dquote%26tags%3Dquotes%252Cfreecodecamp%26caption%3Dundefined%26content%3Dundefined%26canonicalUrl%3Dhttps%253A%252F%252Fwww.tumblr.com%252Fbuttons%26shareSource%3Dtumblr_share_button" class="fa fa-tumblr');
    $.html(windowopen);
}
