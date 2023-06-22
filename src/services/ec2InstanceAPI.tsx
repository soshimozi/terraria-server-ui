import { baseUrl } from "../constants"


const getInstanceState = async(): Promise<any> => {
    const statusResource = '/status'

    var response = await fetch(`${baseUrl}${statusResource}`)

    const responseObject = await response.json();

    return await responseObject?.result
}

const startInstance = async(accessToken: string) => {
    const resource = '/start'

    await fetch(`${baseUrl}${resource}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });    
}

const stopInstance = async(accessToken: string) => {
    const resource = '/stop'

    await fetch(`${baseUrl}${resource}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });    
}


const ApiService = {
    getInstanceState,
    startInstance,
    stopInstance
}

export default ApiService
