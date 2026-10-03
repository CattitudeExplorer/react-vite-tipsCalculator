import { useState } from "react";

import './App.css';

export default function App() {

  const [bill, setBill] = useState('');                  // valoarea curenta a facturii, prin setBill modificam bill-ul
  const [tipPercentage, setTipPercentage] = useState(15);   // procentul bacsisului, val initiala e 15; setTipPercentage modifica tipPercentage
  const [customTip, setCustomTip] = useState('');        // bacsis costumizabil, se pastreaza un bacsis introdus manual d euser
  const [people, setPeople] = useState(1);               // numarul de oameni, setPeople, functie care modifica nr de oameni ce merg la restaurant

  // nu modificam direct variabila de stare, ci se modifica doar cu setteri

  // determinam procentul activ
  const activeTip = customTip != '' ? Number(customTip) : Number(tipPercentage);
  const numBill = Number(bill) || 0;
  const numPeople = Number(people) > 0 ? Number(people) : 1;
  
  // Calcule derivate 
  const tipAmountTotal = (numBill * activeTip) / 100;

  const tipPerPerson = tipAmountTotal / numPeople;

  const totalPerPerson = (numBill + tipAmountTotal) / numPeople;

  
  //handle pt butoane

  const handlePresetTip = (value) => {
    setTipPercentage(value);
    setCustomTip(""); 
  }

  const handleCustomTipChange = (e) => {
    setCustomTip( e.target.value ); 
  }

  const handleReset = () => {
    setBill('');
    setTipPercentage(15);
    setCustomTip('');
    setPeople(1);
  }


  // UI
  
  //<input id = "bill" type = "number" value = {bill} onChange={(e) => setBill(e.target.value)}></input>      
  // onChange e ca sa fie schimbabil inputul, iar e.target.value ia valoarea data de utilizator
  return(

       	        <div className="container">
       	             <header class="header">
       	                  <h1>SPLI<span>TTER</span></h1>
       	             </header>

                     <div className="card">

                         <div className="form-section">

                             {/*comentarii.....nota de plata.....*/ }
                            <div class="input-group">
                                      <label htmlFor="bill">Nota de plata</label>
                                      <div className="input-wrapper">
                                              <span className="icon">$</span>
                                              <input
                                                    id="bill"
                                                    type="number"
                                                    value={bill}
                                                    onChange = {(e) => setBill(e.target.value)}
                                              />
                                      </div>         
                             </div>                                     
                           
                             {/*comentarii.....pentru tip.....*/ }
                             <div className="input-group">   

                                   <label>Selecteaza bacsisul %</label> 
                                   <div className="tip-grid">
                                   {[5,10,15,25,50].map((rate) => (                                    
                                     <button
                                     key={rate}
                                     type="button"
                                     className = {`tip-btn ${activeTip === rate && customTip == '' ? 'active': ''}`}
                                     onClick= { () => handlePresetTip(rate) }
                                     >      
                                     {rate}%
                                     </button>
                                   ))}

                                   <input 
                                   type="number"
                                   placeholder = "altul"
                                   className = "custom-tip-input"
                                   onChange= {handleCustomTipChange}
                                   min="0"
                                   />                                   
                              </div>

                              </div>

                             {/*Input pentru numar de persoane*/}

                              <div className="input-group">

                                                  <div className="label-wrapper">
                                                           <label htmlFor="people">Numarul de persoane</label>

                                                            {Number(people) <= 0 && <span className="error-msg">Nu poate fi zero</span>} 

                                                  </div>

                                                  <div className={`input-wrapper ${Number(people) <= 0 ? 'input-error': ''}`}>
                                                           <span className="icon">👤</span>

                                                           <input
                                                             id="people"
                                                             type="number"
                                                             placeholder="1"
                                                             value={people}
                                                             onChange = {(e) => setPeople(e.target.value)}
                                                           />

                                                  </div>
                                  </div>
                                                         
                        </div>    


                        {/*Sectiunea rezultate afisare in dreapta*/}  
                        <div className="result-section">

                                   <div className="result-rows">

                                        <div className="result-row">

                                            <div className="result-label">
                                                     <p className="title">Tip</p>
                                                     <p className="subtitle"> / persoana </p>
                                            </div>           
                                            <div className="amount">${tipPerPerson.toFixed(2)}</div>   {/*toFixed(2) inseamna ca o sa afiseze cu 2 zecimale*/}
                                        </div>   

                                        <div className="result-row">
                                          <div className="result-label">
                                              <p className="title">Total</p>
                                              <p className="subtitle"> / persoana </p>
                                          </div> 
                                          <div className="amount">${totalPerPerson.toFixed(2)}</div>   {/*toFixed(2) inseamna ca o sa afiseze cu 2 zecimale*/}
                                        </div>

                                   </div> 

                                   <button 
                                    className="reset-btn"
                                    onClick={handleReset}
                                    disabled = {!bill && people == 1 && customTip === '' && tipPercentage === 15}
                                   >Reset</button>


                        </div>


                     </div> 

       	        </div>     

    	);


}