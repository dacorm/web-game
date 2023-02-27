import { Forum, Message, User } from '../index'

export function association(){
  Forum.hasMany(Message, {
   foreignKey: 'themeId'
 });
Message.belongsTo(Forum, {
  foreignKey: 'themeId'
});

User.hasOne(Forum, {foreignKey: 'createdById'})
Forum.belongsTo(User, {foreignKey: 'createdById'})


}