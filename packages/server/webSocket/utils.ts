export const broadcastConnection = (aWss:any, _: any, msg: any) => {
  console.log("broadcAST!!!!!!!!!!::::::::", msg)
  let i=0;
  aWss.clients.forEach((client:any) => {

    console.log('Index', i)
    i++;
    client.send(msg)

  })
}

export const connectionHandler = (aWss:any, ws: any, msg: any) => {
  broadcastConnection(aWss, ws, msg)
}

export function getIdsofGamesfromState(games:any[]) {
  const idsGames: any[] = [];
  games.forEach((game) => {
    if (game?.id) {
      idsGames.push(game.id);
    }
  });
  return idsGames;
}