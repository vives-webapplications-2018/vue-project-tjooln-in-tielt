function randomString(length) {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < length; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            return text;
        }
        $(document).foundation();
        $(document).ready(function() {
            $('#urlInput').val(websocketserver);
            $('#portInput').val(websocketport);
            $('#clientIdInput').val('clientId-' + randomString(10));
            $('#colorChooser').minicolors();
            $("#addSubButton").fancybox({
                'afterShow': function() {
                    var rndColor = websocketclient.getRandomColor();
                    $("#colorChooser").minicolors('value', rndColor);
                }
            });
            websocketclient.render.toggle('publish');
            websocketclient.render.toggle('messages');
            websocketclient.render.toggle('sub');
            websocketclient.render.toggle('usrname');
            websocketclient.render.toggle('userInput');
        });
        function clearMessageBox() {
            document.getElementById('publishPayload').value = '';
        }
        function focusMessageBox() {
            document.getElementById('publishPayload').focus();
        }
        document.getElementById("publishPayload")
            .addEventListener("keyup", function(event) {
                event.preventDefault();
                if (event.keyCode === 13) {
                    document.getElementById("publishButton").click();
                }
            });
