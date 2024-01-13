import { AtomLoader } from 'react-loaders-kit';

const Loader = () => {
    const loaderProps = {
      loading: true,
      size: 100,
      color: '#5e22f0'
    }

    return (
      <div className="flex-col items-center justify-center min-h-screen mt-64">
        <AtomLoader {...loaderProps} />
        <h1 className="top-96">Fetching Data</h1>
      </div>
    )
}

export default Loader;