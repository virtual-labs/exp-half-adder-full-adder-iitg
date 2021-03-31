<?php
include_once('../../includes/util.php');
include_once('../../includes/site_config.inc.php');
if(!isLoggedIn()){
    header('Location: '.LOGIN_FAILURE_REDIRECT);
    exit();
}
?>
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/html">
<head>
    <meta charset="utf-8" />
    <title>Remote Triggered Digital System Laboratory - Circuit Builder</title>
    <link rel="stylesheet" href="../../css/reset.css" type="text/css" />
    <link rel="stylesheet" href="../../css/ckt_gui_styles.css" type="text/css" />
    <link rel="stylesheet" href="css/ckt_comp_styles.css" type="text/css" />
    <link rel="Stylesheet" href="../../lib/jquery-ui/css/excite-bike/jquery-ui.css" type="text/css" />
    <link rel="stylesheet" type="text/css" href="../../css/jquery.ibutton.min.css"/>
    <script type="text/javascript" src="../../lib/jquery-latest.js"></script>
    <script type="text/javascript" src="../../lib/jquery.easing.1.3.js"></script>
    <script type="text/javascript" src="../../lib/jquery-ui/js/jquery-ui-latest.js"></script>
    <script type="text/javascript" src="../../lib/jquery.ibutton.min.js"></script>
    <script type="text/javascript" src="../../lib/jquery.jsPlumb-1.3.9-all-min.js"></script>
    <script type="text/javascript" src="../../lib/json2.js"></script>
    <!--[if lt IE 9]><script type="text/javascript" src="../../lib/html5.js" ></script><![endif]-->

    <script src="../../cm_src/jquery.ui.position.js" type="text/javascript"></script>
    <script src="../../cm_src/jquery.contextMenu.js" type="text/javascript"></script>
    <script src="../../prettify/prettify.js" type="text/javascript"></script>
    <script src="../../screen.js" type="text/javascript"></script>

    <link href="../../cm_src/jquery.contextMenu.css" rel="stylesheet" type="text/css" />
    <link href="../../screen.css" rel="stylesheet" type="text/css" />
    <link href="../../prettify/prettify.sunburst.css" rel="stylesheet" type="text/css" />

    <script type="text/javascript" src="../../js/circuit_controller.js"></script>
    <script type="text/javascript" src="../../js/gui-gen.js"></script>
    <script type="text/javascript" src="js/gui-control-ind.js"></script>
    <?php
        echo '<script type="text/javascript">'.PHP_EOL;
            if(isset($_GET['id']))
                echo 'var EXP_ID='.$_GET['id'].';'.PHP_EOL;
            else
                echo 'var EXP_ID=null;'.PHP_EOL;
        echo '</script>'.PHP_EOL;;
    ?>
    <style type="text/css">
        div.inputContainer label.ui-button.ui-state-default, div.inputContainer label.ui-button.ui-state-active{
            background-color: transparent;
            background-image: none;
            border:none;
        }
    </style>
</head>
<body>
    <header id="topHeader">
        <h1>Half Adder using Logic Gates</h1>
        <aside id="buttonContainer">
            <a href="#" class="guiMenuButtons" id="componentsButton">Components</a>
            <a href="#" class="guiMenuButtons" id="clearButton">Clear</a>
            <a href="#" class="guiMenuButtons" id="loadButton">Load</a>
            <a href="#" class="guiMenuButtons" id="saveButton">Save</a>
            <a href="#" class="guiMenuButtons" id="startButton">Start</a>
            <a href="#" class="guiMenuButtons" id="helpButton">Help</a>
            <a href="#" class="guiMenuButtons" id="closeButton">Close</a>
        </aside>
    </header>
    <noscript>
        <div>
            Your browser does not support JavaScript!<br />
            JavaScript is required to use this page properly.
        </div>
    </noscript>
    <div id="mainContainer">
        <div id="sideBar">
            <div id="supply_comp"></div>
            <fieldset class="compContainer">
                <legend>Input Switches:</legend>
                <div class="inputContainer" id="input1Container">
                    <img src="../../images/led0.png" alt="Indicator" class="indicator" />
                    <input type="checkbox" id="input1" /><label for="input1">Click To Change</label>
                </div>
                <div class="inputContainer" id="input2Container">
                    <img src="../../images/led0.png" alt="Indicator" class="indicator" />
                    <input type="checkbox" id="input2" /><label for="input2">Click To Change</label>
                </div>
            </fieldset>
            <fieldset class="compContainer">
                <legend>Output LEDs:</legend>
                <div class="outputContainer">
                    <div id="output_sum_comp"></div>
                    <div id="output_cout_comp"></div>
                </div>
            </fieldset>
        </div>
        <div id="cktBodyContainer">
            <div id="cktBody">
                <div class="circuitElement" id="ic_7408_comp">IC 7408</div>
                <div class="circuitElement" id="ic_7486_comp">IC 7486</div>
            </div>
        </div>
    </div>
    <div id="componentsDialog" title="Select Components">
        <p>Drag and Drop the Components to the Circuit Drawing Area.</p>
        <ul id="componentList">
            <li id="ic_7408"><img src="../../images/ckt_el/chip_7408.png" /></li>
            <li id="ic_7486"><img src="../../images/ckt_el/chip_7486.png" /></li>
        </ul>
    </div>
    <div id="helpDialog" title="Help">
        <p>Click on "COMPONENTS" button to display component List.</p>
        <p>Drag and Drop Component you want to circuit drawing Area.</p>
        <p>Now to make connection Drag from one end point to another end point.</p>
        <p>To delete any component, right click on it and select remove. To remove connection double click on it.</p>
    </div>
    <div id="modDialog" title="Processing..."></div>
</body>
</html>