export default class LaunchInfo {
  creator: string;
  gameServer: string;
  players: LaunchPlayer[];
  savegame: string;
}

export class LaunchPlayer {
  name: string;
  preferredColour: string;
}
