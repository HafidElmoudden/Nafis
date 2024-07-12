import { useState } from "react";
import { useForm } from "react-hook-form";

const useTestCreateDialog = () => {
    const { register, handleSubmit, setValue, getValues, reset, formState: { errors } } = useForm({ mode: 'onChange' });
    const [isOpen, setIsOpen] = useState(false);
    const [skillList, setSkillList] = useState([]);

    const openDialog = () => setIsOpen(true);
    const closeDialog = () => {
        setIsOpen(false);
        reset();
        setSkillList([]);
    };

    const onSubmit = (data) => {
        data.skills = skillList;
        console.log("Submitted data: ", data);
        closeDialog();
    };

    const addSkill = (e) => {
        e.preventDefault();
        const skill = getValues("skill");
        const numberOfQuestions = getValues("numberQuestions");
        if (skill && numberOfQuestions) {
            setSkillList(prev => [...prev, { skill, numberOfQuestions }]);
            setValue("skill", null);
            setValue("numberQuestions", "");
        }
    };

    const removeSkill = (index) => {
        setSkillList(prev => prev.filter((_, i) => i !== index));
    };

    return {
        isOpen,
        openDialog,
        closeDialog,
        register,
        handleSubmit,
        setValue,
        getValues,
        onSubmit,
        addSkill,
        removeSkill,
        setIsOpen,
        skillList,
    };
};

export default useTestCreateDialog;