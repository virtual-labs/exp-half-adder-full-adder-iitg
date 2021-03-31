function CircuitController(){
    var jsPlumbInstance = null;
    var circuitContainer = null;
    var componentStatus = {};
    var endPoints = {};

    var setComponentStatus = function(component, status){
        componentStatus[component] = status;
    };

    this.getComponentStatus = function(component){
        return componentStatus[component];
    };

    var getEndpoints = function(){
        return endPoints;
    };

    var setEndpoint = function(endPointName, endpoint){
        endPoints[endPointName] = endpoint;
    };

    this.setJsPlumbInstance = function(instance){
        jsPlumbInstance = instance;
    };

    this.getJsPlumbInstance = function(){
        return jsPlumbInstance;
    };

    this.setOptions = function(defaultOptions){
        jsPlumbInstance.importDefaults(defaultOptions);
    };

    this.initDefault = function(){
        jsPlumbInstance.importDefaults({
            Connector : [ "Bezier", { curviness:100 } ],
//            Connector : [ "Flowchart", { curviness:80 } ],
            PaintStyle : { strokeStyle:'red', lineWidth:5 },
            EndpointStyle : { radius:3, fillStyle:'blue' },
            HoverPaintStyle : {strokeStyle:"#ec9f2e" }
        });

        jsPlumbInstance.bind("beforeDrop", function(params) {
            var sourceEndPoint = params.connection.endpoints[0];
            var targetEndPoint = params.dropEndpoint;
            if(!targetEndPoint || !sourceEndPoint){
                return false;
            }

            var sourceEndPointChannel = sourceEndPoint.getParameter('channelName');
            var targetEndPointChannel = targetEndPoint.getParameter('channelName');

			if(((sourceEndPointChannel === 'VCC') && (targetEndPointChannel !== 'r6'))){
                alert("Please connect Vcc to proper channel.");
                return false;
            }

            if(((sourceEndPointChannel === 'r6') && (targetEndPointChannel === 'GND'))){
                alert("Please connect Vcc to proper channel.");
                return false;
            }

			if(((sourceEndPointChannel === 'GND') && (targetEndPointChannel !== 'r7'))){
                alert("Please connect Ground to proper channel.");
                return false;
            }

            if(((sourceEndPointChannel === 'r7') && (targetEndPointChannel === 'VCC'))){
                alert("Please connect Ground to proper channel.");
                return false;
            }

            if((((sourceEndPointChannel === 'r0') || (sourceEndPointChannel === 'r1')) && ((targetEndPointChannel === 'VCC') || (targetEndPointChannel === 'GND'))))
                return false;

            if(sourceEndPoint.getParameter('groupName') === targetEndPoint.getParameter('groupName')){
                //alert("You are trying to make an invalid connection.");
                return true;
            }

            if(sourceEndPoint.getParameter('acceptType') !== targetEndPoint.getParameter('type')){
                //alert("You are trying to make an invalid connection.");
                //return false;
                if((sourceEndPointChannel === 'c4') && (targetEndPointChannel === 'c5') || (sourceEndPointChannel === 'c5') && (targetEndPointChannel === 'c4'))
                {
                   
                    return true;
                }
                else if((sourceEndPointChannel === 'c7') && (targetEndPointChannel === 'c8') || (sourceEndPointChannel === 'c8') && (targetEndPointChannel === 'c7')){
                    return true;
                }
                else if((sourceEndPointChannel === 'r1') && (targetEndPointChannel === 'r8') || (sourceEndPointChannel === 'r8') && (targetEndPointChannel === 'r1'))
                 {
                    return true;
                 } 
                else if((sourceEndPointChannel === 'GND') && (targetEndPointChannel === 'r7') || (sourceEndPointChannel === 'r7') && (targetEndPointChannel === 'GND'))
                 {
                    return true;
                 }

                 //---------------------------------------latest modified sections-----------------------------------------------------------------------------//
                /* else if((sourceEndPointChannel === 'c16') && (targetEndPointChannel !== 'r5') || (sourceEndPointChannel === 'r5') && (targetEndPointChannel !== 'c16'))
                 {
                    
                    alert("Connect the output properly");
                    return false;
                 }
                  else if((sourceEndPointChannel === 'c17') && (targetEndPointChannel !== 'r8') || (sourceEndPointChannel === 'r8') && (targetEndPointChannel !== 'c17'))
                 {
                   
                    alert("Connect the output properly"); 
                     return false;
                 }  
                 */
                 //---------------------------------------latest modified sections------------------------------------------------------------------------------//    
                else
                {
                    //alert("You are trying to make an invalid connection.");
                    return true;
                }    
            }

            return true;
        });

        jsPlumbInstance.bind("dblclick", function(conn, originalEvent) {
            //var endPointSource = conn.endpoints[0];
            //var endPointTarget = conn.endpoints[1];
            jsPlumb.detach(conn);
            //jsPlumbInstance.repaint(endPointSource.getElement());
            //jsPlumbInstance.repaint(endPointTarget.getElement());
            return false;
        });
    };

    this.makeDraggable = function(selector){
        jsPlumbInstance.draggable(selector, {containment: circuitContainer, cursor:"move", grid: [ 13.5,13.5 ], axis: "x",
            stop: function() {
                var x = $(selector).position().left;
                //var x = $(selector).offset().left;
                //alert(x);
                //var y = $(selector).position.top;
                //$(selector ).css({left:x+50});
                jsPlumbInstance.repaint(selector);
            }
        });
//        jsPlumbInstance.draggable(selector, {containment: circuitContainer, cursor:"move", axis: "x"});
    };

    this.addEndPoint = function(parentElement, endPointName, switchSpecificName, groupName, type, acceptType, maxConnection, anchorArray, show){
        var endpointOptions = {
            isSource:true,
            isTarget:true,
            anchor:anchorArray,
            maxConnections:maxConnection,
            parameters:{
                "endPointName":endPointName,
                "channelName":switchSpecificName,
                "groupName":groupName,
                "type":type,
                "acceptType":acceptType
            }
            //dragOptions:{ containment: circuitContainer}
            //dragOptions:{}
        };
        var endpoint = jsPlumbInstance.addEndpoint(parentElement, endpointOptions);
        if(typeof(show)==='undefined')
            jsPlumbInstance.hide(parentElement, true);
        setEndpoint(endPointName, endpoint);
    };

    this.addEndPointGV = function(parentElement, endPointName, switchSpecificName, groupName, type, acceptType, maxConnection, anchorArray, color, show){
        var endpointOptions = {
            isSource:true,
            isTarget:true,
            anchor:anchorArray,
            maxConnections:maxConnection,
            parameters:{
                "endPointName":endPointName,
                "channelName":switchSpecificName,
                "groupName":groupName,
                "type":type,
                "acceptType":acceptType
            },
            paintStyle:{ radius:3, fillStyle:color},
            //EndpointStyle : { fillStyle: color  },
            //dragOptions:{ containment: circuitContainer}
            dragOptions:{}
        };
        var endpoint = jsPlumbInstance.addEndpoint(parentElement, endpointOptions);
        if(typeof(show)==='undefined')
            jsPlumbInstance.hide(parentElement, true);
        setEndpoint(endPointName, endpoint);
    };

    this.getEndpoint = function(endPointName){
        return endPoints[endPointName];
    };

    this.getVccGroundEndpoints = function(){
        //console.log('VCCGND Endpoints');
        var vcc = [];
        var gnd = [];

        for (var key in endPoints) {
            if (endPoints.hasOwnProperty(key)) {
                var endPoint = endPoints[key];
                var endPointParent = endPoint.getElement();
                //console.log(endPointParent.attr('id'));
                if(componentStatus[endPointParent.attr('id')]){
                    var pointType = endPoint.getParameter('channelName');
                    if(pointType === 'VCC')
                        vcc.push(endPoint);
                    else if(pointType === 'GND')
                        gnd.push(endPoint);
                }
            }
        }

        var returnObject = {
            "vcc": vcc,
            "gnd": gnd
        };

        return returnObject;
    };

    this.loadConnections = function(connectionObject){
        var connectionArray = connectionObject.connections;
        var positionsArray = connectionObject.elements;

        for(var i = 0; i < positionsArray.length; i++){
            var element = positionsArray[i].element;
            this.addCircuitElement(element, positionsArray[i].position.left, positionsArray[i].position.top);
        }

        for(var i = 0; i < connectionArray.length; i++){
            var endPoint1Str = connectionArray[i].source, endPoint2Str = connectionArray[i].target;
            var endPoint1 = endPoints[endPoint1Str];
            var endPoint2 = endPoints[endPoint2Str];
            jsPlumbInstance.connect({source:endPoint1, target:endPoint2});
        }

        jsPlumbInstance.repaintEverything();
    };

    this.setCircuitContainer = function(elementId, drawingContainer){
        jsPlumbInstance.Defaults.Container = drawingContainer;
        circuitContainer = $('#' + elementId);
    };

    this.retrieveAllConnectionsForSaving = function(){
        var connections = [];
        var positions = [];
        var connectionList = jsPlumbInstance.getConnections();
        if(!connectionList.length)
            return null;

        for (var i = 0; i < connectionList.length; i++){
            var sourceEndPoint = connectionList[i].endpoints[0].getParameter('endPointName');
            var targetEndPoint = connectionList[i].endpoints[1].getParameter('endPointName')
            connections.push({"source":sourceEndPoint, "target":targetEndPoint});
        }
        for (var elementId in componentStatus) {
            if(componentStatus[elementId]){
                var pos = $('#' + elementId).position();
                pos.top = Math.floor(parseFloat(pos.top));
                pos.left = Math.floor(parseFloat(pos.left));
                positions.push({"element":elementId, "position":pos});
            }
        }
        var returnObject = {
            "connections": connections,
            "elements": positions
        };
        return JSON.stringify(returnObject);
    };

    this.retrieveAllConnectionsForRunning = function(){
        var connections = [];
        var connectionList = jsPlumbInstance.getConnections();

        for (var i = 0; i < connectionList.length; i++){
            var sourceEndPoint = connectionList[i].endpoints[0].getParameter('channelName');
            var targetEndPoint = connectionList[i].endpoints[1].getParameter('channelName');
            if((sourceEndPoint === 'VCC') || (sourceEndPoint === 'GND') || (targetEndPoint === 'GND') || (targetEndPoint === 'VCC'))
                continue;
            connections.push(sourceEndPoint + "," + targetEndPoint);
        }
        return connections;
    };

    this.getChipVccGroundConnections = function(){
        var connections = [];
        var connectionList = jsPlumbInstance.getConnections();

        for (var i = 0; i < connectionList.length; i++){
            var sourceEndPoint = connectionList[i].endpoints[0].getParameter('channelName');
            var targetEndPoint = connectionList[i].endpoints[1].getParameter('channelName');
            if((sourceEndPoint === 'VCC') || (sourceEndPoint === 'GND') || (targetEndPoint === 'GND') || (targetEndPoint === 'VCC'))
                connections.push(connectionList[i]);
        }
        return connections;
    };

    this.clearEverything = function(){
        jsPlumbInstance.detachEveryConnection();
        for (var elementId in componentStatus) {
            if(componentStatus[elementId]){
                $('#' + elementId).fadeOut('fast');
                jsPlumbInstance.hide(elementId, true);
                setComponentStatus(elementId,false);
            }
        }
    }

    this.addCircuitElement = function(elementId, pointX, pointY){
        $('#' + elementId).css({'left':pointX,'top':pointY}).fadeIn('fast');
        jsPlumbInstance.show(elementId, true);
        jsPlumbInstance.repaint(elementId);
        setComponentStatus(elementId,true);
    };

    this.removeCircuitElement = function(elementId){
        jsPlumbInstance.detachAllConnections(elementId);
        $('#' + elementId).fadeOut('fast');
        jsPlumbInstance.hide(elementId, true);
        setComponentStatus(elementId,false);
    };
}

