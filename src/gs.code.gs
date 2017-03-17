var STATIC = {
  'TITLE': 'google-forms-with-payments'
}

function onInstall(e) {

}

function onOpen() {
  FormApp.getUi().createMenu(STATIC.TITLE).addItem('showSidebar', 'showSidebar').addToUi();
}

function showSidebar() {
  var userInterface = HtmlService.createTemplateFromFile('html.app').evaluate()
    .setTitle(STATIC.TITLE)
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
  FormApp.getUi().showSidebar(userInterface);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
    .getContent();
}

function includeAsTpl(filename) {
  return Utilities.formatString('<script type="text/ng-template" id="/%s">%s</script>',
    filename, HtmlService.createHtmlOutputFromFile(filename).getContent());
}

function getData() {
  return 'data';
}

