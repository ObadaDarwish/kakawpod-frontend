import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiFormControlLabel-label': {
            fontSize: '1.6rem',
        },
        '& .MuiCheckbox-root': {
            color: '#7D5A5A',
        },
    },
}));
const ShopFilters = ({ filter, direction, handleChange }) => {
    const classes = useStyles();

    return (
        <div
            className={`shopFiltersContainer ${
                direction === 'row'
                    ? 'shopFiltersContainer__row'
                    : 'shopFiltersContainer__column'
            }`}
        >
            <p>Filter by:</p>
            <FormControlLabel
                className={classes.root}
                control={
                    <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="large" />}
                        checkedIcon={<CheckBoxIcon fontSize="large" />}
                        checked={filter === 'milk'}
                        onChange={handleChange}
                        name="milk"
                    />
                }
                label="milk"
            />
            <FormControlLabel
                className={classes.root}
                control={
                    <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="large" />}
                        checkedIcon={<CheckBoxIcon fontSize="large" />}
                        checked={filter === 'dark'}
                        onChange={handleChange}
                        name="dark"
                    />
                }
                label="dark"
            />
            <FormControlLabel
                className={classes.root}
                control={
                    <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="large" />}
                        checkedIcon={<CheckBoxIcon fontSize="large" />}
                        checked={filter === 'white'}
                        onChange={handleChange}
                        name="white"
                    />
                }
                label="white"
            />
        </div>
    );
};

export default ShopFilters;
