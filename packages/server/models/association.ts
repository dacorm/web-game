import { Forum, Message } from '../index'

export function association(){
  Forum.hasMany(Message, {
   foreignKey: 'themeId'
 });
Message.belongsTo(Forum);
}