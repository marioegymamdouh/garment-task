import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

const OuterTableFooter = (props) => {

    let total = 0;

    const tableCellsDrawer = () => {
        return props.activeSizes.map(
            (qty, sizeIndex) => {
                let sum = 0;
                for (let i = 0; i < props.activeColors.length; i++) sum+= parseInt(props.quantities[i][sizeIndex]);
                total += sum;
                return <TableCell component="th" scope="row" key={sizeIndex}>{sum}</TableCell>
            }
        )
    };

    return (
        <TableRow>
            <TableCell component="th" scope="row">sum qty:</TableCell>
            {tableCellsDrawer()}
            <TableCell component="th" scope="row">{total}</TableCell>
        </TableRow>
    )
};

export default OuterTableFooter
