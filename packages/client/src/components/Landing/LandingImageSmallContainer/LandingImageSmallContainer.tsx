import React from 'react';
import { LandingImageSmallContainerProps } from './LandingImageSmallContainer.types';
import './LandingImageSmallContainer.css';
import { getMultilinesPText } from '../../../core/getMultilinesPText';

export default function LandingImageSmallContainer({ image, text }: LandingImageSmallContainerProps) {
    return (
        <div className="landingImageContainer">
            <div className="landingImageContainerTextBlock">
                <span className="landingImageContainerText">
                    {getMultilinesPText(text)}
                </span>
            </div>
            <div className="landingImageOuterWrapper">
                <div className="landingImageWrapper">
                    <img className="landingImage" src={image} alt={text} />
                </div>
            </div>
        </div>
    );
}
