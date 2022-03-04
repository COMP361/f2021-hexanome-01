export enum BootColour {
  Black,
  Blue,
  Red,
  Yellow,
  Purple,
  Green,
  None,
}

export class ColorMap {
  private static actorStore: Map<BootColour, string> = new Map();
  private static bootStore: Map<BootColour, string> = new Map();

  constructor() {
    ColorMap.actorStore.set(BootColour.Black, 'black-actor');
    ColorMap.actorStore.set(BootColour.Blue, 'blue-actor');
    ColorMap.bootStore.set(BootColour.Black, 'black-actor');
  }
}
