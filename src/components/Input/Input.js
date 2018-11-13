import React, { Component } from 'react';
import { Panel, ToggleButton, ToggleButtonGroup, ButtonToolbar, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import '../../styles/input.css';
import { connect } from 'react-redux'
import Slider from 'react-rangeslider'

import {
  handleProjectName,
  handleDataType,
  handleReads,
  handleContigFileUpload,
  handleDeleteContigFile,
  handleReadFileUpload,
  handleDeleteReadFile,
  handleGenomeFileUpload,
  handleDeleteGenomeFile,
  handleReference,
  handleCutoff,
  handleCutoffInputBox,
  handleAligner,
  handleGenerateSNP,
  handleTreeOption,
  handleBootstrap,
  handleNumberBootstraps,
  handleSelectionAnalysis,
  handleAnalysisOptionType,
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
      validProject: true,
      validCutoff: true,
      validBootstrap: true,
      // fields: {},
      // errors: {}
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

  fileInput = (e, reduxFunction) => {
    let newFiles = []
    let fileArray = Array.from(e.target.files)
    fileArray.forEach(element => {
      newFiles.push(element)
    })
    reduxFunction(newFiles)
  }

  validateProjectName = () => {
    this.props.projectName.length < 3 || this.props.projectName.length > 20 ? this.setState({ validProject: false }) : this.setState({ validProject: true })
  }

  validateCutoff = () => {
    this.props.cutoff < 0 || this.props.cutoff > 1 ? this.setState({ validCutoff: false }) : this.setState({ validateCutoff: true })
  }

  validateBootstrap = () => {
    this.props.numberBootstraps < 100 || this.props.numberBootstraps > 10000 ? this.setState({ validBootstrap: false }) : this.setState({ validBootstrap: true })
  }

  render() {

    let { handleProjectName,
      handleDataType,
      handleReads,
      handleContigFileUpload,
      handleDeleteContigFile,
      handleReadFileUpload,
      handleDeleteReadFile,
      handleGenomeFileUpload,
      handleDeleteGenomeFile,
      handleCutoff,
      handleCutoffInputBox,
      handleAligner,
      handleReference,
      handleGenerateSNP,
      handleTreeOption,
      handleBootstrap,
      handleNumberBootstraps,
      handleSelectionAnalysis,
      handleAnalysisOptionType,
      handleIntermediateFiles,
      handleNumThreads,
      handleBuildSNP,
      resetForm
    } = this.props

    const enableSubmit = this.props.projectName.length >= 3 && this.props.projectName.length <= 20
      && this.props.numberBootstraps >= 100 && this.props.numberBootstraps <= 10000
      && this.props.cutoff >= 0 && this.props.cutoff <= 1

    const tooltip = (
      <Tooltip id="tooltip">
        Check this info.
      </Tooltip>
    )

    console.log(this.props.projectName.length)
    console.log(this.state)

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
                <div className='project-name-validator-container'>
                  <input name='projectName' className='projectName' onChange={handleProjectName} onBlur={this.validateProjectName} value={this.props.projectName} maxLength="30" placeholder='(REQUIRED, Between 3 and 20 characters)' />
                  {
                    !this.state.validProject
                      ?
                      <div>
                        <br />
                        <p className='invalid-input'><i className="fas fa-exclamation-triangle"></i> Project name should be between 3 and 20 characters</p>
                      </div>
                      :
                      null
                  }
                </div>
              </div>
              <div className='form-row'>
                <label>Input Data Type
                  <OverlayTrigger placement='top' overlay={tooltip}>
                    <i className="fas fa-info-circle"></i>
                  </OverlayTrigger> 
                </label>
                <ButtonToolbar>
                  <ToggleButtonGroup type="checkbox" value={this.props.dataType} onChange={handleDataType}>
                    <ToggleButton value={0}>Full</ToggleButton>
                    <ToggleButton value={1}>Contig</ToggleButton>
                    <ToggleButton value={2}>Read </ToggleButton>
                  </ToggleButtonGroup>
                </ButtonToolbar>
              </div>

              {this.props.dataType.includes(1)
                ?
                <div className='form-row'>
                  <label>Upload Contigs</label>
                  <div className='file-selector-input-container'>
                    <input type='file' name='contigFile' id='contigFile' multiple onChange={(e) => this.fileInput(e, handleContigFileUpload)} className='inputFile' />
                    <div className='btn btn-default' id='upload-file-button'>
                      <label htmlFor="contigFile"> Upload contigs <i className="fas fa-upload"></i></label>
                    </div>
                  </div>
                </div>
                :
                null
              }

              {this.props.contigFiles.length
                ?
                <div className='form-row'>
                  <label>Contig files selected to upload</label>
                  <div className='file-upload-container'>
                    {
                      this.props.contigFiles.map((element, index1) => {
                        return (
                          <div key={element.name} className='file-delete-container'>
                            <label>{element.name}</label>    <i className="fas fa-trash-alt" onClick={() => handleDeleteContigFile(element.name)}></i>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
                :
                null
              }

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
                      <input type='file' name='readsFile' id='readsFile' multiple onChange={(e) => this.fileInput(e, handleReadFileUpload)} className='inputFile' />
                      <div className='btn btn-default' id='upload-file-button'>
                        <label htmlFor="readsFile"> Upload reads <i className="fas fa-upload"></i></label>
                      </div>
                    </div>
                  </div>

                </div>
                :
                null
              }

              {this.props.readFiles.length
                ?
                <div className='form-row'>
                  <label>Read files selected to upload</label>
                  <div className='file-upload-container'>
                    {
                      this.props.readFiles.map((element, index1) => {
                        return (
                          <div key={element.name} className='file-delete-container'>
                            <label>{element.name}</label>    <i className="fas fa-trash-alt" onClick={() => handleDeleteReadFile(element.name)}></i>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
                :
                null
              }

              <div className='form-row'>
                <label>Reference Genomes <i className="fas fa-info-circle"></i></label>
                <div className='file-selector-input-container'>
                  <input type='file' name='genomeFile' id='genomeFile' multiple onChange={(e) => this.fileInput(e, handleGenomeFileUpload)} className='inputFile' />
                  <div className='btn btn-default' id='upload-file-button'>
                    <label htmlFor="genomeFile"> Upload genomes <i className="fas fa-upload"></i></label>
                  </div>
                </div>
              </div>

              {this.props.refGenomeFiles.length
                ?
                <div className='form-row'>
                  <label>Genomes selected to upload</label>
                  <div className='file-upload-container'>
                    {
                      this.props.refGenomeFiles.map((element, index1) => {
                        return (
                          <div key={element.name} className='file-delete-container'>
                            <label>{element.name}</label>    <i className="fas fa-trash-alt" onClick={() => handleDeleteGenomeFile(element.name)}></i>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
                :
                null
              }

              <div className='form-row'>
                <label>Reference <i className="fas fa-info-circle"></i></label>
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
                <label>Linear Coverage Cutoff <i className="fas fa-info-circle"></i></label>
                <div className='slider-validator-container'>
                  <div className='slider-container'>
                    <Slider min={0} max={1} step={0.01} value={this.props.cutoff} onChange={handleCutoff} tooltip={false} style={{ 'width': '400px' }} />
                    <input className='cutoff-input' type='number' step={0.01} value={this.props.cutoff} onChange={handleCutoffInputBox} onBlur={this.validateCutoff} />
                  </div>
                  {
                    !this.state.validCutoff
                      ?
                      <div>
                        <br />
                        <p className='invalid-input'><i className="fas fa-exclamation-triangle"></i> Linear coverage cutoff should be between 0 and 1 </p>
                      </div>
                      :
                      null
                  }
                </div>
              </div>

              <div className='form-row'>
                <label>Build SNP database <i className="fas fa-info-circle"></i></label>
                <ButtonToolbar>
                  <ToggleButtonGroup name='buildSNPdb' type="radio" value={this.props.buildSNPDB} onChange={handleBuildSNP}>
                    <ToggleButton value={0}>Only align to reference</ToggleButton>
                    <ToggleButton value={1}>Build SNP Database</ToggleButton>
                  </ToggleButtonGroup>
                </ButtonToolbar>
              </div>

              <div className='form-row'>
                <label>Generate SNPs from Coding Regions <i className="fas fa-info-circle"></i></label>
                <ButtonToolbar>
                  <ToggleButtonGroup name='genSNPs' type="radio" value={this.props.genSNP} onChange={handleGenerateSNP} >
                    <ToggleButton value={1}>Yes</ToggleButton>
                    <ToggleButton value={0}>No</ToggleButton>
                  </ToggleButtonGroup>
                </ButtonToolbar>
              </div>
              <div className='form-row'>
                <label>Tree Building Algorithm <i className="fas fa-info-circle"></i></label>
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
                <div className='form-row'>
                  <label>Bootstrap</label>
                  <ButtonToolbar>
                    <ToggleButtonGroup name='bootstrap' type='radio' value={this.props.bootstrap} onChange={handleBootstrap}>
                      <ToggleButton value={1}>Yes</ToggleButton>
                      <ToggleButton value={0}>No</ToggleButton>
                    </ToggleButtonGroup>
                  </ButtonToolbar>
                </div>
                :
                null
              }

              {this.props.bootstrap === 1
                ?
                <div className='form-row'>
                  <label>Number of Bootstraps</label>
                  <div className='bootstrap-validator-container'> 
                  <div className='number-bootstrap-container'>
                    {/* <Slider min={1} max={10000} step={1} value={this.props.numberBootstraps} onChange={handleNumberBootstraps} tooltip={false} style={{ 'width': '400px' }} /> */}
                    <input className='number-bootstrap-input' type='number' step={1} value={this.props.numberBootstraps} onChange={handleNumberBootstraps} onBlur={this.validateBootstrap} min={100} max={10000} />
                    </div>
                    {
                      !this.state.validBootstrap
                        ?
                        <div>
                          <br />
                          <p className='invalid-input'><i className="fas fa-exclamation-triangle"></i> Enter a bootstrap number between 100 and 10,000</p>
                        </div>
                        :
                        null
                    }
                    </div>
                </div>
                :
                null
              }

              <div className='form-row'>
                <label>Perform Selection Analysis <i className="fas fa-info-circle"></i></label>
                <ToggleButtonGroup name='selectionAnalysis' type='radio' value={this.props.selectionAnalysisOption} onChange={handleSelectionAnalysis}>
                  <ToggleButton value={1}>Yes</ToggleButton>
                  <ToggleButton value={0}>No</ToggleButton>
                </ToggleButtonGroup>
              </div>

              {this.props.selectionAnalysisOption === 1
                ?
                <div className='form-row'>
                  <label>Select Analysis Option</label>
                  <ButtonToolbar>
                    <ToggleButtonGroup name='reads' type="radio" value={this.props.analysisOptionType} onChange={handleAnalysisOptionType}>
                      <ToggleButton value={0}>PAML</ToggleButton>
                      <ToggleButton value={1}>HyPhy</ToggleButton>
                      <ToggleButton value={2}>Both </ToggleButton>
                    </ToggleButtonGroup>
                  </ButtonToolbar>
                </div>
                :
                null
              }

              <div className='form-row'>
                <label>Remove Intermediate Files <i className="fas fa-info-circle"></i></label>
                <ToggleButtonGroup name='removeIntermediateFiles' type='radio' value={this.props.intermediateFilesOption} onChange={handleIntermediateFiles}>
                  <ToggleButton value={1}>Yes</ToggleButton>
                  <ToggleButton value={0}>No</ToggleButton>
                </ToggleButtonGroup>
              </div>

              <div className='form-row'>
                <label>Number of Threads <i className="fas fa-info-circle"></i></label>
                {/* <input className='input-threads' type='number' min='1' max='4' onChange={handleNumThreads} value={this.props.numberTreads} /> */}
                <ToggleButtonGroup name='numberThreads' type='radio' value={this.props.numberTreads} onChange={handleNumThreads}>
                  <ToggleButton value={1}>1</ToggleButton>
                  <ToggleButton value={2}>2</ToggleButton>
                  <ToggleButton value={3}>3</ToggleButton>
                  <ToggleButton value={4}>4</ToggleButton>
                </ToggleButtonGroup>
              </div>
            </Panel.Body>
          </Panel>
          <div className='form-button-container'>
            <Button type="submit" bsStyle="primary" bsSize='large' disabled={!enableSubmit}>Submit</Button>
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
    contigFiles: state.inputFormReducer.contigFiles,
    readFiles: state.inputFormReducer.readFiles,
    refGenomeFiles: state.inputFormReducer.refGenomeFiles,
    reference: state.inputFormReducer.reference,
    cutoff: state.inputFormReducer.cutoff,
    aligner: state.inputFormReducer.aligner,
    genSNP: state.inputFormReducer.genSNP,
    treeOption: state.inputFormReducer.treeOption,
    bootstrap: state.inputFormReducer.bootstrap,
    numberBootstraps: state.inputFormReducer.numberBootstraps,
    selectionAnalysisOption: state.inputFormReducer.selectionAnalysisOption,
    analysisOptionType: state.inputFormReducer.analysisOptionType,
    intermediateFilesOption: state.inputFormReducer.intermediateFilesOption,
    numberTreads: state.inputFormReducer.numberTreads,
    buildSNPDB: state.inputFormReducer.buildSNPDB
  }
}


export default connect(mapStateToProps, {
  handleProjectName,
  handleDataType,
  handleReads,
  handleContigFileUpload,
  handleDeleteContigFile,
  handleReadFileUpload,
  handleDeleteReadFile,
  handleGenomeFileUpload,
  handleDeleteGenomeFile,
  handleReference,
  handleCutoff,
  handleAligner,
  handleCutoffInputBox,
  handleGenerateSNP,
  handleTreeOption,
  handleBootstrap,
  handleNumberBootstraps,
  handleSelectionAnalysis,
  handleAnalysisOptionType,
  handleIntermediateFiles,
  handleNumThreads,
  handleBuildSNP,
  resetForm
})(InputForm)