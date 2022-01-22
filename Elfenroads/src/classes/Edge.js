export class Edge {
  constructor(town1, town2, edgeType, position) {
    this.town1 = town1;
    this.town2 = town2;
    this.edgeType = edgeType;
    this.position = position;
    this.items = [];
  }
}
