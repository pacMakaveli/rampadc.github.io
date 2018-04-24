var inputs;
var simResult;

var unitsStr = ["spear", "sword", "axe", "archer", "light_cavalry", "mounted_archer", "heavy_cavalry", "ram", "catapult", "doppelsoldner", "trebuchet", "snob", "knight"];
window.onload = function() {
    simResult = null;

    initEvents();
    simQueryData();
};

function initEvents() {
    inputs = document.getElementsByTagName('input');
    var i;
    for(i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('change', onInputChange);
    }

    var resetBtn = document.getElementById('resetBtn');
    resetBtn.addEventListener('click', onClear);

    var useDefSurvivedBtn = document.getElementById('useDefSurvivedBtn');
    useDefSurvivedBtn.addEventListener('click', onDefSurvBtn);
}

function onDefSurvBtn(event) {
    if(simResult != null) {
        //console.log(simResult);
	    var unitsInputs = document.getElementsByClassName('unit-input');
        document.getElementById('wallLvl').value = String(simResult.wallAfter);

        for(var i = 13; i < 26; i++) {
            //console.log(unitsStr[i-13]);
            //console.log(simResult.defender.quantity[unitsStr[i-13]]);
            //console.log(simResult.defender.losses[unitsStr[i-13]]);
            //console.log(simResult.defender.quantity[unitsStr[i-13]] - simResult.defender.losses[unitsStr[i-13]]);

	        unitsInputs[i].value = String(simResult.defender.quantity[unitsStr[i-13]] - simResult.defender.losses[unitsStr[i-13]]);
        }

        getResult();
    } else {
        console.log(simResult);
    }
}

function onClear(event) {
    for(var i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
        inputs[i].checked = false;
    }

    document.getElementById('morale').value = 100;
    document.getElementById('luck').value = 0;

    var losses = document.getElementsByClassName('units-loss');
    for(i = 0; i < losses.length; i++) {
        losses[i].innerHTML = '';
    }

    document.getElementById('wallLeftDiv').innerHTML = '';
}

function onInputChange(event) {
    //console.clear();

    getResult();
}

function getResult() {
    var units = document.getElementsByClassName('unit-input');
    units = [].slice.call(units);

    for(var i = 0; i < units.length; i++) {
        if(units[i].value.trim() == "") {
            units[i].value = "0";
        }
        units[i] = parseInt(units[i].value.trim());
    }

    //FILL IN UNITS
    var baseNumber = 0;
    var au = {}; //attack units
    au.spear = units[baseNumber+ 0];
    au.sword = units[baseNumber + 1];
    au.axe = units[baseNumber + 2];
    au.archer = units[baseNumber + 3];
    au.light_cavalry = units[baseNumber + 4];
    au.mounted_archer = units[baseNumber + 5];
    au.heavy_cavalry = units[baseNumber + 6];
    au.ram = units[baseNumber + 7];
    au.catapult = units[baseNumber + 8];
    au.doppelsoldner = units[baseNumber + 9];
    au.trebuchet = units[baseNumber + 10];
    au.snob = units[baseNumber + 11];
    au.knight = units[baseNumber + 12];

    baseNumber = 13;
    var du = {}; //defend units
    du.spear = units[baseNumber+ 0];
    du.sword = units[baseNumber + 1];
    du.axe = units[baseNumber + 2];
    du.archer = units[baseNumber + 3];
    du.light_cavalry = units[baseNumber + 4];
    du.mounted_archer = units[baseNumber + 5];
    du.heavy_cavalry = units[baseNumber + 6];
    du.ram = units[baseNumber + 7];
    du.catapult = units[baseNumber + 8];
    du.doppelsoldner = units[baseNumber + 9];
    du.trebuchet = units[baseNumber + 10];
    du.snob = units[baseNumber + 11];
    du.knight = units[baseNumber + 12];

    var beliefAttacker = document.getElementById('attackerFaithCB').checked;
    var beliefDefender = document.getElementById('defenderFaithCB').checked;
    var luck = parseInt(document.getElementById('luck').value.trim());
    var morale = parseInt(document.getElementById('morale').value.trim());
    var wall = parseInt(document.getElementById('wallLvl').value.trim());
    var officer = document.getElementById('officerCB').checked;

    //sim input
    var s = {
        attackUnits: au,
        beliefAttacker: beliefAttacker,
        beliefDefender: beliefDefender,
        defendUnits: du,
        luck: luck,
        morale: morale,
        officer: officer,
        night: false,
        wall: wall
    };

    //console.log(s);
    var result = Simulator.simulate(s.attackUnits, s.defendUnits, s.wall, s.night, s.morale, s.luck, s.beliefDefender, s.beliefAttacker, [], officer);

    setSimulationResults(result);
    //console.log('Simulation result');
    //console.table(result.attacker);
    //console.table(result.defender);

    if (result.wallBefore !== result.wallAfter) {
        //console.log('Wall reduced from ' + result.wallBefore + ' to ' + result.wallAfter + '.');
    } else {
    //    console.log('Ram does no damage to wall.');
    }
}

function setSimulationResults(result) {
    //console.log(result);
    simResult = result; //for checks later

    var lossesTD = document.getElementsByClassName('units-loss');

    var i;
    for(i = 0; i < 13; i++) {
        lossesTD[i].innerHTML = String(result.attacker.losses[unitsStr[i]]);
    }

    for(i = 13; i < 26; i++) {
        lossesTD[i].innerHTML = String(result.defender.losses[unitsStr[i-13]]);
    }

    var wallLeft = document.getElementById('wallLeftDiv');
    if (result.wallBefore !== result.wallAfter) {
        wallLeft.innerHTML = 'Wall reduced from ' + result.wallBefore + ' to ' + result.wallAfter + '.';
    } else if(result.attacker.quantity.ram < 1) {
        wallLeft.innerHTML = 'No rams thus no effects on walls';
    } else if(result.attacker.quantity.ram > 0) {
        wallLeft.innerHTML = 'Wall takes no damage';
    } else {
        wallLeft.innerHTML = 'Ram does no damage to wall.';
    }
}

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null
}

function simQueryData() {
    if(
        (getURLParameter('att') != null) &&
        (getURLParameter('def') != null)
    )
    {
        //console.log('There\'s some work to do here');
        var attackerStr = getURLParameter('att');
        var defenderStr = getURLParameter('def');

        var units = document.getElementsByClassName('unit-input');
        var unitsArr = attackerStr.split(',').concat(defenderStr.split(','));

        for(var i = 0; i < unitsArr.length; i++) {
            units[i].value = unitsArr[i];
        }

        var defChurch = getURLParameter('defChurch');
        var attChurch = getURLParameter('attChurch');
        var wall = getURLParameter('wall');
        var moral = getURLParameter('moral');
        var officer = getURLParameter('officer');
        var luck = getURLParameter('luck');

        if(defChurch != null) document.getElementById('defenderFaithCB').checked = (defChurch == '1' ? true : false);
        if(attChurch != null) document.getElementById('attackerFaithCB').checked = (attChurch == '1' ? true : false);
        if(luck != null) document.getElementById('luck').value = luck;
        if(moral != null) document.getElementById('morale').value = moral;
        if(luck != null) document.getElementById('luck').value = luck;
        if(wall != null) document.getElementById('wallLvl').value = wall;
        if(officer != null) document.getElementById('officerCB').checked = (officer == '1' ? true : false);
    }

    getResult();
}