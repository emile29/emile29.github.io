$(document).ready(function() {
   	$(".submit").click(function() {
		let searchterm = $(".search-bar").val();
		if (searchterm) {
			$.ajax({
				url: `https://en.wikipedia.org/w/api.php?action=opensearch&search=${searchterm}&format=json&callback=?`,
				dataType: "json",
				success: function(data) {
					let testPara = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
					$('.results-placeholder').html('');
					for (let i=0, len=data[1].length; i<len; i++) {
						$(".results-placeholder").prepend(`
							<div class='result-box'>
								<a href="${data[3][i]}" target='_blank'>
									<div class='result-header'>${data[1][i]}</div>
									<div class='result-para'>${testPara}</div>
								</a>
							</div>
						`);
					}
				},
				error: function(err) {
					alert("Error, please refresh the page");
				},
			});
		} else {
			alert('Enter a search first !!');
		}
   	});

   	$(".random-search").click(function() {
		let windowopen = window.open('https://en.wikipedia.org/wiki/Special:Random');
      	$.html(windowopen);
   	});

	$('.search-bar').keypress(function() {
		if(event.keyCode == 13) {
			$('.submit').click();
		}
   	});
});
