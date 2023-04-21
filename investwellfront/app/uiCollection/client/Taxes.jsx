import React from "react";
const Taxes = (props) => {
    return (
        <table className="taxTable">
        <tbody className="highlight">
            {props.taxes && props.taxes.map((tax) => (
                <tr>
                    <td><input className="inputBox highlight" contentEditable="true" name="taxName" onChange={(event) => props.modifyTaxes("changeTax", event, tax.taxID)} value={tax.taxName}/></td>
                    <td className="alignCenter">
                        <input className="inputBox highlight taxPercentage" contentEditable="true" name="taxPercentage" onChange={(event) => props.modifyTaxes("changeTax", event, tax.taxID)} value={tax.taxPercentage}/>
                        <span>%</span>
                    </td>
                    <td className="highlight alignRight" name="taxAmount">{
                        props.price.currencySymbol} {tax.taxAmount}
                        <button className="btn remove" onClick={(event) => props.modifyTaxes("deleteTax", event, tax.taxID)}>&#x2715;</button>
                    </td>      
                </tr>
            ))}
        </tbody>
        <tfoot className="taxesTotal highlight">
            <tr>
                <td colSpan="3">
                    <button className="btn addNewEntity" onClick={() => props.modifyTaxes("addTax")}>+ Add tax</button>
                </td>   
             </tr>
            <tr>
                <td className="alignLeft" colspan="2" contentEditable="true" ref={(text) => props.contentEditableRef.current.push(text)}><b>Total</b></td>
                <td className="alignRight"><b>{props.price.currencySymbol} {props.totalWithTax}</b></td>
            </tr>
        </tfoot>
    </table>
    )
}
export default Taxes;