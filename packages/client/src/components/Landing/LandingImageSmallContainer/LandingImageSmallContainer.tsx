import React from 'react';
import { LandingImageSmallContainerProps } from './LandingImageSmallContainer.types';
import styles from './LandingImageSmallContainer.module.css';
import { getMultilinesPText } from '../../../core/getMultilinesPText';

export default function LandingImageSmallContainer({ image, text }: LandingImageSmallContainerProps) {
    return (
        <div className={styles.landingImageContainer}>
            <div className={styles.landingImageContainerTextBlock}>
                <span className={styles.landingImageContainerText}>
                    {getMultilinesPText(text)}
                </span>
            </div>
            <div className={styles.landingImageOuterWrapper}>
                <div className={styles.landingImageWrapper}>
                    <img className={styles.landingImage} src={image} alt={text} />
                </div>
            </div>
        </div>
    );
}
