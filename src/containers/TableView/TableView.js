import {React, useState, useEffect} from 'react';
import * as constants from '../../constants/constants'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import './TableView.css'

const TableView = () => {


    /* states */
    const [activeSizes, setActiveSizes] = useState([]);
    const [activeColors, setActiveColors] = useState([]);
    const [quantities, setQuantities] = useState([]);
    const availableColors = constants.colors.filter(n => !activeColors.includes(n));
    const availableSizes = constants.sizes.filter(n => !activeSizes.includes(n));
    let total = 0;

    /* methods */
    const addColor = () => {
        if (activeColors.length < constants.colors.length) {
            setActiveColors([...activeColors, availableColors.sort()[0]]);
            setQuantities([...quantities, Array(activeSizes.length).fill(0)])
        }
        else alert('all colors is already exist')
    };
    const addSize = () => {
        if (activeSizes.length < constants.sizes.length) {
            setActiveSizes([...activeSizes, availableSizes.sort((a, b) => a-b)[0]]);
            const newQuantities = quantities.map(item => [...item, 0]);
            setQuantities(newQuantities);
        }
    };
    const changeColor = (index, event) => {
        let newActiveColors = [...activeColors];
        newActiveColors[index] = event.target.value;
        setActiveColors(newActiveColors);
    };
    const changeSize = (index, event) => {
        let newActiveSizes = [...activeSizes];
        newActiveSizes[index] = event.target.value;
        setActiveSizes(newActiveSizes);
    };
    const changeQuantity = (colorIndex, sizeIndex, event) => {
        let newValue = event.target.value;
        const numberRegex = new RegExp("^[0-9]*$");
        if (newValue === '') newValue = '0';
        if (numberRegex.test(newValue)) {
            let newQuantities = [...quantities];
            newQuantities[colorIndex][sizeIndex] = newValue;
            setQuantities(newQuantities);
        }
    };
    const printResults = () => {
        const results = activeSizes.map((sizeName, sizeIndex) => {
            return activeColors.map((colorName, colorIndex) => {
                return {
                    color: colorName,
                    size: sizeName,
                    quantity: quantities[colorIndex][sizeIndex]
                }
            })
        });
        console.log(results.flat(1));
    };
    const deleteSize = (id) => {
        const oldSizes = [...activeSizes];
        oldSizes.splice(id,1);
        setActiveSizes(oldSizes);
        let oldQuantities = [...quantities];
        oldQuantities.forEach(item => {item.splice(id,1)});
        setQuantities(oldQuantities);
    };
    const deleteColor = (id) => {
        const oldColors = [...activeColors];
        oldColors.splice(id,1);
        setActiveColors(oldColors);
        let oldQuantities = [...quantities];
        oldQuantities.splice(id,1);
        setQuantities(oldQuantities);
    };


    /* body content */
    let body = 'no data until now please pick one color and one size at least';
    if (activeSizes.length === 0 && activeColors.length > 0)
        body = 'please pick size';
    else if (activeSizes.length > 0 && activeColors.length === 0)
        body = 'please pick color';
    else if (activeSizes.length> 0 && activeColors.length> 0) {
        body = (
            <div>
                <div className='TableContainer'>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>color \ size</TableCell>
                                {activeSizes.map((item, sizeIndex) =>
                                    <TableCell key={sizeIndex}>
                                        <button onClick={() => deleteSize(sizeIndex)} className='deleteBtn'>X</button>
                                        <FormControl>
                                            <Select onChange={(event) => changeSize(sizeIndex, event)} value={item}>
                                                {[item, ...availableSizes].sort((a, b) => a-b).map(size => <MenuItem key={size} value={size}>{size}</MenuItem>)}
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                )}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {quantities.map((item, colorIndex) => (
                                <TableRow key={colorIndex}>
                                    <TableCell component="th" scope="row">
                                        <FormControl>
                                            <div style={{display: 'flex'}}>
                                                <button onClick={() => deleteColor(colorIndex)} className='deleteBtn'>X</button>
                                                <Select onChange={(event) => changeColor(colorIndex, event)} value={activeColors[colorIndex]}>
                                                    {[activeColors[colorIndex], ...availableColors].sort().map(color => <MenuItem key={color} value={color}>{color}</MenuItem>)}
                                                </Select>
                                            </div>
                                        </FormControl>
                                    </TableCell>
                                    {item.map((qty, sizeIndex) =>
                                        <TableCell component="th" scope="row" key={String(colorIndex)+String(sizeIndex)}>
                                            <Input onChange={(event) => changeQuantity(colorIndex, sizeIndex, event)} value={qty}/>
                                        </TableCell>
                                    )}
                                    <TableCell component="th" scope="row" key={colorIndex}>{quantities[colorIndex].reduce((subTotal, num) => subTotal + parseInt(num), 0)}</TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell component="th" scope="row">sum qty:</TableCell>
                                {activeSizes.map(
                                    (qty, sizeIndex) => {
                                        let sum = 0;
                                        for (let i = 0; i < activeColors.length; i++) sum+= parseInt(quantities[i][sizeIndex]);
                                        total += sum;
                                        return <TableCell component="th" scope="row" key={sizeIndex}>{sum}</TableCell>
                                    }
                                )}
                                <TableCell component="th" scope="row">{total}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                <Button style={{marginTop: '30px'}} variant="contained" color="primary" onClick={printResults}>Save & Print</Button>
            </div>
        )
    }


    /* renderer */
    return (
        <div className='text-center'>
            <div style={{margin: '50px'}}>
                <ButtonGroup variant="contained" color="primary">
                    <Button onClick={addColor}>Add color</Button>
                    <Button onClick={addSize}>Add size</Button>
                </ButtonGroup>
            </div>
            {body}
        </div>
    )
};

export default TableView;