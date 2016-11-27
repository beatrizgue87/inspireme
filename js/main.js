function UrlExists(url) {
    return true;
    //     var http = new XMLHttpRequest();
    //     http.open('HEAD', url, false);
    //     http.send();
    //     return http.status != 404;
}

$(document).ready(function() {


    $("#hello").fadeIn(1500, function() {
        $("#need").fadeIn(1000);
    });

    var getJ = $.getJSON("http://quotes.rest/qod/categories.json", function(result) {
        $.each(result.contents.categories, function(i, item) {

            var btnid = i + 'BTN';
            var str = '<li id="' + btnid + '"><a data-toggle="tooltip" title="' + item + '">' + i + '</a></li>';
            console.log(str);
            console.log(btnid);
            $("#myItems").append(str);

            //Clip to every button.
            $("#" + btnid).click(function() {
                console.log(i);
                $("#nq").empty();
                $.getJSON("http://quotes.rest/qod.json?category=" + i, function(data) {
                    $.each(data.contents.quotes, function(a, b) {
                        var q = b.quote;
                        var author = b.author;

                        $("#hello").hide('fast');
                        $("#need").hide('fast', function() {
                            var u = "img/" + i + ".jpg";
                            if (UrlExists(u) == true) {


                                $("#jumbo").css('background', 'transparent');
                                $("#jumbo").css({
                                    'background': 'url(' + u + ')',
                                    'background-repeat': 'no-repeat',
                                    'background-size': 'cover',
                                    'width': '100%',

                                });
                            }
                            $("#nq").show('fast'); //Shows the second jumbotron

                            //Add the quote generated for the second jumbotron
                            $("#nq").append('<q id="qq">' + q + '</q>');
                            $("#nq").append('<br><p id="qq">' + author + '</p>');

                        });

                    });

                });

            });

        });

    });

    getJ.fail(function() {
        console.log("error");
        $("#need").empty();
        alert('Too many requests. You have to wait one hour.')
    });

    $("#dayQ").click(function() {
        /* Act on the event */
        $.getJSON("http://quotes.rest/qod.json", function(quoteDay) {
            $.each(quoteDay.contents.quotes, function(q, w) {
                var im = w.background;
                var q1 = w.quote;
                console.log(im);
                console.log(q1);
                $("#imgDay").append('<img id="myImg" src="' + im + '">');
                $("#textDay").append('<p id="text">' + q1 + '</p>');
                $("#imgDay").fadeIn('fast');
                //$("#textDay").fadeIn('fast');

            });
        });
    });
});
