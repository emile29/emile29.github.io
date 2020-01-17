$(document).ready(function()
{
   $("#searchbutton").click(function()
	{
		var searchterm = $("#searchbar").val();
		 
		$.ajax({
			url: "https://en.wikipedia.org/w/api.php?action=opensearch&search="+ searchterm +"&format=json&callback=?",
			dataType:"json",
			success: function(data)
			{
				$('#output').html('');
				for (var i=0; i<data[1].length; i++)
				{
					var result = ("<a id='a' href="+data[3][i]+">"+
											"<div class='btn-primary'>"+											
											"<h3 style='font-weight:bold'>"+data[1][i]+"</h3>"+
											"<p>"+data[2][i]+"</p>\
										</div></a>");
					$("#output").prepend(result);
				}       
			},
			error: function(errorMesssage){
				alert("Error, please refresh the page");
			},
		})
   });
	
   $("#randomsearch").click(function()
	{
		var windowopen = window.open('https://en.wikipedia.org/wiki/Special:Random');
      $.html(windowopen);
   }); 
	
	$('#searchbar').keypress(function()
   {
		if(event.keyCode==13)
		{
			$('#searchbutton').click();
		}
   });  
});
