export default class Edge {
  edgeStart: String;
  edgeEnd: String;
  edgeType: EdgeType;
  obstacles: String[];

  constructor(
    edgeStart: string,
    edgeEnd: string,
    edgeType: EdgeType,
    obstacles: String[],
  ) {
    this.edgeStart = edgeStart;
    this.edgeEnd = edgeEnd;
    this.edgeType = edgeType;
    this.obstacles = obstacles;
  }
}

export enum EdgeType {
  PLAIN = 'plain',
  WOOD = 'wood',
  DESERT = 'desert',
  MOUNTAIN = 'mountain',
  RIVER = 'river',
  LAKE = 'lake',
}
