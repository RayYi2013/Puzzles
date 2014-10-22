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

        var overlap = {list:[],end:0},//store events group overlapped., each item in list is a group of event without overlapped.
            i, j, l,event,group,needNewGroup;
            n = list.length;

        function setOverlap(overlap){
            var l = overlap.list.length;
            $.each(overlap.list,function(i,group){
                //set overlap and col of each event in each group
                $.each(group,function(j,item){
                    list[item].overlap = l;
                    list[item].col = i;
                })
            });
        }

        //calculate overlap value for each event
        for(i=0; i<n; i++){
            l = overlap.list.length;
            event = list[i];  //single event
            if(l > 0){
                //if current is outside current overlap list, clear the overlap list.
                if(overlap.end <= event.start){
                    //set overlap and col of each event in each group
                    setOverlap(overlap);
                    //reset overlap with new group
                    overlap.list = [];
                    overlap.list.push([i]);
                    overlap.end = event.end;
                }
                else{
                    needNewGroup = true;
                    //check overlap against each group
                    for(j=0; j<l; j++){
                        group = overlap.list[j];
                        //find first grout without overlap, push to this group
                        if(event.start > list[group[group.length-1]].end){
                            group.push(i);
                            needNewGroup = false;
                            break;
                        }
                    }

                    //if can't find group without overlap, create new group
                    if(needNewGroup){
                        group = [i];
                        overlap.list.push(group);
                    }

                    //reset end of overlap
                    overlap.end = Math.max(overlap.end,event.end);

                    //re-order group list by end of last event of each group
                    overlap.list.sort(function(a,b){
                        return a[a.length-1].end - b[b.length-1].end;
                    })
                }
            }
            else{
                //create new group, and set end of overlap
                overlap.list.push([i]);
                overlap.end = event.end;
            }
        }

        setOverlap(overlap);

        return list;
    }

    function buildEventBox(slotCol, event){
        var slot = $('<div class="slot"></div>'),
            start = 0,
            end = 12 * 60,
            top = event.start * slotCol.height()/(end-start),
            bottom = event.end * slotCol.height()/(end-start),
            height = bottom - top,
            width = slotCol.width() / event.overlap,
            left = width * event.col;


        slot.appendTo(slotCol).css({top:top,left:left}).width(width).height(height).html('<p>Sample Item</p><p>Sample location</p>');
    }

    function layOutDay(slotCol, events) {
        var i,
            list = arrangeEvents(events),
            n = list.length;

        for(i=0; i<n; i++){
            buildEventBox(slotCol,list[i]);
        }


    }

function buildCalendar() {
    var html = '<table><tr><td ><div class="time-col"></div></td><td><div class="slot-col"></div></td></tr></table>',
        calendar = $('<div class="calendar"></div>').append($(html)),
        timeCol = $('div.time-col', calendar),
        slotCol = $('div.slot-col', calendar);

    calendar.height(option.height).width(option.width);
    slotCol.height(option.height).width(option.width - option.timeColWidth);
    timeCol.height(option.height).width(option.timeColWidth);

    var events = [
        {start: 30, end: 150},
        {start: 540, end: 600},
        {start: 560, end: 620},
        {start: 610, end: 670}
    ]
    buildTimeCol(timeCol);
    layOutDay(slotCol,events);


    return calendar;

}


    var calendar = buildCalendar();

    $('#container').append(calendar)

});