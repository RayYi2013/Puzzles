# README #

assignments for linkedIn.

### What is this repository for? ###

* requirement document: 'puzzles requirement.docx'
* High level design documents: 'Puzzle 1 High Level Design.docx', 'Puzzle 2 High Level Design.docx'
* Sub-folder 1, Puzzle One #1: simple web app to perform CRUD (create, read, update, delete) .
* Sub-folder 2, Puzzle Materials #2:  Given a set of events, render the events on a single day calendar 

### Setup Puzzle One #1 ###

####requirement before setup puzzle #1:'
* install play!framework
* install mongodb
 

####steps to setup:
* download all code
* go to folder '1'
* start mongodb,
* prepare test data: open mongo console, run scrip in the 'db/testdata.js' to create test data in collection 'employees' on db 'employee'.
* execute cmd 'activator' to start play!.
* open browser to 'localhost:9000', the web app will show up.

.

### Setup for Puzzle Materials #2 ###
* There is no additional requirement for puzzle #2.
####steps to setup:
* download all code
* go to folder '2'
* open index.html in browser.
* in developer console of browser, run below code to verify the globel method 'layOutDay'.

    <pre><code>
    var events = [
            {start: 30, end: 150},
            {start: 540, end: 600},
            {start: 560, end: 620},
            {start: 610, end: 670}
            ];
        layOutDay(events);
    </code></pre>
* unit test files are in test subfolder, test.js defines test cases, test.html show the test result. 
