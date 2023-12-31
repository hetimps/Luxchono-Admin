export const ReactSelectStyle = (width: any, height: any) => {
    return {
        placeholder: (base: any) => ({
            ...base,
            fontSize: "0.9rem",
            fontWeight: "normal"
        }),


        control: (styles: any) => ({
            ...styles,
            // borderRadius: "5px",
            boxShadow: "none",
            width: width,
            height: height || "50px",
            "&:hover": {
                borderColor: "#964315",
            },
            borderColor: "#DCDBDB",
            fontSize: "1rem",
            maxHeight: "200px",
            overflowY: "auto",
            // fontFamily: 'Open Sans, sans-serif'
        }),
        menu: (styles: any) => ({
            ...styles,
            fontSize: "1rem",
            zIndex: "10000"
        }),
        option: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: state.isSelected ? "#964315" : "#fff",
            "&:hover": {
                backgroundColor: state.isSelected ? "#964315" : "#F9F4F1"
            },
        }),
    }
}