"use client";
import React, { useEffect, useState } from "react";

interface IPOData {
  company: string;
  link: string;
  dates: string;
  board: string;
  issue_size: string;
  price_band: string;
}

const IPOList: React.FC = () => {
  const [ipos, setIpos] = useState<IPOData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://ipo-tech.onrender.com/api/ipos")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch IPO data");
        return res.json();
      })
      .then((data) => {
        setIpos(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center" style={{color : "rgb(21,39,51)"}}>Loading IPOs...</p>;
  
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  return (
    <div className="p-6" style={{background : "rgb(21,39,51)"}} >
      <h1 className="text-2xl font-bold mb-4 text-center" style={{color:"#EECC50"}}>Upcoming IPOs</h1>

      <div className="overflow-x-auto" style={{background : "rgb(21,39,51)"}}>
        <table className="min-w-full border border-gray-300 shadow-md rounded-lg" >
          <thead className="bg-blue-500 text-white" style={{background : "rgb(21,39,51)"}}>
            <tr>
              <th className="px-4 py-2">Company</th>
              <th className="px-4 py-2">Dates</th>
              <th className="px-4 py-2">Board</th>
              <th className="px-4 py-2">Issue Size</th>
              <th className="px-4 py-2">Price Band</th>
            </tr>
          </thead>
          <tbody>
            {ipos.map((ipo, index) => (
              <tr
                key={index}
                className="border-t hover:bg-blue-50 transition-colors" 
              >
                <td className="px-4 py-2 font-medium text-blue-600">
                  <a
                    //href={ipo.link}
                    target="_blank"
                    rel="noopener noreferrer"
                     style={{color:"#EECC50"}}
                  >
                    {ipo.company}
                  </a>
                </td>
                <td className="px-4 py-2">{ipo.dates}</td>
                <td className="px-4 py-2">{ipo.board}</td>
                <td className="px-4 py-2">{ipo.issue_size}</td>
                <td className="px-4 py-2">{ipo.price_band}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IPOList;
