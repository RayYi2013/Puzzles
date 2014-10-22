/**
 * Created by RYi on 10/21/2014.
 */

QUnit.test( "event manager test 4 events with 3 overlaped", function( assert ) {
    var events = [
        {start: 30, end: 150},
        {start: 540, end: 600},
        {start: 560, end: 620},
        {start: 610, end: 670}
    ];
    var list = (new DayEventsManager(events)).list;

    var res = [
        {start:30,end:150,overlap:1,col:0},
        {start:540,end:600,overlap:2,col:0},
        {start:560,end:620,overlap:2,col:1},
        {start:610,end:670,overlap:2,col:0}
    ];

    assert.deepEqual( res, list, "event list is arranged correctly." );
});

QUnit.test( "event manager test 5 events with 5 overlaped", function( assert ) {
    var events = [
        {start: 30, end: 150},
        {start: 30, end: 700},
        {start: 540, end: 600},
        {start: 560, end: 620},
        {start: 610, end: 670}
    ];
    var list = (new DayEventsManager(events)).list;

    var res = [
        {start:30,end:150,overlap:3,col:0},
        {start:30,end:700,overlap:3,col:1},
        {start:540,end:600,overlap:3,col:0},
        {start:560,end:620,overlap:3,col:2},
        {start:610,end:670,overlap:3,col:0}
    ];

    assert.deepEqual( res, list, "event list is arranged correctly." );
});

QUnit.test( "event manager test 4 events without overlaped", function( assert ) {
    var events = [
        {start: 30, end: 150},
        {start: 160, end: 400},
        {start: 540, end: 600},
        {start: 610, end: 670}
    ];
    var list = (new DayEventsManager(events)).list;

    var res = [
        {start: 30, end: 150,overlap:1,col:0},
        {start: 160, end: 400,overlap:1,col:0},
        {start: 540, end: 600,overlap:1,col:0},
        {start: 610, end: 670,overlap:1,col:0}
    ];

    assert.deepEqual( res, list, "event list is arranged correctly." );
});