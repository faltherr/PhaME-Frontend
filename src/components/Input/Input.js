import React, { Component } from 'react';
import { Panel, ToggleButton, ToggleButtonGroup, ButtonToolbar, Button } from 'react-bootstrap';
import '../../styles/input.css';
import { connect } from 'react-redux'
import Slider from 'react-rangeslider'

import {
  handleProjectName,
  handleDataType,
  handleReads,
  handleGenomeFileUpload,
  handleDeleteGenomeFile,
  handleReference,
  handleCutoff,
  handleCutoffInputBox,
  handleAligner,
  handleGenerateSNP,
  handleTreeOption,
  handleSelectionAnalysis,
  handleIntermediateFiles,
  handleNumThreads,
  createForm,
  handleBuildSNP,
  resetForm
} from '../../reducers/inputFormReducer'

class InputForm extends Component {
  constructor() {
    super()
    this.state = {
      fields: {},
      errors: {}
    }
  }

  handleSubmit = (event) => {
    console.log(777777777, this.props)
    event.preventDefault()
    createForm(this.props)
  }

  handleChange = (e) => {
    let files = e.target.files
    files.forEach(element => console.log(element.name))
  }

  genomeFileInput = (e) => {
    let newFiles = []
    let fileArray = Array.from(e.target.files)
    fileArray.forEach(element => {
        newFiles.push(element)
    })
    this.props.handleGenomeFileUpload(newFiles)
  }

  // genomeFileList = () => {
  //   return (
  //     this.props.refGenomeFiles.length
  //       ?
  //       <div className='form-row'>
  //         <label>Genomes selected to upload</label>
  //         <div className='file-upload-container'>

  //           {
  //             this.props.refGenomeFiles[0].map((file, i) => {
  //               console.log('This is the file name', file.name)
  //               return (
  //                 <div key={file.name} className='file-delete-container'>
  //                   <label>{file.name}</label>    <i className="fas fa-trash-alt" onClick={() => handleDeleteGenomeFile(i)}></i>
  //                 </div>
  //               )
  //             })
  //           }
  //         </div>
  //       </div>
  //       :
  //       null
  //   )
  // }

  // componentDidUpdate(prevProps) {
  //   console.log('current length', this.props.refGenomeFiles.length)
  //   console.log('previous length', prevProps.refGenomeFiles.length)
  //   if (this.props.refGenomeFiles.length !== prevProps.refGenomeFiles.length) {
  //     console.log('Should update?')
  //     this.genomeFileList()
  //   }
  // }

  render() {

    let { handleProjectName,
      handleDataType,
      handleReads,
      handleDeleteGenomeFile,
      handleCutoff,
      handleCutoffInputBox,
      handleAligner,
      handleReference,
      handleGenerateSNP,
      handleTreeOption,
      handleSelectionAnalysis,
      handleIntermediateFiles,
      handleNumThreads,
      handleBuildSNP,
      resetForm
    } = this.props

    // Some console logs to check if the display is correct
    console.log(8888888888888, this.props.refGenomeFiles)

    this.props.refGenomeFiles.forEach((element, i2)=>{
        console.log(`subEls ${i2}!!!!!!!!!!`, element.name)
    })

    return (
      <div className='input-main-container'>
        <h1 className='phame-header'>PhaME</h1>
        <h4>PhaME requires FASTQ data files in FASTQ format. To perform an analysis enter a project name and fill out the fields in the form below.</h4>
        <br />
        <form id='phame-form' onSubmit={this.handleSubmit}>
          <Panel>
            <Panel.Heading>
              <Panel.Title componentClass="h3">Input Sequence Information</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <div className='form-row'>
                <label>Project Name</label>
                <input name='projectName' onChange={handleProjectName} value={this.props.projectName} />
              </div>
              <div className='form-row'>
                <label>Input Data Type</label>
                <ButtonToolbar>
                  <ToggleButtonGroup type="checkbox" value={this.props.dataType} onChange={handleDataType}>
                    <ToggleButton value={0}>Full</ToggleButton>
                    <ToggleButton value={1}>Contig</ToggleButton>
                    <ToggleButton value={2}>Read </ToggleButton>
                  </ToggleButtonGroup>
                </ButtonToolbar>
              </div>

              {this.props.dataType.includes(2)
                ?
                <div>
                  <div className='form-row'>
                    <label>Reads</label>
                    <ButtonToolbar>
                      <ToggleButtonGroup name='reads' type="radio" value={this.props.reads} onChange={handleReads}>
                        <ToggleButton value={0}>Single reads</ToggleButton>
                        <ToggleButton value={1}>Paired reads</ToggleButton>
                        <ToggleButton value={2}>Both </ToggleButton>
                      </ToggleButtonGroup>
                    </ButtonToolbar>
                  </div>

                  <div className='form-row'>
                    <label>Upload Reads</label>
                    <div className='file-selector-input-container'>
                      <input type='file' name='file' id='file' multiple onChange={(e) => this.handleChange(e)} className='inputFile' />
                      <div className='btn btn-default' id='upload-file-button'>
                        <label htmlFor="file"> Upload reads <i className="fas fa-upload"></i></label>
                      </div>
                    </div>
                  </div>

                </div>
                :
                null
              }

              <div className='form-row'>
                <label>Reference Genomes</label>
                <div className='file-selector-input-container'>
                  <input type='file' name='file' id='file' multiple onChange={(e) => this.genomeFileInput(e)} className='inputFile' />
                  <div className='btn btn-default' id='upload-file-button'>
                    <label htmlFor="file"> Upload genomes <i className="fas fa-upload"></i></label>
                  </div>
                </div>
              </div>

              {this.props.refGenomeFiles.length
                ?
                <div className='form-row'>
                <label>Genomes selected to upload</label>
                <div className='file-upload-container'>
                {
                    this.props.refGenomeFiles.map((element, index1)=>{
                        return(
                          <div key={element.name} className='file-delete-container'>
                          {/* <label>{subElement.name}</label>    <i className="fas fa-trash-alt" onClick={()=>handleDeleteGenomeFile(index1, index2)}></i> */}
                          <label>{element.name}</label>    <i className="fas fa-trash-alt" onClick={()=>handleDeleteGenomeFile(element.name)}></i>
                        </div>
                        )
                      })
                }
                </div>
                </div>
                :
                null
              }

                {/* {this.props.refGenomeFiles.length
                ?
                <div className='form-row'>
                <label>Genomes selected to upload</label>
                <div className='file-upload-container'>

                  {
                    this.props.refGenomeFiles[0].map((file, i) => {
                    console.log(file.name)
                    return(
                      <div key={file.name} className='file-delete-container'>
                        <label>{file.name}</label>    <i className="fas fa-trash-alt" onClick={()=>handleDeleteGenomeFile(i)}></i>
                      </div>
                    )
                    })
                  }
                  </div>
                  </div>
                  :
                  null
                  } */}

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

                {this.props.dataType.includes(2)
                  ?
                  <div className='form-row'>
                    <label>Aligner</label>
                    <ButtonToolbar>
                      <ToggleButtonGroup name='aligner' type="radio" value={this.props.aligner} onChange={handleAligner}>
                        <ToggleButton value={'bowtie'}>Bowtie</ToggleButton>
                        <ToggleButton value={'minimap2'}>Minimap2</ToggleButton>
                      </ToggleButtonGroup>
                    </ButtonToolbar>
                  </div>
                  :
                  null
                }

                <div className='form-row'>
                  <label>Linear Coverage Cutoff</label>
                  <div className='slider-container'>
                    <Slider min={0} max={1} step={0.01} value={this.props.cutoff} onChange={handleCutoff} tooltip={false} style={{ 'width': '400px' }} />
                    <input className='cutoff-input' type='number' step={0.01} value={this.props.cutoff} onChange={handleCutoffInputBox} />
                  </div>
                </div>

                <div className='form-row'>
                  <label>Build SNP database</label>
                  <ButtonToolbar>
                    <ToggleButtonGroup name='buildSNPdb' type="radio" value={this.props.buildSNPDB} onChange={handleBuildSNP}>
                      <ToggleButton value={0}>Only align to reference</ToggleButton>
                      <ToggleButton value={1}>Build SNP Database</ToggleButton>
                    </ToggleButtonGroup>
                  </ButtonToolbar>
                </div>

                <div className='form-row'>
                  <label>Generate SNPs from Coding Regions</label>
                  <ButtonToolbar>
                    <ToggleButtonGroup name='genSNPs' type="radio" value={this.props.genSNP} onChange={handleGenerateSNP} >
                      <ToggleButton value={1}>Yes</ToggleButton>
                      <ToggleButton value={0}>No</ToggleButton>
                    </ToggleButtonGroup>
                  </ButtonToolbar>
                </div>
                <div className='form-row'>
                  <label>Tree Building Algorithm</label>
                  <ButtonToolbar>
                    <ToggleButtonGroup name='buildTree' type="radio" value={this.props.treeOption} onChange={handleTreeOption}>
                      <ToggleButton value={2}>RAxML</ToggleButton>
                      <ToggleButton value={1}>FastTree</ToggleButton>
                      <ToggleButton value={3}>Both</ToggleButton>
                      <ToggleButton value={0}>No Tree</ToggleButton>
                    </ToggleButtonGroup>
                  </ButtonToolbar>
                </div>

                {this.props.treeOption === 2 || this.props.treeOption === 3
                  ?
                  <div>
                    Bootstap - Yes or No? Then if yes give Number of Boostraps with default 100
              </div>
                  :
                  null
                }

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
            </Panel.Body>
          </Panel>
            <div className='form-button-container'>
              <Button type="submit" bsStyle="primary" bsSize='large'>Submit</Button>
              <Button onClick={resetForm} bsSize='large'>Reset Form</Button>
            </div>
        </form>
      </div>
        )
      }
    }
    
function mapStateToProps(state) {
  return {
          projectName: state.inputFormReducer.projectName,
        dataType: state.inputFormReducer.dataType,
        reads: state.inputFormReducer.reads,
        refGenomeFiles: state.inputFormReducer.refGenomeFiles,
        reference: state.inputFormReducer.reference,
        cutoff: state.inputFormReducer.cutoff,
        aligner: state.inputFormReducer.aligner,
        genSNP: state.inputFormReducer.genSNP,
        treeOption: state.inputFormReducer.treeOption,
        selectionAnalysisOption: state.inputFormReducer.selectionAnalysisOption,
        intermediateFilesOption: state.inputFormReducer.intermediateFilesOption,
        numberTreads: state.inputFormReducer.numberTreads,
        buildSNPDB: state.inputFormReducer.buildSNPDB
      }
    }
    
    
export default connect(mapStateToProps, {
          handleProjectName,
        handleDataType,
        handleReads,
        handleGenomeFileUpload,
        handleDeleteGenomeFile,
        handleReference,
        handleCutoff,
        handleAligner,
        handleCutoffInputBox,
        handleGenerateSNP,
        handleTreeOption,
        handleSelectionAnalysis,
        handleIntermediateFiles,
        handleNumThreads,
        handleBuildSNP,
        resetForm
})(InputForm)