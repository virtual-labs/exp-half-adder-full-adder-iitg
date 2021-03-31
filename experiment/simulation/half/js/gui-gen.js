function roundUp(numToRound, multiple){
    if(multiple == 0){
        return numToRound;
    }
    if(numToRound < 0){
        multiple = multiple*(-1);
    }

    var remainder = numToRound % multiple;
    if (remainder == 0)
        return numToRound;
    return numToRound + multiple - remainder;
}

var circuitController = new CircuitController();

$.fx.speeds._default = 1000;
var setUI = function(){
    $( "#componentsDialog" ).dialog({
        autoOpen: false,
        position: ['left','center']
    });
	
	//$( "#componentsDialog" ).dialog( "option", "maxHeight", 400 );

    $( "#helpDialog" ).dialog({
        autoOpen: false,
        modal: true,
        minWidth: 450
    });

    $( "#modDialog" ).dialog({
        autoOpen: false,
        modal: true
    });

    $( "#startDialog" ).dialog({
        autoOpen: false,
        modal: true,
        minWidth: 620,
        minHeight: 250
    });

    $( "#componentList > li" ).draggable({
        cursorAt: { left: 5 },
        zIndex: 2700,
        appendTo: "body",

        containment: $( "#cktBody" ).length ? "#cktBody" : "document",
        helper: "clone"
    });

    $( "#cktBody" ).droppable({
        accept: "#componentList > li",
        drop: function(event, ui){
            var wholeDialog = $("#componentsDialog").parent(".ui-dialog");
            var dialogPos = wholeDialog.offset();
            var x1 = Math.floor(parseFloat(dialogPos.left));
            var x2 = x1 + wholeDialog.outerWidth();
            var y1 = Math.floor(parseFloat(dialogPos.top));
            var y2 = y1 + wholeDialog.outerHeight();

            if((event.pageX > x1 && event.pageX < x2))
                if(event.pageY > y1 && event.pageY < y2)
                    return;

            var x = ui.position.left - $(this).offset().left;
            var y = ui.position.top - $(this).offset().top;
            var id = ui.draggable.attr("id");
            if(x<=23){
                x=23;
            } else if(x>=793){
                x=793;
            } else{
                x = roundUp(x-23, 13.5);
                x = x+23;
                //alert(x);
            }

            y=129;
            if(circuitController.getComponentStatus(id.toString() + '_comp')){
                alert("You have already added this component.");
                return false;
            }
            $('#' + id + '_comp').css({'left':x,'top':y}).fadeIn('fast');
            circuitController.addCircuitElement(id.toString() + '_comp', x, y);
        }
    });

    $('#componentsButton').click(function(event){
            event.preventDefault();
            $( "#componentsDialog" ).dialog( "open" );
            return false;
        }
    );

//    $('#cktBody div.circuitElement').dblclick(function(event){
//            event.preventDefault();
//            circuitController.removeCircuitElement($(this).attr("id").toString());
//            return false;
//        }
//    );

    $('#cktBody').contextMenu({
        selector: '.circuitElement',
        callback: function(key, options) {
            if(key === 'Remove')
                circuitController.removeCircuitElement($(this).attr("id").toString());
        },
        items: {
            "Remove": {name: "Remove", icon: "delete"}
        }
    });

    $('#clearButton').click(function(event){
            event.preventDefault();
            circuitController.clearEverything();

            $(".outputContainer div").css("background", "url('../../images/ckt_el/light_off.png') no-repeat");
            return false;
        }
    );

    $('#saveButton').click(function(event){

            event.preventDefault();
            var wires = circuitController.retrieveAllConnectionsForSaving();
            if(!wires){
                $('#modDialog').html('<p>Make some connections first.</p>');
                $( "#modDialog" ).dialog( "open" );
                return false;
            }
            
            saveConnections(EXP_ID, wires);
            return false;
        }
    );

    $('#closeButton').click(function(event){
            event.preventDefault();
            window.opener = top;
            window.close();
            return false;
        }
    );

    $('#helpButton').click(function(event){
            event.preventDefault();
            $( "#helpDialog" ).dialog( "open" );
            return false;
        }
    );

    $('#loadButton').click(function(event) {
        event.preventDefault();
        retriveConnectionsFromDB(EXP_ID);
        return false;
    });
};

var saveConnections = function(expId, wires){
    $('#modDialog').html('<img src="../../images/ajax-loader.gif" width="128" height="15"><br/>Saving Circuit...');
    $( "#modDialog" ).dialog( "open" );
    var req = $.ajax({
        type: "POST",
        url : "../../scripts/save_connections.php",
        data: { "id":expId, "wiring":wires },
        dataType : "json",
        timeout : 20000,
        cache: false
    });

    req.done(function(data) {
        if(data.success){
            $('#modDialog').html("Successfully Saved.");
            $( "#modDialog" ).dialog( "open" );
        }
        else{
            $('#modDialog').html("Saving Failed!<br />" + data.msg);
            $( "#modDialog" ).dialog( "open" );
        }
    });

    req.fail(function(jqXHR, textStatus, errorThrown) {
        $('#modDialog').html('<p class="error">' + textStatus.toUpperCase() + ": " + errorThrown + '<br />Sorry, request could not be completed.' + '</p>');
        $( "#modDialog" ).dialog( "open" );
    });
};

var retriveConnectionsFromDB = function(expId){
    $('#modDialog').html('<img src="../../images/ajax-loader.gif" width="128" height="15"><br/>Loading Circuit...');
    $( "#modDialog" ).dialog( "open" );

    var req = $.ajax({
        type: "POST",
        url : "../../scripts/load_connections.php",
        data: { "id":expId },
        dataType : "json",
        timeout : 20000,
        cache: false
    });

    req.done(function(data) {
        if(data.success){
            var wiring = JSON.parse(data.wiring);
            if(!wiring){
                $( "#modDialog" ).dialog( "close" );
                return false;
            }
            circuitController.loadConnections(wiring);
            $( "#modDialog" ).dialog( "close" );
        }
        else{
            $('#modDialog').html("Loading Failed!<br />");
            $( "#modDialog" ).dialog( "open" );
        }
    });

    req.fail(function(jqXHR, textStatus, errorThrown) {
        $('#modDialog').html('<p class="error">' + textStatus.toUpperCase() + ": " + errorThrown + '<br />Sorry, request could not be completed.' + '</p>');
        $( "#modDialog" ).dialog( "open" );
    });
};

$(document).ready(function() {
    //$('#cktBody').css({'height':$(window).height() - 90});
    $('#sideBar').css({'height':$(window).height() - 90});
    setUI();
});
