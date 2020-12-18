import React from 'react';
import TableBody from "@material-ui/core/TableBody";
import OuterTableFooter from "../OuterTableFooter/OuterTableFooter";
import OuterTableRow from "../OuterTableRow/OuterTableRow";

const OuterTableBody = (props) => {

    const rowsDrawer = () => {
        return  props.quantities.map((item, colorIndex) => (
            <OuterTableRow
                key = {colorIndex}
                colorIndex = {colorIndex}
                row = {item}
                activeColors = {props.activeColors}
                availableColors = {props.availableColors}
                quantities = {props.quantities}
                changeQuantity = {props.changeQuantity}
                deleteColor = {props.deleteColor}
            />
        ))
    };

    return (
        <TableBody>
            {rowsDrawer()}
            <OuterTableFooter
                activeSizes = {props.activeSizes}
                activeColors = {props.activeColors}
                quantities = {props.quantities}
            />
        </TableBody>
    )
};

export default OuterTableBody;