import React, { useState, useEffect } from 'react'

import Slider, { SliderTooltip } from 'rc-slider';




import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
//styles
import $ from './audioPlayer.module.scss';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
const { Handle } = Slider;

interface AudioPlayerProps {
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    togglePlayingState: () => void;
    onChange: (value: number) => void
}

const AudioPlayer = ({ isPlaying, currentTime, duration, togglePlayingState, onChange }: AudioPlayerProps) => {

    const handle = (props: any) => {
        const { value, dragging, index, ...restProps } = props;
        return (
          <SliderTooltip
            prefixCls="rc-slider-tooltip"
            overlay={`${formatTime(value)}`}
            visible={dragging}
            placement="top"
            key={index}
          >
            <Handle value={value} {...restProps} />
          </SliderTooltip>
        );
    }

    const formatTime = (timeInSeconds: number) => {
        let minutes = Math.floor(timeInSeconds/60);
        let minutesStr: string;
        if(minutes < 10){
            minutesStr = '0' + minutes
        }else{
            minutesStr = `${minutes}`
        }

        let seconds = timeInSeconds-(60*minutes);
        let secondsStr: string;

        if(seconds < 10){
            secondsStr = '0' + seconds
        }else{
            secondsStr = `${seconds}`
        }

        return `${minutesStr}:${secondsStr}`

    }

    

    return (
        <div className={$.root}>
            <FontAwesomeIcon icon={isPlaying ? faStop : faPlay} onClick={togglePlayingState} />
            <div className={$.sliderWrapper}>
                <Slider 
                    min={0}
                    max={duration}
                    defaultValue={0}
                    value={currentTime}
                    onChange={(value: number) => onChange(value)}
                    handle={handle}    
                />
            </div>
        </div>
    )
}

export default AudioPlayer
