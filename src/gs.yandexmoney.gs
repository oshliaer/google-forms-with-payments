function ya(request) {
  var service = getService();
  if (service.hasAccess()) {

    var url = 'https://money.yandex.ru/api/' + request.api;
    var response = UrlFetchApp.fetch(url, {
      method: 'post',
      headers: {
        'Authorization': 'Bearer ' + service.getAccessToken()
      }
    });
    return JSON.parse(response.getContentText());
  } else {
    var authorizationUrl = getAuthorizationUrl();
    return {
      authorizationUrl: authorizationUrl
    }
  }
}

function getAuthorizationUrl() {
  var pl = Utilities.formatString(
    'client_id=%s&response_type=code&redirect_uri=%s&scope=%s',
    CLIENT_ID,
    encodeURIComponent('https://oauth.yandex.ru/verification_code'),
    encodeURIComponent('account-info operation-history')
  );
  return 'https://money.yandex.ru/oauth/authorize?' + pl;
}

function handleCode(code) {
  var service = getService();
  request = {};
  request.parameter = {};
  request.parameter.code = code;
  var authorized = service.handleCallback(request);
  return authorized;
}
var CREDITS = PropertiesService.getScriptProperties().getProperty('CREDITS').split('/');
var CLIENT_ID = CREDITS[0];
var CLIENT_SECRET = CREDITS[1];
function reset() {
  var service = getService();
  service.reset();
}
function getService() {
  return OAuth2.createService('YandexMoney')
    .setAuthorizationBaseUrl('https://money.yandex.ru/oauth/authorize')
    .setTokenUrl('https://money.yandex.ru//oauth/token')
    .setClientId(CLIENT_ID)
    .setClientSecret(CLIENT_SECRET)
    .setCallbackFunction('authCallback')
    .setScope('account-info operation-history')
    .setPropertyStore(PropertiesService.getUserProperties());
}