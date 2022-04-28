import { Link } from 'react-router-dom'

import img from './error.gif'
const Page404 = () => {
  return (
    <div>
      <img
        style={{
          display: 'block',
          width: '250px',
          height: '250px',
          objectFit: 'contain',
          margin: '0 auto'
        }}
        src={img}
        alt="Error"
      />
      <p
        style={{
          'textAlign': 'center',
          'fontWeight': 'bold',
          'fontSize': '24px'
        }}
      >
        Page doesn&apos;t exist
      </p>
      <Link
        style={{
          'display': 'block',
          'textAlign': 'center',
          'fontWeight': 'bold',
          'fontSize': '24px',
          'marginTop': '30px'
        }}
        to="/articles"
      >
        Back to main page
      </Link>
    </div>
  )
}

export default Page404