import React, { useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';



function SelectorFitnessLevel(props) {

  const { setInput, input, state, setState } = props


  const handleChange = (event) => {
    const { name, value } = event.target
    setState({ [name]: value })
    setInput({ ...input, [name]: value })
  };


  return (
    <div >
      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-age-native-simple">Fitness Level</InputLabel>
        <Select
          native
          value={state.profileType}
          onChange={handleChange}
          label="Fitness Level"
          inputProps={{
            name: 'profileType',
            id: 'outlined-age-native-simple',

          }}
          style={{ width: '150px', height: '50px', color: 'black', backgroundColor: 'white' }}

        >
          <option aria-label="None" value="" />
          <option value='Kids'>Kids</option>
          <option value='Adult'>Adult</option>

        </Select>
      </FormControl>
    </div >
  )
}

export default SelectorFitnessLevel
