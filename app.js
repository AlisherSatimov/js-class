class Car {
    model;
    color;
    max_speed;
    name;
    company;
    isStarted = false;
    isMoving = false;
    currentSpeed = 0;
    gasSize;
    currentGas;
    #gasUsage = 0;
    gasUsageIntervalId;

    constructor(name, model, color, max_speed, company, gasSize = 40) {
        this.name = name;
        this.model = model;
        this.color = color;
        this.max_speed = max_speed;
        this.company = company;
        this.gasSize = gasSize;
        this.currentGas = gasSize;
    }

    get gasUsage() {
        return this.#gasUsage;
    }

    start() {
        if (this.isStarted) {
            console.log(
                this.name + " is already started. No need to start again"
            );
            return;
        }

        this.isStarted = true;
        console.log(this.name + " is started");
        this.#gasUsage++;
        this.gasUsageIntervalId = setInterval(() => {
            this.currentGas -= this.#gasUsage;
            if (this.currentGas > 0) {
                console.log(`${this.name} has ${this.currentGas}l gas left`);
            } else {
                console.log("Ballon is empty. Please, fill the gas");
                this.stop();
                return;
            }
        }, 3_000);
    }

    stop() {
        if (!this.isStarted) {
            console.log(
                `${this.name} is not started yet, No need to start the car `
            );
        }
        this.stopMoving();
        this.#gasUsage = 0;
        this.isStarted = false;
        clearInterval(this.gasUsageIntervalId);
    }

    move() {
        if (!this.isStarted) {
            console.log(
                `${this.name} is not started yet, please start the car first`
            );

            return;
        }
        this.currentSpeed = this.currentSpeed + 10;
        this.#gasUsage++;

        if (this.isMoving) {
            console.log(
                `${this.name}'s speed is increased by 10, current speed is ${this.currentSpeed}`
            );

            if (this.currentSpeed >= 60) {
                console.log(
                    `Further speeding is not recommended as there might be a radar`
                );
            }

            return;
        }

        this.isMoving = true;
        console.log(
            `${this.name} started moving, current speed is ${this.currentSpeed}`
        );
    }

    stopMoving() {
        if (!this.isMoving) {
            console.log(
                `${this.name} is not moving anyways. No need to stop moving`
            );
            return;
        }

        this.isMoving = false;
        this.#gasUsage = 1;
        this.currentSpeed = 0;
        console.log(`${this.name} stopped moving`);
    }
}

let tayota = new Car("Tayota", "X5", "black", 243, "Tayota", 100);
let mers = new Car("Hammer", "G90", "black", 155, "Hammer", 100);

tayota.start();
tayota.move();
