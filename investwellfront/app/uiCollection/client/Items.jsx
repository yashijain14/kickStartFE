import React from "react";
const Items = (props) => {
    return (
    <table class="itemTable w-100">
        <thead class="highlight">
            <tr>
                <th className="alignLeft">#</th>
                <th className="alignCenter">Item Description</th>
                <th className="alignCenter">Quantity</th>
                <th className="alignCenter">
                    <input
                        className="priceInput alignCenter"
                        type="text"
                        name="currencyName"
                        value={props.price.unitPriceName}
                        onChange={(event) => {props.handlePriceChange(event)}}
                    /> 
                </th>
                <th colspan="2" className="alignRight">Line Total</th>
            </tr>
        </thead>
        <tbody>
            {props.items && props.items.map((item, index) => (
                <tr key={item.taxID}>
                    <td className="alignLeft">{index + 1}</td>
                    <td>
                        <input
                            className="alignCenter"
                            type="text"
                            name="description"
                            value={item.description}
                            onChange={(event) => {props.modifyItems("changeItem", event, item.itemID)}}
                        />
                    </td>
                    <td>
                        <input
                            className="alignCenter"
                            type="number"
                            name="quantity"
                            value={item.quantity}
                            onChange={(event) => {props.modifyItems("changeItem", event, item.itemID)}}
                        />
                    </td>
                    <td>
                        <input
                            className="alignCenter"
                            type="number"
                            name="unitPrice"
                            value={item.unitPrice}
                            onChange={(event) => {props.modifyItems("changeItem", event, item.itemID)}}
                        />
                    </td>
                    <td className="alignRight lineTotal" type="number" name="lineTotal">
                        {props.price.currencySymbol} {item.lineTotal}  
                    </td>
                    <td><button className="remove" onClick={(event) => props.modifyItems("deleteItem", event, item.itemID)}>&#x2715;</button></td>
                </tr>
            ))}
        </tbody>

        <tfoot className="itemsTotal highlight">
            <tr>
                <td colspan="6">
                    <button className="addNewEntity" onClick={() => props.modifyItems("addItem")}>+ Add Item</button>
                </td>
            </tr>
        <tr>
            <td contentEditable="true" colspan="4" ref={(text) => props.contentEditableRef.current.push(text)}><b>Sub Total</b></td>
            <td className="alignRight" colspan="2"><b>{props.price.currencySymbol} {props.subTotal}</b></td>
        </tr>
        </tfoot>
    </table>
    )
}

export default Items;