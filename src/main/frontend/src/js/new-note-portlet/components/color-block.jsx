import React from 'react';
import {Popover, OverlayTrigger, Tooltip} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import cx from 'classnames';

import StorageService from '../../services/storage-service';
import NewNoteActions from '../actions/new-note-actions';

export default class ColorBlock extends React.Component{
    render() {
        let classes = cx({
            'col-sm-1': true,
            'white-popover': true,
            'invisible': !this.props.note.hasColor,
            'visible': this.props.note.hasColor
        });

        let overlay = <Popover>{this.renderColorPalette()}</Popover>;
        let colorHash = StorageService.getColorByName(this.props.note.color);

        return (
            <div className={classes}>
                <label htmlFor="note-color-select">Note color</label>

                <div className="form-group">
                    <div className="input-group">
                        <input type="text" className="form-control" id="note-color-select" value="A"
                               readOnly={true}
                               style={{backgroundColor: colorHash}}/>
                        <OverlayTrigger trigger="focus" placement="bottom"
                                        overlay={overlay}>
                            <span className="input-group-btn">
                                <button type="submit" className="btn btn-primary" id="color-selector">
                                    <FontAwesome name="paint-brush" />
                                </button>
                            </span>
                        </OverlayTrigger>
                    </div>
                </div>

            </div>
        );
    }

    renderColorPalette() {
        let colors = this.props.colors;
        let colCount = 5;
        let rows = [];

        for (let row = 0; row < (colors.length / colCount); row++) {
            let columns = [];
            for (let col = 0; col < colCount && (row * colCount + col) < colors.length; col++) {
                let color = colors[row * colCount + col];
                columns.push(
                    <td key={col}>
                        <div className="hover-transition color-square"
                             style={{backgroundColor: color.colorWithHash}}
                             data-color-id={color.colorWithHash}
                             data-color-name={color.name}
                             onMouseOver={this.selectColor.bind(this,color.name)}></div>
                    </td>
                );
            }
            rows.push(<tr key={row}>{columns}</tr>);
        }

        return (
            <table className="color-palette">
                {rows}
            </table>
        );
    }

    selectColor(color) {
        NewNoteActions.changeNoteValue({color:color});
    }
}