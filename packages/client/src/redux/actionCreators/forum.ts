import { ForumActionTypes, IForum, TsetThemeList } from '../types/forumReducer.types';
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
        console.log(forumData);
    } catch (e) {
        console.warn(e);
    }
};
