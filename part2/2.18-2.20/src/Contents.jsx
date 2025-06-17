const Contents = ({ countries, onClick }) => {
  if (countries.length === 0) null;
  return (
    <div>
      {countries.map((country) => {
        const ccn3 = country.name.ccn3;
        const name = country.name.common;
        return (
          <div key={`${ccn3}-${name}`}>
            {country.name.common}{" "}
            <button onClick={() => onClick({ ccn3, name })}>Show</button>
          </div>
        );
      })}
    </div>
  );
};

export default Contents;
