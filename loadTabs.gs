function loadTab_(tabName) {
  const htmlServ = HtmlService.createTemplateFromFile(tabName);
  return htmlServ.evaluate().getContent();
}

function loadHomeTab(){
  return loadTab_("qahometab");
}

function loadLabInfo(){
  return loadTab_("labelerInfo");
}

function loadAddLabTab(){
  return loadTab_("addLabeler");
}

function loadEditLabInfo(){
  return loadTab_("editLabeler");
}

function loadEditTaskAtt(){
  return loadTab_("editTaskAtt");
}

function loadEditTaskRZ(){
  return loadTab_("rZEditTask");
}

function loadEditTaskR1(){
  return loadTab_("r1EditTask");
}

function loadEditTaskR10(){
  return loadTab_("r10EditTask");
}

function loadSubmitTasks(){
  return loadTab_("submitTasks");
}

function loadAttemptTab(){
  return loadTab_("attemptTab");
}

function loadRZTab(){
  return loadTab_("rZTab");
}

function loadR1Tab(){
  return loadTab_("r1Tab");
}

function loadR10Tab(){
  return loadTab_("r10Tab");
}

function loadMetricsTab(){
  return loadTab_("metrics");
}
