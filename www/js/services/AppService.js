/**
 * Created by Sandeep on 11/09/14.
 */
angular.module('loginparse.services',[])
.factory('DataAccess',['$http','PARSE_CREDENTIALS',function($http,PARSE_CREDENTIALS){
    return {
          getPhotoAll:function(){
                var config = {
                headers: {
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type': 'image/jpeg'
                } 
            };
                  return $http.get('https://api.parse.com/1/classes/UploadPhoto/',config);
         },
          getPhotoUser:function(id){
                var config = {
                headers: {
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type': 'image/jpeg'
                } 
            };
                  return $http.get('https://api.parse.com/1/classes/UploadPhoto/X9TT7lCycq',config);
         },
        uploadPhoto:function(files){
                   var config = {
                headers: {
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type': 'image/jpeg'
                } 
            };
            return $http.post('https://api.parse.com/1/files/img.jpg', files[0], config);
         },
        uploadConnect:function(username,photo){
                   var config = {
                headers: {
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type': 'application/json'
                } 
            }
            return $http.post('https://api.parse.com/1/classes/UploadPhoto', {
               "username": username,
               "photo": photo
           }, config);
         },
        getAll:function(){
            return $http.get('https://api.parse.com/1/classes/User',{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                }
            });
        },
        reset:function(data){
                 var config = {
                headers: {
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type': 'application/json'
                } 
            }
            return $http.post('https://api.parse.com/1/requestPasswordReset', {'email': data.email}, config);
        },
        signUp: function(data) {
            var config = {
                headers: {
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type': 'application/json'
                } 
            }
            return $http.post('https://api.parse.com/1/users', {'username': data.username, 'password': data.password,'name':data.name,'email':data.email,'birthdate':data.birtdate,'gender':data.gender}, config);
        },
        logIn: function(username, password) {
            var config = {
             headers: {
               'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
               'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY
             },
             params: { 
                username: username ,
                password: password
              }
            }
            return $http.get('https://api.parse.com/1/login', config);
        },
        logOut: function(data) {
            var config = {
                headers: {
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
                    'X-Parse-Session-Token': data,
                    'Content-Type': 'application/json'
                } 
            }
            return $http.post('https://api.parse.com/1/logout', {}, config);
        },
    
         me:function(SESSION_TOKEN){
            console.log(SESSION_TOKEN);
            return $http.get('https://api.parse.com/1/users/me',{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    "X-Parse-Session-Token":SESSION_TOKEN,
                    'Content-Type':'application/json'
                }
            });
        },
        edit:function(id,SESSION_TOKEN,data){
          
            return $http.put('https://api.parse.com/1/users/'+id,data,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    "X-Parse-Session-Token":SESSION_TOKEN,
                    'Content-Type':'application/json'
                }
            });
        }
        
    }
}])

.value('PARSE_CREDENTIALS',{
    APP_ID: 'uZydpLmwti8McnpBQK1kS1TPL6qLz6WPZq70VYx6',
    REST_API_KEY:'1dQZrhe4l9iAYNjbp92RdRrFVwckCFnJnvuFOhfW'
});
