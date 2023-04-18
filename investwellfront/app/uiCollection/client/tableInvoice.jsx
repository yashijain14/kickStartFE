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
                                    onChange={(e) => {
                                    props.handleCurrencySymbolChange(e)
                                    }
                                    }
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
                                    onChange={(e) => {
                                    props.handleItemChange(e, item.itemID)
                                    }
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={item.quantity}
                                    onChange={(e) => {
                                    props.handleItemChange(e, item.itemID)
                                    }}
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="unitPrice"
                                    value={item.unitPrice}
                                    onChange={(e) => {
                                    props.handleItemChange(e, item.itemID)
                                    }}

                                />
                            </td>
                            <td type="number" name="lineTotal" onChange={(e) => props.handleItemChange(e, item.itemID)}>
                                {props.price.currencySymbol} {item.lineTotal}
                            </td>
                            <td>
                                <button className="remove" onClick={() => props.deleteItem(item.itemID)}>❌</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table><br />

            <button className="addNewItem" onClick={() => props.addItem()}>+ Add Line Item</button>
            <div className="subtotal">
                <div className="subtotalLeft subTotalName" contentEditable="true" ref={(text) => props.contentEditableRef.current.push(text)}>Sub Total </div>
                <span className='subtotalValue'><b>{props.price.currencySymbol} {props.subTotal} </b></span>
            </div>

            <table>

                {props.taxes.map((tax) => (
                    <tr>
                        <td><input contentEditable="true" name="taxName" onChange={(e) => props.handleTaxChange(e, tax.taxID)} value={tax.taxName} className='textBold' /></td>
                        <td><input contentEditable="true" name="taxPercentage" onChange={(e) => props.handleTaxChange(e, tax.taxID)} value={tax.taxPercentage} className=' taxPosition textBold' /> <span className='percentagePosition'><b>%</b></span></td>
                        <td name="taxAmount" className='textRight textBold'>{props.price.currencySymbol} {tax.taxAmount}</td>
                        <td>
                            <button className="remove" onClick={() => props.deleteTax(tax.taxID)}>❌</button>
                        </td>
                    </tr>
                ))}
                <tr><button className="addNewItem" onClick={() => props.addTax()}>+ Add tax</button></tr><br />
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