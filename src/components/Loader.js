function Loader({ error }) {
  return (
    <div className="loader">
      {error ? (
        <p>{error}</p>
      ) : (
        <div>
          <span className="loader__circle"></span>
          <span className="loader__circle"></span>
          <span className="loader__circle"></span>
          <span className="loader__circle"></span>
          <span className="loader__circle"></span>
          <span className="loader__circle"></span>
          <span className="loader__circle"></span>
        </div>
      )}
    </div>
  );
}

export default Loader;
