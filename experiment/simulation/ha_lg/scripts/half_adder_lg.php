<?php
error_reporting(E_ALL^E_NOTICE^E_WARNING);

$SERVER_IP = '172.16.117.75';
$SERVER_PORT = '9988';
$SWITCH_NAME = 'PXI1Slot3';

$CIRCUIT_OUTPUT = 'Dev1/port0/line12:13;2';

$OP_OK_MSG = 'OP_OK';

$CIRCUIT_INPUT = rawurldecode($_POST['input']);
$wiring = rawurldecode($_POST['wiring']);

$success = false;
$result = array(); 
$circuitOutput = null;
$msg = "";
$outputLines = array();

try{
	$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
	if ($socket === false) {
		throw new Exception(socket_strerror(socket_last_error()));
	}
	$sresult = socket_connect($socket, $SERVER_IP, $SERVER_PORT);
	if ($sresult === false) {
		throw new Exception(socket_strerror(socket_last_error()));
	}
	
	$msg = "SWITCH-".$SWITCH_NAME."-".$wiring."\r\n";
	$len = strlen($msg);
	$sent = socket_write($socket, $msg, $len);
	
	if($sent === false || $sent < $len){
		throw new Exception(socket_strerror(socket_last_error()));
	}
	
	$received = socket_read($socket, 11);
	
	if($received === false){
		throw new Exception(socket_strerror(socket_last_error()));
	}
	
	if($received !== $OP_OK_MSG){
		throw new Exception('Equipment Server('.$SERVER_IP.') Error');
	}
	
	$msg = "ELVIS-".$CIRCUIT_INPUT."-".$CIRCUIT_OUTPUT."\r\n";
	$len = strlen($msg);
	$sent = socket_write($socket, $msg, $len);
	
	if($sent === false || $sent < $len){
		throw new Exception(socket_strerror(socket_last_error()));
	}
	
	$received = socket_read($socket, 11);
	
	if($received === false){
		throw new Exception(socket_strerror(socket_last_error()));
	}
	
	if($received !== $OP_OK_MSG){
		throw new Exception('Equipment Server('.$SERVER_IP.') Error');
	}
		
	$out = ""; 
	while(true) { 
		$received = ""; 
		$received = socket_read($socket, 1024);
		if($received === false){
			throw new Exception(socket_strerror(socket_last_error()));
		}
		if($received !== "") { 
			$out .= $received; 
		} else
			break;
	}

	socket_close($socket);
	
	if(!empty($out)){
        $bits = explode(',', $out);
        $outputLine = array('s' => $bits[0], 'c' => $bits[1]);
	} else
		throw new Exception("Blank Output Recieved from Equipment Server");
	
	$success = true;
} catch (Exception $e){
	$success = false;
	error_log($e->getMessage());	
}

if($success){
	$result['result'] = $outputLine;
    $result['IsSuccessful'] = true;
}
else
    $result['IsSuccessful'] = false;

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($result);
?>
