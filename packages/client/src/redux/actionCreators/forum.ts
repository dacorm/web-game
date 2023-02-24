import { ForumActionTypes, IForum, TsetThemeList } from '../types/forumReducer.types';
import { appDispatch } from '../store';
import { forumApi } from '../../api/apiForum';

export const setThemeList = (themes: IForum[]) :TsetThemeList => ({
    type: ForumActionTypes.SET_THEMES,
    payload: themes,
});

export const getThemeList = () => async (dispatch: appDispatch) => {
    try {
        const res = await forumApi.getAllThemes();
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

export const createForumThunk = (themeName:string) => async (dispatch: appDispatch) => {
    try {
        const res = await forumApi.createTheme(themeName);
        const forumData = await res.json();
        if (res.status === 200) {
            if (forumData.message === 'OK') {
                dispatch(getThemeList());
            }
        }
        console.log(forumData);
    } catch (e) {
        console.warn(e);
    }
};
