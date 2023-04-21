import React from "react";
const Items = (props) => {
    return (
    <table class="itemTable">
        <thead class="highlight">
            <tr>
                <th className="alignLeft">#</th>
                <th className="alignCenter">Item Description</th>
                <th className="alignCenter">Quantity</th>
                <th className="alignCenter">
                    <input
                        className="priceInput alignCenter inputBox"
                        type="text"
                        name="currencyName"
                        value={props.price.unitPriceName}
                        onChange={(event) => {props.handlePriceChange(event)}}
                    /> 
                </th>
                <th className="alignRight">Line Total</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {props.items && props.items.map((item, index) => (
                <tr key={item.taxID}>
                    <td className="alignLef">{index + 1}</td>
                    <td>
                        <input
                            className="inputBox alignCenter"
                            type="text"
                            name="description"
                            value={item.description}
                            onChange={(event) => {props.modifyItems("changeItem", event, item.itemID)}}
                        />
                    </td>
                    <td>
                        <input
                            className="inputBox alignCenter"
                            type="number"
                            name="quantity"
                            value={item.quantity}
                            onChange={(event) => {props.modifyItems("changeItem", event, item.itemID)}}
                        />
                    </td>
                    <td>
                        <input
                            className="inputBox alignCenter"
                            type="number"
                            name="unitPrice"
                            value={item.unitPrice}
                            onChange={(event) => {props.modifyItems("changeItem", event, item.itemID)}}
                        />
                    </td>
                    <td className="alignRight lineTotal" type="number" name="lineTotal">
                        {props.price.currencySymbol} {item.lineTotal}  
                    </td>
                    <td className="alignRight"><button className="btn remove" onClick={(event) => props.modifyItems("deleteItem", event, item.itemID)}>&#x2715;</button></td>
                </tr>
            ))}
        </tbody>

        <tfoot className="itemsTotal highlight">
            <tr>
                <td colspan="6">
                    <button className="btn addNewEntity" onClick={() => props.modifyItems("addItem")}>+ Add Item</button>
                </td>
            </tr>
        <tr>
            <td contentEditable="true" colspan="4" ref={(text) => props.contentEditableRef.current.push(text)}><b>Sub Total</b></td>
            <td className="alignRight" colSpan="2"><b>{props.price.currencySymbol} {props.subTotal}</b></td>
        </tr>
        </tfoot>
    </table>
    )
}

export default Items;