import CircularProgress from '@mui/material/CircularProgress';

function Carregando(props) {
  const indicatorSize = 80;
  return (
    <>
      {
        !props.carregando ? props.children :
          <div style={{ padding: '20px' }}>
            <CircularProgress
              size={indicatorSize}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: `${-indicatorSize / 2}px`,
                marginLeft: `${-indicatorSize / 2}px`
              }}
            />
          </div>
      }
    </>

  )
}

export default Carregando;