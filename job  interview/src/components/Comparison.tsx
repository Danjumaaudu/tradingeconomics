import React, {useState} from "react";
import { fetchIndicatorsForCountries } from "./Api/APi";
import { Chart, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";

Chart.register(...registerables);

const CompareCountryGDP: React.FC = () => {
    const [country1, setCountry1] = useState("");
    const [country2, setCountry2] = useState("");
    const [gdpData, setGdpData] = useState<{ labels: string[], values: number[] } | null>(null);
    const [loading, setLoading] = useState(false);
      
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        const countryData = await fetchIndicatorsForCountries(country1, country2);


    if (countryData) {
    // Extract GDP for each country
    const country1GDP = countryData.find((d: any) => d.Country === country1 && d.Category === "GDP");
    const country2GDP = countryData.find((d: any) => d.Country === country2 && d.Category === "GDP");

    setGdpData({
        labels: [country1, country2],
        values: [country1GDP?.LatestValue||0, country2GDP?.LatestValue||0],
    }); 
    }

    setLoading(false);
};  

 return (
    <div className="main-content">
    <div className="GDP-comp">
        <h2> Please Insert countries to check its Gross Domestic Product</h2>
        <form className="gdp-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="form-label">Country 1: </label>
                <input className="form-input" placeholder= "Mexico" type="text" value={country1} onChange={(e) => setCountry1(e.target.value)} required />
            </div>
            <div className="form-group">
                <label className="form-label">Country 2: </label>
                <input className="form-input" placeholder= "Thailand" type="text" value={country2} onChange={(e) => setCountry2(e.target.value)} required />
            </div>
            <div className="form-group">
                <button className="submit-button" type="submit">Compare GDP</button>
            </div>
        </form>
    </div>
        {loading && <p>Loading...</p>}

        {gdpData && (
            <div className="chart-container">
            <Bar
              data={{
                labels: gdpData.labels,
                datasets: [{
                  label: "GDP (USD Billion)",
                  data: gdpData.values,
                  backgroundColor: ["#0052ff", "#ff3030"],
                  borderColor: ["#0046db", "#db2020"],
                  borderWidth: 1,
                  barThickness: 60,
                  maxBarThickness: 80,
                }]
              }}
              options={{ 
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: '#e0e0e0'
                    },
                    ticks: {
                      font: {
                        size: 26
                      }
                    }
                  },
                  x: {
                    grid: {
                      display: false
                    },
                    ticks: {
                      font: {
                        size: 26
                      }
                    }
                  }
                },
                plugins: {
                  legend: {
                    position: 'top',
                    labels: {
                      boxWidth: 15,
                      padding: 15,
                      font: {
                        size: 12
                      }
                    }
                  }
                }
              }}
              height={300}
            />
          </div>
        )}
    </div>
);
};

// Call the function with two countries
 export default CompareCountryGDP;