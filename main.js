	$.urlParam = function(name){
	    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	    if (results==null){
	       return null;
	    }
	    else{
	       return results[1] || 0;
	    }
	}

    // this is called when page is done loading to set up (initialize) the KandyAPI.Phone
    setup = function() {

        // initialize KandyAPI.Phone, passing a config JSON object that contains listeners (event callbacks)
        KandyAPI.Phone.setup({
            // respond to Kandy events...
            listeners: {
                loginsuccess: function () {
                    changeUIState('LOGGED_IN');
                    setInterval(getIms, 5000);
                },
                loginfailed: function () { alert("Login failed");}
            }
        });
    }
	

    login = function() {
        KandyAPI.Phone.login($("#domainApiId").val(), $("#logInId").val(), $('#passwd').val());
    }

    logout = function() {
        KandyAPI.Phone.logout(function () {
            changeUIState('LOGGED_OUT');
        });
    };
	
	flareObj = function(user, hero, description, category) {
		this.id = new Date().getTime();
		this.user = user;
		this.hero = hero;
		this.description = description;
		this.category = category;
		this.latitude = window.latitude;
		this.longitude = window.longitude;
}
    	
	function flareSubmit() {
			
			getLocation();
			
			function showLocation(position) {
  				window.latitude = position.coords.latitude;
  				window.longitude = position.coords.longitude;
  
			}

			function errorHandler(err) {
  				if(err.code == 1) {
    					alert("Error: Access is denied!");
  				} else if( err.code == 2) {
    					alert("Error: Position is unavailable!");
  				}
			}

			function getLocation() {
				if(navigator.geolocation) {
      					// timeout at 60000 milliseconds (60 seconds)
      					var options = {timeout:60000};
      					navigator.geolocation.getCurrentPosition(showLocation, errorHandler, options);
   				} else {
      					alert("Sorry, browser does not support geolocation!");
   				}
			}
		

		var flare = new flareObj($('#logInId').val(), null, document.getElementById('desc').value, document.getElementById('cat').value);
		var flareStr = JSON.stringify(flare);
		
		sendIm(flareStr);
	}

   sendIm = function(flare) {
       if ($('#logInId').val() != 'user1')
           sendImToUser('user1@heliograph2.com', flare);
       if ($('#logInId').val() != 'user2')
           sendImToUser('user2@heliograph2.com', flare);
       if ($('#logInId').val() != 'user3')
           sendImToUser('user3@heliograph2.com', flare);
       if ($('#logInId').val() != 'user4')
           sendImToUser('user4@heliograph2.com', flare);
       if ($('#logInId').val() != 'user5.com')
           sendImToUser('user5@heliograph2.com', flare);
   };

    sendImToUser = function(userName, flare) {
        var uuid = KandyAPI.Phone.sendIm(userName, flare,
                function(result) {
                    //alert('IM sent to '+ userName);
                },
                function() {
                    alert("IM send failed");
                }
        );
    };
	
    getIms = function() {
        KandyAPI.Phone.getIm(
                function(data) {
                    var i = 0;
                    for (i = 0; i < data.messages.length; ++i) {
                        var msg = data.messages[i];
                        if (msg.messageType == 'chat') {
                            var username = data.messages[i].sender.user_id;
                            window.msg = data.messages[i].message.text
							
							var flare =  JSON.parse(window.msg);

                            $('#messages').append('<div>' +
                                    '<span class="imUsername">' + username + '</span>' +
                                    '<span class="imMessage">' + window.msg + '</span>' +
                                    '</div>');
								
								$('#feed').append('<tr><td id = "timestamp">'+new Date(flare.id)+'</td><td>'+flare.category+'</td><td>'+flare.user+'</td><td>'+flare.hero+
															'</td><td><input type="button" id="Be the Hero" value="respond" onclick = "respond(window.msg); return(false);"></td></tr>');
							
                        } else {
                            //alert("received " + msg.messageType + ": ");
                        }
                    }
                },
                function() {
                    alert("error receiving IMs");
                }
        )
    };
	
	respond = function(msg){
		var flare =  JSON.parse(msg);
		
		flare.hero = $("#logInId").val();
		var flareStr = JSON.stringify(flare);
		
		sendIm(flareStr);		
		}
		

    changeUIState = function(state) {
        switch (state) {
            case 'LOGGED_OUT':
                $('#loggedInAs').val('');
                $("#loginForm").show();
                $("#loggedIn").hide();
                $('#contactsAndDirSearch').hide();
                $("#myContacts div:not(:first)").remove();
                $("#chat").hide();
                break;
            case 'LOGGED_IN':
                $('#loggedInAs').text($('#logInId').val());
                $("#loginForm").hide();
                $("#loggedIn").show();
                $('#contactsAndDirSearch').show();
                $("#chat").show();
                break;
        }
    }
    
    $(document).ready(function() {
        if ($.urlParam('userid')) {
            var password = null;
            switch ($.urlParam('userid')) {
                case 'user1':
                    password = '1um6v66w1';
                    break;
                case 'user2':
                    password = '2iwolimw12';
                    break;
                case 'user3':
                    password = 'aaaa1234';
                    break;
                case 'user4':
                    password = 'aaaa1234';
                    break;
                case 'user5':
                    password = 'aaaa1234';
                    break;
            }  //switch
            $('#logInId').val($.urlParam('userid'));
            $('#passwd').val(password);
            if ($.urlParam('userid') !== undefined && $.urlParam('userid') != null)
                login();
        }
    });