import { forumServise, messageServise, userService } from '../index';
import type { IUser } from './user';
import type { IForum } from './forum';
import type { IMessage } from './message';

const initialUsers :IUser[] = [
    {
        id: 1,
        first_name: 'Admin',
        second_name: 'Admin',
        display_name: 'Admin',
        login: 'Admin',
        avatar: null,
        email: 'Admin',
        phone: '8999567890',
    },
    {
        id: 2,
        first_name: 'UserTwo',
        second_name: 'UserTwo',
        display_name: 'UserTwo',
        login: 'UserTwo',
        avatar: null,
        email: 'UserTwo@mail.ru',
        phone: '8999567890',
    },
    {
        id: 3,
        first_name: 'UserThree',
        second_name: 'UserThree',
        display_name: 'UserThree',
        login: 'UserThree',
        avatar: null,
        email: 'UserThree@mail.ru',
        phone: '8999567890',
    },
    {
        id: 4,
        first_name: 'UserFour',
        second_name: 'UserFour',
        display_name: 'UserFour',
        login: 'UserFour',
        avatar: null,
        email: 'UserFour@mail.ru',
        phone: '8999567890',
    },

];

const initialForums: IForum[] = [
    {
        createdById: 1,
        countMsg: 5,
        themeName: 'Monopoly Rules',
    },
    {
        createdById: 2,
        countMsg: 5,
        themeName: 'date of Chempionat',
    },
    {
        createdById: 3,
        countMsg: 5,
        themeName: 'Can not play',
    },
    {
        createdById: 4,
        countMsg: 5,
        themeName: 'Rating error',
    },
];

const initialMessages: IMessage[] = [
    {
        themeId: 1,
        text: "Hello, here we'll write rules about Game",
        authorId: 1,
    },
    {
        themeId: 1,
        text: 'No Rules, please write it now',
        authorId: 2,
    },
    {
        themeId: 2,
        text: "Hello, here we'll write information about Chempionats",
        authorId: 1,
    },
    {
        themeId: 2,
        text: 'Please, write data of the first',
        authorId: 3,
    },
    {
        themeId: 3,
        text: "Hello, i can't start the Game, why?",
        authorId: 4,
    },
    {
        themeId: 3,
        text: 'Please, wait. technical works',
        authorId: 3,
    },
];

export async function InitialUsersData() {
    if (initialUsers.length !== 0) {
        for (let i = 0; i < initialUsers.length; i++) {
            // eslint-disable-next-line no-await-in-loop
            const userData = await userService.findByLogin((initialUsers[i].login));
            // console.log('userData', userData);
            if (userData === null) {
                console.log('CREATE USER');
                userService.createUser(
                    initialUsers[i].id,
                    initialUsers[i].first_name,
                    initialUsers[i].second_name,
                    initialUsers[i].display_name,
                    initialUsers[i].login,
                    initialUsers[i].avatar,
                    initialUsers[i].email,
                    initialUsers[i].phone,
                );
            }
        }
    }
}

export async function InitialForumsData() {
    if (initialForums.length !== 0) {
        for (let i = 0; i < initialForums.length; i++) {
            // eslint-disable-next-line no-await-in-loop
            const forumData = await forumServise.findBythemeName(initialForums[i].themeName);
            // console.log('forumData ', forumData);
            if (forumData === null) {
                forumServise.createForum(
                    initialForums[i].createdById,
                    initialForums[i].countMsg,
                    initialForums[i].themeName,
                );
            }
        }
    }
}

export async function InitialMessagesData() {
    if (initialMessages.length !== 0) {
        for (let i = 0; i < initialMessages.length; i++) {
            // eslint-disable-next-line no-await-in-loop
            const mesData = await messageServise.findOne(initialMessages[i].text, initialMessages[i].authorId);
            // console.log('mesData', mesData);
            if (mesData === null) {
                messageServise.create(
                    initialMessages[i].themeId,
                    initialMessages[i].text,
                    initialMessages[i].authorId,
                );
            }
        }
    }
}
