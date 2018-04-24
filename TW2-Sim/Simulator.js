//Modified version of http://tw2calc.com/script/simulator.js
Simulator = {
    _unitsStats: {
        "spear": {
            "name": "spear",
            "building": "barracks",
            "required_level": 1,
            "wood": 50,
            "clay": 30,
            "iron": 20,
            "food": 1,
            "build_time": 840,
            "attack": 10,
            "def_inf": 25,
            "def_kav": 45,
            "def_arc": 10,
            "speed": 14,
            "load": 25,
            "type": 1,
            "points_att": 1,
            "points_def": 4
        },
        "sword": {
            "name": "sword",
            "building": "barracks",
            "required_level": 3,
            "wood": 30,
            "clay": 30,
            "iron": 70,
            "food": 1,
            "build_time": 1200,
            "attack": 25,
            "def_inf": 55,
            "def_kav": 5,
            "def_arc": 30,
            "speed": 18,
            "load": 15,
            "type": 1,
            "points_att": 2,
            "points_def": 5
        },
        "axe": {
            "name": "axe",
            "building": "barracks",
            "required_level": 5,
            "wood": 60,
            "clay": 30,
            "iron": 40,
            "food": 1,
            "build_time": 1320,
            "attack": 45,
            "def_inf": 10,
            "def_kav": 5,
            "def_arc": 10,
            "speed": 14,
            "load": 10,
            "type": 1,
            "points_att": 4,
            "points_def": 1
        },
        "archer": {
            "name": "archer",
            "building": "barracks",
            "required_level": 9,
            "wood": 80,
            "clay": 30,
            "iron": 60,
            "food": 1,
            "build_time": 1500,
            "attack": 25,
            "def_inf": 10,
            "def_kav": 30,
            "def_arc": 60,
            "speed": 14,
            "load": 10,
            "type": 3,
            "points_att": 2,
            "points_def": 5
        },
        "light_cavalry": {
            "name": "light_cavalry",
            "building": "barracks",
            "required_level": 11,
            "wood": 125,
            "clay": 100,
            "iron": 250,
            "food": 4,
            "build_time": 1800,
            "attack": 130,
            "def_inf": 30,
            "def_kav": 40,
            "def_arc": 30,
            "speed": 8,
            "load": 80,
            "type": 2,
            "points_att": 13,
            "points_def": 5
        },
        "mounted_archer": {
            "name": "mounted_archer",
            "building": "barracks",
            "required_level": 13,
            "wood": 250,
            "clay": 100,
            "iron": 150,
            "food": 5,
            "build_time": 2200,
            "attack": 150,
            "def_inf": 40,
            "def_kav": 30,
            "def_arc": 50,
            "speed": 8,
            "load": 50,
            "type": 3,
            "points_att": 12,
            "points_def": 6
        },
        "heavy_cavalry": {
            "name": "heavy_cavalry",
            "building": "barracks",
            "required_level": 21,
            "wood": 200,
            "clay": 150,
            "iron": 600,
            "food": 6,
            "build_time": 3200,
            "attack": 150,
            "def_inf": 200,
            "def_kav": 160,
            "def_arc": 180,
            "speed": 9,
            "load": 50,
            "type": 2,
            "points_att": 15,
            "points_def": 23
        },
        "ram": {
            "name": "ram",
            "building": "barracks",
            "required_level": 15,
            "wood": 300,
            "clay": 200,
            "iron": 200,
            "food": 5,
            "build_time": 4800,
            "attack": 2,
            "def_inf": 20,
            "def_kav": 50,
            "def_arc": 20,
            "speed": 24,
            "load": 0,
            "type": 1,
            "points_att": 8,
            "points_def": 4
        },
        "catapult": {
            "name": "catapult",
            "building": "barracks",
            "required_level": 17,
            "wood": 320,
            "clay": 400,
            "iron": 100,
            "food": 8,
            "build_time": 7200,
            "attack": 100,
            "def_inf": 100,
            "def_kav": 50,
            "def_arc": 100,
            "speed": 24,
            "load": 0,
            "type": 1,
            "points_att": 10,
            "points_def": 12
        },
        "knight": {
            "name": "knight",
            "building": "statue",
            "required_level": 1,
            "wood": 0,
            "clay": 0,
            "iron": 0,
            "food": 1,
            "build_time": 21600,
            "attack": 150,
            "def_inf": 250,
            "def_kav": 400,
            "def_arc": 150,
            "speed": 8,
            "load": 100,
            "type": 2,
            "points_att": 20,
            "points_def": 40
        },
        "snob": {
            "name": "snob",
            "building": "academy",
            "required_level": 1,
            "wood": 40000,
            "clay": 50000,
            "iron": 50000,
            "food": 100,
            "build_time": 10800,
            "attack": 30,
            "def_inf": 100,
            "def_kav": 50,
            "def_arc": 100,
            "points_att": 200,
            "points_def": 200,
            "speed": 35,
            "load": 0,
            "type": 1,
            "special": 1
        },
        "trebuchet": {
            "name": "trebuchet",
            "building": "preceptory",
            "required_level": 1,
            "wood": 4000,
            "clay": 2000,
            "iron": 2000,
            "food": 10,
            "build_time": 1800,
            "attack": 30,
            "def_inf": 200,
            "def_kav": 250,
            "def_arc": 200,
            "points_att": 0,
            "points_def": 25,
            "speed": 50,
            "load": 0,
            "type": 1,
            "special": 1
        },
        "doppelsoldner": {
            "name": "doppelsoldner",
            "building": "preceptory",
            "required_level": 1,
            "wood": 1200,
            "clay": 1200,
            "iron": 2400,
            "food": 6,
            "build_time": 1800,
            "attack": 300,
            "def_inf": 100,
            "def_kav": 100,
            "def_arc": 50,
            "points_att": 25,
            "points_def": 10,
            "speed": 14,
            "load": 10,
            "type": 1,
            "special": 1
        }
    },
    _unitToAttackType: {
        spear: "attack",
        sword: "attack",
        axe: "attack",
        ram: "attack",
        catapult: "attack",
        snob: "attack",
        trebuchet: "attack",
        doppelsoldner: "attack",
        light_cavalry: "attack_cavalry",
        heavy_cavalry: "attack_cavalry",
        knight: "attack_cavalry",
        archer: "attack_archer",
        mounted_archer: "attack_archer"
    },
    _attackTypeToUnits: {
        attack: ["spear", "sword", "axe", "ram", "catapult", "snob", "trebuchet", "doppelsoldner"],
        attack_cavalry: ["light_cavalry", "heavy_cavalry", "knight"],
        attack_archer: ["archer", "mounted_archer"]
    },
    _getAttackSum: function (attUnits, defStrength) {
        var sum = {
            attack: 0,
            attack_cavalry: 0,
            attack_archer: 0
        };

        if(attUnits.doppelsoldner > 0) {
            if(sum.attack < defStrength.defense) {
                this._unitsStats['doppelsoldner'].attack = 600;
                console.log('Berserker outnumbered');
            } else {
                this._unitsStats['doppelsoldner'].attack = 300;
            }
        }

        //console.log(this._unitsStats['doppelsoldner']);

        for (var unit in attUnits) {
            sum[this._unitToAttackType[unit]] += this._unitsStats[unit].attack * attUnits[unit];
        }

        //console.log('attack sum:');
        //console.log(sum);
        //console.log('defender strength');
        //console.log(defStrength);

        return sum;
    },
    _getAttackFoodSum: function (units) {
        var sum = {
            attack: 0,
            attack_cavalry: 0,
            attack_archer: 0
        };
        for (var unit in units) {
            sum[this._unitToAttackType[unit]] += this._unitsStats[unit].food * units[unit];
        }
        //console.log('attack food sum');
        //console.log(sum);
        return sum;
    },
    _getDefendSum: function (units) {
        var sum = {
            defense: 0,
            defense_cavalry: 0,
            defense_archer: 0
        };
        for (var unit in units) {
            sum.defense += this._unitsStats[unit].def_inf * units[unit];
            sum.defense_cavalry += this._unitsStats[unit].def_kav * units[unit];
            sum.defense_archer += this._unitsStats[unit].def_arc * units[unit];
        }
        //console.log('defend strength');
        //console.log(sum);
        return sum;
    },
    _getSum: function (object) {
        var sum = 0;
        for (var key in object) {
            sum += Math.round(object[key]);
        }
        return sum;
    },
    _calcResultingWall: function (ram, wall, faithBonus, morningStar) {
        ram = ram || 0;
        wall = wall || 0;
        morningStar = (morningStar) ? 2 : 1;
        return Math.max(
            wall - Math.round((ram * faithBonus * morningStar) / (4 * Math.pow(1.09, wall))),
            Math.round(wall / (2 * morningStar))
        );
    },
    _calcWallAfterFight: function (attacker, defender, wall, faithBonus, morningStar) {
        var resultingWall = 0;
        ram = attacker.quantity.ram || 0;
        wall = wall || 0;
        morningStar = (morningStar) ? 2 : 1;

        if (ram === 0 || wall === 0) return wall;

        var loseRateDefender = this._getSum(defender.losses) / this._getSum(defender.quantity);
        if (loseRateDefender === 1 || isNaN(loseRateDefender)) {
            //attacker wins
            var loseRateAttacker = this._getSum(attacker.losses) / this._getSum(attacker.quantity);
            var maxDamage = (ram * this._unitsStats.ram.attack * faithBonus * morningStar) / (4 * Math.pow(1.09, wall));
            resultingWall = wall - Math.round(maxDamage - 0.5 * maxDamage * loseRateAttacker);
        } else {
            //defender wins
            resultingWall = wall - Math.round(ram * this._unitsStats.ram.attack * faithBonus * morningStar * loseRateDefender / (8 * Math.pow(1.09, wall)));
        }
        return Math.max(0, resultingWall);
    },
    simulate: function (attackerUnits, defenderUnits, wall, nightbonus, moral, luck, beliefAttacker, beliefDefender, palaItems, officer) {
        var faithBonus = (beliefAttacker ? 0.5 : 1) * (beliefDefender ? 2 : 1);
        wall = wall || 0;
        moral = moral || 100;
        moral /= 100;
        luck = luck || 0;
        luck = 1 + luck / 100;
        nightbonus = (nightbonus) ? 2 : 1;
        palaItems = palaItems || []; //Todo: paladin items?

        var attBonus = (officer ? 1.1 : 1);
        //attBonus = 1;

        var attacker = {
            quantity: {},
            losses: {}
        };
        var defender = {
            quantity: {},
            losses: {}
        };
        for (var unit in this._unitsStats) {
            attacker.quantity[unit] = attackerUnits[unit] = attackerUnits[unit] || 0;
            defender.quantity[unit] = defenderUnits[unit] = defenderUnits[unit] || 0;
        }

        var resultingWall = this._calcResultingWall(attackerUnits.ram, wall, faithBonus, palaItems.indexOf('morningStar') !== -1);
        var wallBonus = 1 + resultingWall * 0.05;
        if (resultingWall === 0) {
            var wallDefense = 0;
        } else {
            var wallDefense = Math.round(Math.pow(1.25, resultingWall) * 20);
        }

        do {
            var defendStrength = this._getDefendSum(defenderUnits);
            var attackStrength = this._getAttackSum(attackerUnits, defendStrength);
            var attackSum = this._getSum(attackStrength);

            var attackFood = this._getAttackFoodSum(attackerUnits);
            var attackFoodSum = this._getSum(attackFood);

            var defenderUnitsCopy = {};
            for (var unit in this._unitsStats) {
                defenderUnitsCopy[unit] = defenderUnits[unit];
            }
            for (var attackType in attackStrength) {
                if (attackStrength[attackType] === 0) continue;
                var ratio = attackFood[attackType] / attackFoodSum;
                var defense = defendStrength[attackType.replace('attack', 'defense')] * ratio * wallBonus * nightbonus + wallDefense * ratio;
                var a = attackStrength[attackType] * moral * luck * faithBonus * attBonus / defense;

                //console.log('Defense:'+defense);
                //console.log('Attack:'+a);
                if (a < 1) {
                    var c = Math.sqrt(a) * a;
                    for (var unit in defenderUnits) {
                        defenderUnits[unit] -= defenderUnitsCopy[unit] * c * ratio;
                    }
                    for (var i in this._attackTypeToUnits[attackType]) {
                        var unit = this._attackTypeToUnits[attackType][i];
                        attackerUnits[unit] = 0;
                    }
                } else {
                    var c = Math.sqrt(1 / a) / a;
                    for (var unit in defenderUnits) {
                        defenderUnits[unit] -= ratio * defenderUnitsCopy[unit];
                    }
                    for (var i in this._attackTypeToUnits[attackType]) {
                        var unit = this._attackTypeToUnits[attackType][i];
                        attackerUnits[unit] -= c * attackerUnits[unit];
                    }
                }
            }
        } while (this._getSum(attackerUnits) >= 1 && this._getSum(defenderUnits) >= 1);

        for (var unit in this._unitsStats) {
            attacker.losses[unit] = attacker.quantity[unit] - Math.round((attackerUnits[unit] || 0));
            defender.losses[unit] = defender.quantity[unit] - Math.round((defenderUnits[unit] || 0));
        }

        //console.log('attacker result');
        //console.log(attacker);
        return {
            attacker: attacker,
            defender: defender,
            wallAfter: this._calcWallAfterFight(attacker, defender, wall, faithBonus, palaItems.indexOf('morningStar') !== -1),
            wallBefore: wall
        };
    }
}