const ColorResult = (props) => {
  return (
    <div class='rounded-xl bg-gray-300 bg-opacity-20 shadow-lg w-3/4 md:w-96 h-auto mt-10 flex flex-col justify-evenly items-center pt-5 pb-10 text-white text-center'>
      <span>Complimentary Colors</span>

      <div class='flex flex-row justify-evenly items-center w-10/12 mt-2'>
        <div
          class='w-1/2 h-20'
          style={{ backgroundColor: `${props.input}` }}></div>
        <div
          class='w-1/2 h-20'
          style={{ backgroundColor: props.compliment }}></div>
      </div>
      <div class='flex flex-row justify-evenly items-center w-full mt-2'>
        <div class='w-1/2 text-center'>{props.input}</div>
        <div class='w-1/2 text-center'>{props.compliment}</div>
      </div>

      <span class='mt-5'>Split-Complimentary Colors</span>

      <div class='flex flex-row justify-evenly items-center w-10/12 mt-2'>
        <div
          class='w-1/3 h-20 '
          style={{ backgroundColor: props.split[0] }}></div>
        <div
          class='w-1/3 h-20 '
          style={{ backgroundColor: `${props.input}` }}></div>
        <div
          class='w-1/3 h-20 '
          style={{ backgroundColor: props.split[1] }}></div>
      </div>
      <div class='flex flex-row justify-evenly items-center w-full mt-2 text-center text-xs md:text-base'>
        <div class='w-1/3 '>{props.split[0]}</div>
        <div class='w-1/3 '>{props.input}</div>
        <div class='w-1/3 '>{props.split[1]}</div>
      </div>

      <span class='mt-5'>Analogous Colors</span>

      <div class='flex flex-row justify-evenly items-center w-10/12 mt-2'>
        <div
          class='w-1/2 h-20'
          style={{ backgroundColor: props.analog[0] }}></div>
        <div
          class='w-1/2 h-20'
          style={{ backgroundColor: props.analog[1] }}></div>
      </div>
      <div class='flex flex-row justify-evenly items-center w-full mt-2'>
        <div class='w-1/2 text-center'>{props.analog[0]}</div>
        <div class='w-1/2 text-center'>{props.analog[1]}</div>
      </div>
    </div>
  );
};

export default ColorResult;
