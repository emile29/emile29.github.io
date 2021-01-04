const api_key = "90ea25bcf2c8e9212b3ea355438a8baf";

$(document).ready(function() {
    $(".year").keypress(function() {
		if (event.keyCode == 13) {
			$(".submit").click();
		}
	});

    $('.latest-trending').click(function() {
        $.ajax({
            url: `https://api.themoviedb.org/3/trending/movie/day?api_key=${api_key}&callback=?`,
            dataType: "json",
            success: function(data) {
                $(".results-placeholder").html('');
                for (let i=0, len=data.results.length; i<len; i++){
                    let image, sypnosis, title, avgRating, relDate;
                    image = "http://image.tmdb.org/t/p/w185/"+data.results[i].poster_path;
                    title = data.results[i].original_title;
                    sypnosis = data.results[i].overview;
                    avgRating = data.results[i].vote_average;
                    relDate = data.results[i].release_date;

                    getGenresAndDisplay(image, title, sypnosis, avgRating, relDate, data.results[i].genre_ids);
                }
            }
        });
    });

    $('.submit').click(function() {
        let year = $(".year").val();
        if (year) {
            let gte = year+"-01-01";
            let lte = year+"-12-31";
            $.ajax({
                url: `https://api.themoviedb.org/3/discover/movie?api_key=90ea25bcf2c8e9212b3ea355438a8baf&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=${year}+"&primary_release_date.gte=${gte}&primary_release_date.lte${lte}&callback=?`,
                dataType: "json",
                success: function(data) {
                    $(".results-placeholder").html('');
                    for (let i=0, len=data.results.length; i<len; i++){
                        let image, sypnosis, title, avgRating, relDate;
                        image = "http://image.tmdb.org/t/p/w185/"+data.results[i].poster_path;
                        title = data.results[i].original_title;
                        sypnosis = data.results[i].overview;
                        avgRating = data.results[i].vote_average;
                        relDate = data.results[i].release_date;

                        getGenresAndDisplay(image, title, sypnosis, avgRating, relDate, data.results[i].genre_ids);
                    }
                },
                error: function(err) {
                    $(".results-placeholder").html(`
                        <div>No movies were found for this year.</div>
                    `);
                }
            });
        } else {
            alert('Enter a year first !!');
        }
    });

    function getGenresAndDisplay(image, title, sypnosis, avgRating, relDate, genres_arr) {
        $.ajax({
            url:"https://api.themoviedb.org/3/genre/movie/list?api_key="+api_key+"&language=en-US&callback=?",
            type:'get',
            dataType:'json',
            success: function(data) {
                let genres="";
                for (let j=0, len=genres_arr.length; j<len; j++){
                    for (let i=0, len1=data.genres.length; i<len1; i++){
                        if (data.genres[i].id == genres_arr[j]){
                            if (genres != "") {
                                genres += ", "+data.genres[i].name;
                            } else {
                                genres += data.genres[i].name;
                            }
                            break;
                        }
                    }
                }

                $(".results-placeholder").append(`
                    <div class='result-container'>
                        <div class='img-container'><img class='img' src=${image}></div>
                        <div class='right-section'>
                            <div class='title'><b>${title}</b></div>
                            <div>Sypnosis: ${sypnosis}</div>
                            <div>Genres: ${genres}</div>
                            <div>Avg. rating: ${avgRating}</div>
                            <div>Initial release date: ${relDate}</div>
                        </div>
                    </div>
                `);
            }
        });
    }
});
