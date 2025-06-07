import type { GetServerSideProps } from 'next'

type Rate = {
  buy: number
  sell: number
}

type Props = {
  rates: Record<string, Rate> | null
}

export default function HomePage({ rates }: Props) {
  return (
    <main className="min-h-screen p-6 bg-white text-gray-900 font-sans">
      <h1 className="text-3xl font-bold mb-4">Naira Black Market Exchange Rates</h1>

      {rates ? (
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

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await fetch('https://apli-apl-6795.mtndatasales.workers.dev/api/latest-rates')
    const data = await res.json()
    return {
      props: {
        rates: data,
      },
    }
  } catch (error) {
    console.error('Error fetching rates:', error)
    return {
      props: {
        rates: null,
      },
    }
  }
}
