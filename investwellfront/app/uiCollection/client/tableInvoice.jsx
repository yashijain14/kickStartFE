import React from 'react';


function Table(props) {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>
                            <input
                                type="text"
                                name="currencyName"
                                value={props.price.unitPriceName}
                                className='textBold'
                                onChange={(event) => {props.handlePriceChange(event)}}
                            />  
                        </th>
                        <th>Line total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {props.items.map((item, index) => (
                        <tr key={item.taxID}>
                            <td className='number'>{index + 1}</td>
                            <td>
                                <input
                                    type="text"
                                    name="itemDescription"
                                    value={item.itemDescription}
                                    onChange={(event) => {props.modifyItems("changeItem", event, item.itemID)}}
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={item.quantity}
                                    onChange={(event) => {props.modifyItems("changeItem", event, item.itemID)}}
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="unitPrice"
                                    value={item.unitPrice}
                                    onChange={(event) => {props.modifyItems("changeItem", event, item.itemID)}}
                                />
                            </td>
                            <td type="number" name="lineTotal">
                                {props.price.currencySymbol} {item.lineTotal}
                            </td>
                            <td>
                                <button className="remove" onClick={(event) => props.modifyItems("deleteItem", event, item.itemID)}>&#x2715;</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table><br />

            <button className="addNewItem" onClick={() => props.modifyItems("addItem")}>+ Add Line Item</button>
            <div className="subtotal">
                <div className="subtotalLeft subTotalName" contentEditable="true" ref={(text) => props.contentEditableRef.current.push(text)}>Sub Total </div>
                <span className='subtotalValue'><b>{props.price.currencySymbol} {props.subTotal} </b></span>
            </div>

            <table>
                {props.taxes.map((tax) => (
                    <tr>
                        <td><input contentEditable="true" name="taxName" onChange={(event) => props.modifyTaxes("changeTax", event, tax.taxID)} value={tax.taxName} className='textBold' /></td>
                        <td><input contentEditable="true" name="taxPercentage" onChange={(event) => props.modifyTaxes("changeTax", event, tax.taxID)} value={tax.taxPercentage} className=' taxPosition textBold' /> <span className='percentagePosition'><b>%</b></span></td>
                        <td name="taxAmount" className='textRight textBold'>{props.price.currencySymbol} {tax.taxAmount}</td>
                        <td>
                            <button className="remove" onClick={(event) => props.modifyTaxes("deleteTax", event, tax.taxID)}>&#x2715;</button>
                        </td>
                    </tr>
                ))}
                <tr><button className="addNewItem" onClick={() => props.modifyTaxes("addTax")}>+ Add tax</button></tr><br />
                <tr>
                    <td contentEditable="true" className='totalWithTaxName' ref={(text) => props.contentEditableRef.current.push(text)}><b>Total</b></td>
                    <td></td>
                    <td className='textRight'><b>{props.price.currencySymbol} {props.totalWithTax}</b></td>
                </tr>
            </table>
        </div>
    );

}

export default Table;