
$(document).ready(function(){
	if (navigator.geolocation)
	{
		navigator.geolocation.getCurrentPosition(function(position)
		{
			$("#f-y-c-weather").click(function()
			{
				var url="https://fcc-weather-api.glitch.me/api/current?lat=";
				$.getJSON(url+position.coords.latitude+"&lon="+position.coords.longitude,function(data)
				{
					$("#show").html("<p><span id='font1'>Latitude</span>: "+data.coord.lat+", <span id='font1' style='font-weight:bold;'>Longitude</span>: "+data.coord.lon+"</p>"+
										"<p><span id='font1'>City</span>: "+data.name+"</p>"+
										 "<p><span id='font1'>Country</span>: "+data.sys.country+"</p>"+
									  "<p><span id='font1'>Weather</span>: <img style='margin-top:-15px;margin-bottom:-18px;' src="+data.weather[0].icon+".png"+">"+data.weather[0].main+"</p>"+
									  "<p><span id='font1'>Description</span>: "+data.weather[0].description+"</p>"+
									  "<p><span id='font1'>Temperature</span>: "+data.main.temp+" Deg. Cel."+"</p>"+
									  "<p><span id='font1'>Humidity</span>: "+data.main.humidity+"</p>" );
					$("#toggleTemp").click(function()
					{
						$("#show").html("<p><span id='font1'  >Latitude</span>: "+data.coord.lat+", <span id='font1'>Longitude</span>: "+data.coord.lon+"</p>"+
									"<p><span id='font1'>City</span>: "+data.name+"</p>"+
								  "<p><span id='font1'>Country</span>: "+data.sys.country+"</p>"+
								  "<p><span id='font1'>Weather</span>: <img style='margin-top:-15px;margin-bottom:-18px;' src="+data.weather[0].icon+".png"+">"+data.weather[0].main+"</p>"+
								  "<p><span id='font1'>Description</span>: "+data.weather[0].description+"</p>"+
								  "<p><span id='font1'>Temperature</span>: "+((data.main.temp*1.8)+32)+" Deg. Fahr."+"</p>"+
								  "<p><span id='font1'>Humidity</span>: "+data.main.humidity+"</p>" )
					});
				})
			})
		});
	}
	
	$("#submitWeather").click(function()
	{
		var place=$("#searchbar").val();
		var api_url="https://api.openweathermap.org/data/2.5/weather&q=";
		var key="e2558ce3776bd3e019f2b1990c450e58";
		$.ajax
		({
			url: "https://api.openweathermap.org/data/2.5/weather?q="+place+"&units=metric"+"&APPID=e2558ce3776bd3e019f2b1990c450e58",
			dataType: "json",
			success: function(data)
			{
				var icon="http://openweathermap.org/img/w/"+data.weather[0].icon+".png";
				
				$("#show").html("<p><span id='font1'>City</span>: "+data.name+"</p>"+
								  "<p><span id='font1'>Country</span>: "+data.sys.country+"</p>"+
								  "<p><span id='font1'>Weather</span>: <img style='margin-top:-15px;margin-bottom:-18px;' src="+icon+">"+data.weather[0].main+"</p>"+
								  "<p><span id='font1'>Description</span>: "+data.weather[0].description+"</p>"+
								  "<p><span id='font1'>Temperature</span>: "+data.main.temp+" Deg. Cel.</p>"+
								  "<p><span id='font1'>Humidity</span>: "+data.main.humidity+"</p>"+
								  "<p><span id='font1'>Wind Speed</span>: "+data.wind.speed+" mph</p>");
				
				$("#toggleTemp").click(function()
				{
					$("#show").html("<p><span id='font1'>City</span>: "+data.name+"</p>"+
							  "<p><span id='font1'>Country</span>: "+data.sys.country+"</p>"+
							  "<p><span id='font1'>Weather</span>: <img style='margin-top:-15px;margin-bottom:-18px;' src="+icon+">"+
							  data.weather[0].main+"</p>"+
							  "<p><span id='font1'>Description</span>: "+data.weather[0].description+"</p>"+
							  "<p><span id='font1'>Temperature</span>: "+((data.main.temp*1.8)+32)+" Deg. Fahr."+"</p>"+
							  "<p><span id='font1'>Humidity</span>: "+data.main.humidity+"</p>"+
							  "<p><span id='font1'>Wind Speed</span>: "+data.wind.speed+" mph</p>" )
				});
				$("#error").html('');
			},
			error:function(errorMessage)
			{
				$("#error").html("<p style='margin:0 0 0 30px'>Field cannot be empty or city doesn't exist.</p>");
			}
		});
	});

	$("#searchbar").keypress(function()
	{
		if(event.keyCode==13)
		{
			$("#submitWeather").click();
		} 
	});
});
    


