angular.module('pele.factories', [])

.factory('PelApi',function($http ,$rootScope,appSettings,$state,$ionicLoading,$filter,$ionicPopup,$timeout,$fileLogger) {
  return {
    sendPincode: function (pincode) {
      return $http({
        url:appSettings.api ,
        method:"POST" ,
        data: {pincode:pincode},

        timeout:appSettings.timeout,
        headers: {'Content-Type': 'application/json; charset=utf-8' }
      });
    },
    login: function() {
      return $http({
        url:appSettings.api ,
        method:"POST" ,
        data: {},
        timeout:appSettings.timeout,
        headers: {'Content-Type': 'application/json; charset=utf-8' }
      });
    }   ,
    //--------------------------------------------------------------------//
    //                    GetUserMenu PAGE 1                              //
    //--------------------------------------------------------------------//
    getMenu: function (links) {
      // LOADING
      var envUrl = links.URL;
      var version = config_app.APP_VERSION;

      this.writeToLog(config_app.LOG_FILE_INFO_TYPE ,"====== getMenu ======");
      this.writeToLog(config_app.LOG_FILE_INFO_TYPE , "URL :" + JSON.stringify(envUrl));
      this.writeToLog(config_app.LOG_FILE_INFO_TYPE , "VERSION :" + version);

      return   $http({
        url:envUrl,
        method: "GET",
        timeout :appSettings.menuTimeout,
        headers: {'Content-Type': 'application/json; charset=utf-8','VERSION':version}
      });
    },
    //------------------------------------------------------------------------//
    //                        getUserModuleTypes PAGE 2                       //
    //------------------------------------------------------------------------//
    getUserModuleTypes: function (links,appId,pin) {

      var token = config_app.token;
      console.log("P2 : " + config_app.token);
      var userName = config_app.userName;

      var envUrl = links.URL;
      var RequestHeader = links.RequestHeader;
      var data = { "Request": {
        "RequestHeader": RequestHeader,
        "InParams": {
          "Token": token,
          "AppId": appId,
          "PIN": pin,
          "UserName": userName
        }
      }
      };

      this.writeToLog(config_app.LOG_FILE_INFO_TYPE ,"====== getUserModuleTypes ======");
      this.writeToLog(config_app.LOG_FILE_INFO_TYPE , "URL :" + JSON.stringify(envUrl));
      this.writeToLog(config_app.LOG_FILE_INFO_TYPE , "DATA : " + JSON.stringify(data));

      return $http({
        url:envUrl ,
        method:"POST" ,
        data: data,
        timeout:appSettings.timeout,
        headers: {"Content-Type": "application/json","Accept":"application/json" }
      });
    },
    //--------------------------------------------------------------------------//
    //--                       GetUserFormGroups  PAGE3                       --//
    //--------------------------------------------------------------------------//
    GetUserFormGroups:function (links , appId , formType, pin) {


        var token = config_app.token;
        var userName = config_app.userName;
        var envUrl = links.URL;
        var RequestHeader = links.RequestHeader;
        var data = { "Request": {
                        "RequestHeader": RequestHeader,
                        "InParams": {
                              "Token": token,
                              "AppId": appId,
                              "PIN": pin,
                              "UserName": userName,
                              "FormType": formType
                             }
                        }
        };

        this.writeToLog(config_app.LOG_FILE_INFO_TYPE ,"====== GetUserFormGroups ======");
        this.writeToLog(config_app.LOG_FILE_INFO_TYPE , "URL :" + JSON.stringify(envUrl));
        this.writeToLog(config_app.LOG_FILE_INFO_TYPE , "DATA : " + JSON.stringify(data));

        return $http({
            url:envUrl ,
            method:"POST" ,
            data: data,
            timeout:appSettings.timeout,
            headers: {"Content-Type": "application/json; charset=utf-8","Accept":"application/json" }
        });
    },
    //--------------------------------------------------------------------------//
    //--                       GetUserNotifications  PAGE4                    --//
    //--------------------------------------------------------------------------//
    GetUserNotifications:function(links , appId , docId , docInitId){
        var token = config_app.token;
        var userName = config_app.userName;
        var envUrl = links.URL;
        var RequestHeader = links.RequestHeader;
        var data = { "Request": {
            "RequestHeader": RequestHeader,
            "InParams": {
                "Token": token,
                "AppId": appId,
                "PIN": "0",
                "UserName": userName,
                "DocId":docId,
                "DocInitId":docInitId
            }
        }
        };

        this.writeToLog(config_app.LOG_FILE_INFO_TYPE ,"====== GetUserNotifications ======");
        this.writeToLog(config_app.LOG_FILE_INFO_TYPE , "URL :" + JSON.stringify(envUrl));
        this.writeToLog(config_app.LOG_FILE_INFO_TYPE , "DATA : " + JSON.stringify(data));

        return $http({
            url:envUrl,
            method:"POST",
            data: data,
            timeout:appSettings.timeout,
            headers: {"Content-Type": "application/json; charset=utf-8","Accept":"application/json"
            }
        });
    },
    //--------------------------------------------------------------------------//
    //--                       SubmitNotification  PAGE4                      --//
    //--------------------------------------------------------------------------//
    SubmitNotification:function(links , appId , notificationId , note , actionType){
        var token = config_app.token;
        var userName = config_app.userName;
        var envUrl = links.URL;
        var RequestHeader = links.RequestHeader;
        var data = { "Request": {
            "RequestHeader": RequestHeader,
            "InParams": {
                "Token": token,
                "AppId": appId,
                "PIN": "0",
                "UserName": userName,
                "NotificationId":notificationId,
                "Note":note,
                "ActionType":actionType
            }
        }
        };
        this.writeToLog(config_app.LOG_FILE_INFO_TYPE ,"====== SubmitNotification ======");
        this.writeToLog(config_app.LOG_FILE_INFO_TYPE , "URL :" + JSON.stringify(envUrl));
        this.writeToLog(config_app.LOG_FILE_INFO_TYPE , "DATA : " + JSON.stringify(data));
        return $http({
            url:envUrl,
            method:"POST",
            data: data,
            timeout:appSettings.timeout,
            headers: {"Content-Type": "application/json; charset=utf-8","Accept":"application/json"
            }
        });
    },
    //-----------------------------------------------------------------------------//
    //--                      GetPinCodeStatus                                   --//
    //-----------------------------------------------------------------------------//
    GetPinCodeStatus:function(data,interface){
        var status = "";
        try{
          if("getMenu" === interface){
              status = data.Status;
              if("OLD" === status){
                return status;
              }
              if("PAD" !== status ){
                  status = "Valid"
              }
          }else if("getUserModuleTypes" === interface || "GetUserFormGroups" === interface){
          status = data.Response.OutParams.SessionStatus;
          }
        }catch(e){
          status = "Valid";
        }
        return status;
    },
    //--------------------------------------------------------------------------------//
    //--                       PincodeAction                                        --//
    //--------------------------------------------------------------------------------//
    PincodeAction:function(pinRetValue){
        if("EOL" === pinRetValue){

        }
        if("PAD" === pinRetValue){

        }
        if("PWA" === pinRetValue){

        }
        if("NRP" === pinRetValue){

        }
        if("PNE" === pinRetValue){

        }
        if("PCR" === pinRetValue)
        {
            config_app.pinCodeErrorInd = "N";
            $state.go(auth.login);
        }
        if("Invalid" === pinRetValue){

        }
        if("Valid" === pinRetValue){

        }
    },// PincodeAction
    //----------------------------------------------------------//
    //--                    GetServiceUrl                     --//
    //----------------------------------------------------------//
    getDocApproveServiceUrl:function(service){
      var env = appSettings.enviroment;
      var links = appSettings.enviromentLinks;
      var ServiceList = $filter('filter')(links, {Environment: env})[0].ServiceList;
      var Service = $filter('filter')(ServiceList, {Service: service})[0];
      return Service
    },
    //----------------------------------------------------------//
    //                   WI_FI Pop Up
    //----------------------------------------------------------//
    showPopup:function(title , subTitle){
      $rootScope.data = {}

      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        title: title, //'WI-FI נא לסגור',
        subTitle: subTitle,//
        scope: $rootScope,
        buttons: [
          {
            text: '<a class="pele-popup-positive-text-collot">אישור</a>',
            type: 'button-positive',
            onTap: function(e) {
              return true;
            }
          },
        ]
      });
      myPopup.then(function(res) {

      });

    },
    //===========================================================//
    //==                Pin Code PopUp                         ==//
    //===========================================================//
    showPinCode:function(appId , titleDisp , subTitleTxt) {
      $rootScope.data = {}

      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        template: '<input type="tel" ng-model="data.pincode" maxlength="4">',
        title: 'הזינו קוד מחמיר',
        subTitle: subTitleTxt,
        scope: $rootScope,
        buttons: [
          {
            text: '<a class="pele-popup-positive-text-collot">אישור</a>',
            type: 'button-positive',
            onTap: function(e) {
              if (!$rootScope.data.pincode) {
                //don't allow the user to close unless he enters wifi password
                e.preventDefault();
              } else {
                var pin = $rootScope.data.pincode;
                $state.go("app.p2_moduleList",{AppId : appId , title:titleDisp ,"pin":pin});
                return $rootScope.data.pincode;
              }
            }
          },
          { text: '<a class="pele-popup-positive-text-collot">ביטול</a>',
            type: 'button-assertive'
          },
        ]
      });
      myPopup.then(function(res) {

      });
    },
    //====================================================//
    //==            Show Loading                        ==//
    //====================================================//
    showLoading:function(){
      $ionicLoading.show({

        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
    },
    hideLoading:function(){
      $ionicLoading.hide();
    },
    //===========================================================================================//
    //== When         Who       Description
    //== -----------  --------  ----------------------------------------------------------------
    //== 06/01/2015   R.W.      function calculate list Action Buttons Display in Approve page
    //===========================================================================================//
    getButtons : function(buttonsArr){

      var buttons = [];
      var arrLength = buttonsArr.length;
      for(var i=0;i<arrLength;i++){

        if("OK" === buttonsArr[i].LOOKUP_CODE){
          buttons.push(appSettings.OK);
        }
        if("APPROVE" === buttonsArr[i].LOOKUP_CODE){
          buttons.push(appSettings.APPROVE);
        }
        if("REJECT" === buttonsArr[i].LOOKUP_CODE){
          buttons.push(appSettings.REJECT);
        }
      } // for
      return buttons;
    },
    writeToLog : function( textType , text ){

      $fileLogger.setStorageFilename(config_app.LOG_FILE_NAME);

      if("I" === textType && text !==undefined){
        console.log('== I ==');
        $fileLogger.info(text);
      }
      else if("D" === textType && text !==undefined){
        console.log('== D ==');
        $fileLogger.debug(text)
      }
      else if("W" === textType && text !==undefined){
        console.log('== W ==');
        $fileLogger.warn(text);
      }
      else if("E" === textType && text !==undefined){
        console.log('== E ==');
        $fileLogger.error(text);
      }
    }// writeToLog
  };
})

;
