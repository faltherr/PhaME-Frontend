import axios from 'axios'

const PROJECT_NAME_INPUT = 'PROJECT_NAME_INPUT'
const DATA_TYPE_INPUT = 'DATA_TYPE_INPUT'
const REFERENCE_INPUT = 'REFERENCE_INPUT'
const CUTOFF_INPUT = 'CUTOFF_INPUT'
const GEN_SNP_INPUT = 'GEN_SNP_INPUT'
const TREE_OPTION_INPUT = 'TREE_OPTION_INPUT'
const SELECTION_ANALYSIS_INPUT = 'SELECTION_ANALYSIS_INPUT'
const INT_FILES_INPUT = 'INT_FILES_INPUT'
const NUM_THREADS_INPUT = 'NM_THREADS_INPUT'
const CREATE_FORM = 'CREATE_FORM'

let initialState ={
    projectName: '',
    dataType: [0],
    referenceGenome: '',
    reference: '',
    cutoff: 0.1,
    genSNP: '',
    treeOption: '',
    selectionAnalysisOption: 0,
    intermediateFilesOption: 0,
    numberTreads: 1,
    postResponse: []
}

export default function reducer(state = initialState, action){
    console.log('Action payload', action.payload)
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

        // ADD Reference genome file upload action creator

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
        // case RESET_FORM_INPUT:
        //     return initialState
          default:
            return state
    }
}

export function handleProjectName(event){
    console.log(event)
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

// ref genome

// ref
export function handleReference (event){
    return{
        type: REFERENCE_INPUT,
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
            projectName: props.projectName,
            dataType:  props.dataType,
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


