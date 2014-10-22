/**
 * Created by RYi on 10/21/2014.
 */

/**
 * create calendar background with time coloumn,
 * need call the method 'layOutDay' to fill out events.
 * to display calendar, we need append instance value 'calendar' to ui element.
 * @param option, option object
 * @constructor
 */
function CalendarDayView(option){
//    var html = '<table><tr><td ><div ><div class="time-col"></div></div></td><td ><div class="container"><div class="slot-col"></div> </div></td></tr></table>';
    var html = '<div class="time-col"></div><div class="container"><div class="slot-col"></div></div> ';
    var defaultOption = {
        height: 700,
        width: 600,
        timeColWidth: 80,
        base: 9
    };

    //set instance values
    this.option = option || defaultOption;
    this.calendar = $('<div class="calendar"></div>').append($(html));
    this.timeCol = $('div.time-col', this.calendar);
    this.slotCol = $('div.slot-col', this.calendar);

    //set size of calendar
    option = this.option;
    this.calendar.height(option.height).width(option.width);
    $('div.container', this.calendar).css({top:10, left:option.timeColWidth}).height(option.height-20).width(option.width - option.timeColWidth);
    this.timeCol.height(option.height).width(option.timeColWidth).css({top:0, left:0});

    //build time column
    this.buildTimeCol();

}

CalendarDayView.prototype = {
    //create time string
    formatTime: function (offset){
        var base = this.option.base,
            hour = Math.floor(offset/60) + base,
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
    },
    //build time column in the calendar
    buildTimeCol:  function (){
        var timeCol = this.timeCol,
            start = 0,
            end = 12 * 60,
            step = 30,
            unit = (timeCol.innerHeight()-20)/(end-start),
            html, row, top;
        height = this.timeCol.innerHeight()/(((end-start)/30));

        for(i=start; i<=end; i+=step){
            html = '<span class="slot">' + this.formatTime(i) + '</span>';
            row = $(html);
            row.appendTo(timeCol).css({top:i*unit, left:0}).height(height);
        }

    },
    buildEventBox : function(event){
        var slot = $('<div class="slot"></div>'),
            slotCol = this.slotCol,
            start = 0,
            end = 12 * 60,
            unit = slotCol.height()/(end-start),
            top = event.start * unit,
            bottom = event.end * unit,
            height = bottom - top,
            width = (slotCol.innerWidth()-10) / event.overlap,
            left = width * event.col,
            html = '<div class="event-name">Sample Item<div class="event-location">'+ this.formatTime(event.start) + ' To '+ this.formatTime(event.end) + '</div></div>';
//            html = '<div class="event-name">Sample Item<div class="event-location">Sample location</div></div>';


        slot.appendTo(slotCol).css({top:top,left:left}).width(width).height(height).html(html);
    },
    layOutDay: function(events){
        var i,
            list = (new DayEventsManager(events)).list,
            n = list.length;

        //clear event
        this.slotCol.remove('.slot');
        //build event boxes.
        for(i=0; i<n; i++){
            this.buildEventBox(list[i]);
        }

    }

};

/**
 * create event list from events, and add settings for each event:
 *   overlap, int, number of events in same overlapping set, 1 means there is no overlap.
 *   col, int, position in the overlapping set.
 * @param events
 * @constructor
 */
function DayEventsManager(events){
    this.init(events);
    this.arrangeEvents();
}

DayEventsManager.prototype = {
    //init method, must called inside constructor.
    init: function(events){
        //clone events array
        var list = events.slice();

        //sort by start
        list = list.sort(function(a,b){
            return a.start > b.start;
        });
        this.list = list;

        //init overlap set
        //store events group overlapped, each item in list is a group of events without overlapped.
        this.overlap = {list:[],end:0};
    },
    //clear current overlap set, before do it, we need set overlap and col of each event in the set.
    clearOverlap: function(){
        var list = this.list,
            overlap = this.overlap,
            l = overlap.list.length;

        //go through all group in the list
        $.each(overlap.list,function(i,group){
            //go through all event in the group
            $.each(group,function(j,item){
                //set overlap and col of each event
                list[item].overlap = l;
                list[item].col = i;
            })
        });

        overlap.list = [];
        overlap.end = 0;
    },
    //push current event into new group, then push the new group into overlap set.
    //and reset end of overlap
    createNewGroup: function(i){
        var overlap = this.overlap,
            list = this.list,
            event = list[i];
        overlap.list.push([i]);
        overlap.end = Math.max(overlap.end,event.end);
    },
    //go through event list to calculate overlap value for each event.
    arrangeEvents: function(){
        var list = this.list,
            overlap = this.overlap,
            i, j, l,event,group,needNewGroup;
        n = this.list.length;

        //calculate overlap value for each event
        for(i=0; i<n; i++){
            l = overlap.list.length;
            event = list[i];  //single event
            if(l > 0){
                //if current is outside current overlap list, clear the overlap list.
                if(overlap.end <= event.start){
                    //clear current overlap
                    this.clearOverlap();

                    //push current event into new group, then push the new group into overlap set.
                    this.createNewGroup(i);
                }
                else{
                    needNewGroup = true;
                    //check overlap against each group
                    for(j=0; j<l; j++){
                        group = overlap.list[j];
                        //find first grout without overlap, push to this group
                        if(event.start > list[group[group.length-1]].end){
                            group.push(i);
                            //reset end of overlap
                            overlap.end = Math.max(overlap.end,event.end);
                            needNewGroup = false;
                            break;
                        }
                    }

                    //if can't find group without overlap, create new group
                    if(needNewGroup){
                        //push current event into new group, then push the new group into overlap set.
                        this.createNewGroup(i);
                    }

                    //re-order group list by end of last event of each group
                    overlap.list.sort(function(a,b){
                        return a[a.length-1].end - b[b.length-1].end;
                    })
                }
            }
            else{
                //push current event into new group, then push the new group into overlap set.
                this.createNewGroup(i);
            }
        }

        //clear current overlap
        this.clearOverlap();
    }
};

//expose function layOutDay
var calendarBuilder;
function layOutDay(events){
    calendarBuilder.layOutDay(events);
}

$(function(){

    calendarBuilder = new CalendarDayView();

    $('#container').append(calendarBuilder.calendar);


    var events = [
        {start: 30, end: 150},
        {start: 540, end: 600},
        {start: 560, end: 620},
        {start: 610, end: 670}
    ];

    layOutDay(events);
});