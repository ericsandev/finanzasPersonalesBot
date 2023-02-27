//search @BotFather, enter "/newbot", give name & username, copy the token given 
var token = "[TOKEN_BOT]";
var telegramUrl = "https://api.telegram.org/bot" + token;
//click publish tab, deploy as app, new project version, set anyone even anon has access and allow access using gmail
//copy the full URL https://script.google.com/macros/s/...
var webAppUrl = "[TU_WEBAPPURL]&allowed_updates=['callback_query','message']&drop_pending_updates=True";

//set webhook, dont forget to run this function first
function setWebhook() {
  var url = telegramUrl + "/setWebhook?url=" + webAppUrl;
  var response = UrlFetchApp.fetch(url);
}

//delete webhook
function deleteWebhook() {
  var url = telegramUrl + "/deleteWebhook";
  var response = UrlFetchApp.fetch(url);
}

//send message to sender
function sendMessage(id, text) {
  var url = telegramUrl + "/sendMessage?chat_id=" + id + "&text=" + text;
  var options = {
    muteHttpExceptions: true
  };
  var response = UrlFetchApp.fetch(url, options);
  Logger.log(response.getContentText());
}

function doPost(e) {
  if (e && e.postData && e.postData.type === 'application/json') {
      //contents of the message sent to bot
      var contents = JSON.parse(e.postData.contents || '{}');
      //UserId of the sender
      var id = contents.message.from.id;
      //Text of the message
      var text = contents.message.text;
      //User's first name
      var first_name = contents.message.from.first_name;
      //check if sender's id is the same with the owner's id, you can allow for more than 1 user by adding ||
      //Search @userinfobot in telegram to get your UserId, then replace it to the code below
      if(id === [USER_ID_TELEGRAM]) {
        //get your spreadsheet id after https://docs.google.com/spreadsheets/d/...
        var ssId = "[ID_GOOGLE_SHEET]";
        //open the spreadsheet and choose which sheet
        var expenseSheet = SpreadsheetApp.openById(ssId).getSheetByName("Sheet1");
          
        if (text == "Presupuesto") {
          var budget = expenseSheet.getDataRange().getCell(1,2).getValue();
          sendMessage(id, `Hola ${first_name}, tu presupuesto asignado es $ ${budget}`);

        }
        else if(text.substring(0, 14) == "Presupuesto +") {
          var item = text.split("+");
          //check if the value after + sign is a number
          if( !isNaN(parseFloat(item[1])) && !isNaN(item[1] - 0) ) {
            //get value of current budget in the cell
            var budget = expenseSheet.getDataRange().getCell(1,2).getValue();
            //must parseFloat first because .getValue() return an object. If not it will concat string with item[1]
            var newBudget = parseFloat(budget) + parseFloat(item[1]);
            //get B1 budget cell, clear the content(withou clearing the formula), and set the new sum value
            var budgetCell = expenseSheet.getRange("B1");
            budgetCell.clearContent();
            budgetCell.setValue(newBudget);
            sendMessage(id, "Se actualizo el presupuesto de $" + budget + " a $" + newBudget);
          }
          else {
            //cannot pass '+' sign to telegram because + means space in URI
            //refer https://www.w3schools.com/jsref/jsref_encodeuricomponent.asp
            var failReason = "El formato debe ser: Presupuesto + [cantidad] donde [cantidad] debe ser un número";
            var encodePlusSign = encodeURIComponent(failReason);
            sendMessage(id, encodePlusSign);
          }
        }
        else if (text == "Gastos") {
          var expenses = expenseSheet.getDataRange().getCell(2,2).getValue();
          sendMessage(id, `Total gastos = $${expenses}`);
        }
        else if (text == "Balance") {
          var balance = expenseSheet.getDataRange().getCell(3,2).getValue();
          sendMessage(id, "Balance restante = $" + balance);
        }
        else if (text == "Eliminar anterior") {
          //get the last row in the sheet
          var lastRow = expenseSheet.getLastRow();
          //if the last row is 4th row, stop deleting, otherwise the header will be deleted too!
          if (lastRow > 4.0) {
            //only get the value of item and price, not date. this is to inform user which one will be deleted
            var lastRowValues = expenseSheet.getRange(lastRow, 2, 1, 2);
            sendMessage(id, "Se eliminó: " + lastRowValues.getValues() );
            //delete the entire row
            expenseSheet.deleteRow(lastRow);
          }
          else {
            sendMessage(id, "No hay más productos en la hoja.");
          }
        }
        else {
          if(text.indexOf("-") >= 0) {
            var nowDate = new Date;
            var reformatedDate = nowDate.getDate() + "/" + (nowDate.getMonth() + 1) + "/" + nowDate.getFullYear() ;
            //split the message into array, the word before - sign is item[0] while the price after - is item[1]
            var item = text.split("-");
            //check if the price after - sign is a number
            if( !isNaN(parseFloat(item[1])) && !isNaN(item[1] - 0) ) {
              expenseSheet.appendRow([reformatedDate, item[0], item[1]]);
            }
            else {
              sendMessage(id, "Debes cumplir el formato: [producto] - [precio] en donde [precio] debe ser un número");
            }
          }
          else {
            sendMessage(id, "Debes cumplir con el formato: [producto] - [precio]");
          }
        }
      }
      else {
        sendMessage(id, `Hola ${first_name}, no estás autorizado para usar este bot 😬.`);
      }
  }
}

