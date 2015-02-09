goog.provide('ft.settings.auth');
goog.provide('ft.settings.taskapi');

ft.settings.auth.APP_REDIRECT_URL = (function() {
  // URL for the application, which the oauth handler will redirect to
  // once authorization is complete. The URL must be in the list of
  // authorized redirect uris for the associated oauth client id.
  var appUrl = new URL(window.location.href);

  // Make sure to strip anything in the fragment of the URL, since
  // oauth communicates authentication information to us via
  // parameters in the fragment.
  appUrl.hash = '';
  return appUrl.toString();
}());

ft.settings.auth.BASE_URL = 'https://accounts.google.com/o/oauth2/auth';

ft.settings.auth.CLIENT_ID = 
    '811045213337-vc8dpckug6akgapr88eb5pi4adahkdd1.apps.googleusercontent.com';

ft.settings.auth.REQUIRED_SCOPES = [
    'https://www.googleapis.com/auth/tasks',
    'profile',
    'email'
];

ft.settings.taskapi.BASE_URL = 'https://www.googleapis.com/tasks/v1';
