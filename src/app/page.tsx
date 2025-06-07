'use client'
import { useEffect, useState } from 'react';

export default function Home() {
  const [rates, setRates] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/latest-rates') // Update this if needed
      .then((res) => res.json())
      .then((data) => {
        setRates(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch failed:', err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4">Naira Exchange Rates</h1>
      {loading && <p>Loading...</p>}
      {!loading && rates && (
        <table className="border border-gray-300">
          <thead>
            <tr>
              <th className="border p-2">Currency</th>
              <th className="border p-2">Buy Rate</th>
              <th className="border p-2">Sell Rate</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(rates).map(([pair, value]: any) => (
              <tr key={pair}>
                <td className="border p-2">{pair.replace('_NGN', '')}</td>
                <td className="border p-2">{value.buy}</td>
                <td className="border p-2">{value.sell}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
