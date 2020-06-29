import React from "react";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";

const names = [
    "08-10",
    "10-12",
    "12-14",
    "14-16",
    "16-18",
    "18-20",
];

export default class MultipleSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state        = {
            times: names,
        };
    }

    handleChange = (event) => {
        this.setState({times: event.target.value});
        this.props.timeChange(this.props.day, event.target.value);
    };

    render() {
        return (
            <FormControl style={{
                width: 100
            }}>
                {/*<InputLabel id={this.props.day}>ساعت</InputLabel>*/}
                <Select
                    disabled={this.props.disabled}
                    labelId={this.props.day}
                    multiple
                    value={this.state.times}
                    onChange={this.handleChange}
                    input={<Input style={{fontSize: 15}} />}
                    renderValue={() => "بازه‌ی زمانی"}
                >
                    {names.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={this.state.times.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }
}
