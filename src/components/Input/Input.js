import React, {Component} from 'react';
import {Panel, ToggleButton, ToggleButtonGroup, ButtonToolbar} from 'react-bootstrap';
import '../../styles/input.css';
import axios from 'axios'
import { connect } from 'react-redux'
import Slider from 'react-rangeslider'

import {handleProjectName, handleDataType, handleReference, handleCutoff,handleGenerateSNP,handleTreeOption, handleSelectionAnalysis, handleIntermediateFiles,handleNumThreads} from '../../reducers/inputFormReducer'

class InputForm extends Component{


  
  render(){
  let {handleProjectName, handleDataType, handleCutoff, handleReference, handleGenerateSNP, handleTreeOption,handleSelectionAnalysis,handleIntermediateFiles,handleNumThreads} = this.props
  console.log(this.props)
  return (
    <div className='input-main-container'>
      <h1 className='phame-header'>PhaME</h1>
      <h4>PhaME requires FASTQ data files in FASTQ format. To perform an analysis enter a project name and fill out the fields in the form below.</h4>
      <Panel>
        <Panel.Heading>
          <Panel.Title componentClass="h3">Input Sequence Information</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <form id='phame-form' onSubmit={this.handleSubmit}>
          <div className='form-row'>
            <label>Project Name</label>
            <input name='projectName' onChange={handleProjectName} value={this.props.projectName}/>
          </div>
          <div className='form-row'>
            <label>Data Type</label>
            <ButtonToolbar>
              <ToggleButtonGroup type="checkbox" value={this.props.dataType} onChange={handleDataType}>
                <ToggleButton value={0}>Full</ToggleButton>
                <ToggleButton value={1}>Contig</ToggleButton>
                <ToggleButton value={2}>Read </ToggleButton>
              </ToggleButtonGroup>
            </ButtonToolbar>
          </div>
          <div className='form-row'>
          <label>Reference Genomes</label>
            <input type='file' multiple/>
          </div>
          <div className='form-row'>
          <label>Reference</label>
          <ButtonToolbar>
              <ToggleButtonGroup name='Reference' type="radio" value={this.props.reference} onChange={handleReference}>
                <ToggleButton value={0}>Random</ToggleButton>
                <ToggleButton value={1}>Given</ToggleButton>
                <ToggleButton value={2}>Ani </ToggleButton>
              </ToggleButtonGroup>
            </ButtonToolbar>
          </div>
          <div className='form-row'>
          <label>Cutoff</label>
          <div className='slider-container'>
            {/* <input className='cutoff-input' type='number' step={0.01} value={this.props.cutoff}/> */}
            <Slider min={0} max={1} step={0.01} value={this.props.cutoff} onChange={handleCutoff} tooltip={false} style={{'width':'400px'}}/>
          </div>
          </div>
          <div className='form-row'>
          <label>Generate SNPs from Coding Regions</label>
          <ButtonToolbar>
              <ToggleButtonGroup name='genSNPs' type="radio" value={this.props.genSNP} onChange={handleGenerateSNP}>
                <ToggleButton value={0}>Only Align to Reference</ToggleButton>
                <ToggleButton value={1}>Build SNP Database</ToggleButton>
              </ToggleButtonGroup>
            </ButtonToolbar>
          </div>
          <div className='form-row'>
          <label>Evolutionary Tree Format</label>
          <ButtonToolbar>
              <ToggleButtonGroup name='buildTree' type="radio" value={this.props.treeOption} onChange={handleTreeOption}>
                <ToggleButton value={2}>RAxML</ToggleButton>
                <ToggleButton value={1}>FastTree</ToggleButton>
                <ToggleButton value={3}>Both</ToggleButton>
                <ToggleButton value={0}>No Tree</ToggleButton>
              </ToggleButtonGroup>
            </ButtonToolbar>
          </div>
          <div className='form-row'>
          <label>Perform Selection Analysis</label>
          <ToggleButtonGroup name='selectionAnalysis' type='radio' value={this.props.selectionAnalysisOption} onChange={handleSelectionAnalysis}>
            <ToggleButton value={1}>Yes</ToggleButton>
            <ToggleButton value={0}>No</ToggleButton>
          </ToggleButtonGroup>
          </div>
          <div className='form-row'>
          <label>Remove Intermediate Files</label>
          <ToggleButtonGroup name='removeIntermediateFiles' type='radio' value={this.props.intermediateFilesOption} onChange={handleIntermediateFiles}>
            <ToggleButton value={1}>Yes</ToggleButton>
            <ToggleButton value={0}>No</ToggleButton>
          </ToggleButtonGroup>
          </div>
          <div className='form-row'>
            <label>Number of Threads</label>

            <input className='input-threads' type='number' min='1' max='4' onChange={handleNumThreads} value={this.props.numberTreads} />
            </div>
          </form> 
        </Panel.Body>
       </Panel>
       <div>
        <button type="submit">Submit</button>
        <button type="button">Clear Values</button>
      </div>
    </div>
  )
}
}

function mapStateToProps(state){
  return{
    projectName: state.inputFormReducer.projectName,
    dataType:  state.inputFormReducer.dataType,
    reference: state.inputFormReducer.reference,
    cutoff:  state.inputFormReducer.cutoff,
    genSNP:  state.inputFormReducer.genSNP,
    treeOption: state.inputFormReducer.treeOption,
    selectionAnalysisOption: state.inputFormReducer.selectionAnalysisOption,
    intermediateFilesOption: state.inputFormReducer.intermediateFilesOption,
    numberTreads: state.inputFormReducer.numberTreads
  }
}


export default connect(mapStateToProps, {handleProjectName, handleDataType, handleReference, handleCutoff,handleGenerateSNP,handleTreeOption, handleSelectionAnalysis, handleIntermediateFiles,handleNumThreads})(InputForm)