
Flare = function(commoner, description) {
    this.id = new Date().getTime();
    this.commoner = commoner;
    this.description = description;
}

function flareSubmit() {
    var flare = new Flare($('#loggedInAs').val(),
                          $('#loginBtn').val());

    var flareStr = JSON.stringify(flare);
    sendIm('user1@heliograph2.com', flareStr);
    sendIm('user2@heliograph2.com', flareStr);
	sendIm('user3@heliograph2.com', flareStr);
	sendIm('user4@heliograph2.com', flareStr);
	sendIm('user5@heliograph2.com', flareStr);
}

/* when you receive a flare IM, make it an object like this
var flare = flareStr = JSON.parse(flareStr);
...then construct some HTML (a form to respond to a flare) and append it to a div tag
*/

    // this is called when page is done loading to set up (initialize) the KandyAPI.Phone
    setup = function() {

        // initialize KandyAPI.Phone, passing a config JSON object that contains listeners (event callbacks)
        KandyAPI.Phone.setup({
            // respond to Kandy events...
            listeners: {
                loginsuccess: function () {
                    changeUIState('LOGGED_IN');
                    loadContacts();
                    setInterval(getIms, 5000);
                },
                loginfailed: function () { alert("Login failed");}
            }
        });
    }

    login = function() {
        KandyAPI.Phone.login("DAK63ed5440255241d88666c634650bda4e", $("#logInId").val(), $('#passwd').val());
    }

    logout = function() {
        KandyAPI.Phone.logout(function () {
            changeUIState('LOGGED_OUT');
        });
    }

    loadContacts = function() {
        KandyAPI.Phone.retrievePersonalAddressBook(
                function(results) {
                    // clear out the current address book list
                    $("#myContacts div:not(:first)").remove();
                    var div = null;
                    if (results.length == 0) {
                        div = "<div class='noresults'>-- No Contacts --</div>"
                        $('#myContacts').append(div);
                    } else {
                        for (i = 0; i < results.length; i++) {
                            $('#imToUser').append(
                                    '<option value="' + results[i].primaryContact  + '">' + results[i].nickname +'</option>'
                            );
                        }
                    }
                },
                function() { alert("Error");}
        );
    }

    var userIdToAddToContacts = null;  // need access to this in anonymous function below
    addToContacts = function(userId) {
        userIdToAddToContacts = userId;

        // HTML id can't contain @ and jquery doesn't like periods (in id)
        if ($('#uid_' + userId.replace(/[.@]/g,'_')).length > 0) {
            alert("This person is already in your contact list.")
        } else {
            // get and AddressBook.Entry object for this contact
            KandyAPI.Phone.searchDirectoryByUserName(
                    userId,
                    function (results) {
                        for (var i = 0; i < results.length; ++i) {
                            if (results[i].primaryContact === userIdToAddToContacts) {
                                // user name and nickname are required
                                contact = {
                                    contact_user_name: results[i].primaryContact,
                                    contact_nickname: results[i].primaryContact
                                }
                                if (results[i].firstName) { contact['contact_first_name'] = results[i].firstName; }
                                if (results[i].lastName) { contact['contact_last_name'] = results[i].lastName; }
                                if (results[i].homePhone) { contact['contact_home_phone'] = results[i].homePhone; }
                                if (results[i].mobilePhone) { contact['contact_mobile_number'] = results[i].mobilePhone; }
                                if (results[i].workPhone) { contact['contact_business_number'] = results[i].workPhone; }
                                if (results[i].fax) { contact['contact_fax'] = results[i].fax; }
                                if (results[i].email) { contact['contact_email'] = results[i].email; }

KandyAPI.Phone.addToPersonalAddressBook(
                                        contact,
                                        loadContacts, // function to call on success
                                        function (message) { alert("Error: " + message); }
                                );
                                break;
                            }
                        }
                    },
                    function (statusCode) {
                        alert("Error getting contact details: " + statusCode )
                    }
            );
        }
    }

    sendIm = function() {
        var uuid = KandyAPI.Phone.sendIm('user1@heliograph2.com', $('#imMessageToSend').val(),
                function(result) {
                    $('#messages').append('<div>' +
                            '<span class="imUsername">' + $('#logInId').val() + '</span>' +
                            '<span class="imMessage">' + $('#imMessageToSend').val() + '</span>' +
                            '</div>');
                    $('#imMessageToSend').val('');
                    //alert('sent, msgID=' + uuid);
                },
                function() {
                    alert("IM send failed");
                }
        );
		
		var uuid = KandyAPI.Phone.sendIm('user2@heliograph2.com', $('#imMessageToSend').val(),
                function(result) {
                    $('#messages').append('<div>' +
                            '<span class="imUsername">' + $('#logInId').val() + '</span>' +
                            '<span class="imMessage">' + $('#imMessageToSend').val() + '</span>' +
                            '</div>');
                    $('#imMessageToSend').val('');
                    //alert('sent, msgID=' + uuid);
                },
                function() {
                    alert("IM send failed");
                }
        );
		
		var uuid = KandyAPI.Phone.sendIm('user3@heliograph2.com', $('#imMessageToSend').val(),
                function(result) {
                    $('#messages').append('<div>' +
                            '<span class="imUsername">' + $('#logInId').val() + '</span>' +
                            '<span class="imMessage">' + $('#imMessageToSend').val() + '</span>' +
                            '</div>');
                    $('#imMessageToSend').val('');
                    //alert('sent, msgID=' + uuid);
                },
                function() {
                    alert("IM send failed");
                }
        );
		
		var uuid = KandyAPI.Phone.sendIm('user4@heliograph2.com', $('#imMessageToSend').val(),
                function(result) {
                    $('#messages').append('<div>' +
                            '<span class="imUsername">' + $('#logInId').val() + '</span>' +
                            '<span class="imMessage">' + $('#imMessageToSend').val() + '</span>' +
                            '</div>');
                    $('#imMessageToSend').val('');
                    //alert('sent, msgID=' + uuid);
                },
                function() {
                    alert("IM send failed");
                }
        );
		
		var uuid = KandyAPI.Phone.sendIm('user5@heliograph2.com', $('#imMessageToSend').val(),
                function(result) {
                    $('#messages').append('<div>' +
                            '<span class="imUsername">' + $('#logInId').val() + '</span>' +
                            '<span class="imMessage">' + $('#imMessageToSend').val() + '</span>' +
                            '</div>');
                    $('#imMessageToSend').val('');
                    //alert('sent, msgID=' + uuid);
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
                            var msg = data.messages[i].message.text

                            $('#messages').append('<div>' +
                                    '<span class="imUsername">' + username + '</span>' +
                                    '<span class="imMessage">' + msg + '</span>' +
                                    '</div>');
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

    changeUIState = function(state) {
        switch (state) {
            case 'LOGGED_OUT':
                $('#loggedInAs').val('');
                $("#loginForm").show();
                $("#loggedIn").hide();
                $('#contactsAndDirSearch').hide();
                $('#messages').empty();
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