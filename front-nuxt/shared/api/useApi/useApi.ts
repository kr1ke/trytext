export const useApi = () => {
    const req = $fetch.create({
        baseURL: "https://jsonplaceholder.typicode.com",
    })

    return (url:any, options:any = {}) => req(url(), options)
}