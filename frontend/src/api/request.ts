import config from '../config'

export const getRequest = (): void => {}

export const postRequest = async (data: Request<any>): Promise<void> => {
    const response = await fetch(data.url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data.body),
    })

    const responseBody = await response.json()
    if (!response.ok) {
        throw new Error(responseBody.message)
    }
    // return responseBody
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
