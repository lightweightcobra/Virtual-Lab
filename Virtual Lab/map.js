var expression = "AB * CD = EFGH";

function createTable(tableData) {
  

  var table = document.createElement('table');
  //add class truth_table to table
  table.classList.add("truth_table");
  table.setAttribute("id","truth_table");

  


  var tableBody = document.createElement('tbody');
  var tableHead = document.createElement('thead');
  //make first row th
  var firstRow = document.createElement('tr');
  tableData[0].forEach(function(cellData) {
    var cell = document.createElement('th');
    if(cellData == " "){
      cell.classList.add("space");
      cell.appendChild(document.createTextNode(''));
    }
    else{cell.appendChild(document.createTextNode(cellData));}
    
    firstRow.appendChild(cell);
  });
  tableHead.appendChild(firstRow);
  


  for (var i = 1; i < tableData.length; i++) {
    var row = document.createElement('tr');
    tableData[i].forEach(function(cellData) {
      var cell = document.createElement('td');
      if(cellData == " "){
        cell.classList.add("space");
        cell.appendChild(document.createTextNode(''));
      }
      else{
        cell.appendChild(document.createTextNode(cellData));
      }
      
      row.appendChild(cell);
    });
    tableBody.appendChild(row);
  }

  table.appendChild(tableHead);
  table.appendChild(tableBody);
  
  if(document.getElementById("truth_table")){
    document.getElementById("truth_table").remove();
  }

  var div = document.getElementById('tablediv');
  div.appendChild(table);
  //if any table already exists, remove it
  
}

function enterExpressions(expressionData){
  //for every string in the list add it to the div with id expression_list
  var expressionList = document.getElementById("expressionDiv");
  
  //check if it has a child div with class expression, if so remove it
  if(document.getElementsByClassName("expressionText").length > 0){
    document.getElementsByClassName("expressionText")[0].remove();
  }


  //create a child div with class expression 
  var expressionDiv = document.createElement("div");
  expressionDiv.classList.add("expressionText");

  //now add all the expressions to the div
  for(var i = 0; i < expressionData.length; i++){
    var expression = document.createElement("p");
    expression.appendChild(document.createTextNode(expressionData[i]));
    expressionDiv.appendChild(expression);
  }
  expressionList.appendChild(expressionDiv);
}

function evaluateExpression(expression){
  //split the expression at the equal sign
  var splitExpression = expression.split("=");
  //split the left side of the expression at any arithmetic operators
  var leftSide = splitExpression[0].split(/[\+\-\*\/]/);
  //the right side is our output value, get it's length and character names

  var rightSide = splitExpression[1];
  var rightSideCharacters = rightSide.split("");
  rightSideCharacters = rightSideCharacters.filter(function(n){ return n != " " });
  var outputArray = [
    {
      character: rightSideCharacters,
      length: rightSideCharacters.length,
    }
  ];
  


  var inputArray = [];
  //loop through the left side of the expression
  for(var i = 0; i < leftSide.length; i++){
    var leftSideCharacters = leftSide[i].split("");
    leftSideCharacters = leftSideCharacters.filter(function(n){ return n != " " });
    inputArray.push({
      character: leftSideCharacters,
      length: leftSideCharacters.length,
    });
  }

  var equation_ = splitExpression[0].split(" ");
  equation_ = equation_.filter(function(n){ return n != "" });
  
  //! Evaluates the equation and returns the result (generates equation string from array), returns decimal num
  function evaluateReturner(valueArr,equation=equation_){
    //replace everything in equation with elements from valueArr if it is not an operator
    var count = 0;
    for(var i = 0; i < equation.length; i++){
      if(equation[i] != "+" && equation[i] != "-" && equation[i] != "*" && equation[i] != "/"){
        equation[i] = valueArr[count];
        count++;
      }
    }
    //join the equation array into a string
    var equationString = equation.join("");
    //evaluate the equation string
    var result = eval(equationString);
    return result;
  }

  //! Uses the input equation to generate truth table, returns decimal values
  function iterator(inputArray,value = []){
    if (inputArray.length == 0) {
      return [value.concat(evaluateReturner(value))];
    }
    var currInp = inputArray[0];
    var restInp = inputArray.slice(1);

    var output = [];
    var width = Math.pow(2, currInp.length);
    for (var i = 0; i < width; i++) {
      var lol = iterator(restInp, value.concat([i]));
      output = output.concat(lol);
    }
    return output;

  }

  //! Generates the header for the truth table
  function headergenerator(inputArray,outputArray){
    var header = [];
    var headerRow = [];
    for(var i = 0; i < inputArray.length; i++){
      for(var j = 0; j < inputArray[i].length; j++){
        header.push(inputArray[i].character[j]);
      }
      header.push(" ");
    }
    for(var i = 0; i < outputArray.length; i++){
      for(var j = 0; j < outputArray[i].length; j++){
        header.push(outputArray[i].character[j]);
      }}
    return header;
  }

  //!Generates the rules for padding the truth table
  function paddingRules(inputArray,outputArray){
    var paddingRules = [];
    for(var i = 0; i < inputArray.length; i++){
      paddingRules.push(inputArray[i].length);
    }
    for(var i = 0; i < outputArray.length; i++){
      paddingRules.push(outputArray[i].length);
    }
    return paddingRules;
  }


  //! Converts decimal to binary and pads with 0s
  function binarizer(num,length){
    var bin = num.toString(2);
    while(bin.length < length){
      bin = "0" + bin;
    }
    
    var binArr = bin.split("");
    return binArr;
  }

  function binaryTruthTableGenerator(inputArray,outputArray){
    var header = headergenerator(inputArray,outputArray);
    
    var truthTableDecimal = iterator(inputArray);
    var paddingRules_ = paddingRules(inputArray,outputArray);
    var truthTableBinary = [];
    for(var i = 0; i < truthTableDecimal.length; i++){
      var temp = [];
      for(var j = 0; j < truthTableDecimal[i].length; j++){
        temp = temp.concat(binarizer(truthTableDecimal[i][j],paddingRules_[j]));
        temp.push(" ");

      }
      temp.pop();
      truthTableBinary.push(temp);
    }
    truthTableBinary.unshift(header);
    return truthTableBinary;
  }

  function booleanSolver(binTruthTable){
    var inputLetters = [];
    var outputLetters = [];
    
    

    var firstRow = binTruthTable[0];
    var truthTable = binTruthTable.slice(1);
    for (var i = 0; i < firstRow.length; i++){
      if(firstRow[i] != " "){
        outputLetters.push({
          letter: firstRow[i],
          index: i,
        });
      }
      else {
        inputLetters = inputLetters.concat(outputLetters);
        outputLetters = [];
      }
    }



    var finalEquations = [];
    for (var outputIter = 0; outputIter < outputLetters.length; outputIter++){
      var outputLetter = outputLetters[outputIter].letter;
      var outputIndex = outputLetters[outputIter].index;

      var inputArray = [];

      //! If the output var is 1, push the input vars to the inputArray
      for(var i = 0; i < truthTable.length; i++){
        var temp = [];
        for(var j = 0; j < inputLetters.length; j++){
          if (truthTable[i][outputIndex] == 1){
            temp.push(truthTable[i][inputLetters[j].index]);
          }
        }
        if(temp.length != 0){
          inputArray.push(temp);
        }
        
      }

      var layers = [inputArray]
      var inputLength = inputLetters.length;
      while (true){
        var map = {};
        var lastLayer = layers[layers.length - 1].slice();
        var temp = [];
        //? Categorize based off the number of 1's
        for (var i = 0; i < layers[layers.length  - 1].length; i++){
          var temp = layers[layers.length  - 1][i].filter(function(n){ return n == 1 });
          if(temp.length in map){
            
          }
          else {
            map[temp.length] = [];
          }
          map[temp.length].push(layers[layers.length  - 1][i]);
        }

        var temp = []; //? Reseting temp
        var tempDupCheck = [];

        //? Check neighbouring bits
        
        //! Missing figuring out how to remove the merged arrays
        for (var i = 0; i < inputLength+1; i++){
          var next = i + 1;
          if(next == inputLength+1){
            next = 0;
          }
          if (map[i] != undefined && map[next] != undefined){
              for (var j = 0; j < map[i].length; j++){
                for (var k = 0; k < map[next].length; k++){
                  //see how many of the two arrays are the same
                  var diff = 0;
                  var index = 0;
                  for (var l = 0; l < map[i][j].length; l++){
                    if(map[i][j][l] != map[next][k][l]){
                      diff++;
                      index = l;
                    }
                  }
                  //? If difference is one, push to temp
                  if (diff == 1){
                    var index1 = lastLayer.indexOf(map[i][j]);
                    lastLayer.splice(index1,1);
                    var index2 = lastLayer.indexOf(map[next][k]);
                    lastLayer.splice(index2,1);

                    

                    var tempArr = map[i][j].slice();
                    tempArr[index] = "-";
                    if (tempDupCheck.indexOf(tempArr.join("")) == -1){
                      tempDupCheck.push(tempArr.join(""));
                      temp.push(tempArr);
                    }
                  }
                }
              }
            }
        }
        layers[layers.length - 1] = lastLayer;



        if (temp.length == 0){
          break
        }
        else {
      
          layers.push(temp);
        }

      }

      //ERROR: NEED TO REMOVE DUPLICATES

      //? Converting to an equation
      var finalEquation = "";
      finalEquation += outputLetter + " = ";

      for (var i = 0; i < layers.length; i++){
        for (var j = 0; j < layers[i].length; j++){
          var temp = "";
          for (var k = 0; k < layers[i][j].length; k++){
            if (layers[i][j][k] == 1){
              temp += inputLetters[k].letter;
            }
            else if (layers[i][j][k] == 0){
              temp += inputLetters[k].letter + "'";
            }
          }
          finalEquation += temp + " + ";
        }
      }
      finalEquation = finalEquation.slice(0,-3);
      finalEquations.push(finalEquation);


    }
    
    return finalEquations;



  }

  var binaryTruthTableGenerator_ = binaryTruthTableGenerator(inputArray,outputArray);
  var finalEquations = booleanSolver(binaryTruthTableGenerator_);
  enterExpressions(finalEquations);
  createTable(binaryTruthTableGenerator_);


}

evaluateExpression(expression);
function validate(){
  var expression = document.getElementById("expression").value;
  evaluateExpression(expression);
  return false;
}
