c <script type="text/javascript">
      var apiKey,
        sessionId,
        logonParams = {
          username: 'daniela.cretu@softvision.ro',
          password: 'Passw0rd2019'
      };


      myAdminApi().call('Authenticate', logonParams, function(user) {
        apiKey = user.userId;
        sessionId = user.sessionId;
        var deviceIdx,
            listHtml = '',
            devicePlanList = document.getElementById('devicePlanList'),
            devicePlanParams = {
              apiKey: apiKey,
              sessionId: sessionId
            },


            lookupDeviceParams = {
              apiKey: apiKey,
              sessionId: sessionId,
              serialNo: 'G6XXX0XXXD08'
            };
			
		terminateDeviceParams = {
              apiKey: apiKey,
			  comments: 'test',
			  reasonId: 1,
			  sessionId: sessionId,
              serialNo: 'G6XXX0XXXD08'
            };
			
		myAdminApi().call('TerminateDeviceBilling(', terminateDeviceParams, function(devicePlans) {
          
          myAdminApi().call('LookupDevice', lookupDeviceParams, function(device) {

 
            document.getElementById('firmwareElement').innerText = "Firmware: " + device.firmwareVersion;
            document.getElementById('commentsElement').innerText = "Comments: " + device.comments;
            document.getElementById('lastCommElement').innerText = "Last Communication: " + device.lastServerCommunication;
            document.getElementById('possibleIssuesElement').innerText = "Possible Issues: " + device.possibleIssues;
          });
        });

        myAdminApi().call('GetDevicePlans', devicePlanParams, function(devicePlans) {
          for (deviceIdx in devicePlans) {
            listHtml += '<li>' + devicePlans[deviceIdx].name + '</li>';
          }
          devicePlanList.innerHTML = listHtml;
          myAdminApi().call('LookupDevice', lookupDeviceParams, function(device) {


            document.getElementById('firmwareElement').innerText = "Firmware: " + device.firmwareVersion;
            document.getElementById('commentsElement').innerText = "Comments: " + device.comments;
            document.getElementById('lastCommElement').innerText = "Last Communication: " + device.lastServerCommunication;
            document.getElementById('possibleIssuesElement').innerText = "Possible Issues: " + device.possibleIssues;
          });
        });
      }, function(errorMessage, error){
        var errorIdx, alertMsg = 'Error Message: ' + errorMessage;
        if (error && error.errors) {
          alertMsg += '\n\nThe following errors occurred:\n';
          for (errorIdx in error.errors) {
            alertMsg += error.errors[errorIdx].name + '\n';
          }
        }
        alert(alertMsg);
      });


    </script>
