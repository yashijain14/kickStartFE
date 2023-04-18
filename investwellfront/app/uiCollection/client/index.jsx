import React, { useEffect, useState, useRef } from 'react'
import { v4 as uuid } from 'uuid';
import Table from './tableInvoice.jsx';
import axios from 'axios';

export default function Index() {

    const contentEditableRef = useRef([]);

    const [items, setItems] = useState([{
        itemID: uuid(),
        itemDescription: "item",
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
    const [CurrencySymbol, setCurrencySymbol] = useState([{
        curID: uuid(),
        currencyName: 'Unit price (₹)',
        currencySymbol: '₹'
    }])

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


    const modifyItem = (delItemID = null) => {
        if (delItemID) {
            setItems(items.filter(item => item.itemID != delItemID))
        }
        else {
            setItems((prev) => {
                return [...prev, {
                    itemID: uuid(),
                    itemDescription: "item",
                    quantity: 1,
                    unitPrice: 100,
                    lineTotal: 100
                }]
            })
        }
    }

    const handleItemChange = (e, changeItemID) => {
        const fieldName = e.target.name;
        const value = e.target.value;
        setItems(
           items.map && items.map((item) => {
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

    const modifyTax = (delTaxID = null) => {
        const newTaxAmount = Math.round(subTotal * 0.2);
        if (delTaxID) {
            setTaxes(taxes.filter(tax => tax.taxID !== delTaxID));
        } else {
            setTaxes(prev => [...prev, {
                taxID: uuid(),
                taxName: 'Tax Name',
                taxPercentage: 20,
                taxAmount: newTaxAmount
            }]);
        }
    };

    const handleTaxChange = (e, changeTaxID) => {
        const fieldName = e.target.name;
        const value = e.target.value
        setTaxes(
           taxes.map && taxes.map((tax) => {
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

    const handleCurrencySymbolChange = (e, changeCurrecySymbolID) => {


        const fieldName = e.target.name;
        const value = e.target.value

        const openingBracket = value.indexOf('(');
        const closingBracket = value.indexOf(')');
        const currSymbol = value.substr(openingBracket + 1, closingBracket - openingBracket - 1);


        setCurrencySymbol(
            CurrencySymbol.map && CurrencySymbol.map((currency) => {
                if (currency.curID == changeCurrecySymbolID) {
                    if (fieldName == "currencyName") {
                        if (openingBracket !== -1 && closingBracket !== -1) {
                            return { ...currency, currencySymbol: currSymbol, [fieldName]: value };
                        }
                        else {
                            return { ...currency, currencySymbol: '', [fieldName]: value };
                        }
                    }
                }
                else {
                    return { ...currency, currencySymbol: '', [fieldName]: value };
                }
                return CurrencySymbol;
            })
        );

    }

    const downloadPdf = async () => {
        const data = {
            "advisoryCompanyName": contentEditableRef.current[0].innerText,
            "invoice Heading": contentEditableRef.current[1].innerText,
            "address": contentEditableRef.current[2].innerText,
            "contactNo": contentEditableRef.current[6].innerText,
            "email": contentEditableRef.current[7].innerText,
            "date": contentEditableRef.current[3].innerText,
            "invoiceID": contentEditableRef.current[4].innerText,
            "poNumber": contentEditableRef.current[5].innerText,
            "clientName": contentEditableRef.current[8].innerText,
            "clientCompanyName": contentEditableRef.current[9].innerText,
            "userMessage": contentEditableRef.current[10].innerText,
            "unitPriceName": CurrencySymbol[0].currencyName,
            "currencySymbol": CurrencySymbol[0].currencySymbol,
            "items": items,
            "tax": taxes,
            "subTotalName": contentEditableRef.current[11].innerText,
            "subTotal": subTotal,
            "totalWithTaxName": contentEditableRef.current[12].innerText,
            "totalWithTax": totalWithTax,
            "conclusionMessage": contentEditableRef.current[13].innerText,

        }
        await axios
            .post("/insertData", { data })
            .then((response) => {
                console.log(response)
            })
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
                                <div contentEditable="true" ref={(text) => contentEditableRef.current.push(text)}>Invoice #2334889</div>
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

                    <Table key="child1"
                        items={items}
                        taxes={taxes} 
                        modifyItem={modifyItem}
                        handleItemChange={handleItemChange}
                        modifyTax={modifyTax}
                        handleTaxChange={handleTaxChange}
                        subTotal={subTotal}
                        totalWithTax={totalWithTax}
                        CurrencySymbol={CurrencySymbol}
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
