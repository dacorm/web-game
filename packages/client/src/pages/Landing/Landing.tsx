import React from 'react';
import './Landing.css';
import landingGame from '../../assets/img/landingGame.jpg';
import landingImage1 from '../../assets/img/landingImage1.jpg';
import landingImage2 from '../../assets/img/landingImage2.jpg';
import landingImage3 from '../../assets/img/landingImage3.jpg';
import { ButtonSize, ButtonTheme } from '../../shared/ui/Button/Button.types';
import styles from '../../components/Form/Form.module.css';
import LandingImageSmallContainer from '../../components/Landing/LandingImageSmallContainer';
import LinkButton from '../../shared/ui/LinkButton';
import { ROUTES } from '../../layout/RouterLayout/RouterConst';

const monopolyName = 'Monopoly';

export default function Landing() {
    return (
        <>
            <div className="landingHeadBackground" />
            <div className="landingWrapper">
                <div className="landingMessageWrapper">
                    <span className="landingMessage highlighted">
                        Проведите быстрый матч в&nbsp;
                        <span
                            className="gameName"
                        >
                            {monopolyName}
                        </span>
                        !
                    </span>

                    <span className="landingMessage highlighted">
                        <span className="gameName">{monopolyName}</span>
                        {' '}
                        - быстрая монополия!
                    </span>

                    <span className="landingMessage">
                        Вы не заснете в ожидании окончания длительного матча и
                        <br />
                        даже завершите игру в скором времени!
                    </span>

                    <span className="landingMessage">Надеемся на ваши успехи!</span>

                    <span className="landingMessage">Вперед - к новым победам!</span>
                    <LinkButton
                        key="btn_1"
                        to={ROUTES.MAIN}
                        text="Играть"
                        size={ButtonSize.M}
                        theme={ButtonTheme.GREEN}
                        className={styles.button}
                    />
                </div>
                <div className="landingGameImageContainer">
                    <img className="landingGameImage" src={landingGame} alt="Monopoly" />
                </div>
                <div className="landingBottomTextWrapper">
                    <span className="landingBottomText">
                        <span className="landingBottomTextGameName">{monopolyName}</span>
                        {' '}
                        - это:
                    </span>
                </div>
                <div className="landingMiddleImagesWrapper">
                    <LandingImageSmallContainer
                        key={1}
                        text={`FREE to PLAY ${String.fromCharCode(0x2014)}\n зарегистрировался и играй!`}
                        image={landingImage1}
                    />
                    <LandingImageSmallContainer key={2} text="Содружество игроков!" image={landingImage2} />
                </div>
                <div className="landingBottomImagesWrapper">
                    <LandingImageSmallContainer key={3} text="Непринужденная атмосфера!" image={landingImage3} />
                </div>
                <LinkButton
                    key="btn_2"
                    to={ROUTES.MAIN}
                    text="Играть"
                    size={ButtonSize.M}
                    theme={ButtonTheme.GREEN}
                    className={styles.button}
                />
                <div className="landingFooter" />
            </div>
        </>
    );
}
