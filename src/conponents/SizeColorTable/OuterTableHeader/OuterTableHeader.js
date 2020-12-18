import React from 'react';
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const OuterTableHeader = (props) => {

    const availableColorsDrawer = (item) => {
        return [item, ...props.availableSizes]
            .sort((a, b) => a-b)
            .map(size => <MenuItem key={size} value={size}>{size}</MenuItem>);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell>color \ size</TableCell>
                {props.activeSizes.map((item, sizeIndex) =>
                    <TableCell key={sizeIndex}>
                        <button onClick={() => props.deleteSize(sizeIndex)} className='deleteBtn'>X</button>
                        <Select onChange={(event) => props.changeSize(sizeIndex, event)} value={item}>
                            {availableColorsDrawer(item)}
                        </Select>
                    </TableCell>
                )}
            </TableRow>
        </TableHead>
    )
};

export default OuterTableHeader;