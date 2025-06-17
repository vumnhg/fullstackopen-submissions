const Form = ({ input, onInput }) => {
  return (
    <form>
      <div>
        find countries{" "}
        <input
          type="text"
          value={input}
          onChange={(e) => onInput(e.target.value)}
        />
      </div>
    </form>
  );
};

export default Form;
