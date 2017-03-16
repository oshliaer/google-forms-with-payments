function onInstall(e) {
  
}

function onOpen() {
  FormApp.getUi().createAddonMenu('google-forms-with-payments').addItem('showSidebar', 'showSidebar').addToUi();
}

function showSidebar() {
  var userInterface = HtmlService.createTemplateFromFile('html.sidebar').evaluate().setTitle('title');
  FormApp.getUi().showSidebar(userInterface);
}
