import React from 'react';
import {Popover, OverlayTrigger} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import NewNoteActions from '../actions/new-note-actions';
import StorageService from '../../services/storage-service';


export default class IconBlock extends React.Component{
    render() {
        let classes = cx({
            'col-sm-1': true,
            'white-popover': true,
            'invisible': !this.props.hasIcon,
            'visible': this.props.hasIcon
        });
        let icon = StorageService.getIconByName(this.props.icon) || {type: ''};
        let overlay = <Popover>{this.renderIconPallete()}</Popover>;
        return (
            <div className={classes}>
                <label htmlFor="note-icon-select">Icon</label>

                <div className="form-group">
                    <div className="input-group">
                        <div className="form-control icon-input-block"><FontAwesome name={icon.type} /></div>
                        <OverlayTrigger trigger="focus" placement="bottom"
                                        overlay={overlay}>
                            <span className="input-group-btn">
                                <button type="submit" className="btn btn-primary" id="note-icon-select">
                                    <FontAwesome name="smile-o" />
                                </button>
                            </span>
                        </OverlayTrigger>
                    </div>
                </div>

            </div>
        );
    }

    renderIconPallete(){
        let icons = this.props.icons;
        let colCount = 5;
        let rows = [];

        for (let row = 0; row < (icons.length / colCount); row++) {
            let columns = [];
            for (let col = 0; col < colCount && (row * colCount + col) < icons.length; col++) {
                let icon = icons[row * colCount + col];
                columns.push(
                    <td key={col}>
                        <div className="icon-palette-block"
                             onMouseOver={this.selectIcon.bind(this, icon.name)}><FontAwesome name={icon.type} /></div>
                    </td>
                );
            }
            rows.push(<tr key={row}>{columns}</tr>);
        }

        return (
            <table className="icon-palette">
                {rows}
            </table>
        );
    }
    selectIcon(icon) {
        NewNoteActions.changeNoteValue({icon:icon});
    }

}