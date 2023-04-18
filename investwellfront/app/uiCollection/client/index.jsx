import React, { useEffect, useState, useRef } from 'react'
import { v4 as uuid } from 'uuid';
import Table from './tableInvoice.jsx';

export default function Index() {

    const contentEditableRef = useRef([]);

    const [items, setItems] = useState([{
        itemID: uuid(),
        description: "item",
        quantity: 1,
        unitPrice: 100,
        lineTotal: 100
    }]);

    const [taxes, setTaxes] = useState([{
        taxID: uuid(),
        taxName: 'Tax Name',
        taxPercentage: 20,
        taxAmount: 20
    }])

    const [subTotal, setsubTotal] = useState(100)
    const [totalWithTax, setTotalWithTax] = useState(120)
    const [price, setPrice] = useState({
        unitPriceName: 'Unit price (₹)',
        currencySymbol: '₹'
    })
    useEffect(() => {
        const newSubTotal = items.reduce((accumulator, item) => accumulator + item.lineTotal, 0)
        setsubTotal(newSubTotal);
        setTaxes(taxes.map((tax) => {
            const newTaxAmount = Math.round((tax.taxPercentage * newSubTotal) / 100)
            return { ...tax, taxAmount: newTaxAmount }
        }))
    }, [items])


    useEffect(() => {
        const newTotalWithTax = taxes.reduce((accumulator, tax) => accumulator + tax.taxAmount, 0)
        setTotalWithTax(newTotalWithTax + subTotal);
    }, [items, taxes])


    const addItem = () => {
        setItems((prev) => {
            return [...prev, {
                itemID: uuid(),
                description: "item",
                quantity: 1,
                unitPrice: 100,
                lineTotal: 100
            }]
        })
    }

    const handleItemChange = (e, changeItemID) => {
        const fieldName = e.target.name;
        const value = e.target.value;
        setItems(
            items.map((item) => {
                if (item.itemID == changeItemID) {
                    if (fieldName == 'quantity' || fieldName == 'unitPrice') {
                        const otherFieldName = fieldName == 'quantity' ? 'unitPrice' : 'quantity';
                        const newLineTotal = value * item[otherFieldName];
                        return { ...item, ['lineTotal']: newLineTotal, [fieldName]: value };

                    } else {
                        return { ...item, [fieldName]: value };
                    }
                }
                return item;
            })
        );
    }

    const deleteItem = (delItemID) => {
        setItems(items.filter(item => item.itemID != delItemID))
    }

    const addTax = () => {
        const newTaxAmount = Math.round(subTotal * 0.2)
        setTaxes((prev) => {
            return [...prev, {
                taxID: uuid(),
                taxName: 'Tax Name',
                taxPercentage: 20,
                taxAmount: newTaxAmount
            }]
        })
    }

    const deleteTax = (delTaxID) => {
        setTaxes(taxes.filter(tax => tax.taxID != delTaxID))
    }

    const handleTaxChange = (e, changeTaxID) => {
        const fieldName = e.target.name;
        const value = e.target.value
        setTaxes(
            taxes.map((tax) => {
                if (tax.taxID == changeTaxID) {
                    if (fieldName == "taxPercentage") {

                        const newTaxAmount = Math.round(value * subTotal / 100);
                        return { ...tax, taxAmount: newTaxAmount, [fieldName]: value };

                    } else {
                        return { ...tax, [fieldName]: value };
                    }
                }
                return tax;
            })
        );
    }

    const handleCurrencySymbolChange = (e) => {
        const value = e.target.value

        const openingBracket = value.indexOf('(');
        const closingBracket = value.indexOf(')');
        if(openingBracket==-1 || closingBracket==-1){
            setPrice({
                unitPriceName: value,
                currencySymbol: ''
            })
        }else{
            const currSymbol = value.substr(openingBracket + 1, closingBracket - openingBracket - 1);
            setPrice({
                unitPriceName: value,
                currencySymbol: currSymbol
            })
        }
    }

    const downloadPdf = async () => {
        const data = {
            "advisoryCompanyName": contentEditableRef.current[0].innerText,
            "invoiceHeading": contentEditableRef.current[1].innerText,
            "address": contentEditableRef.current[2].innerText,
            "contactNo": contentEditableRef.current[6].innerText,
            "email": contentEditableRef.current[7].innerText,
            "date": contentEditableRef.current[3].innerText,
            "invoiceID": contentEditableRef.current[4].innerText,
            "poNumber": contentEditableRef.current[5].innerText,
            "clientName": contentEditableRef.current[8].innerText,
            "clientCompanyName": contentEditableRef.current[9].innerText,
            "userMessage": contentEditableRef.current[10].innerText,
            "unitPriceName":price.unitPriceName,
            "currencySymbol":price.currencySymbol,
            "items": items,
            "taxes": taxes,
            "subTotalName": contentEditableRef.current[11].innerText,
            "subTotal": subTotal,
            "totalWithTaxName": contentEditableRef.current[12].innerText,
            "totalWithTax": totalWithTax,
            "conclusionMessage": contentEditableRef.current[13].innerText,
        }
        console.log(data)
        const temp = JSON.stringify(data)
        window.open(`http://localhost:5000/downloadInvoice?data=${temp}`)
    }
    return (
        <div className='main-div'>
            <h2 contentEditable="true">Advisory Invoice Generator</h2>
            <div className="main-div-header">
                <div className="leftSideBox">
                    <div className="advisoryContentSection">
                        <div className="advisoryContentHeader">
                            <div className="invoiceEditableContent1 companyName" contentEditable="true" ref={(text) => contentEditableRef.current.push(text)}>Advisory Company Name</div>
                            <div className="invoiceEditableContent2 textRight" contentEditable="true" ref={(text) => contentEditableRef.current.push(text)}>Invoice</div>
                        </div>
                        <div className="invoiceEditableItem">

                            <div className="address" ref={(text) => contentEditableRef.current.push(text)}>
                                <div contentEditable="true">123 your street</div>
                                <div contentEditable="true">Your town</div>
                                <div contentEditable="true">Address Line 3</div>
                            </div>

                            <div className='clientInvoiceDetails textRight'>
                                <div contentEditable="true" ref={(text) => contentEditableRef.current.push(text)}>06 April 2023</div>
                                <div contentEditable="true" ref={(text) => contentEditableRef.current.push(text)}>Invoice 2334889</div>
                                <div contentEditable="true" ref={(text) => contentEditableRef.current.push(text)}>PO 456001200</div>
                            </div>
                        </div>

                        <div className="personalInfo">
                            <div className="personalInfoLeftBox">
                                <div contentEditable="true" ref={(text) => contentEditableRef.current.push(text)}>(123)456789</div>
                                <div contentEditable="true" ref={(text) => contentEditableRef.current.push(text)}>email@yourcompany.com</div>
                            </div>

                            <div className="personalInfoRightBox textRight">
                                <div contentEditable="true" ref={(text) => contentEditableRef.current.push(text)}>Att. Ms. Jane Doe</div>
                                <div contentEditable="true" ref={(text) => contentEditableRef.current.push(text)}>Client Company Name</div>
                            </div>
                        </div>

                    </div>
                    <hr />
                    <br />
                    <div className="invoiceMessage" contentEditable="true" ref={(text) => contentEditableRef.current.push(text)}>
                        <span >Dear Ms. Jane Doe</span> <br /> <br />
                        <span>Please find below a cost breakdown for the recent work completed . Please make payment
                            convininence, and do not hesitate to contact me with any questions.
                        </span>
                        <br /><br />
                        <span>Many Thanks</span> <br />
                        <span>Mayank Saraswat/Nazir Ansari</span>

                    </div>
                    <br />
                    <br />

                    <Table key="child1" items={items}
                        taxes={taxes} addItem={addItem}
                        handleItemChange={handleItemChange}
                        deleteItem={deleteItem}
                        addTax={addTax}
                        deleteTax={deleteTax}
                        handleTaxChange={handleTaxChange}
                        subTotal={subTotal}
                        totalWithTax={totalWithTax}
                        price={price}
                        handleCurrencySymbolChange={handleCurrencySymbolChange}
                        contentEditableRef={contentEditableRef}
                    />
                    <div className="greetings" contentEditable="true" ref={(text) => contentEditableRef.current.push(text)}>
                        <span>Many thanks! I look forward to doing business with you again in due course. </span>
                        <br /><span></span>
                        <br />
                        <span> Payment terms: to be received within 60 days.</span><br /></div>

                </div>

                <div className="rightSideBox">
                    <button className='rightBoxDownloadBtn' onClick={() => downloadPdf()}>Download this invoice</button>
                </div>
            </div>
        </div>
    )
}
