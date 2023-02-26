import {
    ForumActionTypes, IForum, IMes, TsetThemeList,
} from '../types/forumReducer.types';
import { appDispatch } from '../store';
import { forumApi } from '../../api/apiForum';

export const setThemeList = (themes: IForum[]) :TsetThemeList => ({
    type: ForumActionTypes.SET_THEMES,
    payload: themes,
});

export const setCountThemes = (countThemes:number) => ({
    type: ForumActionTypes.SET_COUNT_THEMES,
    payload: countThemes,
});

export const setMessages = (messages: IMes[]) => ({
    type: ForumActionTypes.SET_CURRENT_MESSAGES,
    payload: messages,
});

export const setCurrentTheme = (theme: IMes[]) => ({
    type: ForumActionTypes.SET_CURRENT_THEME,
    payload: theme,
});

export const getThemeList = (currentPage = 1, PAGE_SIZE = 3) => async (dispatch: appDispatch) => {
    console.log('!!!!!!!!!!!!!currentPage', currentPage, 'PAGE_SIZE', PAGE_SIZE);
    try {
        const res = await forumApi.getAllThemes(currentPage, PAGE_SIZE);
        console.log('res', res);
        const themData = await res.json();
        console.log('themData', themData);
        if (res.status === 200) {
            dispatch(setThemeList(themData));
        } else {
            console.log('getThemeError', themData);
        }
    } catch (e) {
        console.warn(e);
    }
};

export const getTheme = (themeId:number) => async (dispatch:appDispatch) => {
    try {
        const res = await forumApi.getOneTheme(themeId);
        const themData = await res.json();
        if (res.status === 200) {
            dispatch(setCurrentTheme(themData));
        } else {
            console.log('getONEThemeError', themData);
        }
    } catch (e) {
        console.warn(e);
    }
};

export const getCountThemes = () => async (dispatch: appDispatch) => {
    try {
        const res = await forumApi.getCountThemes();
        const count = await res.json();
        console.log('count', count);
        if (res.status === 200) {
            dispatch(setCountThemes(count.count));
        } else {
            console.log('getThemeError', count);
        }
    } catch (e) {
        console.log('error', e);
    }
};

export const createForumThunk = (themeName:string) => async (dispatch: appDispatch) => {
    try {
        const res = await forumApi.createTheme(themeName);
        const forumData = await res.json();
        if (res.status === 200) {
            if (forumData.message === 'OK') {
                dispatch(getThemeList());
                dispatch(getCountThemes());
            }
        }
    } catch (e) {
        console.warn(e);
    }
};

export const getMessages = (themeId:number) => async (dispatch: appDispatch) => {
    try {
        const res = await forumApi.getMes(themeId);
        const messages = await res.json();
        console.log('messages', messages);
        if (res.status === 200) {
            dispatch(setMessages(messages));
        } else {
            console.log('getThemeError', messages);
        }
    } catch (e) {
        console.log('error', e);
    }
};

export const createMes = (themeId:number, text:string, authorId:number) => async (dispatch:appDispatch) => {
    try {
        const res = await forumApi.createMes(themeId, text, authorId);
        const forumData = await res.json();
        console.log(res);
        if (res.status === 200) {
            if (forumData.message === 'OK') {
                dispatch(getMessages(themeId));
            }
        }
    } catch (e) {
        console.warn(e);
    }
};
