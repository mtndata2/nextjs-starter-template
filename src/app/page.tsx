'use client'

import { useEffect, useState } from 'react'

type Rate = {
  buy: number
  sell: number
}

export default function HomePage() {
  const [rates, setRates] = useState<Record<string, Rate> | null>(null)
  const [loading, setLoading] = useState(true)

  fetch('https://apli-apl-6795.mtndatasales.workers.dev/api/latest-rates')
  .then(res => res.json() as Promise<Record<string, Rate>>)
  .then(data => {
    setRates(data)
    setLoading(false)
  })

      .catch(err => {
        console.error('Error fetching rates:', err)
        setLoading(false)
      })
  }, [])

  return (
    <main className="min-h-screen p-6 bg-white text-gray-900 font-sans">
      <h1 className="text-3xl font-bold mb-4">Naira Black Market Exchange Rates</h1>

      {loading ? (
        <p className="text-gray-600">Loading latest rates...</p>
      ) : rates ? (
        <table className="border border-gray-300 w-full max-w-lg text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Currency</th>
              <th className="border px-4 py-2">Buy Rate</th>
              <th className="border px-4 py-2">Sell Rate</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(rates).map(([pair, value]) => (
              <tr key={pair}>
                <td className="border px-4 py-2">{pair.replace('_NGN', '')}</td>
                <td className="border px-4 py-2">{value.buy}</td>
                <td className="border px-4 py-2">{value.sell}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-red-500">Failed to load rates.</p>
      )}
    </main>
  )
}
