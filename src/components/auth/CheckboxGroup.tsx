import { useEffect } from "react";
import { useCheckboxGroup } from "../../business/useCheckboxGroup";
import type { CbxProps } from "../../types/authTypes";

export const CheckboxGroup = ({ onCbxChange }: CbxProps) => {
    const { allChecked, ageChecked, policyChecked, handleCheckboxChange } = useCheckboxGroup();

    useEffect(() => {
        const valid = ageChecked && policyChecked;
        onCbxChange(valid);
    }, [ageChecked, policyChecked]);

    const handleAllCheck = () => {
        handleCheckboxChange('all')
    }

    const handleAgeCheck = () => {
        handleCheckboxChange('age')
    }

    const handlePolicyCheck = () => {
        handleCheckboxChange('policy')
    }


    return (
        <>
            <div className="form-control">
                <label className="label cursor-pointer">
                    <strong className="label-text text-base">전체 동의</strong>
                    <input
                        type="checkbox"
                        className="checkbox checkbox-primary"
                        id="all"
                        checked={allChecked}
                        onChange={handleAllCheck}
                    />
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer">
                    <span className="label-text">만 14세 이상입니다.</span>
                    <input
                        type="checkbox"
                        className="checkbox checkbox-primary"
                        id="age"
                        checked={ageChecked}
                        onChange={handleAgeCheck}
                    />
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer">
                    <span className="label-text">서비스 정책에 동의합니다.</span>
                    <input
                        type="checkbox"
                        className="checkbox checkbox-primary"
                        id="policy"
                        checked={policyChecked}
                        onChange={handlePolicyCheck}
                    />
                </label>
            </div>
        </>
    );
};
