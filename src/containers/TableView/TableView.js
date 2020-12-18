import {React, useState} from 'react';
import * as constants from '../../constants/constants'
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import OuterTableHeader from "../../conponents/SizeColorTable/OuterTableHeader/OuterTableHeader";
import OuterTableBody from "../../conponents/SizeColorTable/OuterTableBody/OuterTableBody";
import './TableView.css'

const TableView = () => {


    /* states */
    const [activeSizes, setActiveSizes] = useState([]);
    const [activeColors, setActiveColors] = useState([]);
    const [quantities, setQuantities] = useState([]);
    const availableColors = constants.colors.filter(n => !activeColors.includes(n));
    const availableSizes = constants.sizes.filter(n => !activeSizes.includes(n));


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
        else alert('all sizes is already exist')
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
                        <OuterTableHeader
                            activeSizes = {activeSizes}
                            availableSizes = {availableSizes}
                            deleteSize = {deleteSize}
                            changeSize = {changeSize}
                        />
                        <OuterTableBody
                            quantities = {quantities}
                            activeSizes = {activeSizes}
                            activeColors = {activeColors}
                            deleteColor = {deleteColor}
                            changeColor = {changeColor}
                            availableColors = {activeColors}
                            changeQuantity = {changeQuantity}
                        />
                    </Table>
                </div>
                <Button style={{margin: '30px'}} variant="contained" color="primary" onClick={printResults}>Save & Print</Button>
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