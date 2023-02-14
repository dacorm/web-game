import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Dispatcher } from '../../redux/store';
import {
    loginOAuthPart2Thunk,
} from '../../redux/actionCreators/user';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import styles from './Landing.module.css';
import landingGame from '../../assets/img/landingGame.jpg';
import landingImage1 from '../../assets/img/landingImage1.jpg';
import landingImage2 from '../../assets/img/landingImage2.jpg';
import landingImage3 from '../../assets/img/landingImage3.jpg';
import { ButtonSize, ButtonTheme } from '../../shared/ui/shared/shared.button.types';
import btnStyles from '../../shared/ui/shared/shared.button.module.css';
import LandingImageSmallContainer from '../../components/Landing/LandingImageSmallContainer';
import LinkButton from '../../shared/ui/LinkButton';
import { ROUTES } from '../../layout/RouterLayout/RouterConst';

const monopolyName = 'Monopoly';
const codeUriParamName = 'code';

export default function Landing() {
    const dispatch = useDispatch<Dispatcher>();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { loginError, isLoggedIn } = useTypedSelector((state) => state.user);
    useEffect(() => {
        if (!isLoggedIn && searchParams.has(codeUriParamName)) {
            const codeParamValueString = searchParams.get(codeUriParamName) as string;
            dispatch(loginOAuthPart2Thunk(codeParamValueString));
            navigate(ROUTES.GAME_SEARCH);
        }
    }, []);

    if (!isLoggedIn && loginError) {
        navigate(ROUTES.AUTH);
    }
    const selectedRoute = isLoggedIn ? ROUTES.GAME_SEARCH : ROUTES.AUTH;

    return (
        <>
            <div className={styles.landingHeadBackground} />
            <div className={styles.landingWrapper}>
                <div className={styles.landingMessageWrapper}>
                    <span className={`${styles.landingMessage} ${styles.highlighted}`}>
                        Проведите быстрый матч в&nbsp;
                        <span
                            className={styles.gameName}
                        >
                            {monopolyName}
                        </span>
                        !
                    </span>

                    <span className={`${styles.landingMessage} ${styles.highlighted}`}>
                        <span className={styles.gameName}>{monopolyName}</span>
                        {' '}
                        - быстрая монополия!
                    </span>

                    <span className={styles.landingMessage}>
                        Вы не заснете в ожидании окончания длительного матча и
                        <br />
                        даже завершите игру в скором времени!
                    </span>

                    <span className={styles.landingMessage}>Надеемся на ваши успехи!</span>

                    <span className={styles.landingMessage}>Вперед - к новым победам!</span>
                    <LinkButton
                        key="btn_1"
                        to={selectedRoute}
                        text="Играть"
                        size={ButtonSize.M}
                        theme={ButtonTheme.GREEN}
                        className={btnStyles.button}
                    />
                </div>
                <div className={styles.landingGameImageContainer}>
                    <img className={styles.landingGameImage} src={landingGame} alt="Monopoly" />
                </div>
                <div className={styles.landingBottomTextWrapper}>
                    <span className={styles.landingBottomText}>
                        <span className={styles.landingBottomTextGameName}>{monopolyName}</span>
                        {' '}
                        - это:
                    </span>
                </div>
                <div className={styles.landingMiddleImagesWrapper}>
                    <LandingImageSmallContainer
                        key={1}
                        text={`FREE to PLAY ${String.fromCharCode(0x2014)}\n зарегистрировался и играй!`}
                        image={landingImage1}
                    />
                    <LandingImageSmallContainer key={2} text="Содружество игроков!" image={landingImage2} />
                </div>
                <div className={styles.landingBottomImagesWrapper}>
                    <LandingImageSmallContainer key={3} text="Непринужденная атмосфера!" image={landingImage3} />
                </div>
                <LinkButton
                    key="btn_2"
                    to={selectedRoute}
                    text="Играть"
                    size={ButtonSize.M}
                    theme={ButtonTheme.GREEN}
                    className={btnStyles.button}
                />
                <div className={styles.landingFooter} />
            </div>
        </>
    );
}
