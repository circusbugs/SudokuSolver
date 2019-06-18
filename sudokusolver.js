var rows = []
// rows[0] = [1,1,1,1,1,1,1,1,1]
// rows[1] = [2,2,2,2,2,2,2,2,2]
// rows[2] = [3,3,3,3,3,3,3,3,3]
// rows[3] = [4,4,4,4,4,4,4,4,4]
// rows[4] = [5,5,5,5,5,5,5,5,5]
// rows[5] = [6,6,6,6,6,6,6,6,6]
// rows[6] = [7,7,7,7,7,7,7,7,7]
// rows[7] = [8,8,8,8,8,8,8,8,8]
// rows[8] = [9,9,9,9,9,9,9,9,9]

// rows[0] = [1,2,3,4,5,6,7,8,9]
// rows[1] = [1,2,3,4,5,6,7,8,9]
// rows[2] = [1,2,3,4,5,6,7,8,9]
// rows[3] = [1,2,3,4,5,6,7,8,9]
// rows[4] = [1,2,3,4,5,6,7,8,9]
// rows[5] = [1,2,3,4,5,6,7,8,9]
// rows[6] = [1,2,3,4,5,6,7,8,9]
// rows[7] = [1,2,3,4,5,6,7,8,9]
// rows[8] = [1,2,3,4,5,6,7,8,9]

// rows[0] = [1, 2, 3, 4, 5, 6, 7, 8, 9]
// rows[1] = [7, 8, 9, 1, 2, 3, 4, 5, 6]
// rows[2] = [4, 5, 6, 7, 8, 9, 1, 2, 3]
// rows[3] = [3, 1, 2, 8, 4, 5, 9, 6, 7]
// rows[4] = [6, 9, 7, 3, 1, 2, 8, 4, 5]
// rows[5] = [8, 4, 5, 6, 9, 7, 3, 1, 2]
// rows[6] = [2, 3, 1, 5, 7, 4, 6, 9, 8]
// rows[7] = [9, 6, 8, 2, 3, 1, 5, 7, 4]
// rows[8] = [5, 7, 4, 9, 6, 8, 2, 3, 1]

// solveable stage 1
// rows[0] = [null, null, null, null, 8, null, null, 1, 7]
// rows[1] = [4, 8, 3, null, null, null, null, null, 9]
// rows[2] = [9, 1, null, null, 6, 3, null, 8, null]
// rows[3] = [8, null, 5, 3, null, null, null, 7, null]
// rows[4] = [null, 2, 9, null, null, 1, null, null, 4]
// rows[5] = [null, null, 1, null, 4, null, 2, null, null]
// rows[6] = [null, 7, 6, 4, null, 5, null, null, null]
// rows[7] = [1, null, null, 6, null, null, null, 4, 5]
// rows[8] = [null, null, null, 1, null, null, null, 9, 3]

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

// rows[0] = [1,2,3,4,5,6,7,8,9]
// rows[1] = [2,3,4,5,6,7,8,9,1]
// rows[2] = [3,4,5,6,7,8,9,1,2]
// rows[3] = [4,5,6,7,8,9,1,2,3]
// rows[4] = [5,6,7,8,9,1,2,3,4]
// rows[5] = [6,7,8,9,1,2,3,4,5]
// rows[6] = [7,8,9,1,2,3,4,5,6]
// rows[7] = [8,9,1,2,3,4,5,6,7]
// rows[8] = [9,1,2,3,4,5,6,7,8]

function doThis () {
  solve(rows)
}
function doThisFaster () {
  solveFaster()
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

function clear () {
  for (var i = 0; i < rows.length; i++) {
    var row = rows[i]
    for (var j = 0; j < row.length; j++) {
      row[j] = null
    }
  }
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

function setArray () {
  var array = []
  for (var i = 0; i < rows.length; i++) {
    array[i] = []
    var row = rows[i]
    var arr = array[i]
    for (var j = 0; j < row.length; j++) {
      var num = row[j]
      arr[j] = num
    }
  }
  return array
}

function solve () {
  var testArr = setArray()
  var start = 0
  for (var i = 0; i < testArr.length; i++) {
    var row = testArr[i]
    // var tries = 0
    for (var j = start; j < row.length; j++) {
      // tries = 1
      if (row[j] === null) {
        var horizontal = getHorizontalChoices(row)
        var vertical = getVerticalChoices(testArr, j)
        var tri = getTriChoices(testArr, i, j)
        var shortest = getShortest(horizontal, vertical, tri)
        var available = getAllAvailable(horizontal, vertical, tri, shortest)
        if (available.length > 0) {
          if (available.length = 1) {
            row[j] = available[0]
          } else { row[j] = available[random(0, available.length)] }
          // fillWithArray(testArr)
        } else {
          // start = j - 1 - tries
          i = -1

          //  testArr = setPartialArray(testArr, i, )
          testArr = setArray()
          // fillWithArray(testArr)
          //  var newCopy = copy.slice(0)
          // testArr = newCopy.slice(0)
          // checkagain = true
          break
        }
      }
    }
  }
  rows = testArr.slice(0)
  fillWithArray(rows)
}

function setPartialArray (arr, r, c) {
  for (var i = r; i < rows.length; i++) {
    var row = rows[i]
    for (var j = c; j < row.length - c; j++) {
      arr[i][j] = row[j]
    }
  }
  return arr
}

// function populateChoices (arr) {
//   var choiceArr = []
//   for (var i = 0; i < arr.length; i++) {
//     var row = arr[i]
//     choiceArr[i] = []
//     for (var j = 0; j < row.length; j++) {
//       if (arr[i][j] == null) {
//         choiceArr[i][j] = []
//         var h = getHorizontalChoices(row)
//         var v = getVerticalChoices(arr, j)
//         var t = getTriChoices(arr, i, j)
//         var shortest = getShortest(h, v, t)
//         choiceArr[i][j] = getAllAvailable(h, v, t, shortest)
//         if (choiceArr[i][j].length == 1) {
//           return choiceArr
//         }
//       } else choiceArr[i][j] = null
//     }
//   }
//   return choiceArr
// }
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

function solveFaster () {
  var arr = setArray()
  var tryit = true
  var choiceArr = getChoices(arr)
  // var choiceArr = []
  // for (var i = 0; i < arr.length; i++) {
  //   var row = arr[i]
  //   choiceArr[i] = []
  //   for (var j = 0; j < row.length; j++) {
  //     if (arr[i][j] == null) {
  //       choiceArr[i][j] = []
  //       var h = getHorizontalChoices(row)
  //       var v = getVerticalChoices(arr, j)
  //       var t = getTriChoices(arr, i, j)
  //       var shortest = getShortest(h, v, t)
  //       choiceArr[i][j] = getAllAvailable(h, v, t, shortest)

  //     //   if (choiceArr[i][j].length == 1) {
  //     //     arr[i][j] = choiceArr[i][j][0]
  //     //     i = -1
  //     //     break
  //     //   }
  //     // } else {
  //     //   choiceArr[i][j] = null
  //     // }
  //   }
  // }

// for (var i = 0; i < choiceArr.length; i++) {
//    for (var j = 0; j < choiceArr[i].length; j++) {
//       if(choiceArr[i][j] != null && choiceArr[i][j].length == 1) {
//         arr[i][j] = choiceArr[i][j][0]
//         choiceArr = getChoices(arr)
//         i = -1
//         break
//       }
//     }
//  }

while(!isFilled(arr)){
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
    for(var i = 0; i < 9; i++) {
      for(var j = 0; j < 9; j++) {
        if(choiceArr[i][j] != null && choiceArr[i][j].length > 0 && arr[i][j] == null) {
          arr[random(0, choiceArr[i][j].length)]
        }
      }
    }
  }
  // if(!isFilled(arr)) {

  // }
  // if(isFilled(arr)){
    rows = arr.slice(0)
    fillWithArray(rows)
  //}
}

function isFilled(arr) {
  for(var i = 0; i <9; i++) {
    for(var j = 0; j < 9; j++) {
      if(arr[i][j] == null)
        return false
    }
  }
  if(!checkIssues())
    return false
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
