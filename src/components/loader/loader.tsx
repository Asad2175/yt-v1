export default function Loader({ progress }: { progress: number }) {
  return (
    <div style={styles.contain}>
      <div style={styles.text}>
        {progress >= 95
          ? 'Finalizing your download, please wait...'
          : 'Downloading...'}{' '}
        {progress}%
      </div>
      <div style={styles.barContainer}>
        <div
          style={{
            ...styles.barFill,
            width: `${progress}%`,
          }}
        ></div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  contain: {
    width: '300px',
    textAlign: 'center',
    margin: '40px auto',
  },
  text: {
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  barContainer: {
    width: '100%',
    height: '10px',
    backgroundColor: '#e0e0e0',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #6a11cb, #2575fc)',
    borderRadius: '10px',
    transition: 'width 0.5s ease',
  },
};
