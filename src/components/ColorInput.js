const ColorInput = (props) => {
  return (
    <div class='rounded-xl w-3/4 md:w-96  flex flex-col bg-white justify-start text-black items-center mt-10 p-5 shadow-xl'>
      <div>
        <label class='mb-5 md:text-xl'>Please enter the hex value</label>
        <input
          placeholder='#rrggbb'
          onChange={props.inputChange}
          value={props.input}
          class='bg-gray-200 focus:bg-gray-100  
         rounded-lg shadow pl-2 mb-5  outline-none w-full border-gray-200 border-b-2 focus:border-red-600 focus:border-b-2 focus-outline-none'
        />
      </div>
      <button
        class='bg-red-400 hover:bg-red-800 hover:text-white border-white border-1 rounded-md px-2 text-sm'
        onClick={props.generate}>
        Generate
      </button>
    </div>
  );
};

export default ColorInput;
