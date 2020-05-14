var currentTemp;
var tempToggleOn = false;

$(document).ready(function() {
	$('.temp-toggle-input').click(function() {
		tempToggleOn = !tempToggleOn;
		if ($(this).is(':checked')) {
			if (currentTemp) {
				$('.temp').html(`${((currentTemp*1.8)+32).toFixed(2)} °F`);
			}
		} else {
			if (currentTemp) {
				$('.temp').html(`${currentTemp} °C`);
			}
		}
	});

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			$(".current-weather").click(function() {
				$(".city").val('');
				$(".country").val('');
				$.ajax({
					url: `https://fcc-weather-api.glitch.me/api/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}`,
					dataType: 'json',
					success: function(data) {
						currentTemp = data.main.temp;
						var temp = data.main.temp + ' °C';
						if (tempToggleOn) {
							temp = ((currentTemp*1.8)+32).toFixed(2) + ' °F';
						}
						var weatherIcon = "http://openweathermap.org/img/w/"+data.weather[0].icon+".png";
						$('.wearther-info-placeholder').html(`
							<div class='fade-in'>
								<div class='city-country'>${data.name}, ${data.sys.country}</div>
								<div class="img-description-container">
									<img src=${weatherIcon}>${data.weather[0].description}
								</div>
								<div class="temp">${temp}</div>
								<div class="wind-speed">
									<div><div>
										<div><i class='fas fa-wind'></i></div>
										<div>${data.wind.speed} mph</div>
									</div></div>
								</div>
							</div>

							<style>
								.fade-in {
									animation: fadeInAnimation ease .7s;
								}

								@keyframes fadeInAnimation {
									0% {
										opacity: 0;
									}
									100% {
										opacity: 1;
									}
								}

								.city-country, .img-description-container, .temp, .wind-speed div {
									height: 50px;
								}

								.city-country, .temp, .wind-speed {
									display: flex;
									flex-direction: column;
									justify-content: space-around;
								}

								.wind-speed div {
									display: flex;
									justify-content: space-around;
								}

								.wind-speed div div {
									display: flex;
								}

								.wind-speed div div div {
									display: flex;
									flex-direction: column;
									justify-content: space-around;
								}

								.wind-speed div div div i {
									margin-right: 8px;
								}
							</style>
						`);
					}
				});
			});
		});
	}

	$(".submit").click(function() {
		var city = $(".city").val();
		var countryCode = $(".country").val();

		if (city && countryCode) {
			var baseUrl="https://api.openweathermap.org/data/2.5/weather?q=";
			var key="e2558ce3776bd3e019f2b1990c450e58";
			$.ajax({
				url: `${baseUrl}${city}&units=metric&APPID=${key}`,
				dataType: "json",
				success: function(data) {
					if (data.sys.country.toLowerCase() == countryCode.toLowerCase()) {
						currentTemp = data.main.temp;
						var temp = data.main.temp + ' °C';
						if (tempToggleOn) {
							temp = ((currentTemp*1.8)+32).toFixed(2) + ' °F';
						}
						var weatherIcon = "http://openweathermap.org/img/w/"+data.weather[0].icon+".png";
						$('.wearther-info-placeholder').html(`
							<div class='fade-in'>
								<div class='city-country'>${data.name}, ${data.sys.country}</div>
								<div class="img-description-container">
									<img src=${weatherIcon}>${data.weather[0].description}
								</div>
								<div class="temp">${temp}</div>
								<div class="wind-speed">
									<div><div>
										<div><i class='fas fa-wind'></i></div>
										<div>${data.wind.speed} mph</div>
									</div></div>
								</div>
							</div>

							<style>
								.fade-in {
									animation: fadeInAnimation ease .7s;
								}

								@keyframes fadeInAnimation {
									0% {
										opacity: 0;
									}
									100% {
										opacity: 1;
									}
								}

								.city-country, .img-description-container, .temp, .wind-speed div {
									height: 50px;
								}

								.city-country, .temp, .wind-speed {
									display: flex;
									flex-direction: column;
									justify-content: space-around;
								}

								.wind-speed div {
									display: flex;
									justify-content: space-around;
								}

								.wind-speed div div {
									display: flex;
								}

								.wind-speed div div div {
									display: flex;
									flex-direction: column;
									justify-content: space-around;
								}

								.wind-speed div div div i {
									margin-right: 8px;
								}
							</style>
						`);
					} else {
						$(".wearther-info-placeholder").html(`
							<p style='font-size: 18px'>Wrong country code</p>
						`);
					}
				},
				error: function(err) {
					$(".wearther-info-placeholder").html(`
						<p style='font-size: 18px'>City doesn't exist</p>
					`);
				}
			});
		} else {
			if (city == '') {
				alert('Enter a city first!!');
			} else {
				alert('Enter a country code first!!');
			}
		}
	});

	$(".city").keypress(function() {
		if (event.keyCode == 13) {
			$(".submit").click();
		}
	});

	$(".country").keypress(function() {
		if (event.keyCode == 13) {
			$(".submit").click();
		}
	});
});
