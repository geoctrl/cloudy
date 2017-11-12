export default
`<div class="forecast">
    <div class="forecast__location">{{forecast.location.name}}, {{state}}</div>
    <div class="forecast__date">{{time}}</div>
    <div class="forecast-current">
        <div class="forecast-current__icon">
            <icon :name="currentIcon"></icon>
        </div>
        <div class="forecast-current__group">
            <div class="forecast-temp">
                <div>
                    <div class="forecast-temp__main">
                        {{currentTemp}}
                    </div>
                    <div class="forecast-temp__degree">
                        °{{temp}}
                    </div>
                </div>
                <div class="forecast-temp__high-low">
                {{lowTemp}} / {{highTemp}}
                </div>
            </div>
            <div class="forecast-details">
                <div class="forecast-details__condition">
                    {{forecast.current.condition.text}}
                </div>
                <div>
                    <div class="forecast-details__set">
                        {{forecast.forecast.forecastday[0].day.totalprecip_mm}} mm <span>Precipitation</span>
                    </div>
                    <div class="forecast-details__set">
                        {{forecast.current.humidity}}% <span>Humidity</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`;