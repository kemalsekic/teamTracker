function moveToR0(id, subInfo){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName("R0");
  const subIDs = ws.getRange(3,2, ws.getLastRow()-1,1).getValues().map(r => r[0].toString().toLowerCase());
  const posIndex = subIDs.indexOf(id.toString());
  const rowNumber = posIndex === -1 ? 0 : posIndex + 3;
  
  Logger.log("posIndex = " + posIndex);
  Logger.log("rowNumber = " + rowNumber);
  Logger.log("subInfo[0] = " + subInfo[0]);
  ws.getRange(rowNumber, 11).setValue([["Ready"]]);

  cleanAtt(id, ss, subInfo);
  return true;
}

function moveToR1(id, subInfo){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName("R1");
  const subIDs = ws.getRange(3,2, ws.getLastRow()-1,1).getValues().map(r => r[0].toString().toLowerCase());
  const posIndex = subIDs.indexOf(id.toString());
  const rowNumber = posIndex === -1 ? 0 : posIndex + 3;
  
  Logger.log("posIndex = " + posIndex);
  Logger.log("rowNumber = " + rowNumber);
  ws.getRange(rowNumber, 11).setValue([["Ready"]]);

  cleanR0(id, ss, subInfo);
  return true;
}

function moveToR10(id, subInfo){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName("R10");
  const subIDs = ws.getRange(3,2, ws.getLastRow()-1,1).getValues().map(r => r[0].toString().toLowerCase());
  const posIndex = subIDs.indexOf(id.toString());
  const rowNumber = posIndex === -1 ? 0 : posIndex + 3;
  ws.getRange(rowNumber, 11).setValue([["Ready"]]);

  cleanR1(id, ss, subInfo);
  return true;
}

function moveToQA(id, subInfo){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName("qaReview");
  const subIDs = ws.getRange(3,2, ws.getLastRow()-1,1).getValues().map(r => r[0].toString().toLowerCase());
  const posIndex = subIDs.indexOf(id.toString());
  const rowNumber = posIndex === -1 ? 0 : posIndex + 3;
  ws.getRange(rowNumber, 11).setValue([["Ready"]]);

  cleanR10(id, ss, subInfo);
  return true;
}

function cleanAtt(id, ss, subInfo){
  const prevWS = ss.getSheetByName("Attempt");
  const teamTracker = ss.getSheetByName("Tracker");
  const subIDs = prevWS.getRange(3,2, prevWS.getLastRow()-1,1).getValues().map(r => r[0].toString().toLowerCase());
  const subIDs2 = teamTracker.getRange(3,2, teamTracker.getLastRow()-1,1).getValues().map(r => r[0].toString().toLowerCase());
  const posIndex = subIDs.indexOf(id.toString());
  const posIndex2 = subIDs2.indexOf(id.toString());
  const rowNumber = posIndex === -1 ? 0 : posIndex + 3;
  const rowNumber2 = posIndex2 === -1 ? 0 : posIndex2 + 3;
  const assigned = prevWS.getRange(rowNumber,7, prevWS.getLastRow()-1,1).getValues().map(r => r[0].toString().toLowerCase());
  const stat = prevWS.getRange(rowNumber,8, prevWS.getLastRow()-1,1).getValues();
  const numAnnos = prevWS.getRange(rowNumber,9, prevWS.getLastRow()-1,1).getValues().map(r => r[0].toString().toLowerCase());
  const notes = prevWS.getRange(rowNumber,10, prevWS.getLastRow()-1,1).getValues().map(r => r[0].toString().toLowerCase());
  teamTracker.getRange(rowNumber2,7).setValue(assigned[0]);
  teamTracker.getRange(rowNumber2,8).setValue(subInfo.subStat);
  teamTracker.getRange(rowNumber2,9).setValue(subInfo.annos);
  teamTracker.getRange(rowNumber2,10).setValue(subInfo.subNotes);

  Logger.log("Assigned: " + assigned[0]);
  Logger.log("stat: " + stat[0]);
  Logger.log("numAnnos: " + numAnnos[0]);
  Logger.log("Notes: " + notes[0]);
  
  Logger.log("Row Number in clean Att: " + rowNumber + " for subID - " + id + " posIndex - " + posIndex);

  prevWS.deleteRow(rowNumber);
}

function cleanR0(id, ss, subInfo){
  const prevWS = ss.getSheetByName("R0");
  const teamTracker = ss.getSheetByName("Tracker");
  const subIDs = prevWS.getRange(3,2, prevWS.getLastRow()-1,1).getValues().map(r => r[0].toString().toLowerCase());
  const subIDs2 = teamTracker.getRange(3,2, teamTracker.getLastRow()-1,1).getValues().map(r => r[0].toString().toLowerCase());
  const posIndex = subIDs.indexOf(id.toString());
  const posIndex2 = subIDs2.indexOf(id.toString());
  const rowNumber = posIndex === -1 ? 0 : posIndex + 3;
  const rowNumber2 = posIndex2 === -1 ? 0 : posIndex2 + 3;
  const assigned = prevWS.getRange(rowNumber,7, prevWS.getLastRow()-1,1).getValues().map(r => r[0].toString().toLowerCase());
  const stat = prevWS.getRange(rowNumber,8, prevWS.getLastRow()-1,1).getValues();
  const numAnnos = prevWS.getRange(rowNumber,9, prevWS.getLastRow()-1,1).getValues().map(r => r[0].toString().toLowerCase());
  const notes = prevWS.getRange(rowNumber,10, prevWS.getLastRow()-1,1).getValues().map(r => r[0].toString().toLowerCase());
  teamTracker.getRange(rowNumber2,11).setValue(assigned[0]);
  teamTracker.getRange(rowNumber2,12).setValue(subInfo.subStat);
  teamTracker.getRange(rowNumber2,13).setValue(subInfo.annos);
  teamTracker.getRange(rowNumber2,14).setValue(subInfo.subNotes);

  prevWS.deleteRow(rowNumber);
}

function cleanR1(id, ss, subInfo){
  const prevWS = ss.getSheetByName("R1");
  const teamTracker = ss.getSheetByName("Tracker");
  const subIDs = prevWS.getRange(3,2, prevWS.getLastRow()-1,1).getValues().map(r => r[0].toString().toLowerCase());
  const subIDs2 = teamTracker.getRange(3,2, teamTracker.getLastRow()-1,1).getValues().map(r => r[0].toString().toLowerCase());
  const posIndex = subIDs.indexOf(id.toString());
  const posIndex2 = subIDs2.indexOf(id.toString());
  const rowNumber = posIndex === -1 ? 0 : posIndex + 3;
  const rowNumber2 = posIndex2 === -1 ? 0 : posIndex2 + 3;
  const assigned = prevWS.getRange(rowNumber,7, prevWS.getLastRow()-1,1).getValues().map(r => r[0].toString().toLowerCase());
  const stat = prevWS.getRange(rowNumber,8, prevWS.getLastRow()-1,1).getValues();
  const numAnnos = prevWS.getRange(rowNumber,9, prevWS.getLastRow()-1,1).getValues().map(r => r[0].toString().toLowerCase());
  const notes = prevWS.getRange(rowNumber,10, prevWS.getLastRow()-1,1).getValues().map(r => r[0].toString().toLowerCase());
  teamTracker.getRange(rowNumber2,15).setValue(assigned[0]);
  teamTracker.getRange(rowNumber2,16).setValue(subInfo.subStat);
  teamTracker.getRange(rowNumber2,17).setValue(subInfo.annos);
  teamTracker.getRange(rowNumber2,18).setValue(subInfo.subNotes);

  Logger.log("Assigned: " + assigned[0]);
  Logger.log("stat: " + stat[0]);
  Logger.log("numAnnos: " + numAnnos[0]);
  Logger.log("Notes: " + notes[0]);
  
  Logger.log("Row Number in clean Att: " + rowNumber + " for subID - " + id);

  prevWS.deleteRow(rowNumber);
}

function cleanR10(id, ss, subInfo){
  const prevWS = ss.getSheetByName("R10");
  const teamTracker = ss.getSheetByName("Tracker");
  const subIDs = prevWS.getRange(3,2, prevWS.getLastRow()-1,1).getValues().map(r => r[0].toString().toLowerCase());
  const subIDs2 = teamTracker.getRange(3,2, teamTracker.getLastRow()-1,1).getValues().map(r => r[0].toString().toLowerCase());
  const posIndex = subIDs.indexOf(id.toString());
  const posIndex2 = subIDs2.indexOf(id.toString());
  const rowNumber = posIndex === -1 ? 0 : posIndex + 3;
  const rowNumber2 = posIndex2 === -1 ? 0 : posIndex2 + 3;
  const assigned = prevWS.getRange(rowNumber,7, prevWS.getLastRow()-1,1).getValues().map(r => r[0].toString().toLowerCase());
  const stat = prevWS.getRange(rowNumber,8, prevWS.getLastRow()-1,1).getValues();
  const numAnnos = prevWS.getRange(rowNumber,9, prevWS.getLastRow()-1,1).getValues().map(r => r[0].toString().toLowerCase());
  const notes = prevWS.getRange(rowNumber,10, prevWS.getLastRow()-1,1).getValues().map(r => r[0].toString().toLowerCase());
  teamTracker.getRange(rowNumber2,19).setValue(assigned[0]);
  teamTracker.getRange(rowNumber2,20).setValue(subInfo.subStat);
  teamTracker.getRange(rowNumber2,21).setValue(subInfo.annos);
  teamTracker.getRange(rowNumber2,22).setValue(subInfo.subNotes);

  Logger.log("Assigned: " + assigned[0]);
  Logger.log("stat: " + stat[0]);
  Logger.log("numAnnos: " + numAnnos[0]);
  Logger.log("Notes: " + notes[0]);
  
  Logger.log("Row Number in clean Att: " + rowNumber + " for subID - " + id);

  prevWS.deleteRow(rowNumber);
}

function getR1SubByID(id){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName("R1");
  const ws2 = ss.getSheetByName("Tracker");
  const subIDs = ws.getRange(2,1, ws.getLastRow()-1,1).getValues().map(r => r[0].toString().toLowerCase());
  const posIndex = subIDs.indexOf(id.toString().toLowerCase());
  const rowNumber = posIndex === -1 ? 0 : posIndex + 3;
  const subInfo = ws.getRange(posIndex+2,1,1,11).getValues()[0];
  const trackerRange = ws2.getRange(posIndex+2,1,1,18).getValues()[0];

  Logger.log("Attempt Notes - " + trackerRange[9]);
  Logger.log("R0 Notes - " + trackerRange[13]);
  
  return {subID: subInfo[1],
          userName: subInfo[6],
          subStat: subInfo[7],
          annos: subInfo[8],
          subNotes: subInfo[9],
          readyToTask:subInfo[10],
          attNotes:trackerRange[9],
          rZNotes:trackerRange[13]};
}

function getR10SubByID(id){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName("R10");
  const ws2 = ss.getSheetByName("Tracker");
  const subIDs = ws.getRange(2,1, ws.getLastRow()-1,1).getValues().map(r => r[0].toString().toLowerCase());
  const posIndex = subIDs.indexOf(id.toString().toLowerCase());
  const rowNumber = posIndex === -1 ? 0 : posIndex + 3;
  const subInfo = ws.getRange(posIndex+2,1,1,11).getValues()[0];
  const trackerRange = ws2.getRange(posIndex+2,1,1,18).getValues()[0];

  Logger.log(trackerRange[9]);
  Logger.log(trackerRange[13]);
  
  return {subID: subInfo[1],
          userName: subInfo[6],
          subStat: subInfo[7],
          annos: subInfo[8],
          subNotes: subInfo[9],
          readyToTask:subInfo[10],
          attNotes:trackerRange[9],
          rZNotes:trackerRange[13],
          r1Notes:trackerRange[17]};
}

function editR1SubInfo(id, subInfo){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName("R1");
  const subIDs = ws.getRange(3,2, ws.getLastRow()-1,1).getValues().map(r => r[0].toString().toLowerCase());
  const posIndex = subIDs.indexOf(id.toString());
  const rowNumber = posIndex === -1 ? 0 : posIndex + 3;
  ws.getRange(rowNumber, 8, 1, 3).setValues([[
    subInfo.subStat,
    subInfo.annos,
    subInfo.subNotes]]);

    return true;
}

function editR10SubInfo(id, subInfo){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName("R10");
  const subIDs = ws.getRange(3,2, ws.getLastRow()-1,1).getValues().map(r => r[0].toString().toLowerCase());
  const posIndex = subIDs.indexOf(id.toString());
  const rowNumber = posIndex === -1 ? 0 : posIndex + 3;
  ws.getRange(rowNumber, 8, 1, 3).setValues([[
    subInfo.subStat,
    subInfo.annos,
    subInfo.subNotes]]);

    return true;
}









