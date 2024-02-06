import React from "react";
import {CryptoContextProvider} from "./context/cripto-context.jsx";
import AppLayout from "./components/layout/AppLayout.jsx";


export default function App() {
    return (
        <CryptoContextProvider>
            <AppLayout/>
        </CryptoContextProvider>

    )
}
