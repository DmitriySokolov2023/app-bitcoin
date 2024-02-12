import {createContext, useContext, useEffect, useState} from "react";
import {fakeAssets, fakeFetchCrypto} from "../api.js";
import {percentDifference} from "../utils.js";

const CryptoContext = createContext({
    assets:[],
    crypto:[],
    loading:false,
})

export function CryptoContextProvider({children}){

    const [loading, setLoading] = useState(false)
    const [crypto, setCrypto] = useState([])
    const [assets, setAssets] = useState([])
    function addAssets(newAssets){
        setAssets(prev => setAssets([...prev, newAssets]))
    }

    const mapAssets = (asset, result) =>{
        const coin = result.find(c => c.id === asset.id)
        return {
            grow: asset.price < coin.price,
            growPercent: percentDifference(asset.price, coin.price),
            totalAmount: asset.amount * coin.price,
            totalProfit: (asset.amount * coin.price - asset.amount * asset.price).toFixed(2),
            ...asset
        }
    }

    function mapAssets(assetsData, result){
        return assetsData.map((asset)=>{
            const coin = result.find(c => c.id === asset.id)
            return {
                grow: asset.price < coin.price,
                growPercent: percentDifference(asset.price, coin.price),
                totalAmount: asset.amount * coin.price,
                totalProfit: (asset.amount * coin.price - asset.amount * asset.price).toFixed(2),
                ...asset
            }
        })
    }


    useEffect(() => {
        async function preload() {
            setLoading(true)
            const {result} = await fakeFetchCrypto()
            const assetsData = await fakeAssets()
<<<<<<< HEAD
            setAssets(mapAssets(assetsData, result))
=======
            setAssets(assetsData.map(mapAssets(assets, result)))
>>>>>>> 43574e761361790ee6bfc0b8045d5a542f950c56
            setCrypto(result)
            setLoading(false)
        }

        preload()



    }, []);

<<<<<<< HEAD
    const addAsset = (newAsset) =>{
        setAssets((prev)=> mapAssets([...prev, newAsset], crypto))
    }

    return <CryptoContext.Provider value={{loading, crypto, assets, addAsset}}>{children}</CryptoContext.Provider>
=======
    return <CryptoContext.Provider value={{loading, crypto, assets, addAssets}}>{children}</CryptoContext.Provider>
>>>>>>> 43574e761361790ee6bfc0b8045d5a542f950c56
}



export default CryptoContext

export function useCrypto(){
    return useContext(CryptoContext)
}