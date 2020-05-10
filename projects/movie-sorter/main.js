var api_key = "90ea25bcf2c8e9212b3ea355438a8baf";

function getPop(){ 
    $("#error").html("");
    $("#show").html("");
    $.ajax({
        url: "https://api.themoviedb.org/3/trending/movie/day?api_key="+api_key+"&callback=?",
        type: "get",
        dataType: "json",
        async: false,
        success: function(data){
            for (var i=0; i<data.results.length; i++){
                var image=null, sypnosis=null, title=null, avgRating=null, relDate=null;
                image = "http://image.tmdb.org/t/p/w185/"+data.results[i].poster_path;
                title = data.results[i].original_title;
                sypnosis = data.results[i].overview;
                avgRating = data.results[i].vote_average;
                relDate = data.results[i].release_date;
                
                getGenresAndDisp(image, title, sypnosis, avgRating, relDate, data.results[i].genre_ids);
            }
        }
    }) 
}

function bestOfYear(){
    var year = $("#year").val();
    if (year == ""){
        $("#error").html('Enter a year');
    }
    else{
        getBestOfYear(year);
    }
}

function getBestOfYear(year){ 
    $("#error").html("");
    $("#show").html("");
    var gte = year+"-01-01";
    var lte = year+"-12-31";
    $.ajax({
        url: "https://api.themoviedb.org/3/discover/movie?api_key=90ea25bcf2c8e9212b3ea355438a8baf&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year="+year+"&primary_release_date.gte="+gte+"&primary_release_date.lte="+lte+"&callback=?",
        type: "get",
        dataType: "json",
        async: false,
        success: function(data){
            for (var i=0; i<data.results.length; i++){
                var image=null, sypnosis=null, title=null, avgRating=null, relDate=null;
                image = "http://image.tmdb.org/t/p/w185/"+data.results[i].poster_path;
                title = data.results[i].original_title;
                sypnosis = data.results[i].overview;
                avgRating = data.results[i].vote_average;
                relDate = data.results[i].release_date;
                
                getGenresAndDisp(image, title, sypnosis, avgRating, relDate, data.results[i].genre_ids);
            }
        }
    }) 
}

function getGenresAndDisp(image, title, sypnosis, avgRating, relDate, genres_arr){
    $.ajax({
        url:"https://api.themoviedb.org/3/genre/movie/list?api_key="+api_key+"&language=en-US&callback=?",
        type:'get',
        dataType:'json',
        async:"false",
        success: function(data){
            var genres="";
            for (var j=0; j<genres_arr.length; j++){
                for (var i=0; i<data.genres.length; i++){
                    if (data.genres[i].id == genres_arr[j]){
                        if (genres != "")
                            genres += ", "+data.genres[i].name;
                        else 
                            genres += data.genres[i].name;
                        break;
                    }
                }
            }
            
            $("#show").append(
                    "<li>"+"<img src="+image+"><b>"+title+"</b><p>Sypnosis: "+sypnosis+"</p><p>Genres: "+genres+"</p><p>Avg. rating: "+avgRating+"</p><p>Initial release date: "+relDate+"</p></li>");
        }
    })
}
