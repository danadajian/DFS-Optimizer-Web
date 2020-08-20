package collect.misc

import api.DataCollector
import org.json.JSONException
import org.json.JSONObject
import kotlin.math.roundToInt

class Weather {
    fun getWeatherData(sport: String): Map<Int, Map<String, String>> {
        val apiResponse: String = callWeather(sport)
        return if (apiResponse.isEmpty()) mapOf() else {
            try {
                val forecastArray = JSONObject(apiResponse).getJSONArray("apiResults")
                        .getJSONObject(0).getJSONObject("league").getJSONObject("season")
                        .getJSONArray("eventType").getJSONObject(0).getJSONArray("weatherForecasts")
                forecastArray.map {
                    it as JSONObject
                    val eventId = it.getInt("eventId")
                    val forecast = it.getJSONArray("forecasts").getJSONObject(0)
                    val temperature = forecast.getJSONArray("temperature").getJSONObject(0)
                    eventId to mapOf(
                            "forecast" to forecast.getString("condition"),
                            "details" to temperature.getInt("degrees").toString() + "°, " +
                                    forecast.getString("precipitation").toFloat().roundToInt() + "% precip",
                    )
                }.toMap()
            } catch (e: JSONException) {
                e.printStackTrace()
                mapOf()
            }
        }
    }

    fun callWeather(sport: String): String {
        return DataCollector().callWeather(sport)
    }
}