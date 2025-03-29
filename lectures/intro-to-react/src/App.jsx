import React from "react";
import { Welcome } from "./Welcome";
import "./App.css";

 export default function App() {

     return (
         <>
             <header>
                 <h1>My First App</h1>
             </header>
             <main>
                  <Welcome 
                  name= "Sarha"
                  imgUrl="http://picsum.photos/200?a=1"/>
                  <Welcome name= "Jahfari"
                  imgUrl="http://picsum.photos/200?a=2"/>
                  <Welcome name= "Seamus"
                  imgUrl="http://picsum.photos/200?a=3"/>
                  <Welcome name= "Mira"
                  imgUrl="http://picsum.photos/200?a=4"/>
             </main>
         </>
     );
 }