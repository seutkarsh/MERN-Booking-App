import config from '../config'
import { json } from 'stream/consumers'

export const validationRequest = async (): Promise<any> => {
    const response = await fetch(
        `${config.api.url.toString()}/validate-token`,
        {
            method: 'GET',
            credentials: 'include',
        }
    )
    const responseBody = await response.json()
    if (!response.ok) {
        throw new Error(responseBody.message)
    }
    return responseBody
}
export const getRequest = async (data: Request<any>): Promise<Response> => {
    const response = await fetch(data.url, {
        method: 'GET',
        credentials: 'include',
    })
    const responseBody = await response.json()
    if (!response.ok) {
        throw new Error(responseBody.message)
    }
    return responseBody
}

export const postRequest = async (data: Request<any>): Promise<Response> => {
    const response = await fetch(data.url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: data.body ? JSON.stringify(data.body) : undefined,
    })

    const responseBody = await response.json()
    if (!response.ok) {
        throw new Error(responseBody.message)
    }
    return responseBody
}

export interface Response {
    success: boolean
    data?: object
    errors?: [ApiError]
}

interface ApiError {
    id: string //       a unique identifier for this particular occurrence of the problem.//   the HTTP status code applicable to this problem, expressed as a string value.
    code?: string //     an application-specific error code, expressed as a string value.// to decide which how to display error
    title: string
}
export class Request<T> {
    url: string
    body?: T
    constructor(endpoint: string) {
        this.url = config.api.url.toString() + endpoint
    }

    setBody(data: T): void {
        this.body = data
    }
}
