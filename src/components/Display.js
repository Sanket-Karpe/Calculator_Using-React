import React, { useEffect, useRef } from "react";

const Display = (props) => {
    const resultRef = useRef();
    const expressionRef = useRef();

    useEffect(() => {
        resultRef.current.scrollIntoView();
    }, [props.history,props.expression]);

    useEffect(() => {
        expressionRef.current.scrollLeft = expressionRef.current.scrollWidth;
    }, [props.expression]);

    return (
        <div className={`h-[45%]  p-5 overflow-y-scroll custom-scroll
         ${!props.isDarkMode ? " bg-[#9db3ed] text-[#0b1537]" : "bg-[#172d67] text-[#fbfcfc]"}`}>
            <div>
                {props.history &&
                    props.history?.map((item) => (
                        <p className="text-xl leading-[1.875rem] flex justify-end opacity-50 tracking-wider"
                         key={item + "" + Math.random() * 44}>{item}</p>
                    ))}
            </div>
            <br />
            <div ref={expressionRef} className="overflow-x-scroll w-full min-h-[30px] custom-scroll">
                <p className={`whitespace-nowrap min-w-full w-fit  flex justify-end tracking-[2px]  ${props.equal ? "font-[400]  text-[1.8rem]" : "font-semibold text-[2.275rem]"} `}>{props.expression}</p>
            </div>
            <p ref={resultRef} className={`min-h-[30px] leading-[1rem] flex justify-end tracking-[2px] ${props.equal ? "font-semibold text-[2.275rem]" : "font-[400]  text-[1.8rem]"}`}>
                {props.result}
            </p>
        </div>
    )
}

export default Display
