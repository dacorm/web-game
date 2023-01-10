import React from 'react';
import './Landing.css';
import landingGame from '../../assets/img/landingGame.jpg';
import landingImage1 from '../../assets/img/landingImage1.jpg';
import landingImage2 from '../../assets/img/landingImage2.jpg';
import landingImage3 from '../../assets/img/landingImage3.jpg';
import Button from '../../shared/ui/Button';
import { ButtonSize, ButtonTheme } from '../../shared/ui/Button/Button.types';
import styles from '../../components/Form/Form.module.css';

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
                    <Button size={ButtonSize.M} theme={ButtonTheme.GREEN} type="submit" className={styles.button}>Играть</Button>
                    {/* <NavBarItem */}
                    {/*  title={'Играть'} */}
                    {/*  path={ROUTES.MAIN} */}
                    {/*  id={1} key={1} /> */}
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
                    <div className="landingImageContainer">
                        <div className="landingImageContainerTextBlock">
                            <span className="landingImageContainerText">
                                FREE to PLAY -
                                <br />
                                зарегистрировался и играй!
                            </span>
                        </div>
                        <div className="landingImageOuterWrapper">
                            <div className="landingImageWrapper">
                                <img
                                    className="landingImage"
                                    src={landingImage1}
                                    alt="FREE to PLAY - <br />зарегистрировался и играй!"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="landingImageContainer">
                        <div className="landingImageContainerTextBlock">
                            <span className="landingImageContainerText">Содружество игроков!</span>
                        </div>
                        <div className="landingImageOuterWrapper">
                            <div className="landingImageWrapper">
                                <img className="landingImage" src={landingImage2} alt="Содружество игроков!" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="landingBottomImagesWrapper">
                    <div className="landingImageContainer">
                        <div className="landingImageContainerTextBlock">
                            <span className="landingImageContainerText">Непринужденная атмосфера!</span>
                        </div>
                        <div className="landingImageOuterWrapper">
                            <div className="landingImageWrapper">
                                <img className="landingImage" src={landingImage3} alt="Непринужденная атмосфера!" />
                            </div>
                        </div>
                    </div>
                </div>
                <Button size={ButtonSize.M} theme={ButtonTheme.GREEN} type="submit" className={styles.button}>Играть</Button>
                {/* <NavBarItem */}
                {/*  title={'Играть'} */}
                {/*  path={ROUTES.MAIN} */}
                {/*  id={1} key={1} /> */}
            </div>
        </>
    );
}
