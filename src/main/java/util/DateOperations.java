package util;

import java.text.*;
import java.util.Calendar;
import java.util.Locale;
import java.util.TimeZone;

public class DateOperations {

    public String getDateTodayString() {
        Calendar today = getDateToday();
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        return dateFormat.format(today.getTime());
    }

    public Calendar getDateToday() {
        return Calendar.getInstance();
    }

    public String getEasternTime(String dateString, String timeZone, String timePattern) {
        Calendar cal = Calendar.getInstance();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss", Locale.ENGLISH);
        sdf.setTimeZone(TimeZone.getTimeZone(timeZone));
        try {
            cal.setTime(sdf.parse(dateString));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        DateFormat format = new SimpleDateFormat(timePattern, Locale.US);
        format.setTimeZone(TimeZone.getTimeZone("EST"));
        return format.format(cal.getTime());
    }
}
