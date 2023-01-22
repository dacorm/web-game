interface IGame {
  id: number
  countPlayers: number
  players: number[]
  userCreaterId: number
  name: string
}

export class Game implements IGame {
    id;

    countPlayers;

    players = [];

    userCreaterId;

    name;

    constructor(props: IGame) {
        this.id = props.id;
        this.countPlayers = props.countPlayers;
        this.userCreaterId = props.userCreaterId;
        this.name = props.name;
        this.addUserToGame(this.userCreaterId);
    }

    addUserToGame(userId:number) {
        this.players.push(userId);
    }
}
