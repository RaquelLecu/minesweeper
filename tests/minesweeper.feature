Feature: Minesweeper
#hiden = x
#To do this layout, you must enter the url parameter ?mockDemo=1x2
#mockDemo=1x2   ->  Test 1x2
#  value            cell
#  |*|1|          |1-1|1-2|
#
#To do this layout, you must enter the url parameter ?mockDemo=3X3
#mockDemo=3x3   ->  Test 3x3
#  value            cell
# |*|1| |       |1-1|1-2|1-3|
# |2|3|2|       |2-1|2-2|2-3|
# |1|*|*|       |3-1|3-2|3-3|

#
#To do this layout, you must enter the url parameter ?mockDemo=4X5
#mockDemo=4x5   ->  Test 4x5
#|1|1| | | |
#|*|1| | | |
#|1|2|1|1| |
#| |1|*|1| |
#
#To do this layout, you must enter the url parameter ?mockDemo=8x8&status=exposed
#mockDemo=8x8&status=exposed    ->  8x8
# all cells exposed

# The "Mines Counter" display is the amount of mines that are no tagged as mined

Background: 
Given a user opens the app

Scenario Outline: Default display screen -> Default Mines Counter value
Given the user load the test board: "<mockDemo>"
Then in the mines counter display should be <counter>

Examples:
| mockDemo | counter |
|       3x3|        3|
|       1x2|        1|
|       4x5|        2|
|       8x8|       10|

Scenario: Default display screen -> Default timer value
Then the time display should be: 0

Scenario: Default display screen -> Default face status
Then the button face should be "happy"

Scenario: Default display screen -> All the cell must be hidden
Then all the cells in the minefield should be "hidden"
@todo
Scenario: The user believes that there is a mine in a cell -> Tagging a cell as mined
When the user tags the "1-1" cell as "mined"
Then the cell "1-1" should show the "mined" symbol
@todo
Scenario: the user can't predict the value of a cell -> tagging a cell as questionable
When the user tags the "1-1" cell as "questionable"
Then the cell "1-1" should show the "question" symbol

Scenario Outline: Tagging cells -> Mines counter
Given the user tags the  "1-1" cell  as <tag>
And the mines counter display show <mines> mines
When the user put the <tag> tag on a "1-1" cell
Then the mines counter display should be <mines> mines

Examples:
|   tag     |  mines  |    tag    |  mines  |
|    "blank"|       10|     "flag"|        9|
|     "flag"|        9| "question"|       10|
| "question"|       10|    "blank"|       10|

@mockDemo=1x2
Scenario: Tagging mines incorrectly as mined -> Mine counter is negative
Given the user load the test board: "1x2"
And the user tags as mined the "1-1" cell
And the mine counter is: 0
When the user tags as mined the "1-2" cell
Then the mines counter should be: -1

@mockDemo=3x3
Scenario Outline: Exposing a cell with mine -> all the mines will be exposed
Given the user load the test board: "3x3"
When the user exposes the "3-3" cell
Then the board should display the next information:
"""
|*|x|x|
|x|x|x|
|x|*|*| 
"""

@mockDemo=3x3
Scenario Outline: Exposing a cell without mine and with adyacent mines -> counting number of adjacent mines
Given the user load the test board: "3x3"
When the user exposes the <cell> cell
Then the <cell> cell should show value <value>

Examples:
| cell | value |
|   1-2|      1|
|   2-1|      2|
|   2-2|      3|

@mockDemo=3x3
Scenario: Revealing a cell without mine and no adyacent mines -> The cell is empty
Given the user load the test board: "3x3"
When the user exposes the "1-3" cell
Then the cell "1-3" should be empty

@mockDemo=3x3
Scenario: exposing an empty cell -> Reveal adyacent cells
Given the user load the test board: "3x3"
When the user exposes the "1-3" cell
Then the board should display the next information:
"""
|X|1| |
|x|3|2|
|x|X|X| 
"""

@mockDemo=4x5
Scenario: A cell exposed by a neighbour -> If the cell is empty -> Reveal adyacent cells
Given the user load the test board: "4x5"
When the user exposes the "1-4" cell
Then the board should display the next information:
"""
|x|1| | | |
|x|1| | | |
|x|2|1|1| |
|x|x|x|1| |
"""

@mockDemo=1x2
Scenario: Win the game -> tagger all cells mined
Given the user load the test board: "1x2"
When the user exposes the "1-2" cell
Then "1-1" cell have tag "flag"

@mockDemo=1x2
Scenario Outline: lose or win the game -> Changing the button face 
Given the user load the test board: "1x2"
When the user presses the <cell> cell
Then the face button should be <face>

Examples:
|  cell  |  face  |
|     1-1|   "sad"|
|     1-2|  "cool"|

@mockDemo=1x2
Scenario Outline: Lose or win the game -> disabling cell 
Given the user load the test board: "1x2"
When the user presses the <cell> cell
Then all cells are disabled

Examples:
|  cell  |
|     1-1|
|     1-2|

Scenario: Resetting the game
Given a "1-1" cell exposed
When the user presses the face button
Then reset the game 

Scenario: Exposing a cell  with mouse
When the user presses the left mouse button on the cell
Then the cell should be "exposed"

Scenario Outline: Tagging a cell with mouse
Given "1-1" cell shows the <tag> tag
When the user presses the right mouse button on the "1-1" cell
Then "1-1" cell should shows the <tag> tag

Examples:
|    tag    |    tag    |
|    "blank"|     "flag"|
|     "flag"| "question"|
| "question"|    "blank"|

@mockDemo=8x8&status=exposed @manual
Scenario: adding random mines and numbers values (perform minimum 5 times)
Given the user load the test board: "8x8"
And the user request to see the hidden mines
Then there should be 10 random mines in the minefield
And the cells surrounding have number value as amount of mines value

@mockDemo=3x3 @manual
Scenario: Counting the seconds of game time
Given the user load the test board: "3x3"
When the user presses on "1-2" cell
And let 5 seconds pass
Then the time display should be show 5 seconds

@mockDemo=1x2 @manual
Scenario Outline: Stoping the time when win or lose game
Given the user load the test board: "1x2"
When the user exposed a <cell> cell
Then the time should be stoped

Examples:
|  cell  |
|     1-1|
|     1-2|