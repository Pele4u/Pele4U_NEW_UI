angular.module('pele.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $cordovaNetwork , $rootScope) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
    document.addEventListener("deviceready", function () {

      config_app.network = $cordovaNetwork.getNetwork();
      config_app.isOnline = $cordovaNetwork.isOnline();
      $scope.$apply();

      // listen for Online event
      $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
        config_app.isOnline = true;
        config_app.network = $cordovaNetwork.getNetwork();
        $scope.$apply();
      })

      // listen for Offline event
      $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
        config_app.isOnline = false;
        config_app.network = $cordovaNetwork.getNetwork();

        $scope.$apply();
      })

    }, false);
})
//=====================================================================//
//==                         PAGE_1                                  ==//
//=====================================================================//
.controller('P1_appsListCtrl', function($scope , $http , $state , $ionicLoading , PelApi , $cordovaNetwork , $rootScope , $ionicPopup) {

  // var envRes = _.find(appSettings.enviromentLinks, {Environment: appSettings.enviroment});
  // var servRes = _.find(envRes.ServiceList, {Service: "GetUserMenu"});

  $scope.doRefresh = function(){
    /*
    $ionicLoading.show({
      template: config_app.loadingMsg
    });
    */
    PelApi.showLoading();
    var errorMsg = "";

    $scope.isOnline = config_app.isOnline;
    $scope.network = config_app.network;
    if("wifi" === config_app.network){
      $ionicLoading.hide();
      $scope.$broadcast('scroll.refreshComplete');
      $scope.feeds_categories = {};
      PelApi.showPopup(config_app.wifiTitle , config_app.wifiSubTitle);
    }
    else{


    var links = PelApi.getDocApproveServiceUrl("GetUserMenu");

    var reMenu = PelApi.getMenu(links);


    reMenu.then(
      //--- SUCCESS ---//
      function () {

        reMenu.success(function (data, status, headers, config) {

          console.log(data);

          var pinCodeStatus = PelApi.GetPinCodeStatus(data, "getMenu");
          if("Valid" === pinCodeStatus){

            config_app.token    = data.token;
            config_app.user     = data.user;
            config_app.userName = data.userName;
            var strData = JSON.stringify(data);
            strData = strData.replace(/"\"/g,"");
            config_app.GetUserMenu = JSON.parse(strData);
            $scope.feeds_categories = config_app.GetUserMenu;
            $ionicLoading.hide();
            $scope.$broadcast('scroll.refreshComplete');
          } else if ("PAD" === pinCodeStatus ) {
            $ionicLoading.hide();
            $scope.$broadcast('scroll.refreshComplete');
            PelApi.showPopup(config_app.pinCodeSubTitlePDA , "");
          }else if("PCR" === pinCodeStatus){
            $ionicLoading.hide();
            $scope.$broadcast('scroll.refreshComplete');
            errorMsg = config_app.PIN_STATUS.PAD;
            PelApi.showPopup(config_app.pinCodeSubTitlePCR , "");
          }else if("PWA" === pinCodeStatus){
            $ionicLoading.hide();
            $scope.$broadcast('scroll.refreshComplete');
            errorMsg = config_app.PIN_STATUS.PAD;
            PelApi.showPopup(config_app.pinCodeSubTitlePWA , "");
          }
        });
      }
      //--- ERROR ---//
      , function () {
        reMenu.success(function (data, status, headers, config) {
          $ionicLoading.hide();
          $scope.$broadcast('scroll.refreshComplete');
          PelApi.showPopup(config_app.getUserModuleTypesErrorMag , "");
        }).error(function (data, status, headers, config) {
          $ionicLoading.hide();
          $scope.$broadcast('scroll.refreshComplete');
          PelApi.showPopup(config_app.getUserModuleTypesErrorMag , "");
        });
      }
    );
    }
  }
  //-----------------------------------------------------------//
  //--                 forwardToApp
  //-----------------------------------------------------------//
  $scope.forwardToApp = function (statePath , appId , titleDisp) {
    if("wifi" === config_app.network){
      $ionicLoading.hide();
      $scope.$broadcast('scroll.refreshComplete');
      PelApi.showPopup(config_app.wifiTitle , config_app.wifiSubTitle);
    }else {
      $state.go(statePath, {AppId: appId, title: titleDisp, "pin": "0"});
    }
  };
  //-------------------------------//
  //--       Code Section        --//
  //-------------------------------//

  $scope.doRefresh();
})

//=================================================================
//==                    PAGE_2
//=================================================================
  .controller('P2_moduleListCtrl', function($scope, $http, $stateParams , $state , PelApi,$cordovaNetwork, $ionicLoading, $ionicModal , $timeout) {
    //----------------------- LOGIN --------------------------//

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/apps/docApprove/login.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {

      var appId = $stateParams.AppId;
      var pin = $scope.loginData.pin;
      var titleDisp = $stateParams.title;
      $state.go("app.p2_moduleList",{AppId : appId , title:titleDisp ,"pin":pin});
      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function() {
        $scope.closeLogin();
      }, 1000);
    };
    //======= onClick ========//
    $scope.onClick = function (formType) {
      if("wifi" === config_app.network){
        $ionicLoading.hide();
        $scope.$broadcast('scroll.refreshComplete');
        PelApi.showPopup(config_app.wifiTitle , config_app.wifiSubTitle);
      }else{
        var appId = $stateParams.AppId;
        $state.go("app.p3_moduleDocList", {AppId: appId, FormType: formType, pin:"0"});
      }
    };

    //===================== Refresh ===========================//
    $scope.doRefresh = function(){
      /*
      $ionicLoading.show({
        template: config_app.loadingMsg
      });
      */
      PelApi.showLoading();

      var appId = $stateParams.AppId;
      var pin = $stateParams.pin;
      if("wifi" === config_app.network){
        $ionicLoading.hide();
        $scope.$broadcast('scroll.refreshComplete');
        PelApi.showPopup(config_app.wifiTitle , config_app.wifiSubTitle);
      }
      else {
        var links = PelApi.getDocApproveServiceUrl("GetUserModuleTypes");

        var retUserModuleTypes = PelApi.getUserModuleTypes(links, appId, pin);

        retUserModuleTypes.then(
          //--- SUCCESS ---//
          function () {
            retUserModuleTypes.success(function (data, status, headers, config) {
              var pinCodeStatus = PelApi.GetPinCodeStatus(data, "getUserModuleTypes");
              if ("Valid" === pinCodeStatus) {
                config_app.GetUserModuleTypes = data;
                $scope.category_sources_length = config_app.GetUserModuleTypes.Response.OutParams.MOBILE_MODULE_REC.length;
                $scope.category_sources = config_app.GetUserModuleTypes.Response.OutParams.MOBILE_MODULE_REC;

                $ionicLoading.hide();
                $scope.$broadcast('scroll.refreshComplete');

              } else if ("PWA" === pinCodeStatus) {

                $ionicLoading.hide();
                $scope.$broadcast('scroll.refreshComplete');
                var errordesc = config_app.PIN_STATUS.PWA;
                var appId = $stateParams.AppId;
                var titleDisp = $stateParams.title;
                var pincode =  PelApi.showPinCode(appId, titleDisp , config_app.pinCodeSubTitlePWA);

              } else if ("PCR" === pinCodeStatus) {

                $ionicLoading.hide();
                $scope.$broadcast('scroll.refreshComplete');
                $scope.loginData.error = config_app.PIN_STATUS.PAD;
                var appId = $stateParams.AppId;
                var titleDisp = $stateParams.title;
                // Create the login modal that we will use later
                var pincode =  PelApi.showPinCode(appId, titleDisp , config_app.pinCodeSubTitlePCR);

              } else if ("PAD" === pinCodeStatus ) {

                $ionicLoading.hide();
                $scope.$broadcast('scroll.refreshComplete');
                PelApi.showPopup(config_app.pinCodeSubTitlePDA , "");
                $state.go("app.p1_appsLists");

              } else if ("PNE" === pinCodeStatus ) {

                $ionicLoading.hide();
                $scope.$broadcast('scroll.refreshComplete');
                PelApi.showPopup(config_app.pinCodeSubTitlePNE , "");

              } else if ("NRP" === pinCodeStatus ) {

                $ionicLoading.hide();
                $scope.$broadcast('scroll.refreshComplete');
                PelApi.showPopup(config_app.pinCodeSubTitleNRP , "");

              } else if ("InValid" === pinCodeStatus) {

                $ionicLoading.hide();
                $scope.$broadcast('scroll.refreshComplete');
                $state.go("app.p1_appsLists");

              }

            });
          }
          //--- ERROR ---//
          , function () {
            retUserModuleTypes.success(function (data, status, headers, config) {
              $ionicLoading.hide();
              $scope.$broadcast('scroll.refreshComplete');
              PelApi.showPopup(config_app.getUserModuleTypesErrorMag , "");
            }).error(function (data, status, headers, config) {
              $ionicLoading.hide();
              $scope.$broadcast('scroll.refreshComplete');
              PelApi.showPopup(config_app.getUserModuleTypesErrorMag , "");
            });
          }
        );
      }
    }; // doRefresh
    //======= dats section ====//
    $scope.category_sources = [];
    $scope.doRefresh();

  })
//=================================================================
//==                    PAGE_3
//=================================================================
  .controller('p3_moduleDocListCtrl', function($scope, $stateParams, $http, $q, $ionicLoading, $state ,PelApi , $cordovaNetwork) {


    //----------------------- REFRESH ------------------------//
    $scope.doRefresh = function() {
      /*
      $ionicLoading.show({
        template: config_app.loadingMsg
      });
      */
      PelApi.showLoading();
      var appId = $stateParams.AppId,
        formType = $stateParams.FormType,
        pin = $stateParams.pin;
      if("wifi" === config_app.network){
        $ionicLoading.hide();
        $scope.$broadcast('scroll.refreshComplete');
        PelApi.showPopup(config_app.wifiTitle , config_app.wifiSubTitle);
      }
      else {

        var links = PelApi.getDocApproveServiceUrl("GtUserFormGroups");

        var retGetUserFormGroups = PelApi.GetUserFormGroups(links, appId, formType, pin);

        retGetUserFormGroups.then(
          //--- SUCCESS ---//
          function () {

            retGetUserFormGroups.success(function (data, status, headers, config) {
              var pinStatus = PelApi.GetPinCodeStatus(data, "GetUserFormGroups");

              if ("Valid" === pinStatus) {
                $scope.chats = data.Response.OutParams.ROW;
                $ionicLoading.hide();
                $scope.$broadcast('scroll.refreshComplete');
              } else if ("PDA" === pinStatus) {
                $ionicLoading.hide();
                $scope.$broadcast('scroll.refreshComplete');
                $scope.login();
              } else if ("InValid" === pinStatus) {
                $ionicLoading.hide();
                $scope.$broadcast('scroll.refreshComplete');
                $state.go("app.p1_appsLists");
              }
            }).error(function (data, status, headers, config) {
                $ionicLoading.hide();
                $scope.$broadcast('scroll.refreshComplete');
                PelApi.showPopup(config_app.getUserModuleTypesErrorMag , "");
              });
          }
          //--- ERROR ---//
          , function () {
            retGetUserFormGroups.success(function (data, status, headers, config) {
              $ionicLoading.hide();
              $scope.$broadcast('scroll.refreshComplete');
              PelApi.showPopup(config_app.getUserModuleTypesErrorMag , "");

            }).error(function (data, status, headers, config) {
              $ionicLoading.hide();
              $scope.$broadcast('scroll.refreshComplete');
              PelApi.showPopup(config_app.getUserModuleTypesErrorMag , "");
            });
          }
        );
      }
    };
    //---------------------------------------------------------
    //-- When        Who       Description
    //-- ==========	 ========  ================================
    //-- 20/10/2015  R.W.      Accordion functions
    //---------------------------------------------------------
    $scope.toggleGroup = function(group) {
      if ($scope.isGroupShown(group)) {
        $scope.shownGroup = null;
      } else {
        $scope.shownGroup = group;
      }
    };
    $scope.isGroupShown = function(group) {
      return $scope.shownGroup === group;
    };
    //----------------------------------------------------------
    //-- Search bar JSON rebild
    //----------------------------------------------------------
    $scope.searchBarCreteria = function(){
      var searchText = $scope.searchText.text;
      if($scope.searchText.text !== undefined && $scope.searchText.text !== "")
      {
        list = $scope.chats;
        for(var i=0 ; i< list.length ; i++){
          var sCount = 0;
          for(var j=0 ; j< list[i].DOCUMENTS.DOCUMENTS_ROW.length ; j++ ){
            var owner = list[i].DOCUMENTS.DOCUMENTS_ROW[j].MESSAGE;
            var n = owner.indexOf(searchText);
            if(-1 !== n){
              sCount ++;
            }
          }
          $scope.chats[i].FORM_QTY = sCount;
        }
      }
      else{
        for(var i=0 ; i< list.length ; i++){
          var sCount = list[i].DOCUMENTS.DOCUMENTS_ROW.length;
          $scope.chats[i].FORM_QTY = sCount;
        }
      }
    };//
    //--------------------------------------------------------------
    //-- When        Who         Description
    //-- ----------  ----------  -----------------------------------
    //-- 01/11/2015  R.W.        function forward to page by DOC_ID
    //--------------------------------------------------------------
    $scope.forwardToDoc = function(docId , docInitId){
      var appId = $stateParams.AppId;
      var statePath = 'app.doc_' + docId;
      if("wifi" === config_app.network){
        $ionicLoading.hide();
        $scope.$broadcast('scroll.refreshComplete');
        PelApi.showPopup(config_app.wifiTitle , config_app.wifiSubTitle);
      }else {
        PelApi.showLoading();

        var links = PelApi.getDocApproveServiceUrl("GetUserNotif");

        var retGetUserNotifications = PelApi.GetUserNotifications(links, appId, docId, docInitId);
        retGetUserNotifications.then(
          //--- SUCCESS ---//
          function () {
            retGetUserNotifications.success(function (data, status, headers, config) {
              var strData = JSON.stringify(data);
              strData = strData.replace(/\\/g, "");
              strData = strData.replace(/"{/g, "{");
              strData = strData.replace(/}"/g, "}");

              var newData = JSON.parse(strData);
              config_app.docDetails = newData.Response.OutParams.Result.ROWSET.ROW;

              var buttonsLength = config_app.docDetails.BUTTONS.length;
              // Show the action sheet
              if(2 === buttonsLength) {
                config_app.ApprovRejectBtnDisplay = true;
              }else{
                config_app.ApprovRejectBtnDisplay = false;
              }
              $state.go(statePath, {"AppId": appId, "DocId": docId, "DocInitId": docInitId});
            }).error(function (data, status, headers, config) {
                $ionicLoading.hide();
                $scope.$broadcast('scroll.refreshComplete');
                PelApi.showPopup(config_app.getUserModuleTypesErrorMag , "");
            });

          }
          //--- ERROR ---//
          , function () {

            retGetUserNotifications.success(function (data, status, headers, config) {
              $ionicLoading.hide();
              $scope.$broadcast('scroll.refreshComplete');
              PelApi.showPopup(config_app.getUserModuleTypesErrorMag , "");

            }).error(function (data, status, headers, config) {
              $ionicLoading.hide();
              $scope.$broadcast('scroll.refreshComplete');
              PelApi.showPopup(config_app.getUserModuleTypesErrorMag , "");

            });
          }
        );
      }
    } // forwardToDoc

    $scope.feed = [];
    $scope.searchText = {};
    $scope.doRefresh();

  })
//=================================================================
//==                    PAGE_4
//=================================================================
  .controller('DocCtrl',['$rootScope'
                        ,'$scope'
                        ,'$stateParams'
                        ,'$http'
                        ,'$q'
                        ,'$location'
                        ,'$window'
                        ,'$timeout'
                        ,'$ionicLoading'
                        ,'$ionicActionSheet'
                        ,'$ionicModal'
                        ,'PelApi'
                        ,'$ionicNavBarDelegate'
                        ,'$cordovaNetwork'
                        ,'$ionicPopup'
    , function(  $rootScope
    , $scope
    , $stateParams
    , $http
    , $q
    , $location
    , $window
    , $timeout
    , $ionicLoading
    , $ionicActionSheet
    , $ionicModal
    , PelApi
    ,$ionicNavBarDelegate
    ,$cordovaNetwork
    ,$ionicPopup
  ) {


    $scope.doRefresh = function() {
      $scope.feed = [];
      $scope.tabs = config_app.tabs;

      var buttons = {};

      $scope.style = {
        color: 'red'
      };

      PelApi.showLoading();

      var appId = $stateParams.AppId,
        docId = $stateParams.DocId,
        docInitId = $stateParams.DocInitId;

      if("wifi" === config_app.network){
        $ionicLoading.hide();
        $scope.$broadcast('scroll.refreshComplete');
        PelApi.showPopup(config_app.wifiTitle , config_app.wifiSubTitle);
        //$state.go("app.p1_appsLists");
      }
      else {
        $scope.docDetails      = config_app.docDetails;
        $scope.sourceTitle     = config_app.docDetails.DOC_NAME;
        $scope.CREATOR         = config_app.docDetails.CREATOR;
        $scope.EMP_NUMBER      = config_app.docDetails.EMP_NUMBER;
        $scope.SECTOR          = config_app.docDetails.SECTOR;
        $scope.DEPARTMENT      = config_app.docDetails.DEPARTMENT;
        $scope.DOC_INIT_ID     = config_app.docDetails.DOC_INIT_ID;
        $scope.SENT_DATE       = config_app.docDetails.SENT_DATE;
        $scope.NOTIFICATION_ID = config_app.docDetails.NOTIFICATION_ID;

        // Show the action sheet
        $scope.approve = config_app.ApprovRejectBtnDisplay;

        $ionicLoading.hide();
        $scope.$broadcast('scroll.refreshComplete');

      }
    }; // doRefresh

    $scope.redStyle = function(flag){
      var retVal;
      if("Y" ===  flag){
        $scope.style.color = "red";
      }else if("N" === flag){
        $scope.style.color = "blue";
      }
      return $scope.style;
    };
    //---------------------------------------------------------------------
    //-- When           Who             Description
    //-- -------------	--------------  -----------------------------------
    //-- 13/10/2015     R.W.            Hide / Show Approval List Rows
    //---------------------------------------------------------------------
    $ionicModal.fromTemplateUrl('templates/modal.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.createNote = function(u) {
      $scope.Note = u.Note;
      $scope.modal.hide();
    };
    //---------------------------------------------------------------------
    //-- When           Who             Description
    //-- -------------	--------------  -----------------------------------
    //-- 13/10/2015     R.W.            Hide / Show Approval List Rows
    //---------------------------------------------------------------------
    $scope.pelHideShow = function(action){
      var retStatus;
      if(action != "" && action != undefined)
      {
        retStatus = false;
      }else {
        retStatus = true;
      }
      return retStatus;
    };

    $scope.onSlideMove = function(data){
      //alert("You have selected " + data.index + " tab");
    };
    //-----------------------------------
    //--         Btn Action
    //-----------------------------------
    $scope.docApprove = function(){

      //PelApi.showLoading();

      var appId = $stateParams.AppId;
      var notificationId = $scope.NOTIFICATION_ID;
      var actionType = 'APPROVE';
      var note = '';
      if("wifi" === config_app.network){
        $ionicLoading.hide();
        $scope.$broadcast('scroll.refreshComplete');
        PelApi.showPopup(config_app.wifiTitle , config_app.wifiSubTitle);
        //$state.go("app.p1_appsLists");
      }else {
        //===================================================//
        //==        Add Note Yes/No popup
        //===================================================//
        var myYesNoPopup = $ionicPopup.show({
          title: config_app.isAddNoteTitle,
          subTitle: '',
          scope: $scope,
          buttons: [
            {
              text: '<b>לא</b>',
              type: 'button-stable',
              onTap: function (e) {

                return false;
              }
            },
            {
              text: '<b>כן</b>',
              type: 'button-positive',
              onTap: function (e) {
                return true;
              }
            }
          ]
        });
        myYesNoPopup.then(function (res) {
          if(res){
            //===============================================//
            //==                 Get Note                  ==//
            //===============================================//
            $scope.data = {};
            var myPopup = $ionicPopup.show({
              template: '<div class="list pele-note-background" dir="RTL"><label class="item item-input"><textarea rows="8" ng-model="data.note" type="text"></textarea></label></div>',
              title: '',
              subTitle: '',
              scope: $scope,
              buttons: [
                {text: 'ביטול',
                  onTap: function (e) {
                      $scope.data.note = "";
                      $scope.data.cancel = true;
                      return $scope.data;
                    }
                },
                {
                  text: '<b>שמירה</b>',
                  type: 'button-positive',
                  onTap: function (e) {
                    if (!$scope.data.note) {
                      //don't allow the user to close unless he enters wifi password
                      e.preventDefault();
                    } else {
                      $scope.data.cancel = false;
                      return $scope.data;
                    }
                  }
                },
              ]
            });
            myPopup.then(function (res) {
              if(!res.cancel) {
                PelApi.showLoading();
                note = res.note;
                var links3 = PelApi.getDocApproveServiceUrl("SubmitNotif");
                var retSubmitNotification = PelApi.SubmitNotification(links3, appId, notificationId, note, actionType);
                retSubmitNotification.then(
                  //---- SUCCESS -----//
                  function () {
                    retSubmitNotification.success(function (data, status, headers, config) {
                      $ionicLoading.hide();
                      $scope.$broadcast('scroll.refreshComplete');
                      $ionicNavBarDelegate.back();
                    }),
                      retSubmitNotification.error(function (data, status, headers, config) {
                        $ionicLoading.hide();
                        $scope.$broadcast('scroll.refreshComplete');
                        $ionicNavBarDelegate.back();
                      });
                  },
                  //---- ERROR -----//
                  function () {
                    retSubmitNotification.success(function (data, status, headers, config) {
                      $ionicLoading.hide();
                      $scope.$broadcast('scroll.refreshComplete');
                      $ionicNavBarDelegate.back();
                    }),
                      retSubmitNotification.error(function (data, status, headers, config) {
                        $ionicLoading.hide();
                        $scope.$broadcast('scroll.refreshComplete');
                        $ionicNavBarDelegate.back();

                      })
                  }
                );
              }
            });
          }else{
            PelApi.showLoading();
            var links3 = PelApi.getDocApproveServiceUrl("SubmitNotif");
            var retSubmitNotification = PelApi.SubmitNotification(links3, appId, notificationId, note, actionType);
            retSubmitNotification.then(
              //---- SUCCESS -----//
              function () {
                retSubmitNotification.success(function (data, status, headers, config) {
                  $ionicLoading.hide();
                  $scope.$broadcast('scroll.refreshComplete');
                  $ionicNavBarDelegate.back();
                }),
                  retSubmitNotification.error(function (data, status, headers, config) {
                    $ionicLoading.hide();
                    $scope.$broadcast('scroll.refreshComplete');
                    $ionicNavBarDelegate.back();
                  });
              },
              //---- ERROR -----//
              function () {
                retSubmitNotification.success(function (data, status, headers, config) {
                  $ionicLoading.hide();
                  $scope.$broadcast('scroll.refreshComplete');
                  $ionicNavBarDelegate.back();
                }),
                  retSubmitNotification.error(function (data, status, headers, config) {
                    $ionicLoading.hide();
                    $scope.$broadcast('scroll.refreshComplete');
                    $ionicNavBarDelegate.back();

                  })
              }
            );
          };
        });
      }
    };
    //-----------------------------------
    //--         OK
    //-----------------------------------
    $scope.docOK = function(action){

      //PelApi.showLoading();

      var appId = $stateParams.AppId;
      var notificationId = $scope.NOTIFICATION_ID;
      var actionType = 'OK';
      var note = '';
      if("wifi" === config_app.network){
        $ionicLoading.hide();
        $scope.$broadcast('scroll.refreshComplete');
        PelApi.showPopup(config_app.wifiTitle , config_app.wifiSubTitle);
        //$state.go("app.p1_appsLists");
      }
      else {
            PelApi.showLoading();
            var links3 = PelApi.getDocApproveServiceUrl("SubmitNotif");
            var retSubmitNotification = PelApi.SubmitNotification(links3, appId, notificationId, note, actionType);
            retSubmitNotification.then(
              //---- SUCCESS -----//
              function () {
                retSubmitNotification.success(function (data, status, headers, config) {
                  $ionicLoading.hide();
                  $scope.$broadcast('scroll.refreshComplete');
                  $ionicNavBarDelegate.back();
                }),
                  retSubmitNotification.error(function (data, status, headers, config) {
                    $ionicLoading.hide();
                    $scope.$broadcast('scroll.refreshComplete');
                    $ionicNavBarDelegate.back();
                  });
              },
              //---- ERROR -----//
              function () {
                retSubmitNotification.success(function (data, status, headers, config) {
                  $ionicLoading.hide();
                  $scope.$broadcast('scroll.refreshComplete');
                  $ionicNavBarDelegate.back();
                }),
                  retSubmitNotification.error(function (data, status, headers, config) {
                    $ionicLoading.hide();
                    $scope.$broadcast('scroll.refreshComplete');
                    $ionicNavBarDelegate.back();

                  })
              }
            );
        } // else WIFI
    };
    //-----------------------------------
    //--         REJECT
    //-----------------------------------
    $scope.docReject = function(){
      var appId = $stateParams.AppId;
      var notificationId = $scope.NOTIFICATION_ID;
      var actionType = "REJECT";
      if("wifi" === config_app.network){
        $ionicLoading.hide();
        $scope.$broadcast('scroll.refreshComplete');
        PelApi.showPopup(config_app.wifiTitle , config_app.wifiSubTitle);
        //$state.go("app.p1_appsLists");
      }else {
        $scope.data = {};
        var myPopup = $ionicPopup.show({
          template: '<div class="list pele-note-background" dir="RTL"><label class="item item-input"><textarea rows="8" ng-model="data.note" type="text"></textarea></label></div>',
          title: '',
          subTitle: '',
          scope: $scope,
          buttons: [
            {text: 'בטול'},
            {
              text: '<b>שמירה</b>',
              type: 'button-positive',
              onTap: function (e) {
                if (!$scope.data.note) {
                  //don't allow the user to close unless he enters wifi password
                  e.preventDefault();
                } else {

                  return $scope.data.note;
                }
              }
            },
          ]
        });
        myPopup.then(function (res) {
          note = res
          if(note!==undefined) {
            PelApi.showLoading();
            var links3 = PelApi.getDocApproveServiceUrl("SubmitNotif");
            var retSubmitNotification = PelApi.SubmitNotification(links3, appId, notificationId, note, actionType);
            retSubmitNotification.then(
              //---- SUCCESS -----//
              function () {
                retSubmitNotification.success(function (data, status, headers, config) {
                  $ionicLoading.hide();
                  $scope.$broadcast('scroll.refreshComplete');
                  $ionicNavBarDelegate.back();
                }),
                  retSubmitNotification.error(function (data, status, headers, config) {
                    $ionicLoading.hide();
                    $scope.$broadcast('scroll.refreshComplete');
                    $ionicNavBarDelegate.back();
                  });
              },
              //---- ERROR -----//
              function () {
                retSubmitNotification.success(function (data, status, headers, config) {
                  $ionicLoading.hide();
                  $scope.$broadcast('scroll.refreshComplete');
                  $ionicNavBarDelegate.back();
                }),
                  retSubmitNotification.error(function (data, status, headers, config) {
                    $ionicLoading.hide();
                    $scope.$broadcast('scroll.refreshComplete');
                    $ionicNavBarDelegate.back();

                  })
              }
            );
          }
        });
      }
    }; // docReject
    $scope.doRefresh();

  }])
;
