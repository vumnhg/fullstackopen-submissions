const Filter = ({ value, onChange }) => {
  return (
    <>
      filter shown with{" "}
      <input value={value} onChange={(e) => onChange(e.target.value)} />
    </>
  );
};

export default Filter;
