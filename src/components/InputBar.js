const InputBar = ({ placeholder, val, setVal, col, setCol, msg, type, center }) => {
  const handleChange = (e) => {
    console.log(e.target.value);
    setVal(e.target.value);
    setCol(2);
  };

  const inputStyle = {
    outline: col === 1 ? '1px solid green' : col === 0 ? '1px solid red' : '1px solid rgb(152, 152, 152, 0.2)',
    marginRight: '10px', // Adjust the right margin to create space between the input and message
    paddingLeft: '10px',
    textAlign: center ? 'center' : 'none', // Center the text horizontally
    height: '40px', // Adjust the height as needed
    lineHeight: '40px' // Ensure the text is vertically centered
  };

  return (
    <div className="input-container">
      <input
        type={type ? type : 'text'}
        value={val}
        placeholder={placeholder}
        onChange={handleChange}
        className='input-bar'
        style={inputStyle}
        spellCheck="false"
      />
      {msg && col < 2 && val && <p style={{ color: col === 1 ? 'green' : 'red' }} className="msg-txt">{msg}</p>}
    </div>
  );
}

export default InputBar;
