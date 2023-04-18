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
                            {props.CurrencySymbol && props.CurrencySymbol.map((currency, index) => (

                                < input
                                    type="text"
                                    name="currencyName"
                                    value={currency.currencyName}
                                    className='textBold'
                                    onChange={(e) => {
                                    props.handleCurrencySymbolChange(e, currency.curID)
                                    }
                                    }
                                />

                            ))

                            }
                        </th>
                        <th>Line total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {props.items && props.items.map((item, index) => (
                        <tr key={item.taxID}>
                            <td className='number'>{index + 1}</td>
                            <td>
                                <input
                                    type="text"
                                    name="itemDescription"
                                    value={item.description}
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
                                {props.CurrencySymbol[0].currencySymbol} {item.lineTotal}
                            </td>
                            <td>
                                <button className="remove" onClick={() => props.modifyItem(item.itemID)}>❌</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table><br />

            <button className="addNewItem" onClick={() => props.modifyItem()}>+ Add Line Item</button>
            <div className="subtotal">
                <div className="subtotalLeft subTotalName" contentEditable="true" ref={(text) => props.contentEditableRef.current.push(text)}>Sub Total </div>
                <span className='subtotalValue'><b>{props.CurrencySymbol[0].currencySymbol} {props.subTotal} </b></span>
            </div>

            <table>

                {props.taxes && props.taxes.map((tax) => (
                    <tr>
                        <td><input contentEditable="true" name="taxName" onChange={(e) => props.handleTaxChange(e, tax.taxID)} value={tax.taxName} className='textBold' /></td>
                        <td><input contentEditable="true" name="taxPercentage" onChange={(e) => props.handleTaxChange(e, tax.taxID)} value={tax.taxPercentage} className=' taxPosition textBold' /> <span className='percentagePosition'><b>%</b></span></td>
                        <td name="taxAmount" className='textRight textBold'>{props.CurrencySymbol[0].currencySymbol} {tax.taxAmount}</td>
                        <td>
                            <button className="remove" onClick={() => props.modifyTax(tax.taxID)}>❌</button>
                        </td>
                    </tr>
                ))}
                <tr><button className="addNewItem" onClick={() => props.modifyTax()}>+ Add tax</button></tr><br />
                <tr>
                    <td contentEditable="true" className='totalWithTaxName' ref={(text) => props.contentEditableRef.current.push(text)}><b>Total</b></td>
                    <td></td>
                    <td className='textRight'><b>{props.CurrencySymbol[0].currencySymbol} {props.totalWithTax}</b></td>
                </tr>
            </table>
        </div>
    );

}

export default Table;