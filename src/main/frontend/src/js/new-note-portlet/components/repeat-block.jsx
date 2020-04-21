import React from 'react';
import NewNoteActions from '../actions/new-note-actions';

export default class RepeatBlock extends React.Component {
    render() {
        let classes = cx({
            'col-sm-2': true,
            'invisible': !this.props.note.hasRepeat,
            'visible': this.props.note.hasRepeat
        });
        return (
            <div className={classes}>
                <label htmlFor="repeatSelect" onClick={this.showOptions}>Repeat period</label>

                <div className="form-group">
                    <div className="input-group">
                        <select type="text" className="form-control" id="repeatSelect"
                                onBlur={this.repeatPeriodChange}
                                onChange={this.repeatPeriodChange}
                                value={this.props.note.period}>
                            {this.props.periods.map(function (item, index) {
                                return (<option key={index} value={item.name}>{item.title}</option>)
                            })}
                        </select>
                        <span className="input-group-btn repeat-select-btn">
                            <button type="submit" className="btn btn-primary" onClick={this.showOptions}>
                                <FontAwesome name="repeat"/>
                            </button>
                        </span>
                    </div>
                </div>

            </div>
        );
    }

    showOptions() {
        let repeatSelectElement = jQuery('#repeatSelect');
        repeatSelectElement.show().focus().click();
        repeatSelectElement.prop('size', repeatSelectElement[0].length);
    }

    repeatPeriodChange(e) {
        jQuery("#repeatSelect").prop('size', 1);
        let period = e.target.value;
        NewNoteActions.changeNoteValue({period: period});
    }
}
RepeatBlock.defaultProps = {
    periods: [],
    note: {
        period: 'YEARLY'
    }
};