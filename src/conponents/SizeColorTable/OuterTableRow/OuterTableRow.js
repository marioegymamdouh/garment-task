import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";

const OuterTableRow = (props) => {

    const availableColorsDrawer = () => {
        return [props.activeColors[props.colorIndex], ...props.availableColors]
            .sort()
            .map(color => <MenuItem key={color} value={color}>{color}</MenuItem>)
    };
    const dataCellsDrawer = () => {
        return props.row.map((qty, sizeIndex) =>
            <TableCell component="th" scope="row" key={String(props.colorIndex)+String(sizeIndex)}>
                <Input onChange={(event) => props.changeQuantity(props.colorIndex, sizeIndex, event)} value={qty}/>
            </TableCell>
        )
    };
    const rowSumValue = props.quantities[props.colorIndex].reduce((subTotal, num) => subTotal + parseInt(num), 0);


    return (
        <TableRow key={props.colorIndex}>
            <TableCell component="th" scope="row">
                <div style={{display: 'flex'}}>
                    <button onClick={() => props.deleteColor(props.colorIndex)} className='deleteBtn'>X</button>
                    <Select onChange={(event) => props.changeColor(props.colorIndex, event)} value={props.activeColors[props.colorIndex]}>
                        {availableColorsDrawer()}
                    </Select>
                </div>
            </TableCell>
            {dataCellsDrawer()}
            <TableCell component="th" scope="row" key={props.colorIndex}>{rowSumValue}</TableCell>
        </TableRow>
    )
};

export default OuterTableRow;