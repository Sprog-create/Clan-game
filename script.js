var xp = 0
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterNameText");
const monsterHealthText = document.querySelector("#monsterHealthText");

const weapons = [
    {
        name: "stick",
        power: 5
    },

    {
        name: "dagger",
        power: 30
    },
    {
        name: "claw hammer",
        power: 50
    },
    {
        name: "sword",
        power: 100
    }
];

const monsters = [
    {
        name: "slime",
        level: 2,
        health: 15
    },
    {
        name: "fanged beast",
        level: 8,
        health: 60
    },
    {
        name: "dragon",
        level: 20,
        health: 300
    },

];


const locations = [
    {
        name: "townsquare",
        "button text": ["Go to store", "Go to cave", "fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "you are in the town square. You see a sign that says \"store.\""

    },
    {
        name: "store",
        "button text": ["Buy 10 health(10 gold)", "Buy weapon(30 Gold)", "Go to town square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "you enter the store"
    },
    {
        name: "cave",
        "button text": ["fight slime", "Fight fanged beast", "go to town square"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "you enter the cave. You see some monsters."
    },
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text: "You are fighting a minster"

    },
    {
        name: "kill monster",
        "button text": ["Go to town square", "Go to town square", "Go to town square"],
        "button functions": [goTown, goTown, goTown],
        text: "The monster screams 'Arg!!!!!!' as it dies. you gain experience points and find gold"
    },
    {
        name: "lose",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY"],
        "button functions": [restart, restart, restart],
        text: "you die!!!!!"
    },
    {
        name: "win",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY"],
        "button functions": [restart, restart, restart],
        text: "you won the game, congraTULATIONS"
    }

]


//initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;
function update(location) {
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;

}

function goTown() {
    update(locations[0])
}

function goStore() {
    update(locations[1])
}

function goCave() {
    update(locations[2])
}

function buyHealth() {
    if (gold >= 10) {
        gold = gold - 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
    } else {
        console.log("you do not have enough gold to buy health")
    }

}

function buyWeapon() {
    if (currentWeapon < weapons.length - 1) {
        if (gold >= 30) {
            gold - +30;
            currentWeapon++;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = "You now have a " + newWeapon + ".";
            inventory.push(newWeapon);
            text.innerText += "In your inventory you have: " + inventory;

        } else {
            text.innerText = "you do not have enough gold to buy a weapon."
        }

    } else {
        text.innerText = "you already have the most powerful weapon."
        button2.innerText = "sell weapon for 15 gold"
        button2.onclick = sellWeapon;

    }
}

function sellWeapon() {

    if (inventory.length > 1) {
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "you sold a" + currentWeapon + ".";
        text.innerText += "In your inventory you have: " + inventory;
    }
    else {
        text.innerText = "Don't sell your only weappppon!";
    }
}


function fightSlime() {
    fighting = 0;
    goFight();

}

function fightBeast() {
    fighting = 1
    goFight();

}

function fightDragon() {
    fighting = 2;
    goFight()

}

function goFight() {
    update(location[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterHealthText.innerText = monsterHealth;

}

function attack() {
    text.innerText = "the" + monsters[fighting].name + "attacks.";
    text.innerText += "you attack it with you" + weapons[currentWeapon].name + "."
    health -= monsters[fighting].level;
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;;
    healthText.innerText = health;
    monsterHealthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;

    if (health <= 0) {
        lose();
    } else if (monsterHealth <= 0) {
        fighting === 2 ? winGame() : defeatMonster();  // this is how if else statement is written in one line                    
        //=== is used for for equality and it also does conversion by itself
        //== it is also used for equality but it doesn't convert before equating
    }
}



function dodge() {
    text.innerText = " you dodge the attaack from the" + monsters[fighting].name + "."

}

function defeatMonster() {
    gold += Math.floor(monsters[fighting].level) * 6.7
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);

}

function lose() {
    update(locations[5]);

}

function winGame() {
    update(location[6])
}
function restart() {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    fighting;
    monsterHealth;
    inventory = ["stick"]
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
}
goTown();


