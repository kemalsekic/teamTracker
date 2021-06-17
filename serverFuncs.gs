//////////////////////// --- Labeler Detail --- ////////////////////////

function getLabelerSearch() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName("userCreds");

  return ws.getRange(2,1, ws.getLastRow()-1,8).getValues();
}

function deleteByID(deleteThisID){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName("userCreds");
  const labIDs = ws.getRange(2,1, ws.getLastRow()-1,1).getValues().map(r => r[0].toString().toLowerCase());
  const posIndex = labIDs.indexOf(deleteThisID.toString().toLowerCase());
  const rowNumber = posIndex === -1 ? 0 : posIndex + 2;
  ws.deleteRow(rowNumber);
}

function getLabelerByID(id){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName("userCreds");
  const labIDs = ws.getRange(2,1, ws.getLastRow()-1,1).getValues().map(r => r[0].toString().toLowerCase());
  const posIndex = labIDs.indexOf(id.toString().toLowerCase());
  const rowNumber = posIndex === -1 ? 0 : posIndex + 2;
  const labelerInfo = ws.getRange(rowNumber,1,1,8).getValues()[0];
  return {labID: labelerInfo[0], userName: labelerInfo[1], corpEmail: labelerInfo[2], revLvl: labelerInfo[5]};
}

function editLabelerInfo(id, labelerInfo){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName("userCreds");
  const labIDs = ws.getRange(2,1, ws.getLastRow()-1,1).getValues().map(r => r[0].toString().toLowerCase());
  const posIndex = labIDs.indexOf(id.toString().toLowerCase());
  const rowNumber = posIndex === -1 ? 0 : posIndex + 2;
  const team = ws.getRange(rowNumber,4).getValue().toString();
  ws.getRange(rowNumber, 2, 1, 5).setValues([[
    labelerInfo.userName,
    labelerInfo.corpEmail,
    team,
    "QA",
    labelerInfo.revLvl]]);

    return true;
}

function addLabeler(labelerInfo){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName("userCreds");
  const uniqueIDs = ws.getRange(2,1, ws.getLastRow()-1,1).getValues();
  const team = ws.getRange(2,4).getValue().toString();
  var maxNum = 0;

  uniqueIDs.forEach(r => {
    maxNum = r[0] > maxNum ? r[0] : maxNum;
  });
  var newID = maxNum + 1;

  ws.appendRow([
    newID,
    labelerInfo.userName,
    labelerInfo.userName + "@761link.net",
    team,
    "QA",
    labelerInfo.revLvl,
    "0",
    labelerInfo.userName + "@contractors.scale.com"]);

}

//////////////////////// --- Labeler Detail --- ////////////////////////

//////////////////////// --- Subtask Detail --- Attempt ////////////////////////

function getAttSubByID(id){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName("Attempt");
  const subIDs = ws.getRange(2,1, ws.getLastRow()-1,1).getValues().map(r => r[0].toString().toLowerCase());
  const posIndex = subIDs.indexOf(id.toString().toLowerCase());
  const rowNumber = posIndex === -1 ? 0 : posIndex + 3;
  const subInfo = ws.getRange(posIndex+2,1,1,11).getValues()[0];
  Logger.log(subInfo[1] + subInfo[6] + subInfo[7] + subInfo[8] + subInfo[9]);
  return {subID: subInfo[1], userName: subInfo[6], subStat: subInfo[7], annos: subInfo[8], subNotes: subInfo[9]};
}

function editAttSubInfo(id, subInfo){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName("Attempt");
  const subIDs = ws.getRange(3,2, ws.getLastRow()-1,1).getValues().map(r => r[0].toString().toLowerCase());
  const posIndex = subIDs.indexOf(id.toString());
  const rowNumber = posIndex === -1 ? 0 : posIndex + 3;
  ws.getRange(rowNumber, 8, 1, 3).setValues([[
    subInfo.subStat,
    subInfo.annos,
    subInfo.subNotes]]);

    return true;
}

//////////////////////// --- Subtask Detail --- Attempt ////////////////////////

//////////////////////// --- Subtask Detail --- RZ ////////////////////////

function getRZSubByID(id){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName("R0");
  const ws2 = ss.getSheetByName("Tracker");
  const subIDs = ws.getRange(2,1, ws.getLastRow()-1,1).getValues().map(r => r[0].toString().toLowerCase());
  const posIndex = subIDs.indexOf(id.toString().toLowerCase());
  const rowNumber = posIndex === -1 ? 0 : posIndex + 3;
  const subInfo = ws.getRange(posIndex+2,1,1,11).getValues()[0];
  const trackerRange = ws2.getRange(posIndex+2,1,1,11).getValues()[0];

  Logger.log(trackerRange[9]);
  
  return {subID: subInfo[1],
          userName: subInfo[6],
          subStat: subInfo[7],
          annos: subInfo[8],
          subNotes: subInfo[9],
          readyToTask:subInfo[10],
          attNotes:trackerRange[9]};
}

function editRZSubInfo(id, subInfo){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName("R0");
  const subIDs = ws.getRange(3,2, ws.getLastRow()-1,1).getValues().map(r => r[0].toString().toLowerCase());
  const posIndex = subIDs.indexOf(id.toString());
  const rowNumber = posIndex === -1 ? 0 : posIndex + 3;
  ws.getRange(rowNumber, 8, 1, 3).setValues([[
    subInfo.subStat,
    subInfo.annos,
    subInfo.subNotes]]);

    return true;
}

//////////////////////// --- Subtask Detail --- RZ ////////////////////////

//////////////////////// --- Populate dropdowns --- ////////////////////////

function getRevSelects(){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName("revLvls");

  return ws.getRange(1,1,ws.getLastRow(),1).getValues();
}

function getAnnosSelects(){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName("annosCount");

  return ws.getRange(1,1,ws.getLastRow(),1).getValues();
}

function getStatSelects(){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName("statSelect");

  return ws.getRange(1,1,ws.getLastRow(),1).getValues();
}

//////////////////////// --- Populate dropdowns --- ////////////////////////

//////////////////////// --- Load Tasks by Review Layer --- ////////////////////////

function loadAttTasks(){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName("Attempt");

  return ws.getRange(3,1, ws.getLastRow()-2,10).getValues();
}

function loadRZTasks(){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName("R0");

  return ws.getRange(3,1, ws.getLastRow()-2,10).getValues();
}

function loadR1Tasks(){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName("R1");

  return ws.getRange(3,1, ws.getLastRow()-2,10).getValues();
}

function loadR10Tasks(){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName("R10");

  return ws.getRange(3,1, ws.getLastRow()-2,10).getValues();
}

//////////////////////// --- Load Tasks by Review Layer --- ////////////////////////






