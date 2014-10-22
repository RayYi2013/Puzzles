/**
 * Created by RYi on 10/21/2014.
 */


$(function(){
    var option = {
        height: 700,
        width: 600,
        timeColWidth: 70,
        base: 9
    };

    function formatTime(offset){
        var base = option.base,
            hour = Math.floor(offset/60) + 9,
            minute = offset%60,
            am = (hour < 12),
            res = '';

        if (hour > 12) {
            hour = hour-12;
        }
        if(minute===0){
            res = '<span class="hour">' + hour + ':00</span> <span class="am">' + (am ? 'AM': 'PM') + '</span>';
        }
        else{
            res = '<span class="half-hour">' + hour + ':' +  minute + '</span>';
        }
        return res;
    }

    function buildTimeCol(timeCol){
        var table = $('<table></table>'),
            start = 0,
            end = 12 * 60,
            step = 30,
            html, row,
            height = option.height/(((end-start)/30)+1);

    for(i=start; i<=end; i+=step){
        html = '<tr><td>' + formatTime(i) + '</td></tr>';
        row = $(html).height(height);
        table.append(row);
    }

        timeCol.append(table);
}

    function arrangeEvents(events){
        //clone events array
        var list = events.slice();

        //sort by start
        list = list.sort(function(a,b){
            return a.start > b.start;
        });

        var overlap = [],//store multiple events overlapped.
            i, j, event,
            n = list.length;

        //calculate overlap value for each event
        for(i=0; i<n; i++){
            event = list[i];  //single event
            if(overlap.length > 0){
                //check all events in the overlap array
                //if end of event is less than start of current event, remove it from overlap array.,
                for(j = 0; j<overlap.length; j++){
                    if(event.start > list[overlap[j]].end){
                        overlap.splice(j,1);
                    }
                }
            }
            //push current event to overlap array
            overlap.push(i);

            //set overlap value of all event in the overlap array to overlap size
            n = overlap.length;
            for(j = 0; j<n; j++){
                list[overlap[j]].overlap = n;
                list[overlap[j]].left = j;
            }

        }

        return list;
    }

    function buildEventBox(slotCol, event){
        var slot = $('<div class="slot"></div>'),
            start = 0,
            end = 12 * 60,
            top = event.start * slotCol.height/(end-start),
            bottom = event.end * slotCol.height/(end-start),
            height = bottom - top,
            width = slotCol.width / event.overlap,
            left = width * event.left;


        slot.appendTo(slotCol).css({top:top,left:left}).width(width).height(height).html('<p>Sample Item</p><p>Sample location</p>');
    }

    function layOutDay(slotCol, events) {
        var i,
            list = arrangeEvents(events),
            n = list.length;

        for(i=0; i<n; i++){
            buildEventBox((slotCol,list[i]));
        }


    }

function buildCalendar() {
    var html = '<table><tr><td ><div class="time-col"></div></td><td><div class="slot-col"></div></td></tr></table>',
        calendar = $('<div class="calendar"></div>').append($(html)),
        timeCol = $('div.time-col', calendar),
        slotCol = $('div.slot-col', calendar);


    var events = [
        {start: 30, end: 150},
        {start: 540, end: 600},
        {start: 560, end: 620},
        {start: 610, end: 670}
    ]
    buildTimeCol(timeCol);
    layOutDay(slotCol,events);

    calendar.height(option.height).width(option.width);
    slotCol.height(option.height).width(option.width - option.timeColWidth);
    timeCol.height(option.height).width(option.timeColWidth);

    return calendar;

}


    var calendar = buildCalendar();

    $('#container').append(calendar)

});