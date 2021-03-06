### Adders
Digital computers perform a varity of information processing tasks. Among the basic tasks encountered are the various arithmatic operartions. The moest basic arithmatic operation is the additon of two binary digits.

A combinational circuit that performs the addition of two bits is called a half adder. Again the combinational circuit that performs addition of three bits (Two significant bits and a previos carry) is called Full adder.

### Half Adder
A half adder is a combinational cuircuit with two binary inputs (augend and addend bits) and two binary outputs (sum and carry bits). It adds two inputs (A and B) and produces the sum (S) and the carry (C) bits. It is an arithmatic circuit used to perform the arithmatic operaton of addition of two single bit words.

The characteristic equation of a Half Adder is expressed as:

Sum = AB̅ + A̅B
    = A⨁B
    
Cout = AB

When any of the inputs A and B is equal to 1, the Sum is 1. Otherwise, it is 0.
Carry Cout is 1 only when both the inputs are 1.

### Full Adder

The combinational circuit that performs addition of three bits (Two significant bits and a previos carry) is called Full adder.

The characteristic equation of a Full Adder is expressed as:

Sum = A̅B̅Cin+A̅BCin+AB̅C̅in+ABCin
       = (AB̅+A̅B)C̅in+(AB+A̅B̅)Cin
       = (A⨁B)C̅in+(¯(A⨁B))Cin
       = A⨁B⨁Cin

Cout = A̅BCin+AB̅Cin+ABC̅in+ABCin
     = AB+(A⨁B)Cin
     = AB+ACin+BCin

The Sum is High i.e. 1 only when odd number of the inputs are High.
Carry Cout is High i.e. 1 only when more than one input are High.

