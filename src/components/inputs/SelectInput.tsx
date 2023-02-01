import React, { useState } from 'react'
import { FormControl } from 'native-base'

type ChoiceOption = {
  id: string;
  name: string;
}

type Props = {
  isRequired?: boolean,
  isInvalid?: boolean,
  label: string,
  placeholder?: string,
  error?: string,
  choices: ChoiceOption[]
}

const TextInput = ({ isRequired, isInvalid, label, choices, placeholder, error }: Props) => {
  const [service, setService] = useState("");
  return (
    <FormControl isRequired={isRequired} isInvalid={isInvalid} >
      <FormControl.Label>{label}</FormControl.Label>
      <Select selectedValue={service} minWidth="200" accessibilityLabel={placeholder} placeholder={placeholder} _selectedItem={{
        bg: "teal.600",
        endIcon: <CheckIcon size="5" />
      }} mt={1} onValueChange={itemValue => setService(itemValue)}>
        {choices.map(item => <Select.Item key={item.id} label={item.name} value={item.id} />)}
      </Select>
      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        {error}
      </FormControl.ErrorMessage>
    </FormControl>
  )
}

export default TextInput;
