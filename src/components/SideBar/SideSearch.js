import React from "react";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

class SideSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ''
        };
    }

    handleChange = (e) => {
        this.setState({
            input: e.target.value
        });
    }

    render() {

        return (
            <Paper className="side-box">
                <Typography component="p">
                    
                    <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="search">搜索</InputLabel>
                    <OutlinedInput
                        id="search"
                        value={ this.state.input }
                        onChange={ this.handleChange }
                        labelWidth={60}
                    />
                    </FormControl>
                </Typography>
            </Paper>
        );
    }

}

export default SideSearch;