angular.module('AppConfig', [])
    .provider('AppConfig', function() {
        var config = {
            // change these values for your account
            url: "https://vivid-torch-6811.firebaseio.com",
            // auth for editing the beer list, not Firebase credentials
            admin: { 
                username: "admin", 
                password: "12345" 
            }
        };
        return {
            set: function(settings) {
                config = settings;
            },
            $get: function() {
                return config;
            }
        };
    });