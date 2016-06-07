'use strict';

// TODO: it's questionable whether AppConfig is going to have any more than the
//       Firebase url in it, and if not, it's probably not necessary

var DEBUG = true;

window.App = angular.module('OnTap', ['firebase', 'ng-sortable', 'toastr', 'ngAnimate', 'angularSpinner', 'ui.bootstrap','AppConfig']);

App.controller("TapListController", function($rootScope, $scope, $firebase, $firebaseAuth, $location, toastr, usSpinnerService, AppConfig) {

    if( !AppConfig.url ) {
        $scope.configError = "No config url.  Please configure your Firebase url.";
        throw $scope.configError;
    }

    $scope.configLoaded = true;
    // $rootScope.location_name = "Franklin St Brewing Co";
    $scope.date = Date.now();

    $scope.editingAllowed = editingAllowed;

    $scope.toggleTapListEditMode = toggleTapListEditMode;

    $scope.newBeer = newBeer;
    $scope.editBeer = editBeerMode;
    $scope.editBeerOk = updateBeer;
    $scope.editBeerCancel = cancelEdit;
    $scope.deleteBeer = deleteBeer;

    $scope.signIn = signIn;
    $scope.signUp = signUp;
    $scope.signOut = signOut;
    
    $scope.sortConfig = {
        filter: ".row-header",
        disabled: true,
        onSort: onItemReorder,
    };

    // TODO: improve naming
    var auth;
    $scope.authRequired = true;
    var adminUid;
    var ref;
    // var firebase;

    init();
    
    function init() {
        debug("init()");
        var path = $location.path();

        $scope.editMode = path.endsWith("/edit");
        path = path.replace("/edit", "");
        debug( "path: " + path );

        // TODO: need a good way to normalize path
        if( path == null || path == "" || path == "/" ) {
            // not going to allow no path for now, redirect to demo
            debug("no path, redirecting to /demo");
            $location.path("/demo");
            init();
            return;
        }

        // TODO: differentiate between full path and base path

        var url = AppConfig.url + path;
        debug("Firebase root url: " + url);

        // This is intended to be... the base url (/franklin)
        // firebase = $firebase(new Firebase(url));
        ref = new Firebase(url);
        // debug("Fire! ", ref);
        // var uid = 
        adminUid = $firebase(ref.child("uid")).$asObject();
        adminUid.$loaded().then(onUid);

        // first see if this path has had a user configured
        // var uid = $firebase(new Firebase(url + "/uid")).$asObject();;
        // if(uid.$value) {
        //     debug(path + " requires a user for editing");
        //     $scope.authRequired = true;
        // } else {
        //     debug(path + " has not had a user configured");
        //     $scope.authRequired = false;
        // }
        // debug("uid: ", uid);


        // experimenting with auth
        auth = $firebaseAuth(new Firebase(url));
        $scope.user = auth.$getAuth();
        debug( $scope.user );
        if( $scope.user ) {
            log( "Signed in as ", $scope.user.password.email );
        }

        // if uid is null (no user has been configured)
        //   anyone can edit
        //   the sign in button changes to a sign UP button
        // if uid is not null
        //   if user matches, good to go
        //   if user doesn't match, a login in required (null out user object?)
        // on sign UP
        //   if user AND password already exist, just assign that uid to the node uid
        // need to alter again the notion of canEdit


        var name = $firebase(new Firebase(url + "/name")).$asObject();
        name.$bindTo($scope, 'name')
            .then( function() {
                $rootScope.title_name = name.$value;                
            });

        var lastUpdate = $firebase(new Firebase(url + "/last_update")).$asObject();
        lastUpdate.$bindTo($scope, 'lastUpdate');

        $scope.beers = $firebase(new Firebase(url + "/beers")).$asArray();

        $scope.editedBeer = null;

        sortingEnabled(editingAllowed());
    } 

    function onUid() {
        // first see if this path has had a user configured
        // var uid = $firebase(new Firebase(url + "/uid")).$asObject();;
        if(adminUid.$value) {
            debug(" requires a user for editing");
            $scope.authRequired = true;
        } else {

            debug(" has not had a user configured");
            $scope.authRequired = false;
        }
        debug("uid: ", adminUid);

        // TODO: function
        if(adminUid.$value && $scope.user && $scope.user.uid == adminUid.$value) {
            debug("user is go for editing");
        }

    }


    function toggleTapListEditMode() {
        var newPath;
        if ($scope.editMode) {
            newPath = $location.path().replace('/edit', '');
        } else {
            newPath = $location.path() + '/edit';
        }
        $location.path(newPath);
    }


    // STATE QUERYING
    //

    function editingAllowed() {
        // return $scope.user && $scope.editMode;
        return $scope.editMode && ($scope.user || !$scope.authRequired);
    };



    
    // BACKEND INTERACTION
	
















    // re-initialize stuff if the url hash path changes
    $scope.$watch( function () {
        return $location.path();
    }, function (newValue, oldValue) {
        if(oldValue != newValue) {
            debug("location changed: ", oldValue, newValue);
            init();
        }
    });


    // ACTIONS
    //

    function newBeer() {
        debug("Create new beer");
        $scope.editedBeer = { $priority: $scope.beers.length };
        $scope.beers.push( $scope.editedBeer );
        sortingEnabled(false);
    }

	function editBeerMode(beer) {
        if(!$scope.editingAllowed() || $scope.editedBeer) {
            return;
        }

		debug("Edit beer: ", beer);
		$scope.editedBeer = angular.copy(beer);
        sortingEnabled(false);
	}

    function onItemReorder(evt) {
        debug("onItemReorder: ", evt);
        for(var i = 0; i < $scope.beers.length; i++) {
            setOrder($scope.beers[i], i);
        }
    }

    function sortingEnabled(enabled) {
        $scope.sortConfig.disabled = !enabled;
    }
 

    // BEER CRUD
    //

	function updateBeer(beer) {
        if( $scope.editedBeer.hasOwnProperty('$id') ) {
    		debug("update beer: ", beer, " with ", $scope.editedBeer);
    		angular.extend(beer, $scope.editedBeer);
            saveBeer(beer, function() {
                displaySuccess("Changes saved");
            });
        } 
        else {
            saveNewBeer($scope.editedBeer);
        }
	}

    function saveNewBeer(beer) {
        $scope.beers.$add(beer)
            .then( function(ref) {
                log("Saved new beer: ", beer);
                displaySuccess("Added " + beer.name);
                // remove the temporary one
                cancelEdit();
            })
            .catch(displayError);
    }

    function setOrder(beer, value) {
        if(beer.$priority != value) {
            beer.$priority = value;
            saveBeer(beer);
        }
    }

    function saveBeer(beer, onSuccess, onError) {
        debug("Saving " + beer.name);
        var promise = $scope.beers.$save(beer)
            .then( function() {
                debug(beer.name + " updated successfully");
                cancelEdit();
            })
            .catch(displayError);

        if(onSuccess) {
            promise = promise.then(onSuccess);
        }

        if(onError) {
            promise = promise.catch(onError);
        }
    }

	function cancelEdit() {
        debug("cancelEdit");
        // if editedBeer was a new one that we're not going to save, we need to
        // remove it from the beers list
        if( $scope.editedBeer && !$scope.editedBeer.hasOwnProperty('$id') ) {
            $scope.beers.pop();
        }
		$scope.editedBeer = null;
        sortingEnabled(true);
	}

    function deleteBeer(beer) {
        log("Delete: ", beer);
        $scope.beers.$remove(beer)
            .then( function(ref) {
                cancelEdit();
                displaySuccess("Deleted " + beer.name);
            })
            .catch(displayError);
    };


    // USER AUTH
    //

    $scope.spin = function() {
        log("spin");

    }

    function signIn(email, password) {
        log("Signing in " + email);
        usSpinnerService.spin('login-spinner');
        $scope.signingIn = true;
        // TODO: submitting with no password generates an error but doesn't call onSignInError
        auth.$authWithPassword({
            email: email,
            password: password
        })
        .then(onSignIn, onSignInError)
        .catch(onSignInError);
    };

    function onSignIn(user) {
        log(user.password.email + " signed in successfully");
        if( isAdminUser(user) ) {
            // enable editing features....
            $scope.user = user;
            $scope.password = "";
            $scope.sortConfig.disabled = false;
            displaySuccess("Signed in");
        } else {
            displayError("User is not authorized to edit this node.");
            signOut();
        }
        $scope.signingIn = false;
        usSpinnerService.stop('login-spinner');
    }

    function isAdminUser(user) {
        if(user.uid == adminUid.$value) {
            return true;
        }
        return false;
    }

    function onSignInError(error) {
        displayError(error.message);
        $scope.signingIn = false;
        usSpinnerService.stop('login-spinner');
    }

    function signUp(email, password) {
        log("Signing up " + email);
        $scope.signingIn = true;
        usSpinnerService.spin('login-spinner');
        // first try signing in to see if the account already exists
        // TODO: duplicate code
        auth.$authWithPassword({
            email: email,
            password: password
        })
        .then(onSignIn)
        .then( function() {
            log("User ", $scope.user, " already existed, attaching them to current path");
            // TODO: removing var uid and just using $set on the root would probably be better
            // save $scope.user.uid back to path + "/uid"
            if( $scope.user ) {
                $firebase(ref).$set("uid", $scope.user.uid)
                // uid.$value = $scope.user.uid;
                // uid.$save()
                    .then( function() {
                        log("user is now associated with path");
                        $scope.authRequired = true;
                    })
                    .catch( function(error) {
                        // something went wrong, leaving the user signed in will be a funky state?
                        signOut();
                        displayError(error);
                    });
            }
        })
        .catch( function() {
            debug("User doesn't already exist, that's fine, creating account");
            debug("using " + email + ":" + password);
            // auth.$createUser({
            //     email: email,
            //     password: password
            // })
            auth.$createUser(email, password)
            .then( function(user) {
                // ok, so user's been created, now need to both save /uid and login
                // recurse?
                displaySuccess("User created");
                signUp(email, password);
            })
            .catch(onSignUpError);
        });
    }

    function onSignUpError(error) {
        // TODO
        log("ERROR: ", error);
        displayError(error);
        $scope.signingIn = false;
        usSpinnerService.stop('login-spinner');
    }

    function signOut() {
        log("Signing out");
        auth.$unauth();
        onSignOut();
    };

    function onSignOut(){
        // disable editing features...
        $scope.user = null;
        $scope.sortConfig.disabled = true;
        displaySuccess("Signed out");
    }


    // LOGGING, USER FEEDBACK
    //

    function log() {
        console.log.apply(console, arguments);
    }

    function debug() {
        if(DEBUG) {
            log.apply(null, arguments);
        }
    }

    function displayError(message) {
        // TODO: toastr
        log("ERROR: ", message);
        toastr.error(message, 'Error');
    }

    function displaySuccess(message) {
        toastr.success(message, '', {
            timeOut: 1000
        });
    }

});



App.directive('showFocus', function($timeout) {
  return function(scope, element, attrs) {
    scope.$watch(attrs.showFocus, 
      function (newValue) { 
        $timeout(function() {
            newValue && element[0].focus();
        });
      },true);
  };    
});

App.directive('cancelEscape', function () {
  'use strict';

  var ESCAPE_KEY = 27;

  return function (scope, elem, attrs) {
   elem.bind('keydown', function (event) {
    if (event.keyCode === ESCAPE_KEY) {
     scope.$apply(attrs.cancelEscape);
    }
   });
  };
});


App.directive('beerColorSelector', function() {
    return {
        restrict: 'A',
        templateUrl: 'colorselector.html',
        replace: true,
        // scope: {
        //     beerColorSelector: '='
        // },
        compile: function(tElement, tAttrs) {
           // tElement.append('Added during compilation phase!');
           scope.$eval(tElement.colorselector());
         },
        link: function(scope, element, attrs) {
            console.log("do something", scope, element, attrs);
            // element.colorselector();
            $(element).click(function() {
                console.log("color selector clicked");
                // $(element).toolbar(scope.$eval(attrs.toolbarTip));
                console.log(scope.$eval(attrs.beerColorSelector));
            });
        }
    };
});
