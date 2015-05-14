var inputs;
var unitsStr = ["spear", "sword", "axe", "archer", "light_cavalry", "mounted_archer", "heavy_cavalry", "ram", "catapult", "doppelsoldner", "trebuchet", "snob", "knight"];
window.onload = function() {
    initEvents();
};

function initEvents() {
    inputs = document.getElementsByTagName('input');
    for(var i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('change', onInputChange);
    }

    var resetBtn = document.getElementById('resetBtn');
    resetBtn.addEventListener('click', onClear);
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
    console.clear();

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
    var result = Simulator.simulate(s.attackUnits, s.defendUnits, s.wall, s.night, s.morale, s.luck, s.beliefAttacker, s.beliefDefender, [], officer);

    setSimulationResults(result);
    console.log('Simulation result');
    console.table(result.attacker);
    console.table(result.defender);

    if (result.wallBefore !== result.wallAfter) {
        console.log('Wall reduced from ' + result.wallBefore + ' to ' + result.wallAfter + '.');
    } else {
        console.log('Ram does no damage to wall.');
    }
}

function setSimulationResults(result) {
    console.log(result);
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
