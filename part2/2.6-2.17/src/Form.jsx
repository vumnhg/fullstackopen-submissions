const Form = ({ name, num, onNameChange, onNumChange, onSubmit }) => {
  return (
    <form>
      <div>
        name:{" "}
        <input value={name} onChange={(e) => onNameChange(e.target.value)} />
      </div>
      <div>
        number:{" "}
        <input value={num} onChange={(e) => onNumChange(e.target.value)} />
      </div>
      <div>
        <button type="submit" onClick={onSubmit}>
          add
        </button>
      </div>
    </form>
  );
};

export default Form;
