import { ENVIRONMENT } from "../constants/environment"

const development = ENVIRONMENT.DEVELOPMENT
const mode = import.meta.env.VITE_ENVIRONMENT

let baseUrl = mode === development ? import.meta.env.VITE_API_URL : ''

export { baseUrl }
