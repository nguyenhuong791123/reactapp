import React, { Component as C } from 'react';

import ReactLightCalendar from '@lls/react-light-calendar';
import '@lls/react-light-calendar/dist/index.css';
import '../../css/Calendar.css';

import { isEmpty } from './Utils';

export default class CalendarBox extends C {
    constructor(props) {
        super(props)

        this._onChange = this._onChange.bind(this);
        const date = new Date()
        const start = date.getTime()
        this.state = {
            show: this.props.show
            ,datetime: this.props.datetime
            ,range: this.props.range
            ,timezone: this.props.timezone
            ,top: this.props.top
            ,left: this.props.left
            ,start
            ,end: new Date(start).setDate(date.getDate() + 6)
            ,dayLabels: ['月', '火', '水', '木', '金', '土', '日']
            ,monthLabels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        }
    }

    _onChange(startDate, endDate) {
        console.log(startDate);
        console.log(endDate);
        this.setState({ start: startDate, end: endDate });
        if(!isEmpty(endDate)) this.props.onChangeCalendar(startDate, endDate);
    }

    render = () => {
        if(!this.state.show) return "";
        const style = { top: this.state.top, left: this.state.left }
        return (
            <div className='div-calendar-box' style={ style }>
                {(() => {
                    if(this.state.datetime && this.state.range) {
                        return (
                            <ReactLightCalendar
                                dayLabels={ this.state.dayLabels }
                                monthLabels={ this.state.monthLabels }
                                startDate={ this.state.start }
                                endDate={ this.state.end }
                                timezone={ this.state.timezone }
                                onChange={ this._onChange.bind(this) } range displayTime />        
                        );
                    }
                    if(!this.state.datetime && this.state.range) {
                        return (
                            <ReactLightCalendar
                                dayLabels={ this.state.dayLabels }
                                monthLabels={ this.state.monthLabels }
                                startDate={ this.state.start }
                                endDate={ this.state.end }
                                timezone={ this.state.timezone }
                                onChange={ this._onChange.bind(this) } range />        
                        );
                    }
                    if(this.state.datetime && !this.state.range) {
                        return (
                            <ReactLightCalendar
                                dayLabels={ this.state.dayLabels }
                                monthLabels={ this.state.monthLabels }
                                startDate={ this.state.start }
                                endDate={ this.state.end }
                                timezone={ this.state.timezone }
                                onChange={ this._onChange.bind(this) } displayTime />        
                        );
                    }
                    if(!this.state.datetime && !this.state.range) {
                        return (
                            <ReactLightCalendar
                                dayLabels={ this.state.dayLabels }
                                monthLabels={ this.state.monthLabels }
                                startDate={ this.state.start }
                                endDate={ this.state.end }
                                timezone={ this.state.timezone }
                                onChange={ this._onChange.bind(this) } />        
                        );
                    }
                })()}
            </div>
        );
    }
}