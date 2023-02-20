export interface UserGame {
  userName: string,
  avatar: string,
  id: number
}

export interface IGame {
  id: number
  countPlayers: number
  players: UserGame[]
  userCreater: UserGame
  name: string
}

export class Game implements IGame {
    id;

    countPlayers;

    players: UserGame[];

    userCreater;

    name;

    constructor(props: IGame) {
        this.id = props.id;
        this.countPlayers = props.countPlayers;
        this.userCreater = props.userCreater;
        this.name = props.name;
        this.addUserToGame(this.userCreater);
        this.players = [];
    }

    addUserToGame(user:UserGame) {
        this.players.push(user);
    }
}
