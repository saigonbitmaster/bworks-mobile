import React from 'react'
import { FormControl, Input } from 'native-base'

type Props = {
  isRequired?: boolean,
  isInvalid?: boolean,
  label: string,
  placeholder?: string,
  error?: string,
}

const TextInput = ({ isRequired, isInvalid, label, placeholder, error }: Props) => {

  return (
    <FormControl isRequired={isRequired} isInvalid={isInvalid} >
      <FormControl.Label>{label}</FormControl.Label>
      <Input placeholder={placeholder} />
      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        {error}
      </FormControl.ErrorMessage>
    </FormControl>
  )
}

export default TextInput;
