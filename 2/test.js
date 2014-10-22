/**
 * Created by RYi on 10/21/2014.
 */

QUnit.test( "event manager test", function( assert ) {
    var events = [
        {start: 30, end: 150},
        {start: 540, end: 600},
        {start: 560, end: 620},
        {start: 610, end: 670}
    ];
    var list = (new DayEventsManager(events)).list;

    var res = [{"start":30,"end":150,"overlap":1,"col":0},{"start":540,"end":600,"overlap":2,"col":0},{"start":560,"end":620,"overlap":2,"col":1},{"start":610,"end":670,"overlap":2,"col":0}];
//    console.log(JSON.stringify(list));
//    assert.ok( list, "get event list" );
//    assert.ok( list.length===4, "get correct events" );
    assert.deepEqual( res, list, "event list is arranged correctly." );

});