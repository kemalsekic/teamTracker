const userEmailAddress = Session.getActiveUser().getEmail();
Logger.log(userEmailAddress);

function doGet(){
    if(checkUserEmail("QA")){
    return HtmlService.createHtmlOutputFromFile('qa');
  }else{
    Logger.log("User does not have permission.");
  }
}

//                                  ********                                    //

//----------------------------------Assigning Spreadsheet----------------------------------//
const ashSS = SpreadsheetApp.getActiveSpreadsheet();
//----------------------------------Assigning Spreadsheet----------------------------------//

//                                  ********                                    //

//----------------------------------Assigning Worksheet----------------------------------//
const ashWS = ashSS.getSheetByName('Complete');
const ashTrackWS = ashSS.getSheetByName('Tracker');
const masterWS = ashSS.getSheetByName('Master');
//----------------------------------Assigning Worksheet----------------------------------//

//                                  ********                                    //

//                                  ********                                    //

//---------------------------Create Menu when sheet is opened---------------------------//
function onOpen(){
  var ui=SpreadsheetApp.getUi();
  var menu = ui.createMenu("FMV Tracker");
  
  var labSubMenu = ui.createMenu("Labelers");
  labSubMenu.addItem("Attempt", "showFormAttempt");
  labSubMenu.addItem("R0", "showFormR0");
  labSubMenu.addItem("R1", "showFormR1");
  labSubMenu.addItem("R10", "showFormR10");
  menu.addSubMenu(labSubMenu);

  var qaSubMenu = ui.createMenu("QA");
  qaSubMenu.addItem("Tools","showQAForm");
  menu.addSubMenu(qaSubMenu);

  labSubMenu.addSeparator();
  menu.addSeparator();
  menu.addItem("Metrics","viewMets");
  menu.addSeparator();
  menu.addToUi();
}
//---------------------------Create Menu when sheet is opened---------------------------//

//                                  ********                                    //

//---------------------------Display Forms on button click---------------------------//

function getCurrentEmail(){
  return Session.getActiveUser().getEmail();
}

function checkUserEmail(reviewLevel){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var ws = ss.getSheetByName("userCreds");
  userEmail = ws.getRange(2,8,25).getValues();
  revLevel = ws.getRange(2,6,25).getValues();

  for(var i=0; i<userEmail.length; i++){
    if(userEmail[i] == userEmailAddress){
      Logger.log("Match! userEmail[i] - " + userEmail[i]);
      Logger.log("Match! userEmailAddress - " + userEmailAddress);
      Logger.log("RevLevel[i] - " + revLevel[i]);
      Logger.log("Review Level - " + reviewLevel);
      if(revLevel[i] == reviewLevel){
        Logger.log("Success - " + revLevel[i]);
        return true;
      } else{
        return false;
      }
    }
    }
}

function viewMets() {
  const userForm = HtmlService.createTemplateFromFile("viewTableau");
  const html = userForm.evaluate();
  html.setWidth(1200).setHeight(800);
  const ui = SpreadsheetApp.getUi();
  ui.showModalDialog(html, "Tableau");
}

function showFormAttempt() {
  const userForm = HtmlService.createTemplateFromFile("attemptForm");
  const html = userForm.evaluate();
  html.setWidth(1200).setHeight(800);
  const ui = SpreadsheetApp.getUi();
  ui.showModalDialog(html, "Attempt");
}

function showFormR0() {
  if(checkUserEmail("R0") || checkUserEmail("R1") || checkUserEmail("R10") || checkUserEmail("QA")){
    const userForm = HtmlService.createTemplateFromFile("rZForm");
    const html = userForm.evaluate();
    html.setWidth(1200).setHeight(800);
    const ui = SpreadsheetApp.getUi();
    ui.showModalDialog(html, "Review Level - R0");
  }else{
    var accessControl = SpreadsheetApp.getUi();
    var response = accessControl.alert('Access Denied!','You do not have R0 permissions.\nCheck with your QA for more information.',accessControl.ButtonSet.OK_CANCEL);
    response;
    Logger.log("User does not have permission.");
  }
  
}

function showFormR1() {
  if(checkUserEmail("R1") || checkUserEmail("R10") || checkUserEmail("QA")){
    const userForm = HtmlService.createTemplateFromFile("r1Form");
    const html = userForm.evaluate();
    html.setWidth(1200).setHeight(800);
    const ui = SpreadsheetApp.getUi();
    ui.showModalDialog(html, "R1");
  }else{
    var accessControl = SpreadsheetApp.getUi();
    var response = accessControl.alert('Access Denied!','You do not have R1 permissions.\nCheck with your QA for more information.',accessControl.ButtonSet.OK_CANCEL);
    response;
    Logger.log("User does not have permission.");
  }
}

function showFormR10() {
  if(checkUserEmail("R10") || checkUserEmail("QA")){
    const userForm = HtmlService.createTemplateFromFile("r10Form");
    const html = userForm.evaluate();
    html.setWidth(1200).setHeight(800);
    const ui = SpreadsheetApp.getUi();
    ui.showModalDialog(html, "R10");
  }else{
    var accessControl = SpreadsheetApp.getUi();
    var response = accessControl.alert('Access Denied!','You do not have R10 permissions.\nCheck with your QA for more information.',accessControl.ButtonSet.OK_CANCEL);
    response;
    Logger.log("User does not have permission.");
  }
}

function showQAForm() {
  if(checkUserEmail("QA")){
    const userForm = HtmlService.createTemplateFromFile("qa");
    const html = userForm.evaluate();
    html.setWidth(1200).setHeight(800);
    const ui = SpreadsheetApp.getUi();
    ui.showModalDialog(html, "QA - Tools");
  }else{
    var accessControl = SpreadsheetApp.getUi();
    var response = accessControl.alert('Access Denied!','You are trying to access QA data.',accessControl.ButtonSet.OK_CANCEL);
    response;
    Logger.log("User does not have permission.");
  }
}
//---------------------------Display Forms on button click---------------------------//

//                                  ********                                    //

//------------------Locate Ready task -->>> copy to complete -->>> delete from Tracker------------------//


function cleanUpTracker(){
  const completStat = ashTrackWS.getRange(3,26,1400).getValues();
  var ashDataRange = ashWS.getDataRange();
  var ashLastRow = ashDataRange.getLastRow();
  var lastRow = ashWS.getLastRow();
  var linkComplete = ashWS.getRange(lastRow,3).getValue();
  var totalCompleted = 0;
  const currentDate = new Date();
  var linkCompletes= [];
  
  for(var i=0; i<completStat.length; i++){
      if(completStat[i][0] == "Ready"){
        Logger.log( ashTrackWS.getRange(i+3,3,1,26).getValues());
        ashWS.getRange(ashWS.getLastRow()+1,3,1,26).setValues(ashTrackWS.getRange(i+3,3,1,26).getValues());
        linkComplete = ashWS.getRange(lastRow,3).getValue();
        Logger.log("Links - " + linkComplete);
        ashTrackWS.deleteRow(i+3);

        getMasterData(linkComplete);
        totalCompleted++;
      }
    }
  Logger.log("There are " + (totalCompleted) + " completed tasks.");
}
//------------------Locate Ready task -->>> copy to complete -->>> delete from Tracker------------------//

//                                  ********                                    //

//------------------Locate subtask link -->>> update Team dropdown to ready------------------//

function getMasterData(linkComplete){
  var teamRange = masterWS.getDataRange().getValues();
  var subTaskLink = masterWS.getRange(3,3,2400).getValues();
  var teamName = masterWS.getRange(3,4,2400).getValues();
  var currentRow = 3;

  for(var i=0; i<teamName.length; i++){
    if(subTaskLink[i] == linkComplete){
      Logger.log("Match! - " + linkComplete);
      // Logger.log("Found " + subTaskLink[i] + " in row " + currentRow + ".");
      masterWS.getRange([i][0],4).setValue("Ready");
      Logger.log(masterWS.getRange([i][0],4).getValue());
    }
  }
  // Logger.log("Team name: " + subTaskLink + " has been set");
}
//------------------Locate subtask link -->>> update Team dropdown to ready------------------//
