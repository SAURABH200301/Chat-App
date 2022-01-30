import React,{ useState, useCallback } from 'react'
import { Alert, Icon, Input, InputGroup } from 'rsuite'

export default function EditableInput({
    initialInput,
    onSave,
    label = null,
    placeholder = "Write Your Value",
    emptyMsg = "Input is Empty",
    wrapperClassName="",
    ...inputProps
}) {
    const [input, setInput] = useState(initialInput);
    const [isEditable, setIsEditable] = useState(false);

    const onInputChange = useCallback((value) => {
        setInput(value);
    }, []);

    const onEditClick = useCallback(()=>{
             setIsEditable(p=>!p);
             setInput(initialInput);
    },[initialInput])

    const onSaveClick =async()=>{
      const trimmed= input.trim();
      
      if(trimmed === ''){
          Alert.info(emptyMsg,4000);
      }

      if(trimmed!==initialInput)
      {
          await onSave(trimmed);
      }
      setIsEditable(false);
    };

    return (
        <div className={wrapperClassName}>
            {label}
            <InputGroup>
            <Input 
              {...inputProps} 
              disabled={!isEditable}
              placeholder={placeholder} 
              value={input} 
              onChange={onInputChange} 
            />
            <InputGroup.Button onClick={onEditClick}>
              <Icon icon={isEditable?'close':'edit2'}/>
            </InputGroup.Button>
            {isEditable && 
              <InputGroup.Button onClick={onSaveClick}>
                  <Icon icon='check'/>
              </InputGroup.Button>
            }
            </InputGroup>
        </div>
    );
};

// this function changes the nickname of the user 