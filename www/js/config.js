angular.module('pele.config', [])
.constant('WORDPRESS_API_URL', 'http://wordpress.startapplabs.com/blog/api/')
.constant('GCM_SENDER_ID', '574597432927')
.constant('appSettings', {
    api:"http://msso.pelephone.co.il/PCBarCode/PrintCenterBar.asmx/WhoMI" ,
    usermenuAPIURL:"http://msso.pelephone.co.il/MobileServices/SSOService.svc/json/GetUserMenu",
    userModuleTypes:"http://msso.pelephone.co.il/REST/GetUserModuleTypes",
    userFormGroups:"http://msso.pelephone.co.il/REST/GtUserFormGroups",
    userNotifications:"http://msso.pelephone.co.il/REST/GetUserNotif",
    userSubmitNotification:"http://msso.pelephone.co.il/REST/SubmitNotif",
    sapi:"https://msso.pelephone.co.il/PCBarCode/PrintCenterBar.asmx/WhoMI" ,
    timeout:10000,
    menuTimeout:5000,
    translateFlag:"N",
    flashTime: 2500 ,
    getUserMenuError: "שגיאת קבלת התפריטים למשתמש, קוד שגיאה - ",
    enviroment:"QA",
    enviromentLinks:[
                      { Environment:"CURRENT",
                        ServiceList:[{"Service": "GetUserMenu",
                          "URL":"http://msso.pelephone.co.il/MobileServices/SSOService.svc/json/GetUserMenu",
                          "RequestHeader":""
                        },
                          {"Service":"GetUserModuleTypes",
                            "URL":"http://msso.pelephone.co.il/REST/GetUserModuleTypes",
                            "RequestHeader":{"ServiceName": "GetUserModuleTypes","AppID": "MobileApp","EnvCode": "MobileApp_QA","Timeout": "1000"}
                          },
                          {"Service":"GtUserFormGroups",
                            "URL":"http://msso.pelephone.co.il/REST/GtUserFormGroups",
                            "RequestHeader":{"ServiceName": "GetUserFormGroups","AppID": "MobileApp","EnvCode": "MobileApp_QA","Timeout": "1000"}
                          },
                          {"Service":"GetUserNotif",
                            "URL":"http://msso.pelephone.co.il/REST/GetUserNotif",
                            "RequestHeader":{"ServiceName": "GetUserNotifications","AppID": "MobileApp","EnvCode": "MobileApp_QA","Timeout": "1000"}
                          },
                          {"Service":"SubmitNotif",
                            "URL":"http://msso.pelephone.co.il/REST/SubmitNotif",
                            "RequestHeader":{"ServiceName": "SubmitNotifications","AppID": "MobileApp","EnvCode": "MobileApp_QA","Timeout": "1000"}
                          }]
                      },
                      { Environment:"PROD",
                        ServiceList:[{"Service":"GetUserMenu",
                          "URL":"http://msso.pelephone.co.il/PD/MobileServices/SSOService.svc/json/GetUserMenu",
                          "RequestHeader":""
                        },
                          {"Service":"GetUserModuleTypes",
                            "URL":"http://msso.pelephone.co.il/PD/REST/GetUserModuleTypes",
                            "RequestHeader":{"ServiceName": "GetUserModuleTypes","AppID": "MobileApp","EnvCode": "MobileApp_PROD","Timeout": "1000"}
                          },
                          {	"Service":"GtUserFormGroups",
                            "URL":"http://msso.pelephone.co.il/PD/REST/GtUserFormGroups",
                            "RequestHeader":{"ServiceName": "GetUserFormGroups","AppID": "MobileApp","EnvCode": "MobileApp_PROD","Timeout": "1000"}
                          },
                          {	"Service":"GetUserNotif",
                            "URL":"http://msso.pelephone.co.il/PD/REST/GetUserNotif",
                            "RequestHeader":{"ServiceName": "GetUserNotifications","AppID": "MobileApp","EnvCode": "MobileApp_PROD","Timeout": "1000"}
                          },
                          {	"Service":"SubmitNotif",
                            "URL":"http://msso.pelephone.co.il/PD/REST/SubmitNotif",
                            "RequestHeader":{"ServiceName": "SubmitNotifications","AppID": "MobileApp","EnvCode": "MobileApp_PROD","Timeout": "1000"}
                          }
                        ]
                      },
                      {Environment:"QA",
                        ServiceList:[{"Service":"GetUserMenu",
                          URL:"http://msso.pelephone.co.il/QA/MobileServices/SSOService.svc/json/GetUserMenu",
                          "RequestHeader":""
                        },
                          {"Service":"GetUserModuleTypes",
                            "URL":"http://msso.pelephone.co.il/QA/REST/GetUserModuleTypes",
                            "RequestHeader":{"ServiceName": "GetUserModuleTypes","AppID": "MobileApp","EnvCode": "MobileApp_QA","Timeout": "6000"}
                          },
                          {"Service":"GtUserFormGroups",
                            "URL":"http://msso.pelephone.co.il/QA/REST/GtUserFormGroups",
                            "RequestHeader":{"ServiceName": "GetUserFormGroups","AppID": "MobileApp","EnvCode": "MobileApp_QA","Timeout": "6000"}
                          },
                          {"Service":"GetUserNotif",
                            "URL":"http://msso.pelephone.co.il/QA/REST/GetUserNotif",
                            "RequestHeader":{"ServiceName": "GetUserNotifications","AppID": "MobileApp","EnvCode": "MobileApp_QA","Timeout": "6000"}
                          },
                          {"Service":"SubmitNotif",
                            "URL":"http://msso.pelephone.co.il/QA/REST/SubmitNotif",
                            "RequestHeader":{"ServiceName": "SubmitNotifications","AppID": "MobileApp","EnvCode": "MobileApp_QA","Timeout": "6000"}
                          }
                        ]
                      },
                      {Environment:"DEV",
                        ServiceList:[{	"Service":"GetUserMenu",
                          "URL":"http://msso.pelephone.co.il/DV/MobileServices/SSOService.svc/json/GetUserMenu",
                          "RequestHeader":""
                        },
                          {	"Service":"GetUserModuleTypes",
                            "URL":"http://msso.pelephone.co.il/DV/REST/GetUserModuleTypes",
                            "RequestHeader":{"ServiceName": "GetUserModuleTypes","AppID": "MobileApp","EnvCode": "MobileApp_DEV","Timeout": "6000"}
                          },
                          {	"Service":"GtUserFormGroups",
                            "URL":"http://msso.pelephone.co.il/DV/REST/GtUserFormGroups",
                            "RequestHeader":{"ServiceName": "GetUserFormGroups","AppID": "MobileApp","EnvCode": "MobileApp_DEV","Timeout": "6000"}
                          },
                          {	"Service":"GetUserNotif",
                            "URL":"http://msso.pelephone.co.il/DV/REST/GetUserNotif",
                            "RequestHeader":{"ServiceName": "GetUserNotifications","AppID": "MobileApp","EnvCode": "MobileApp_DEV","Timeout": "6000"}
                          },
                          {	"Service":"SubmitNotif",
                            "URL":"http://msso.pelephone.co.il/DV/REST/SubmitNotif",
                            "RequestHeader":{"ServiceName": "SubmitNotifications","AppID": "MobileApp","EnvCode": "MobileApp_DEV","Timeout": "6000"}
                          }]
                      }
                    ]
})
;


var config_app = {
    network:"",
    isOnline:"",
    pinCodeLock:false,
    wifiTitle : "WiFi- יש להתנתק מ",
    wifiSubTitle : "האפליקציה פעילה ברשת סלולארית בלבד",
    declineTitle : "לפני דחייה",
    declineSubTitle : "חובה להזין הערה",
    pinCodeErrorVal:"קוד מחמיר שגוי",
    pinCodeErrorInit:"לא הוגדר קוד מחמיר. יש להגדיר בפורטל או ב-55",
    pinCodeErrorLock:"קוד מחמיר נעול. יש להגדיר קוד חדש בפורטל או ב-55",
    pinCodeSubTitlePCR: "חובה להזין קוד מחמיר",
    pinCodeSubTitlePWA: "קוד מחמיר שגוי",
    pinCodeSubTitlePDA: "קוד מחמיר חסום. יש להגדיר קוד חדש בפורטל או ב-55",
    pinCodeSubTitlePNE:"קוד מחמיר לא קיים ...",
    pinCodeSubTitleNRP:"קוד מחמיר נעול. צריך לאפס ...",

    getUserMenuErrorMsg:"שגיאה בטעינת רשימת אפליקציות",
    getUserModuleTypesErrorMag:"בקשה הסתיימה עם שגיאה , נא לרענן מסך",
    loadingMsg:"ממתין לטעינת נתונים ...",
    isAddNoteTitle:"האם ברצונך להוסיף הערה?",
    errorMsg:"",
    pinCodeErrorInd:"N",
    pinCodeReq:"Y",
    token:"",
    user:"",
    userName:"",
    PIN:"0",
    GetUserMenu:"",
    GetUserModuleTypes:"",
    tabs: [{"text": "סבב מאשרים"}, {"text": "תוכן טופס"}],
    PIN_STATUS: { "EOL":"" ,//- End of life
                  "PAD":"גישה נחסמה, נה לפנות ל 55 ...", // - Pin access denied after 3 time
                  "PWA":"גישה הלא נכונה ...", // - Pin wrong access
                  "NRP":"קוד מחמיר נעול. צריך לאפס ...", // - Need to reset Pin
                  "PNE":"קוד מחמיר לא קיים ...", //  Pin not Exist
                  "PCR":"הזינו קוד מחמיר, אפליקצייה דורשת הזדהות",
                  "InValid":"",// - general error
                  "Valid":"",
                  "SYS_ERROR":"שגיאה מערכתי ..."
                },
    adv : { "ROWSET": {
                "ROW": [
                    {
                        "IMG": "1",
                        "TEXT": "טקסת חופשי כהשלה לתמונה ניתן לכתוב עד 500 תווים" +
                        "טקסת חופשי כהשלה לתמונה ניתן לכתוב עד 500 תווים" +
                        "טקסת חופשי כהשלה לתמונה ניתן לכתוב עד 500 תווים"
                    },
                    {
                        "IMG": "2",
                        "TEXT": "טקסת חופשי כהשלה לתמונה ניתן לכתוב עד 500 תווים" +
                        "טקסת חופשי כהשלה לתמונה ניתן לכתוב עד 500 תווים" +
                        "טקסת חופשי כהשלה לתמונה ניתן לכתוב עד 500 תווים"
                    },
                    {
                        "IMG": "3",
                        "TEXT": "טקסת חופשי כהשלה לתמונה ניתן לכתוב עד 500 תווים"
                    },
                    {
                        "IMG": "4",
                        "TEXT": "טקסת חופשי כהשלה לתמונה ניתן לכתוב עד 500 תווים"
                    }
                ]
            }
    },
    docDetails:{},
    ApprovRejectBtnDisplay: true,
};

