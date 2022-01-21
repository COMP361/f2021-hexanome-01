export class ItemUnit {
    constructor(name) {
        this.name = name;
    }
}

export class Spell extends ItemUnit {
    constructor(spellType) {
        super();
        this.spellType = spellType;
    }
}

export class Counter extends ItemUnit {
    constructor(counterType) {
        super();
        this.counterType = counterType;
    }
}

export class GoldPiece extends ItemUnit {
    constructor(amount) {
        super();
        this.amount = amount;
    }
}

export class Obstacle extends ItemUnit {
    constructor(obstacleType) {
        super();
        this.obstacleType = obstacleType;
    }
}
