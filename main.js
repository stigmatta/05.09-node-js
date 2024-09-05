var crypto = require('crypto');
var util = require('util');

// Define the Contender class
function Contender() {
    this.name = '';
    this.limiting = 0; // Set default value
}

Contender.prototype.jumping = function() {
    return `${this.name} is jumping`;
};

Contender.prototype.running = function() {
    return `${this.name} is running`;
};

Contender.prototype.SetLimit = function(limit) {
    this.limiting = limit;
};

// Define the Cat class
function Cat() {
    Contender.call(this); // Call the parent constructor
    this.name = 'Cat';
}
util.inherits(Cat, Contender);

// Define the Human class
function Human() {
    Contender.call(this); // Call the parent constructor
    this.name = 'Human';
}
util.inherits(Human, Contender);

// Define the Robot class
function Robot() {
    Contender.call(this); // Call the parent constructor
    this.name = 'Robot';
}
util.inherits(Robot, Contender);

// Define the Obstacle class
function Obstacle() {
    this.name = '';
    this.distance = 0; // Set default value
}

Obstacle.prototype.isRunnable = function() {
    return false;
};

Obstacle.prototype.isJumpable = function() {
    return false;
};

Obstacle.prototype.SetDistance = function(num) {
    this.distance = num;
};

// Define the Wall class
function Wall() {
    Obstacle.call(this); // Call the parent constructor
    this.name = 'Wall';
}
util.inherits(Wall, Obstacle);

Wall.prototype.isJumpable = function() {
    return true;
};

// Define the Track class
function Track() {
    Obstacle.call(this); // Call the parent constructor
    this.name = 'Track';
}
util.inherits(Track, Obstacle);

Track.prototype.isRunnable = function() {
    return true;
};

// Define the GettingOver function
function GettingOver(contender, obstacle) {
    if (contender.limiting >= obstacle.distance) {
        if (obstacle.isJumpable()) {
            console.log(contender.jumping(), 'over the', obstacle.name);
        } else if (obstacle.isRunnable()) {
            console.log(contender.running(), 'on the', obstacle.name);
        }
        contender.limiting -= obstacle.distance;
        return true;
    }
    return false;
}

function ContenderVSObstacles(contenders, obstacles) {
    for (let i = 0; i < contenders.length; i++) {
        let oneContSum = 0;
        let completeCheck = true;

        for (let j = 0; j < obstacles.length; j++) {
            if (GettingOver(contenders[i], obstacles[j])) {
                oneContSum += obstacles[j].distance;
            } else {
                console.log(`Contender ${i + 1}(${contenders[i].name}) failed the course of obstacles at obstacle ${j + 1} (${obstacles[j].name}) with the distance ${oneContSum}`);
                completeCheck = false;
                break;  
            }
        }

        if (completeCheck) {
            console.log(`Contender ${i + 1} completed the course of obstacles`);
        }
    }
}

// Initialize contenders and obstacles
function initializeData() {
    let contenders = [];
    for (let i = 0; i < 10; i++) {
        let randContType = crypto.randomInt(0, 3); // 0 to 2 inclusive
        let randLimit = crypto.randomInt(30, 3000);

        switch (randContType) {
            case 0:
                let cat = new Cat();
                cat.SetLimit(randLimit);
                contenders.push(cat);
                break;
            case 1:
                let robot = new Robot();
                robot.SetLimit(randLimit);
                contenders.push(robot);
                break;
            case 2:
                let human = new Human();
                human.SetLimit(randLimit);
                contenders.push(human);
                break;
        }
    }

    let obstacles = [];
    for (let i = 0; i < 10; i++) {
        let randObstType = crypto.randomInt(0, 2); // 0 to 1 inclusive
        let randLimit = crypto.randomInt(30, 200);

        switch (randObstType) {
            case 0:
                let wall = new Wall();
                wall.SetDistance(randLimit);
                obstacles.push(wall);
                break;
            case 1:
                let track = new Track();
                track.SetDistance(randLimit);
                obstacles.push(track);
                break;
        }
    }

    ContenderVSObstacles(contenders, obstacles);
}

// Run the simulation
initializeData();
