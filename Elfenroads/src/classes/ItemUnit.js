export class ItemUnit {
    constructor(allowedEdges) {
        this.allowedEdges = allowedEdges;
    }
}

export class Spell extends ItemUnit {
    constructor(spellType, allowedEdges) {
        super(allowedEdges);
        this.spellType = spellType;
    }
}

export class Counter extends ItemUnit {
    constructor(counterType, allowedEdges) {
        super(allowedEdges);
        this.counterType = counterType;
    }
}

export class GoldPiece extends ItemUnit {
    constructor(amount, allowedEdges) {
        super(allowedEdges);
        this.amount = amount;
    }
}

export class Obstacle extends ItemUnit {
    constructor(obstacleType, allowedEdges) {
        super(allowedEdges);
        this.obstacleType = obstacleType;
    }
}
