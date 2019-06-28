var rows = []

// unsolveable stage 1
rows[0] = [null, 3, null, null, 7, 5, 4, null, null]
rows[1] = [null, null, null, null, null, 6, null, null, 8]
rows[2] = [null, 9, null, 3, null, null, null, 7, null]
rows[3] = [null, 5, null, null, null, 2, null, null, 4]
rows[4] = [2, null, null, 7, 6, 3, null, null, 1]
rows[5] = [6, null, null, 9, null, null, null, 8, null]
rows[6] = [null, 6, null, null, null, 1, null, 2, null]
rows[7] = [9, null, null, 5, null, null, null, null, null]
rows[8] = [null, null, 2, 6, 8, null, null, 4, null]

function doThisFaster () {
  var arr = deepClone(rows)
  let { solved, grid } = solveFaster(arr)
  console.log(`doThisFaster = ${solved}`);
  fillWithArray(grid)
}

function fillA () {
  fillWithArray(rows)
}

function checkIssues () {
  update()
  var v = checkVertical()
  var h = checkHorizontal()
  var t = checkTri()

  if (v && h && t) { 
    document.getElementById('issueLog').innerHTML = 'No problems here!' 
    return true
}
else return false
}


function fillWithArray (arr) {
  for (var i = 0; i < arr.length; i++) {
    var row = arr[i]
    for (var j = 0; j < row.length; j++) {
      var id = '' + i + '' + j
      if (row[j]) { document.getElementById(id).setAttribute('value', row[j]) }
    }
  }
}

function update () {
  for (var i = 0; i < rows.length; i++) {
    var row = rows[i]
    for (var j = 0; j < row.length; j++) {
      var id = '' + i + '' + j
      var parsed = parseInt(document.getElementById(id).value, 10)
      if (isNaN(parsed)) {
			 row[j] = null
      } else {
        row[j] = parsed
      }
    }
  }
}

function deepClone(toClone) {
  var cloned = []
  for (var i = 0; i < toClone.length; i++) {
    cloned[i] = []
    var row = toClone[i]
    var arr = cloned[i]
    for (var j = 0; j < row.length; j++) {
      var num = row[j]
      arr[j] = num
    }
  }
  return cloned
}

function getChoices (arr) {
  var choiceArr = []
  for (var i = 0; i < arr.length; i++) {
    var row = arr[i]
    choiceArr[i] = []
    for (var j = 0; j < row.length; j++) {
      if (arr[i][j] == null) {
        choiceArr[i][j] = []
        var h = getHorizontalChoices(row)
        var v = getVerticalChoices(arr, j)
        var t = getTriChoices(arr, i, j)
        var shortest = getShortest(h, v, t)
        choiceArr[i][j] = getAllAvailable(h, v, t, shortest)
      }
    }
  }
  return choiceArr
}

function solveFaster (arr) {
  
  var choiceArr = getChoices(arr)
  for (var i = 0; i < 9; i++) {
    var check1 = false
    var countH = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    var cellH = [null, null, null, null, null, null, null, null, null]
    var countV = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    var cellV = [null, null, null, null, null, null, null, null, null]

   for (var j = 0; j < 9; j++) {
      check1 = false
      if (choiceArr[i][j] != null && choiceArr[i][j].length > 0) {
        if (choiceArr[i][j].length == 1) { // Getting all that only have one option
          arr[i][j] = choiceArr[i][j][0]
          choiceArr = getChoices(arr)
          i = -1
          check1 = true
          break
        }
          for (var count = 1; count <= 9; count++) {
            if (choiceArr[i][j].indexOf(count) > -1) {
              countH[count - 1]++
              cellH.splice(count - 1, 1, [i, j])
            }
          }
        }
        if (choiceArr[j][i] != null && choiceArr[j][i].length > 0) {
          for (var count = 1; count <= 9; count++) {
            if (choiceArr[j][i].indexOf(count) > -1) {
              countV[count - 1]++
              cellV.splice(count - 1, 1, [i, j])
            }
          }
        }
      }
    
      if (check1 != true) {
        if (countH.indexOf(1) > -1) {
          var num = countH.indexOf(1) + 1
          var cell = cellH[countH.indexOf(1)]
          var x = cell[0] 
          var y = cell[1]
          arr[x][y] = num
          choiceArr = getChoices(arr)
          i = -1
        
        } else if (countV.indexOf(1) > -1) {
          var num = countV.indexOf(1) + 1
          var cell = cellV[countV.indexOf(1)]
          var x = cell[0]
          var y = cell[1]
          arr[y][x] = num
          choiceArr = getChoices(arr)
          i = -1
        }
      }
    }

    return bruteForce(arr);
}

function findUnfilled(arr) {
  let unfilled = null;
  for(var i = 0; i < 9; i++) {
    for(var j = 0; j < 9; j++) {
      if (arr[i][j] == null) {
        unfilled = [i, j];
        break;
      }
    }
  }
  return unfilled;
}

function bruteForce(arr) {
  // Find the first unfilled spot
  let unfilled = findUnfilled(arr);

  // We filled in everything using the above techniques
  if (unfilled == null) {
    return { solved: true, grid: arr };
  }

  let choiceArr = getChoices(arr);
  let [i, j] = unfilled;

  // Error if we don't have choices for an unfilled spot
  if(choiceArr[i][j] == null || choiceArr[i][j].length <= 1) {
    return { solved: false, grid: arr };
  }

  // Brute force the remaining possibilities
  for (var k = 0; k < choiceArr[i][j].length; k++) {
    var choice = choiceArr[i][j][k];
    var temparr = deepClone(arr)
    temparr[i][j] = choice
    let { solved, grid } = solveFaster(temparr);
    if (solved) {
      return { solved: true, grid: grid };
    }
  }
  return { solved: false, grid: arr };
}

function isFilled(arr) {
  for(var i = 0; i <9; i++) {
    for(var j = 0; j < 9; j++) {
      if(arr[i][j] == null)
        return false
    }
  }
  // if(!checkIssues())
  //   return false
  return true;
}



function random (start, end) {
  return Math.floor((Math.random() * end) + start)
}

function getAllAvailable (h, v, t, shortest) {
  var arr = []
  for (var i = 0; i < shortest.length; i++) {
    if (h.indexOf(shortest[i]) > -1 && v.indexOf(shortest[i]) > -1 && t.indexOf(shortest[i]) > -1) {
      arr.push(shortest[i])
    }
  }
  return arr
}

function getTriChoices (array, rowIndex, columnIndex) {
  var available = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  var triValues = []
  if (rowIndex % 3 == 0) {
    if (columnIndex % 3 == 0) {
      // 0 X X
      // X X X
      // X X X
      triValues = [array[rowIndex][columnIndex],
        array[rowIndex][columnIndex + 1],
        array[rowIndex ][columnIndex + 2],
        array[rowIndex + 1][columnIndex],
        array[rowIndex + 1][columnIndex + 1],
        array[rowIndex + 1][columnIndex + 2],
        array[rowIndex + 2][columnIndex],
        array[rowIndex + 2][columnIndex + 1],
        array[rowIndex + 2][columnIndex + 2]]
    } else if (columnIndex % 3 == 1) {
      // X 0 X
      // X X X
      // X X X
      triValues = [array[rowIndex][columnIndex - 1],
        array[rowIndex][columnIndex],
        array[rowIndex][columnIndex + 1],
        array[rowIndex + 1][columnIndex - 1],
        array[rowIndex + 1][columnIndex],
        array[rowIndex + 1][columnIndex + 1],
        array[rowIndex + 2][columnIndex - 1],
        array[rowIndex + 2][columnIndex],
        array[rowIndex + 2][columnIndex + 1]]
    }
    // X X 0
    // X X X
    // X X X
    else if (columnIndex % 3 == 2) {
      triValues = [array[rowIndex][columnIndex - 2],
        array[rowIndex][columnIndex - 1],
        array[rowIndex][columnIndex],
        array[rowIndex + 1][columnIndex - 2],
        array[rowIndex + 1][columnIndex - 1],
        array[rowIndex + 1][columnIndex],
        array[rowIndex + 2][columnIndex - 2],
        array[rowIndex + 2][columnIndex - 1],
        array[rowIndex + 2][columnIndex]]
    }
  } else if (rowIndex % 3 == 1) {
    // X X X
    // 0 X X
    // X X X
    if (columnIndex % 3 == 0) {
      triValues = [array[rowIndex - 1][columnIndex],
        array[rowIndex - 1][columnIndex + 1],
        array[rowIndex - 1][columnIndex + 2],
        array[rowIndex][columnIndex],
        array[rowIndex][columnIndex + 1],
        array[rowIndex][columnIndex + 2],
        array[rowIndex + 1][columnIndex],
        array[rowIndex + 1][columnIndex + 1],
        array[rowIndex + 1][columnIndex + 2]]
    }
    // X X X
    // X 0 X
    // X X X
    else if (columnIndex % 3 == 1) {
      triValues = [array[rowIndex - 1][columnIndex - 1],
        array[rowIndex - 1][columnIndex],
        array[rowIndex - 1][columnIndex + 1],
        array[rowIndex][columnIndex - 1],
        array[rowIndex][columnIndex],
        array[rowIndex][columnIndex + 1],
        array[rowIndex + 1][columnIndex - 1],
        array[rowIndex + 1][columnIndex],
        array[rowIndex + 1][columnIndex + 1]]
    }
    // X X X
    // X X 0
    // X X X
    else if (columnIndex % 3 == 2) {
      triValues = [array[rowIndex - 1][columnIndex - 2],
        array[rowIndex - 1][columnIndex - 1],
        array[rowIndex - 1][columnIndex],
        array[rowIndex][columnIndex - 2],
        array[rowIndex][columnIndex - 1],
        array[rowIndex][columnIndex],
        array[rowIndex + 1][columnIndex - 2],
        array[rowIndex + 1][columnIndex - 1],
        array[rowIndex + 1][columnIndex]]
    }
  } else if (rowIndex % 3 == 2) {
    // X X X
    // X X X
    // 0 X X
    if (columnIndex % 3 == 0) {
      triValues = [array[rowIndex - 2][columnIndex],
        array[rowIndex - 2][columnIndex + 1],
        array[rowIndex - 2][columnIndex + 2],
        array[rowIndex - 1][columnIndex],
        array[rowIndex - 1][columnIndex + 1],
        array[rowIndex - 1][columnIndex + 2],
        array[rowIndex][columnIndex],
        array[rowIndex][columnIndex + 1],
        array[rowIndex][columnIndex + 2]]
    }
    // X X X
    // X X X
    // X 0 X
    else if (columnIndex % 3 == 1) {
      triValues = [array[rowIndex - 2][columnIndex - 1],
        array[rowIndex - 2][columnIndex],
        array[rowIndex - 2][columnIndex + 1],
        array[rowIndex - 1][columnIndex - 1],
        array[rowIndex - 1][columnIndex],
        array[rowIndex - 1][columnIndex + 1],
        array[rowIndex][columnIndex - 1],
        array[rowIndex][columnIndex],
        array[rowIndex][columnIndex + 1]]
    }
    // X X X
    // X X X
    // X X 0
    else if (columnIndex % 3 == 2) {
      triValues = [array[rowIndex - 2][columnIndex - 2],
        array[rowIndex - 2][columnIndex - 1],
        array[rowIndex - 2][columnIndex],
        array[rowIndex - 1][columnIndex - 2],
        array[rowIndex - 1][columnIndex - 1],
        array[rowIndex - 1][columnIndex],
        array[rowIndex][columnIndex - 2],
        array[rowIndex][columnIndex - 1],
        array[rowIndex][columnIndex]]
    }
  }

  for (var i = 0; i < triValues.length; i++) {
    var index = available.indexOf(triValues[i])
    if (index > -1) { available.splice(index, 1) }
  }
  return available
}

function getVerticalChoices (array, column) {
  var available = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  for (var i = 0; i < array.length; i++) {
    if (array[i][column] !== null) {
      var index = available.indexOf(array[i][column])
      if (index > -1) { available.splice(index, 1) }
    }
  }
  return available
}

function getHorizontalChoices (row) {
  var available = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  for (var i = 0; i < row.length; i++) {
    if (row[i] !== null) {
      var index = available.indexOf(row[i])
      if (index > -1) { available.splice(index, 1) }
    }
  }
  return available
}

function getShortest (h, v, t) {
  var shortest = h
  if (shortest.length > v.length) {
    shortest = v
  }
  if (t.length < shortest.length) { shortest = t }
  return shortest
}

function checkVertical () {
  var check = true
  for (var i = 0; i < 9; i++) {
    var row = rows[i]
    for (var j = 0; j < 9; j++) {
      var num = row[j]
      for (var k = i + 1; k < 9; k++) {
        if (num === rows[k][j]) {
          document.getElementById('issueLog').innerHTML = 'false vertically at ' + k + ', ' + j + ' and ' + i + ', ' + j
          check = false
        }
      }
    }
  }
  return check
}

function checkHorizontal () {
  var check = true
  for (var i = 0; i < 9; i++) {
    var row = rows[i]
    for (var j = 0; j < 9; j++) {
      var num = row[j]
      for (var k = j + 1; k < 9; k++) {
        if (num === row[k]) {
          document.getElementById('issueLog').innerHTML = 'false horizontally at ' + i + ', ' + k + ' and ' + i + ', ' + j
          check = false
        }
      }
    }
  }
  return check
}

/*
    Check each "tri" to find if there are any issues, such as blank spaces or 

*/


function checkTri () {
  var checktrue = true
  var nextH = 0
  var nextV = 0
  var currH = 0
  var currV = 0
  for (var i = 0; i < 9; i++) {
    var arr = []
    var check = false
    if (i != 0 && i % 3 == 0) {
      nextV = i
      nextH = 0
    }
    for (var j = nextH; j < 9; j++) {
      currH = j
      if (j != 0 && (j % 3 == 0) && check) {
        break
      }
      check = true
      nextH = j + 1
      for (var k = nextV; k < 9; k++) {
        currV = k
        arr.push(rows[j][k])
        if (k != 0 && (k + 1) % 3 == 0) {
          break
        }
      }
    }
    for (var l = 0; l < arr.length; l++) {
      for (var m = l + 1; m < arr.length; m++) {
        if (arr[l] == arr[m]) {
          document.getElementById('issueLog').innerHTML = 'false in 3x3 in section ' + Math.floor((currH - 1) / 3) + ', ' + Math.floor((currV - 1) / 3)
          checktrue = false
        }
      }
    }
  }
  return checktrue
}
