// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('pele', ['ionic'
                           ,'ngCordova'
                           ,'ngStorage'
                           ,'tabSlideBox'
                           ,'pele.controllers'
                           ,'pele.factories'
                           ,'pele.config'
                           ,'pele.services'
                           ,'fileLogger'
                          ])

.run(function($ionicPlatform , $state , $ionicLoading , $fileLogger , PelApi , appSettings  ) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

      //----------------------------------------
      //--    Get Version from config.xml
      //----------------------------------------
      cordova.getAppVersion(function (version) {
        config_app.APP_VERSION = version;
      });
      console.log("VERSION : " + config_app.APP_VERSION);

      //-----------------------------------------
      //--   Registration for Push Notification
      //-----------------------------------------
      var notificationOpenedCallback = function(jsonData) {
        //alert("Notification received:\n" + JSON.stringify(jsonData));
        //console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
      };

      window.plugins.OneSignal.init("1d0135a7-da67-4953-b241-2385bfcedcd9", {googleProjectNumber: "655668363586"}, notificationOpenedCallback);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    //----------------------------------
    //--    Create/Open Log File
    //----------------------------------
    $fileLogger.setStorageFilename(config_app.LOG_FILE_NAME);
    //----------------------------------
    //--   Delete Old Log File data
    //----------------------------------
    $fileLogger.deleteLogfile();
    //----------------------------------
    //--  Write open row to log file
    //----------------------------------
    PelApi.writeToLog(config_app.LOG_FILE_INFO_TYPE ,'=============== Start ==============');

    //----------------------------------
    //--    Go To Application List
    //----------------------------------
    $state.go("app.p1_appsLists");

  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  //---- P1 ----//
  .state('app.p1_appsLists', {
      url: '/p1_appsLists',
      views: {
        'menuContent': {
          templateUrl: 'templates/p1_appsLists.html',
          controller: 'P1_appsListCtrl'
        }
      }
    })
  //---- P2 ----//
  .state('app.p2_moduleList', {
    url: '/p2_moduleList/:AppId/:title/:pin',
    views: {
      'menuContent': {
        templateUrl: 'templates/apps/docApprove/p2_moduleList.html',
        controller: 'P2_moduleListCtrl'
      }
    }
  })
// P3
  .state('app.p3_moduleDocList', {
        url: "/p3_moduleDocList/:AppId/:FormType/:pin",
        views: {
          'menuContent': {
            templateUrl: "templates/apps/docApprove/p3_moduleDocList.html",
            controller: 'p3_moduleDocListCtrl'
          }
        }
  })
    //---------------------------------------------------------
    //--                   242
    //---------------------------------------------------------
    .state('app.doc_242', {
      url: "/doc_242/:AppId/:DocId/:DocInitId",
      views: {
        'menuContent': {
          templateUrl: "templates/apps/docApprove/p4_doc_242.html",
          controller: 'DocCtrl'
        }
      }
    })
    //---------------------------------------------------------
    //--                   806
    //---------------------------------------------------------
    .state('app.doc_806', {
      url: "/doc_806/:AppId/:DocId/:DocInitId",
      views: {
        'menuContent': {
          templateUrl: "templates/apps/docApprove/p4_doc_806.html",
          controller: 'DocCtrl'
        }
      }
    })
    //---------------------------------------------------------
    //--                   807
    //---------------------------------------------------------
    .state('app.doc_807', {
      url: "/doc_807/:AppId/:DocId/:DocInitId",
      views: {
        'menuContent': {
          templateUrl: "templates/apps/docApprove/p4_doc_807.html",
          controller: 'DocCtrl'
        }
      }
    })
    //---- home ----//
    .state('app.home', {
      url: '/home/:showLoading',
      views: {
        'menuContent': {
          templateUrl: 'templates/p1_appsLists.html',
          controller: 'homeCtrl'
        }
      }
    })
    .state('app.settings', {
        url: '/settings',
        views:{
          'menuContent': {
            templateUrl: 'templates/settings/settingsList.html',
            controller: 'SettingsListCtrl'
          }
        }
    })
    .state('app.settings.sendLog', {
        url: '/sendLog',
        views: {
          'menuContent': {
            templateUrl: 'templates/settings/sendLog.html',
            controller: 'SendLogCtrl'
          }
        }
  })
  .state('app.appProfile', {
      url: '/appProfile',
      views: {
        'menuContent': {
          templateUrl: 'templates/settings/appProfile.html',
          controller: 'AppProfileCtrl'
        }
      }
    })
  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home',{'showLoading':'Y'});
});
