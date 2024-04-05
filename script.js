let curState = 'start';
let curNum = '';
let storedNum = '';
let curOp = '';

function add(a, b) {
	return a + b;
}

function subtract(a, b) {
	return a - b;
}

function multiply(a, b) {
	return a * b;
}

function divide(a, b) {
	if (b === 0) {
		return "undefined";
	} else {
		return a / b;
	}
}

function operate(operator, a, b) {
	a = parseFloat(a);
	b = parseFloat(b);
	switch(operator) {
		case '+':
			return add(a, b);
		case '-':
			return subtract(a, b);
		case '*':
			return multiply(a, b);
		case '/':
			return divide(a, b);
		default:
			return "undefined";
	}
}

function isN(c) {
	return c == '0'
	|| c == '1'
	|| c == '2'
	|| c == '3'
	|| c == '4'
	|| c == '5'
	|| c == '6'
	|| c == '7'
	|| c == '8'
	|| c == '9';
}

function isOp(c) {
	return c == '+'
	|| c == '-'
	|| c == '*'
	|| c == '/';
}

function endlog(txt, flag) {
	// console.log("end state: " + curState);
	// console.log("curOp: |" + curOp + "|");
	// console.log("curNum: |" + curNum + "|");
	// console.log("storedNum: |" + storedNum + "|");
	// console.log("-------------");
	document.getElementById("cur_op").innerText = "Active Operator: " + curOp;
	document.getElementById("stored").innerText = "Stored Number: " + storedNum;
	if (flag == 1) {
		document.getElementById("text-window").textContent = txt;
	}
}

function beginlog(c) {
	console.log("input: |" + c + "|");
	console.log("begin state: " + curState);
	console.log("curOp: |" + curOp + "|");
	console.log("curNum: |" + curNum + "|");
	console.log("storedNum: |" + storedNum + "|");
}

function caseC() {
	curState = 'start';
	curNum = '';
	storedNum = '';
	curOp = '';
	endlog('', 1);
	return 1;
}

function start(c) {
	if (c == '=') {
		endlog('', 0);
		return 1;
	}
	if (isOp(c) && curNum != '') {
		curOp = c;
		curState = 'op';
		storedNum = curNum;
		curNum = '';
		endlog(curNum, 1);
		return 1;
	}
	if (isOp(c) && curNum == '') {
		endlog('', 0);
		return 1;
	}
	curNum += c;
}

function op(c) {
	if (c == '=' && curNum != '') {
		storedNum = operate(curOp, storedNum, curNum);
		curNum = '';
		curState = 'next';
		curOp = '';
		endlog(storedNum, 1);
		return 1;
	}
	if (c == '=' && curNum == '') {
		endlog('', 0);
		return 1;
	}
	if (isOp(c) && curNum == '') {
		curOp = c;
		//curState = 'start';
		endlog('', 0);
		return 1;
	}
	if (isOp(c) && curNum != '') {
		storedNum = operate(curOp, storedNum, curNum);
		curNum = '';
		curState = 'next';
		curOp = c;
		endlog(storedNum, 1);
		return 1;
	}
	curNum += c;
}

function next(c) {
	if (isN(c) && curNum == '' && curOp == '') {
		curNum = c;
		curState = 'start';
		storedNum = '';
		endlog(curNum, 1);
		return 1;
	}
	if (c == '=' && curNum != '') {
		storedNum = operate(curOp, storedNum, curNum);
		curNum = '';
		curState = 'next';
		curOp = '';
		endlog(storedNum, 1);
		return 1;
	}
	if (c == '=' && curNum == '') {
		endlog('', 0);
		return 1;
	}
	if (isOp(c) && curNum == '') {
		curOp = c;
		//curState = 'start';
		endlog('', 0);
		return 1;
	}
	if (isOp(c) && curNum != '') {
		storedNum = operate(curOp, storedNum, curNum);
		curNum = '';
		curState = 'next';
		curOp = c;
		endlog(storedNum, 1);
		return 1;
	}
	curNum += c;
}

function handleInput(c) {
	// beginlog(c);
	document.getElementById("cur_op").innerText = "Active Operator: " + curOp;
	document.getElementById("stored").innerText = "Stored Number: " + storedNum;
	if (c == 'C' || storedNum == "undefined") return caseC();
	if (curState == 'start') {
		if (start(c) == 1) return ;
	}
	else if (curState == 'op') {
		if (op(c) == 1) return ;
	}
	else if (curState == 'next') { //result in storedNum
		if (next(c) == 1) return ;
	}
	endlog(curNum, 1);
}
