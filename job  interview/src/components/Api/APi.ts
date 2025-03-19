import axios from "axios";

const api_key = "22a35b58e147474:i9wscxqywp6qcgr"; 
const authHeader = `Basic ${btoa(api_key)}`;

// Function to fetch GDP for both countries at once
export const fetchIndicatorsForCountries = async (country1: string, country2: string) => {
    const url = `https://api.tradingeconomics.com/forecast/country/${country1},${country2}/indicator/gdp?c=${api_key}`;

    try {
        const response = await axios.get(url, { headers: { Authorization: authHeader } });
        return response.data as any[];
    } catch (error) {
        console.error("❌ Error fetching data:", error);
        return null;
    }
};

