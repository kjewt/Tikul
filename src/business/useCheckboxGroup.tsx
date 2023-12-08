import { useState } from "react";

type checkboxType = "all" | "policy" | "age"

export const useCheckboxGroup = () => {
    const [allChecked, setAllChecked] = useState(false);
    const [ageChecked, setAgeChecked] = useState(false);
    const [policyChecked, setPolicyChecked] = useState(false);

    const handleCheckboxChange = (checkboxType: checkboxType) => {
        switch (checkboxType) {
            case "all":
                setAllChecked(!allChecked);
                setAgeChecked(!allChecked);
                setPolicyChecked(!allChecked);
                break;
            case "age":
                setAgeChecked(!ageChecked);
                break;
            case "policy":
                setPolicyChecked(!policyChecked);
                break;
            default:
                break;
        }
    };





    return { allChecked, ageChecked, policyChecked, handleCheckboxChange };
};