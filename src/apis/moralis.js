export const GetNFTs = async (address, success_f, failure_f) => {
  await fetch("https://deep-index.moralis.io/api/v2/"+ address + "/nft?chain=eth&format=decimal", {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "X-API-Key": "v144GSV5jcYo0t0wH4IRm2V1Us5XT43H7TjT19YokvjehcxAEPYK8Ky6HupddhST"
    }
  }).then(response => {
    if(!response.ok) throw new Error(response.status);
    return response.json()
  }).then(result => {
    success_f(result)
  })
}


export const GetNFTLowestPrice = async (token_address, success_f, failure_f) => {
  await fetch("https://deep-index.moralis.io/api/v2/nft/"+token_address+"/lowestprice?chain=eth&marketplace=opensea", {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "X-API-Key": "v144GSV5jcYo0t0wH4IRm2V1Us5XT43H7TjT19YokvjehcxAEPYK8Ky6HupddhST"
    }
  }).then(response => {
    if(!response.ok) throw new Error(response.status);
    return response.json()
  }).then(result => {
    success_f(result)
  }).catch((error) => {
    failure_f(error)
  })
}
