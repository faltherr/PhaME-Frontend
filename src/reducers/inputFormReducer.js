import axios from 'axios'

const PROJECT_NAME_INPUT = 'PROJECT_NAME_INPUT'
const DATA_TYPE_INPUT = 'DATA_TYPE_INPUT'
const READS_INPUT = 'READS_INPUT'
const CONTIG_FILE_INPUT = 'CONTIG_FILE_INPUT'
const DELETE_CONTIG_FILE = 'DELETE_CONTIG_FILE'
const READ_FILE_INPUT = 'READ_FILE_INPUT'
const DELETE_READ_FILE = 'DELETE_READ_FILE'
const REF_GENOME_FILE_INPUT ='REF_GENOME_FILE_INPUT'
const DELETE_GENOME_FILE = 'DELETE_GENOME_FILE'
const REFERENCE_INPUT = 'REFERENCE_INPUT'
const ALIGNER_INPUT = 'ALIGNER_INPUT'
const CUTOFF_INPUT = 'CUTOFF_INPUT'
const GEN_SNP_INPUT = 'GEN_SNP_INPUT'
const TREE_OPTION_INPUT = 'TREE_OPTION_INPUT'
const BOOTSTRAP_INPUT = 'BOOTSTRAP_INPUT'
const NUM_BOOTSTRAP_INPUT = 'NUM_BOOTSTRAP_INPUT'
const SELECTION_ANALYSIS_INPUT = 'SELECTION_ANALYSIS_INPUT'
const SELECTION_ANALYSIS_TYPE_INPUT = 'SELECTION_ANALYSIS_TYPE_INPUT'
const INT_FILES_INPUT = 'INT_FILES_INPUT'
const NUM_THREADS_INPUT = 'NM_THREADS_INPUT'
const CREATE_FORM = 'CREATE_FORM'
const BUILD_SNP_DB_INPUT = 'BUILD_SNP_DB_INPUT'
const RESET_FORM_INPUT = 'RESET_FORM_INPUT'

let initialState ={
    projectName: '',
    dataType: [0],
    reads: 2,
    contigFiles: [],
    readFiles: [],
    refGenomeFiles: [],
    referenceGenome: '',
    reference: 1,
    cutoff: 0.1,
    aligner: 'bowtie',
    buildSNPDB: 0,
    genSNP: 0,
    treeOption: 1,
    bootstrap: 0,
    numberBootstraps: 100,
    selectionAnalysisOption: 0,
    analysisOptionType: 0,
    intermediateFilesOption: 0,
    numberTreads: 1,
    postResponse: []
}

export default function reducer(state = initialState, action){
    // console.log('Action payload', action.payload)
    console.log('Action type', action.type)
    switch (action.type){
        case PROJECT_NAME_INPUT:
            return{
                ...state,
                projectName: action.payload
            }
        case DATA_TYPE_INPUT:
            return{
                ...state,
                dataType: action.payload
            }

        case READS_INPUT:
            return{
                ...state,
                reads: action.payload
            }

        case CONTIG_FILE_INPUT:

            let contigFiles = action.payload
            let currentContigFileName = []
            state.contigFiles.forEach(element=> currentContigFileName.push(element.name))

            let contigFilesToAdd = []
            for(let i=0;i<contigFiles.length; i++){
                if(currentContigFileName.indexOf(contigFiles[i].name)===-1){
                    contigFilesToAdd.push(contigFiles[i])
                }
            }

            let fullContigFileArrayState = [...state.contigFiles, contigFilesToAdd]
            let flattendContigFileArray = fullContigFileArrayState.reduce((a,b)=>a.concat(b),[])

            return{
                ...state,
                contigFiles: flattendContigFileArray
            }

        case DELETE_CONTIG_FILE:
            let filteredContigArr = state.contigFiles.filter(element=> element.name !== action.payload)
                return{
                    ...state,
                    contigFiles: filteredContigArr
                }
        
        case READ_FILE_INPUT:

            let readFiles = action.payload
            let currentReadFileName = []
            state.readFiles.forEach(element=> currentReadFileName.push(element.name))
            let readFilesToAdd = []
            for(let i=0;i<readFiles.length; i++){
                if(currentReadFileName.indexOf(readFiles[i].name)===-1){
                    readFilesToAdd.push(readFiles[i])
                }
            }

            let fullReadFileArrayState = [...state.readFiles, readFilesToAdd]
            let flattendReadFileArray = fullReadFileArrayState.reduce((a,b)=>a.concat(b),[])

            return{
                ...state,
                readFiles: flattendReadFileArray
            }
        
        case DELETE_READ_FILE:
            let filteredReadArr = state.readFiles.filter(element=> element.name !== action.payload)
            return{
                ...state,
                readFiles: filteredReadArr
            }
        
        case REF_GENOME_FILE_INPUT:
            let files = action.payload
            //Check for duplicates and only push files to state if they do not exist
            let currentFileName = []
            state.refGenomeFiles.forEach(element=> currentFileName.push(element.name))

            let filesToAdd = []
            for(let i=0;i<files.length; i++){
                if(currentFileName.indexOf(files[i].name)===-1){
                    filesToAdd.push(files[i])
                }
            }

            let fullFileArrayState = [...state.refGenomeFiles, filesToAdd]
            let flattendFileArray = fullFileArrayState.reduce((a,b)=>a.concat(b),[])
            
                return{
                    ...state,
                    refGenomeFiles: flattendFileArray
                }
        
        case DELETE_GENOME_FILE:
        let filteredArr = state.refGenomeFiles.filter(element=> element.name !== action.payload)
            return{
                ...state,
                refGenomeFiles: filteredArr
            }

        case REFERENCE_INPUT:
            return{
                ...state,
                reference: action.payload
            }
        case CUTOFF_INPUT:
            return{
                ...state,
                cutoff: action.payload
            }
        case ALIGNER_INPUT:
            return{
                ...state,
                aligner: action.payload
            }
        case BUILD_SNP_DB_INPUT:
            return{
                ...state,
                buildSNPDB: action.payload
            }
        case GEN_SNP_INPUT:
            return{
                ...state,
                genSNP: action.payload
            }
        case TREE_OPTION_INPUT:
            return{
                ...state,
                treeOption: action.payload
            }
        case BOOTSTRAP_INPUT:
            return{
                ...state,
                bootstrap: action.payload
            }
        case NUM_BOOTSTRAP_INPUT:
            return{
                ...state,
                numberBootstraps: action.payload
            }    
        case SELECTION_ANALYSIS_INPUT:
            return{
                ...state,
                selectionAnalysisOption: action.payload
            }
        case SELECTION_ANALYSIS_TYPE_INPUT:
            return{
                ...state,
                analysisOptionType: action.payload
            }
        case INT_FILES_INPUT:
            return{
                ...state,
                intermediateFilesOption: action.payload
            }
        case NUM_THREADS_INPUT:
            return{
                ...state,
                numberTreads: action.payload
            }
        case CREATE_FORM:
            return{
                ...state,
                postResponse: action.payload
            }

        case RESET_FORM_INPUT:
            return initialState

          default:
            return state
    }
}

export function handleProjectName(event){
    let name = event.target.value
    return {
        type: PROJECT_NAME_INPUT,
        payload: name
    }
}

export function handleDataType(event){
    return {
        type: DATA_TYPE_INPUT,
        payload: event
    }
}

export function handleReads(event){
    return{
        type: READS_INPUT,
        payload: event
    }
}

export function handleContigFileUpload(files){
    return{
        type: CONTIG_FILE_INPUT,
        payload: files
    }
}

export function handleDeleteContigFile(fileName){
    return{
        type: DELETE_CONTIG_FILE,
        payload: fileName
    }
}

export function handleReadFileUpload(files){
    console.log('Handle read input!!!!!!')
    return{
        type: READ_FILE_INPUT,
        payload: files
    }
}

export function handleDeleteReadFile(fileName){
    return{
        type: DELETE_READ_FILE,
        payload: fileName
    }
}

export function handleGenomeFileUpload(files){
    console.log("File array in reducer", files)
    return{
        type: REF_GENOME_FILE_INPUT,
        payload: files
    }
}

export function handleDeleteGenomeFile(fileName){
    return{
        type: DELETE_GENOME_FILE,
        payload: fileName
    }
}

export function handleReference (event){
    return{
        type: REFERENCE_INPUT,
        payload: event
    }
}

export function handleAligner(event){
    return{
        type: ALIGNER_INPUT,
        payload: event
    }
}


export function handleCutoff(event){
    return{
        type: CUTOFF_INPUT,
        payload: event
    }
}

export function handleCutoffInputBox(event){
    return{
        type: CUTOFF_INPUT,
        payload: +event.target.value
    }
}

export function handleBuildSNP(event){
    return{
        type: BUILD_SNP_DB_INPUT,
        payload: event
    }
}

export function handleGenerateSNP(event){
    return{
        type: GEN_SNP_INPUT,
        payload: event
    }
}

export function handleTreeOption(event){
    return{
        type: TREE_OPTION_INPUT,
        payload: event
    }
}

export function handleBootstrap(event){
    return{
        type: BOOTSTRAP_INPUT,
        payload: event
    }
}

export function handleNumberBootstraps(event){
    return{
        type: NUM_BOOTSTRAP_INPUT,
        payload: +event.target.value
    }
}

export function handleSelectionAnalysis(event){
    return{
        type: SELECTION_ANALYSIS_INPUT,
        payload: event
    }
}

export function handleAnalysisOptionType(event){
    return{
        type: SELECTION_ANALYSIS_TYPE_INPUT,
        payload: event
    }
}

export function handleIntermediateFiles(event){
    return{
        type: INT_FILES_INPUT,
        payload: event
    }
}

export function handleNumThreads(event){
    return{
        type: NUM_THREADS_INPUT,
        payload: event
    }
}

export function createForm(props){
    let formValues = {
            project: props.projectName,
            data_type:  props.dataType,
            reference: props.reference,
            cutoff:  props.cutoff,
            genSNP:  props.genSNP,
            treeOption: props.treeOption,
            selectionAnalysisOption: props.selectionAnalysisOption,
            intermediateFilesOption: props.intermediateFilesOption,
            numberTreads: props.numberTreads
    }

    let postResponse = axios.post('http://localhost:3693/api/form', formValues).then(response => {
        return response.data
      })

    return{
        type: CREATE_FORM,
        payload: postResponse
    }

}

export function resetForm() {
    return{
        type: RESET_FORM_INPUT
    }
}


