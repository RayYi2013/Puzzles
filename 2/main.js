/**
 * Created by RYi on 10/21/2014.
 */


$(function(){
    var option = {
        heigth: 700,
        width: 600,
        timeColWidth: 70,
        base: 9
    }
    function formatTime(offset){
        var base = option.base,
            hour = Math.ceil(offset/60) + 9,
            minute = offset%60,
            am = hour >= 12,
            res = '';

        if(minute===0){
            res = hour + ':00';
            if(am){
                res += ' AM';
            }
            else{
                res += ' PM';
            }
        }
        else{
            res = hour + ':' + minute;
        }


        return res;
    }

    function buildTimeCol(){
        var table = $('<table></table>'),
            start = 0,
            end = 12 * 60,
            step = 30,
            html, row,
            height = option.heigth/24;

        for(i=start; i<end; i+=step){
            html = '<tr><td>' + formatTime(i) + '</td></tr>';
            row = $(html).height(height);
            table.append(row);
        }

        return table;

    }

   function buildBackground() {
       var html = '<table><tr><td ><div class="time-col"></div></td><td><div class="slot-col"></div></td></tr></table>',
           calendar = $('<div class="calendar"></div>').append($(html)),
           timeCol = $('div.time-col', calendar),
           slotCol = $('div.slot-col', calendar);


       timeCol.append(buildTimeCol());

       calendar.height(option.heigth).width(option.width);
       slotCol.height(option.heigth).width(option.width - option.timeColWidth);
       timeCol.height(option.heigth).width(option.timeColWidth);

       return calendar;

   }

    function buildCalendar(){
        var calendar = buildBackground();

        $('#container').append(calendar);
    }

    buildCalendar();
});