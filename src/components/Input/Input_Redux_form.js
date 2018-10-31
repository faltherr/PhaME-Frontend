import React, {Component} from 'react';
import {Panel, ToggleButton, ToggleButtonGroup, ButtonToolbar} from 'react-bootstrap';
import {Field, reduxForm} from 'redux-form';
import '../../styles/input.css';

// Here are the re-usable form components that include validation these will be exported and then re-imported

const renderSelectField = ({ input, label, type, meta: { touched, error }, children }) => (
  <div className='new-form-input-warning-wrapper'>
    <div className='form-select-container'>
    <ButtonToolbar>
      <ToggleButtonGroup type="checkbox" value={{val:props.value}}>
        {children}
      </ToggleButtonGroup>
    </ButtonToolbar>
      {touched && error && <span className='error-message-select'><i class="fas fa-exclamation-circle"></i>{error}</span>}
    </div>
  </div>
)

const field_file = ({ input, type, meta: { touched, error, warning } }) => {
  delete input.value
  return (
      <div className='file-selector-input-container'>
        <input {...input} type={type} multiple style={{"width":  "100%"}}/>
      </div>
  )
}




class InputForm extends Component{
  
  render(){
  const {handleSubmit, pristine, reset, submitting} = this.props
  return (
    <div className='input-main-container'>
      <h1 className='phame-header'>PhaME</h1>
      <h4>PhaME requires FASTQ data files in FASTQ format. To perform an analysis enter a project name and fill out the fields in the form below.</h4>
      <form onSubmit={handleSubmit}>
      <Panel>
        <Panel.Heading>
          <Panel.Title componentClass="h3">Input Sequence Information</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          
          <div className='form-row'>
            <label>Project Name</label>
            <Field name='projectName' component='input' type='text' placeholder='(REQUIRED, Between 3 and 20 characters)'/>
          </div>
          <div className='form-row'>
            <label>Data Type</label>
              <Field
                name="DataType"
                type="checkbox"
                component={renderSelectField}
              >
                <ToggleButton value={0}>Full</ToggleButton>
                <ToggleButton value={1}>Contig</ToggleButton>
                <ToggleButton value={2}>Read </ToggleButton>
              </Field>
          </div>
          <div className='form-row'>
          <label>Reference Genomes</label>
          <Field name='ReferenceGenome' type='file' component={field_file}/>
          </div>
          <div className='form-row'></div>
          <div className='form-row'></div>
          <div className='form-row'></div>
          <div className='form-row'></div>
          <div className='form-row'></div>
          <div className='form-row'></div>
          <div className='form-row'></div> 
        </Panel.Body>
       </Panel>
       <div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
      </div>
       </form>
    </div>
  )
}
}

InputForm = reduxForm({
  form: 'input'
})(InputForm)

export default InputForm