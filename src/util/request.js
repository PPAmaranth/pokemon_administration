function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, method, data) {
	let options = {}
  if(method == 'POST'){
  	options = {
  		method: "POST",
        mode: "cors",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
  	}
  }
  const response = await fetch(url, options);
  checkStatus(response);
  return await response.json();
}