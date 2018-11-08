import axios from 'axios'

const PROJECT_NAME_INPUT = 'PROJECT_NAME_INPUT'
const DATA_TYPE_INPUT = 'DATA_TYPE_INPUT'
const READS_INPUT = 'READS_INPUT'
const REF_GENOME_FILE_INPUT ='REF_GENOME_FILE_INPUT'
const DELETE_GENOME_FILE = 'DELETE_GENOME_FILE'
const REFERENCE_INPUT = 'REFERENCE_INPUT'
const ALIGNER_INPUT = 'ALIGNER_INPUT'
const CUTOFF_INPUT = 'CUTOFF_INPUT'
const GEN_SNP_INPUT = 'GEN_SNP_INPUT'
const TREE_OPTION_INPUT = 'TREE_OPTION_INPUT'
const SELECTION_ANALYSIS_INPUT = 'SELECTION_ANALYSIS_INPUT'
const INT_FILES_INPUT = 'INT_FILES_INPUT'
const NUM_THREADS_INPUT = 'NM_THREADS_INPUT'
const CREATE_FORM = 'CREATE_FORM'
const BUILD_SNP_DB_INPUT = 'BUILD_SNP_DB_INPUT'
const RESET_FORM_INPUT = 'RESET_FORM_INPUT'

let initialState ={
    projectName: '',
    dataType: [0],
    reads: 2,
    refGenomeFiles: [],
    referenceGenome: '',
    reference: 1,
    cutoff: 0.1,
    aligner: 'bowtie',
    buildSNPDB: 0,
    genSNP: 0,
    treeOption: 1,
    selectionAnalysisOption: 0,
    intermediateFilesOption: 0,
    numberTreads: 1,
    postResponse: []
}

export default function reducer(state = initialState, action){
    console.log('Action payload', action.payload)
    // console.log('Action type', action.type)
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
        case SELECTION_ANALYSIS_INPUT:
            return{
                ...state,
                selectionAnalysisOption: action.payload
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

export function handleGenomeFileUpload(files){
    console.log("File array in reducer", files)
    return{
        type: REF_GENOME_FILE_INPUT,
        payload: files
    }
}

export function handleDeleteGenomeFile(fileName){
    // let indexArr = [index1, index2]
    // console.log(indexArr)
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

export function handleSelectionAnalysis(event){
    return{
        type: SELECTION_ANALYSIS_INPUT,
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
        payload: event.target.value
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


