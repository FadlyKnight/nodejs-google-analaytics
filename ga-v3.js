var jwt = require('jsonwebtoken');
var request = require('request');


 Date.prototype.addHours = function(h) {
                          this.setTime(this.getTime() + (h*60*60*1000));
                          return this;
 }
 
 var now_b = Date.now();
 var now = now_b+(7*3600);

// if minutes is divisible by 5\
realtimeAnalytics();

function realtimeAnalytics(){
    let uiiaAuth = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  
    let gAuth = {
  "iss": uiiaAuth.client_email,
  "scope": "https://www.googleapis.com/auth/analytics https://www.googleapis.com/auth/analytics.readonly",
   "aud": "https://oauth2.googleapis.com/token",
   "exp": parseInt((now+3600)/1000),
   "iat": parseInt(now/1000)
 };
     var private_key  = uiiaAuth.private_key;
     var token = jwt.sign(gAuth, private_key, { algorithm: 'RS256' });

      var options = {
        'method': 'POST',
        'url': 'https://oauth2.googleapis.com/token',
        'headers': {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
          'assertion': token,
          'grant_type': 'urn:ietf:params:oauth:grant-type:jwt-bearer'
        }
      };

      console.log("SET REQUEST")
      request(options, function (error, response) {
        if (error) { 
            // console.log(JSON.stringify(error))
            throw new Error(error);
        }
        else {
          console.log("SET ACCESS")
        let propertyId = process.env.GA_PROPERTY_ID;
         let res = JSON.parse(response.body);
         res.access_token = res.access_token.replace(/\.+$/, '');
         
             var options = {
              'method': 'GET',
              'url': 'https://www.googleapis.com/analytics/v3/data/realtime?access_token='+res.access_token+'&ids=ga:'+propertyId+'&metrics=rt:activeUsers&dimensions=ga:pagePath',
            //   'url': 'https://www.googleapis.com/analytics/v3/data/realtime?access_token='+res.access_token+'&ids=ga:256066139&metrics=rt:totalEvents&dimensions=rt:eventAction,rt:eventCategory,rt:eventLabel',
              'headers': {
                 'Content-Type': 'application/json'
              },
             };
             request(options, async function (error, response) {
              if (error) {
                console.log(JSON.stringify(error));
                // send_response(400,false,'err','');
              } else {
                console.log("SET RESP")
                let parseResp = JSON.parse(response.body);
                console.log(JSON.stringify(parseResp));
                // console.log(parseResp, parseResp.hasOwnProperty('rows'));
                // let total_viewer = parseResp.totalsForAllResults['rt:activeUsers'];
                // // console.log(total_viewer)
                // send_response(200,true,'total viewer',{total_viewer});
              }
               
             });
         
        }
        
      });
 
}

 
function send_response(status_code, status,message,data) {
    // let responseData =  Helper.sendResponse(status_code, status, message, data);
    // responseData.headers["Access-Control-Allow-Origin"] = event.headers.origin;
    console.log(status_code, status,message,data);
    // callback(null, responseData);
}
