import React from 'react'

const KeyPad = ({ isDarkMode, handleKeyPress }) => {
    const keys = [
        {
            keyCode: 55,
            label: "7",
        },
        {
            keyCode: 56,
            label: "8",
        },
        {
            keyCode: 57,
            label: "9",
        },
        {
            keyCode: 52,
            label: "4",
        },
        {
            keyCode: 53,
            label: "5",
        },
        {
            keyCode: 54,
            label: "6",
        },
        {
            keyCode: 49,
            label: "1",
        },
        {
            keyCode: 50,
            label: "2",
        },
        {
            keyCode: 51,
            label: "3",
        },
        {
            keyCode: 37,
            label: "%",
        },
        {
            keyCode: 48,
            label: "0",
        },
        {
            keyCode: 190,
            label: ".",
        },
    ];


    const symbolsRow = [
        {
            label: "AC",
            keyCode: 27,
            value: "allclear",
        },
        {
            label: "÷",
            keyCode: 111,
            value: "/",
        },
        {
            label: "×",
            keyCode: 56,
            value: "*",
        },
        {
            label: "⌫",
            keyCode: 8,
            value: "backspace",
        },
    ];

    const symbolsCol = [
        {
            label: "-",
            keyCode: 109,
        },
        {
            label: "+",
            keyCode: 107,
        },
        {
            label: "=",
            keyCode: 13,
        },
    ];
    return (
        <div className={`h-[55%] flex flex-col p-5  
    ${!isDarkMode ? " bg-[#f9f9f9]" : "bg-[#050c26]"}`}>

            <div className="flex-[1]  flex  select-none ">
                {symbolsRow.map((item, index) => (
                    <p className={`text-[#89a5f1] h-full w-full grid place-items-center cursor-pointer active:bg-slate-300 rounded-xl ${item.keyCode == 27 || item.keyCode == 8 ? "text-2xl" : "text-[1.8rem] leading-[1.875]"}`}

                        onClick={() => handleKeyPress(item.keyCode, item.value)}
                        key={index}
                    >
                        {item.label}
                    </p>
                ))}
            </div>
            <div className='flex-[3] flex'>
                <div className="flex-[3] flex justify-center items-center flex-wrap">
                    {keys.map((item, index) => (
                        <p className={`w-[33%] h-[25%] grid place-content-center text-[1.8rem] leading-[1.875]  select-none cursor-pointer flex-wrap active:bg-slate-300 rounded-2xl
                     ${isDarkMode ? "text-[#fbfcfc] " : "text-[#0b1537]"}`}

                            onClick={() => handleKeyPress(item.keyCode, item.label)}
                            key={index}
                        >
                            {item.label}
                        </p>
                    ))}
                </div>
                <div className="flex-[1] flex flex-col justify-between items-center select-none ">
                    {symbolsCol.map((item, index) => (
                        <p className={`text-[#89a5f1]  w-full grid place-items-center cursor-pointer text-[1.8rem] leading-[1.875]  ${item.label == "=" ? "h-[45%] w-[80%] bg-[#89a5f1] text-white rounded-xl active:scale-95 " : "h-1/4 active:bg-slate-300 rounded-xl"}`}

                            onClick={() => handleKeyPress(item.keyCode, item.label)}
                            key={index}
                        >
                            {item.label}
                        </p>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default KeyPad
